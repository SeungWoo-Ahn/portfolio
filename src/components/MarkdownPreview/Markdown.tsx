import Markdown from "react-markdown";

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <Markdown
            components={{
                img: ({ node, ...props }) => (
                    <img 
                        {...props}
                        width={1024}
                        loading='lazy'
                    />
                )
            }}
        >
            {markdown}
        </Markdown>
    );
};

export default MarkdownPreview;