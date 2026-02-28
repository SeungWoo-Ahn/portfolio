import { useCallback, useRef, type MouseEvent } from "react"

export const useDialog = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showDialog = useCallback(() => {
        dialogRef.current?.showModal();
    }, []);

    const dismissDialog = useCallback(() => {
        dialogRef.current?.close();
    }, []);

    const handleBackDrop = useCallback((e: MouseEvent<HTMLDialogElement>) => {
        const el = dialogRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const isInner = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
        );
        if (!isInner) {
            dismissDialog();
        }
    }, [dismissDialog]);

    return { dialogRef, showDialog, dismissDialog, handleBackDrop } as const;
}