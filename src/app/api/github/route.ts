import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://api.github.com/users/efekrbas/repos?per_page=100', {
            next: { revalidate: 3600 }, // Cache for 1 hour to prevent rate limiting
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        );
    }
}
