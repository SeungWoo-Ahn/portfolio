interface SubmitButtonProps {
    text?: string;
    isLoading: boolean;
}

const SubmitButton = ({ text = '출간하기', isLoading }: SubmitButtonProps) => {
    return (
        <button type='submit'>{isLoading ? '로딩 중...' : text}</button>
    );
}

export default SubmitButton;