export const PATHS = {
    HOME: '/',
    PROJECT_POST: '/projects/new',
    PROJECT_EDIT: (id: number | string = ':id') => `/projects/edit/${id}`,
    BLOG_POST: '/blogs/new',
    BLOG_EDIT: (id: number | string = ':id') => `/blogs/edit/${id}`
}