export const QUERY_KEYS = {
    projects: {
        all: ['posts'] as const,
        detail: (id: number) => [...QUERY_KEYS.projects.all, id] as const,
    },
};