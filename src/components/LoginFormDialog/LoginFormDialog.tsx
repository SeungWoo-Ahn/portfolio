import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../data/authRepository";
import type { LoginRequest } from "../../types/domain/authTypes";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import SubmitButton from "../Button/SubmitButton";

interface LoginFormDialogProps {
    open: boolean;
    dismiss: () => void;
}

const LoginFormDialog = ({ open, dismiss }: LoginFormDialogProps) => {
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
        <dialog open={open}>
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