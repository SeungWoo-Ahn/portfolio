import { BLOG_TABLE_NAME } from "../data/blogRepository";
import { PROJECT_TABLE_NAME } from "../data/projectRepository";

export const QUERY_KEYS = {
    users: {
        skillSets: ['skillSets'] as const,
    },
    projects: {
        all: [PROJECT_TABLE_NAME] as const,
        detail: (id: number) => [...QUERY_KEYS.projects.all, id] as const,
    },
    blogs: {
        all: [BLOG_TABLE_NAME] as const,
        detail: (id: number) => [...QUERY_KEYS.blogs.all, id] as const,
    },
};