import type { BlogPost, BlogPostCreateRequest } from "../types/domain/blogTypes";
import { supabaseClient } from "./supabase";

const TABLE_NAME = 'posts';

interface BlogRepository {
    createBlogPost(request: BlogPostCreateRequest): Promise<void>;

    getBlogPosts(): Promise<BlogPost[]>;

    getBlogPost(id: number): Promise<BlogPost>;

    updateBlogPost(id: number, request: BlogPostCreateRequest): Promise<void>;

    deleteBlogPost(id: number): Promise<void>;
}

export const blogRepository: BlogRepository = {
    createBlogPost: async (request: BlogPostCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .insert(request);
        if (error) throw error;
    },
    getBlogPosts: async (): Promise<BlogPost[]> => {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data as BlogPost[];
    },
    getBlogPost: async (id: number): Promise<BlogPost> => {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data as BlogPost;
    },
    updateBlogPost: async (id: number, request: BlogPostCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .update(request)
            .eq('id', id);
        if (error) throw error;
    },
    deleteBlogPost: async (id: number): Promise<void> => {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
}