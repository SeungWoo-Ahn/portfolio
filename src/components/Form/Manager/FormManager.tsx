import { useNavigate } from 'react-router-dom';
import styled from './FormManager.module.css';
import SubmitButton from '../Button/SubmitButton';

interface FormManagerProps {
    isLoading: boolean;
}

const FormManager = ({ isLoading }: FormManagerProps) => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    }

    return (
        <div className={styled.container}>
            <button 
                className={styled.backButton}
                onClick={onBack}>
                ← 나가기
            </button>
            <SubmitButton 
                text='출간하기'
                isLoading={isLoading}/>
        </div>
    );
}

export default FormManager;

