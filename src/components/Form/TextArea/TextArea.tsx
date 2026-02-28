import type { UseFormRegisterReturn } from "react-hook-form";
import styled from './TextArea.module.css';

interface TextAreaProps {
    placeholder: string;
    disabled: boolean;
    registration: UseFormRegisterReturn;
}

const TextArea = ({ placeholder, disabled, registration }: TextAreaProps) => {
    return (
        <textarea
            className={styled.textarea}
            placeholder={placeholder}
            disabled={disabled}
            {...registration}
        />
    );
};

export default TextArea;