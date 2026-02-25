export const PATHS = {
    HOME: '/',
    PROJECT_POST: '/projects/new',
    PROJECT_DETAIL: (id: number | string = ':id') => `/projects/${id}`,
    BLOG_POST: '/blogs/new',
    BLOG_DETAIL: (id: number | string = ':id') => `/blogs/${id}`
}