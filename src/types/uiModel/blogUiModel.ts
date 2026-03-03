export type BlogPostCreatePayload = {
    title: string;
    content: string;
}

export type BlogPostUiModel = {
    id: number;
    title: string;
    summary: string;
    coverImageUrl: string;
    content: string;
    createdAt: string;
}