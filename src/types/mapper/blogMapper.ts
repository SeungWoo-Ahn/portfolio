import type { BlogPost, BlogPostCreateRequest } from "../domain/blogTypes";
import type { BlogPostCreatePayload, BlogPostUiModel } from "../uiModel/blogUiModel";
import { dateMapper } from "./dateMapper";

export const blogMapper = {
    toRequest: (payload: BlogPostCreatePayload): BlogPostCreateRequest => {
        return {
            title: payload.title.trim(),
            content: payload.content.trim(),
        }
    },
    toPayload: (blogPost: BlogPost): BlogPostCreatePayload => {
        return {
            title: blogPost.title,
            content: blogPost.content,
        }
    },
    toUiModel: (blogPost: BlogPost): BlogPostUiModel => {
        return {
            id: blogPost.id,
            title: blogPost.title,
            content: blogPost.content,
            createdAt: dateMapper.toFullDate(blogPost.created_at),
        }
    }
}