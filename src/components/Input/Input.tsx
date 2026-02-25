import type React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    registration: UseFormRegisterReturn;
}

const Input = ({ type, registration }: InputProps) => {
    return (
        <input type={type} {...registration}/>
    );
};

export default Input;