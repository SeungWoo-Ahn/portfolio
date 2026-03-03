import { useState } from "react";
import type { BlogPostUiModel } from "../../../../types/uiModel/blogUiModel";
import styled from './BlogPostItem.module.css';
import MarkdownPreview from "../../../../components/MarkdownPreview/MarkdownPreview";

interface BlogPostItemProps {
    blogPost: BlogPostUiModel;
    showManageButton: boolean;
    onDelete: () => void;
}

const BlogPostItem = ({ blogPost }: BlogPostItemProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(it => !it);
    }

    return (
        <article
            className={styled.article}
            onClick={toggleExpanded}>
            <div className={`${styled.header} ${expanded ? styled.expanded : ''}`}>
                <div className={styled.headerContent}>
                    <div className={styled.headerTop}>
                        <h3 className={`${styled.title} ${expanded ? styled.expanded : ''}`}>예시 타이틀예시 타이틀예시 타이틀예시 타이틀예시 타이틀예시 타이틀예시 타이틀</h3>
                        <p className={styled.summary}>{blogPost.summary}</p>
                    </div>
                    <p className={styled.headerBottom}>{blogPost.createdAt}</p>
                </div>
                <img
                        className={styled.headerImage}
                        src={blogPost.coverImageUrl}
                        alt='cover-image'
                        loading='lazy' />
            </div>
            <div className={`${styled.body} ${expanded ? styled.expanded : ''}`}>
                <div className={styled.bodyContent}>
                    <div className={styled.bodyMarkdownWrapper}>
                        <MarkdownPreview markdown={blogPost.content} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPostItem;