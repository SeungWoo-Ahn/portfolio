import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { QUERY_KEYS } from "../../../consts/QueryKeys";
import { blogMapper } from "../../../types/mapper/blogMapper";
import { blogRepository } from "../../../data/blogRepository";
import { Link } from "react-router-dom";
import { PATHS } from "../../../consts/Paths";

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
        <section>
            {data?.map(it => (
                <article key={it.id}>
                    <p>{it.title}</p>
                    <p>{it.content}</p>
                    <p>{it.createdAt}</p>
                    {isLoggedIn && (
                        <>
                            <Link to={PATHS.BLOG_EDIT(it.id)}>수정</Link>
                            <button onClick={() => onDelete(it.id)}>삭제</button>
                        </>
                    )}
                </article>
            ))}
        </section>
    );
};

export default BlogPostsSection;