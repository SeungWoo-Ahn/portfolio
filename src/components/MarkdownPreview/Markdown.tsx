import Markdown from "react-markdown";

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    return (
        <Markdown>{markdown}</Markdown>
    );
};

export default MarkdownPreview;