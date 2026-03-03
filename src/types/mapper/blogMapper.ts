import type { BlogPost, BlogPostCreateRequest } from "../domain/blogTypes";
import type { BlogPostCreatePayload, BlogPostUiModel } from "../uiModel/blogUiModel";
import { dateMapper } from "./dateMapper";

const DEFAULT_COVER_IMAGE_URL = 'https://eiqvnnueodtphwvyxtci.supabase.co/storage/v1/object/public/admin/default.png';

const getSummary = (content: string): string => {
    if (!content) return '';

    const cleanText = content
        .replace(/!\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")

        .replace(/#{1,6}\s?/g, "")
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        .replace(/-|\*|\+ /g, "")
        .replace(/\d+\.\s/g, "")
        .replace(/>\s?/g, "")
        .replace(/(`{1,3})(.*?)\1/g, "$2")
        .replace(/\n+/g, " ")
        .replace(/\s\s+/g, " ")
        .trim();

    return cleanText.length > 200
        ? cleanText.slice(0, 200)
        : cleanText;
}

const getCoverImageUrl = (content: string): string | null => {
    if (!content) return null;

    const mdImageRegex = /!\[.*?\]\((.*?)\)/;
    const htmlImageRegex = /<img.*?src=["'](.*?)["'].*?>/i;

    const mdMatch = content.match(mdImageRegex);
    const htmlMatch = content.match(htmlImageRegex);

    const matches = [
        { url: mdMatch?.[1], index: mdMatch?.index ?? Infinity },
        { url: htmlMatch?.[1], index: htmlMatch?.index ?? Infinity }
    ].filter(m => m.url);

    if (matches.length === 0) return null;

    matches.sort((a, b) => a.index - b.index);

    return matches[0].url || null;
}

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
            summary: getSummary(blogPost.content),
            coverImageUrl: getCoverImageUrl(blogPost.content) || DEFAULT_COVER_IMAGE_URL,
            content: blogPost.content,
            createdAt: dateMapper.toFullDate(blogPost.created_at),
        }
    }
}