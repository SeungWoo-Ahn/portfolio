import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
    placeholder: string;
    disabled: boolean;
    registration: UseFormRegisterReturn;
}

const TextArea = ({ placeholder, disabled, registration }: TextAreaProps) => {
    return (
        <textarea 
            placeholder={placeholder}
            disabled={disabled}
            {...registration}
        />
    );
};

export default TextArea;