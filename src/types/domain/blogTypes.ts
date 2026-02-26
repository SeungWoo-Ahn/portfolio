export type BlogPost = {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export type BlogPostCreateRequest = Omit<BlogPost, 'id' | 'created_at'>;