import { NextResponse } from 'next/server';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    [key: string]: unknown; // Allow other fields from GitHub API
}

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

        const data: GitHubRepo[] = await response.json();
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error('Error fetching GitHub repos:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        );
    }
}
