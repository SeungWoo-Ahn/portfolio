import type { BlogPost, BlogPostCreateRequest } from "../types/domain/blogTypes";
import { wrapDatabaseError } from "./error/errorHandlers";
import { supabaseClient } from "./supabase";

export const BLOG_TABLE_NAME = 'posts';

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
            .from(BLOG_TABLE_NAME)
            .insert(request);
        if (error) {
            throw wrapDatabaseError(error);
        };
    },
    getBlogPosts: async (): Promise<BlogPost[]> => {
        const { data, error } = await supabaseClient
            .from(BLOG_TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw wrapDatabaseError(error);
        };
        return data as BlogPost[];
    },
    getBlogPost: async (id: number): Promise<BlogPost> => {
        const { data, error } = await supabaseClient
            .from(BLOG_TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw wrapDatabaseError(error);
        };
        return data as BlogPost;
    },
    updateBlogPost: async (id: number, request: BlogPostCreateRequest): Promise<void> => {
        const { error } = await supabaseClient
            .from(BLOG_TABLE_NAME)
            .update(request)
            .eq('id', id);
        if (error) {
            throw wrapDatabaseError(error);
        };
    },
    deleteBlogPost: async (id: number): Promise<void> => {
        const { error } = await supabaseClient
            .from(BLOG_TABLE_NAME)
            .delete()
            .eq('id', id);
        if (error) {
            throw wrapDatabaseError(error);
        };
    }
}