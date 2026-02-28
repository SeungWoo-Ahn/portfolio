import styled from './SubmitButton.module.css';

interface SubmitButtonProps {
    text?: string;
    isLoading: boolean;
}

const SubmitButton = ({ text = '출간하기', isLoading }: SubmitButtonProps) => {
    return (
        <button
            className={styled.button}
            type='submit' 
            disabled={isLoading}>
            {isLoading ? '로딩 중...' : text}
        </button>
    );
}

export default SubmitButton;