import { NextResponse } from 'next/server';

// Cache duration: 10 minutes
let cachedData: { posts: MediumPost[]; fetchedAt: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface MediumPost {
    title: string;
    description: string;
    pubDate: string;
    link: string;
    thumbnail: string;
    categories: string[];
}

function extractImageFromContent(content: string): string {
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : '';
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

function parseXml(xml: string): MediumPost[] {
    const posts: MediumPost[] = [];

    // Extract all <item> blocks
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(xml)) !== null) {
        const itemXml = itemMatch[1];

        // Extract fields
        const title = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
            || itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]
            || '';

        const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1]
            || itemXml.match(/<link[^>]*href="([^"]+)"/)?.[1]
            || '';

        const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '';

        const contentEncoded = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] || '';
        const description = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
            || itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1]
            || '';

        // Extract categories
        const categories: string[] = [];
        const catRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
        let catMatch;
        while ((catMatch = catRegex.exec(itemXml)) !== null) {
            categories.push(catMatch[1]);
        }

        // Extract thumbnail from content:encoded or description
        const thumbnail = extractImageFromContent(contentEncoded) || extractImageFromContent(description);

        // Clean description text
        const cleanDesc = stripHtml(description).substring(0, 200);

        posts.push({
            title: stripHtml(title),
            description: cleanDesc,
            pubDate,
            link: link.trim(),
            thumbnail,
            categories,
        });
    }

    return posts;
}

export async function GET() {
    try {
        // Check cache
        if (cachedData && Date.now() - cachedData.fetchedAt < CACHE_DURATION) {
            return NextResponse.json({ posts: cachedData.posts }, {
                headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300' }
            });
        }

        const response = await fetch('https://medium.com/feed/@efekk', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PersonalWebsite/1.0)',
            },
            next: { revalidate: 600 }, // Next.js fetch cache
        });

        if (!response.ok) {
            throw new Error(`Medium RSS fetch failed: ${response.status}`);
        }

        const xml = await response.text();
        const posts = parseXml(xml);

        // Update cache
        cachedData = { posts, fetchedAt: Date.now() };

        return NextResponse.json({ posts }, {
            headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300' }
        });
    } catch (error) {
        console.error('Medium API error:', error);

        // Return cached data if available, even if stale
        if (cachedData) {
            return NextResponse.json({ posts: cachedData.posts }, {
                headers: { 'Cache-Control': 'public, s-maxage=60' }
            });
        }

        return NextResponse.json({ posts: [], error: 'Failed to fetch Medium posts' }, { status: 500 });
    }
}
