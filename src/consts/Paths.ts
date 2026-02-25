export const PATHS = {
    HOME: '/',
    PROJECT_POST: '/projects/new',
    PROJECT_DETAIL: (slug: string = ':slug') => `/projects/${slug}`,
    BLOG_POST: '/blogs/new',
    BLOG_DETAIL: (slug: string = ':slug') => `/blogs/${slug}`
}