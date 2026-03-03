import { useMutation } from "@tanstack/react-query";
import { storageRepository, type StorageBucket } from "../data/storageRepository";
import imageCompression, { type Options } from "browser-image-compression";

const DEFAULT_COMPRESS_OPTIONS: Options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1024,
};

export const useImageUpload = () => {
    return useMutation({
        mutationFn: async ({ bucket, file }: { bucket: StorageBucket, file: File }) => {
            if (!file.type.startsWith('image/')) {
                throw new Error('이미지 파일 형식이 아닙니다');
            }
            const compressedFile = await imageCompression(file, DEFAULT_COMPRESS_OPTIONS);
            const path = await storageRepository.uploadFile(bucket, compressedFile);
            const publicUrl = storageRepository.getPublicUrl(bucket, path);
            return publicUrl;
        },
    });
};