import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import styled from './MarkdownPreview.module.css';

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <div className={styled.markdownWrapper}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
                components={{
                    img: ({ ...props }) => (
                        <img loading='lazy' alt={props.alt || ''} {...props} />
                    ),
                    a: ({ ...props }) => (
                        <a target='_blank' {...props}></a>
                    )
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownPreview;