import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../data/authRepository";
import type { LoginRequest } from "../../types/domain/authTypes";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import SubmitButton from "../Button/SubmitButton";
import type { MouseEvent, RefObject } from "react";
import styled from './LoginFormDialog.module.css';

interface LoginFormDialogProps {
    ref: RefObject<HTMLDialogElement | null>;
    dismiss: () => void;
    handleBackDrop: (e: MouseEvent<HTMLDialogElement>) => void;
}

const LoginFormDialog = ({ ref, dismiss, handleBackDrop }: LoginFormDialogProps) => {
    const { register, handleSubmit, reset } = useForm<LoginRequest>();

    const mututation = useMutation({
        mutationFn: (request: LoginRequest) => authRepository.login(request),
        onSuccess: () => {
            dismiss();
            reset();
        },
        onError: (error) => { alert(error.message) }
    });

    const onLogin = (request: LoginRequest) => {
        mututation.mutate(request);
    };

    return (
        <dialog 
            ref={ref}
            className={styled.dialog}
            onClick={handleBackDrop}>
            <form onSubmit={handleSubmit(onLogin)}>
                <Input 
                    type='email'
                    placheholder='이메일'
                    registration={register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                />
                <Input
                    type='password'
                    placheholder='비밀번호'
                    registration={register('password', {
                        required: true
                    })}
                />
                <SubmitButton text='로그인' isLoading={mututation.isPending}/>
            </form>
        </dialog>
    );
};

export default LoginFormDialog;