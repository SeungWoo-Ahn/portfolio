import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../data/authRepository";
import type { LoginRequest } from "../../types/domain/authTypes";
import { useForm } from "react-hook-form";

interface LoginFormDialogProps {
    open: boolean;
    dismiss: () => void;
}

const LoginFormDialog = ({ open, dismiss }: LoginFormDialogProps) => {
    const { register, handleSubmit } = useForm<LoginRequest>();

    const mututation = useMutation({
        mutationFn: (request: LoginRequest) => authRepository.login(request),
        onSuccess: dismiss,
        onError: (error) => { alert(error.message) }
    });

    const onLogin = (request: LoginRequest) => {
        mututation.mutate(request);
    };

    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit(onLogin)}>
                <input
                    type="email"
                    {...register('email',
                        {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        })} />
                <input
                    type="password"
                    {...register('password',
                        { required: true })} />
                <input type="submit" />
            </form>
        </dialog>
    );
};

export default LoginFormDialog;