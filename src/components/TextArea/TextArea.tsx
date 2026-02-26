import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
    placeholder: string;
    registration: UseFormRegisterReturn;
}

const TextArea = ({ placeholder, registration }: TextAreaProps) => {
    return (
        <textarea 
            placeholder={placeholder}
            {...registration}
        />
    );
};

export default TextArea;