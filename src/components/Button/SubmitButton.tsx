interface SubmitButtonProps {
    isLoading: boolean;
}

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
    return (
        <button type='submit'>{isLoading ? '로딩 중...' : '출간하기'}</button>
    );
}

export default SubmitButton;