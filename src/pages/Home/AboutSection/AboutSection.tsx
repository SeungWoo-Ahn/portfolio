import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import { useDialog } from '../../../hooks/useDialog';
import { authRepository } from '../../../data/authRepository';
import LoginFormDialog from '../../../components/Dialog/LoginFormDialog';
import styled from './AboutSection.module.css';

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

    const onEmailClick = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <section className={styled.section}>
                <h2 className={styled.name} onClick={onNameClick}>SEUNGWOO AN</h2>
                <p className={styled.job}>Android Engineer</p>
                <div className={styled.contactWrapper}>
                    <a href='https://github.com/SeungWoo-Ahn' target='_blank'>GITHUB</a>
                    <p>|</p>
                    <a onClick={() => onEmailClick('rio970319@gmail.com')}>EMAIL</a>
                </div>
                <div className={styled.infoWrapper}>
                    <p className={styled.intro}>
                        안녕하세요, 개발 비용을 줄이고 사용자 경험을 강화하는 Android 개발자 안승우입니다. <br/><br/>
                        팀원들과 개발 일정을 논의하고, 이슈와 branch를 기반으로 개발을 진행하면서 '의사소통 비용'을 줄입니다. <br/>
                        그리고 디자인 시스템 구축과 객체지향적 설계로 유지보수성과 확장성이 높은 코드로 '앞으로의 개발 비용'을 줄이고 있습니다. <br/><br/>
                        지속적으로 이용되는 서비스의 차별점은 '사용자 경험'이라 생각합니다. <br/>
                        그래서 버튼 하나를 만들 때도 로딩 상태, 접근성 옵션 등을 함께 고민하여 사용자에게 더 나은 경험을 주기 위해 노력합니다. <br/><br/>
                        차별화된 경험으로 다시 찾는 서비스를 제공하면서, 비즈니스와 동반 성장하는 개발자가 되겠습니다.
                    </p>
                </div>
            </section>
            <LoginFormDialog
                ref={dialogRef}
                dismiss={dismissDialog}
                handleBackDrop={handleBackDrop} />
        </>

    );
}

export default AboutSection;