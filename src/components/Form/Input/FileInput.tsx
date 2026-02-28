import { useRef, type ChangeEvent } from 'react';
import styled from './FileInput.module.css';

interface FileInputProps {
    onSelectedFile: (file: File) => void;
}

const FileInput = ({ onSelectedFile }: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            return;
        }
        onSelectedFile(selectedFile);
        event.target.value = '';
    }


    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                className={styled.hiddenInput}
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange} />
            <div className={styled.uploadBox} onClick={handleClick}>
                <span className={styled.icon}>📁</span>
            </div>
        </>
    );
};

export default FileInput;