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
            <div
                className={styled.wrapper}
                onClick={(e) => e.stopPropagation()}>
                <h3 className={styled.title}>LOGIN</h3>
                <form
                    className={styled.form}
                    onSubmit={handleSubmit(onLogin)}>
                    <div className={styled.inputWrapper}>
                        <label className={styled.label}>EMAIL</label>
                        <TextInput
                            type='email'
                            placheholder='이메일'
                            registration={register('email', {
                                required: '이메일을 입력해주세요',
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            })}
                        />
                    </div>
                    <div className={styled.inputWrapper}>
                        <label className={styled.label}>PASSWORD</label>
                        <TextInput
                            type='password'
                            placheholder='비밀번호'
                            registration={register('password', {
                                required: '비밀번호를 입력해주세요'
                            })}
                        />
                    </div>
                    <div className={styled.buttonWrapper}>
                        <SubmitButton text='로그인' isLoading={mututation.isPending} />
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default LoginFormDialog;