import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import { useDialog } from '../../../hooks/useDialog';
import styled from '../Home.module.css'
import { authRepository } from '../../../data/authRepository';
import LoginFormDialog from '../../../components/Dialog/LoginFormDialog';

const AboutSection = () => {
    const { isLoggedIn } = useAuth();
    const { dialogRef, showDialog, dismissDialog, handleBackDrop } = useDialog();

    const logoutMutation = useMutation({
        mutationFn: authRepository.logout,
        onError: (error) => { console.log(error.message) }
    });

    const onNameClick = () => {
        if (isLoggedIn) {
            logoutMutation.mutate();
        } else {
            showDialog();
        }
    };

    return (
        <>
            <section className={styled.section}>
                <h2 className={styled.title} onClick={onNameClick}>Seungwoo An</h2>
            </section>
            <LoginFormDialog 
                ref={dialogRef}
                dismiss={dismissDialog}
                handleBackDrop={handleBackDrop}/>
        </>

    );
}

export default AboutSection;