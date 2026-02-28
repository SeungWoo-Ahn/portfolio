import type { UseFormRegisterReturn } from "react-hook-form";
import styled from './TextInput.module.css';

interface TextInputProps {
    type: 'text' | 'url' | 'email' | 'password';
    fontWeight?: 'regular' | 'medieum';
    placheholder: string;
    registration: UseFormRegisterReturn;
}

const TextInput = ({ type, fontWeight: font = 'regular', placheholder, registration }: TextInputProps) => {
    return (
        <input
            className={`${styled.input} ${font === 'medieum' ? styled.medieum : ''}`}
            type={type}
            placeholder={placheholder}
            {...registration}/>
    );
};

export default TextInput;