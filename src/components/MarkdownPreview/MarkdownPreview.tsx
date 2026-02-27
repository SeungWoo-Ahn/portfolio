import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <ReactMarkdown
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