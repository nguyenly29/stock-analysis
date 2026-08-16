export interface News {
    id: string;
    title: string;
    summary: string;
    content: string;
    source: string;
    imageUrl: string | null;
    sourceUrl: string | null;
    category: string;
    publishedAt: string;  // ISO date string
    createdAt: string;    // ISO date string
}