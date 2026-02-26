import type React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    placheholder?: string;
    registration: UseFormRegisterReturn;
}

const Input = ({ type, placheholder, registration }: InputProps) => {
    return (
        <input 
            type={type}
            placeholder={placheholder}
            {...registration}/>
    );
};

export default Input;