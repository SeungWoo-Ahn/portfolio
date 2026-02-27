import type { BlogPostUiModel } from "../../../../types/uiModel/blogUiModel";
import styled from './BlogPostItem.module.css';

interface BlogPostItemProps {
    blogPost: BlogPostUiModel;
    showManageButton: boolean;
    onDelete: () => void;
}

const BlogPostItem = ({ blogPost }: BlogPostItemProps) => {
    return (
        <article className={styled.article}>
            <div className={styled.header}>
                <div className={styled.headerContent}>
                    <div className={styled.headerTop}>
                        <h3 className={styled.title}>`{blogPost.title}{blogPost.title}{blogPost.title}{blogPost.title}{blogPost.title}{blogPost.title}{blogPost.title}{blogPost.title}`</h3>
                        <p className={styled.summary}>{blogPost.content}</p>
                    </div>
                    <p className={styled.headerBottom}>{blogPost.createdAt}</p>
                </div>
                <img
                    className={styled.headerImage}
                    src='https://m.health.chosun.com/site/data/img_dir/2025/04/08/2025040803041_0.jpg' 
                    alt='cover-image'
                    loading='lazy' />
            </div>
        </article>
    );
};

export default BlogPostItem;