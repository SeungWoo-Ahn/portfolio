import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { blogRepository } from "../../../data/blogRepository";
import { useAuth } from "../../../hooks/useAuth";
import { blogMapper } from "../../../types/mapper/blogMapper";
import styled from '../Home.module.css';
import BlogPostItem from "./BlogPostItem/BlogPostItem";

const BlogPostsSection = () => {
    const { isLoggedIn } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: QUERY_KEYS.blogs.all,
        queryFn: () => blogRepository.getBlogPosts(),
        select: (data) => data.map(it => blogMapper.toUiModel(it)),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => blogRepository.deleteBlogPost(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.blogs.all,
            })
        },
        onError: (error) => { alert(error.message) }
    });

    const onDelete = (id: number) => {
        deleteMutation.mutate(id);
    }
    
    return (
        <section className={styled.section}>
            <h2 className={styled.title}>BLOG</h2>
            {data && data.map(it => (
                <BlogPostItem 
                    key={it.id} 
                    blogPost={it}
                    showManageButton={isLoggedIn}
                    onDelete={() => onDelete(it.id)}/>
            ))}
        </section>
    );
};

export default BlogPostsSection;