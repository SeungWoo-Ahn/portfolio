import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../data/authRepository";
import type { LoginRequest } from "../../types/domain/authTypes";
import { useForm } from "react-hook-form";
import TextInput from "../Form/Input/TextInput";
import SubmitButton from "../Form/Button/SubmitButton";
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
            <div onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onLogin)}>
                    <TextInput
                        type='email'
                        placheholder='이메일'
                        registration={register('email', {
                            required: '이메일을 입력해주세요',
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        })}
                    />
                    <TextInput
                        type='password'
                        placheholder='비밀번호'
                        registration={register('password', {
                            required: '비밀번호를 입력해주세요'
                        })}
                    />
                    <SubmitButton text='로그인' isLoading={mututation.isPending} />
                </form>
            </div>
        </dialog>
    );
};

export default LoginFormDialog;