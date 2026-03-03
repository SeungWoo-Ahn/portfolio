import { toast } from "react-toastify";

type ToastType = 'info' | 'success' | 'error';

export const useToast = () => {
    const showToast = (type: ToastType, message: string) => {
        toast[type](message);
    }

    return { showToast } as const;
};