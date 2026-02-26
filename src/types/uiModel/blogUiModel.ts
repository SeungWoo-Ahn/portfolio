export type BlogPostCreatePayload = {
    title: string;
    content: string;
}

export type BlogPostUiModel = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}