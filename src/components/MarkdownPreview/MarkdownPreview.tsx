import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            components={{
                img: ({ node, ...props }) => (
                    <img
                        width={768}
                        loading='lazy'
                        style={{
                            display: 'block',
                            margin: '0 auto',
                        }}
                        {...props}
                    />
                )
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownPreview;