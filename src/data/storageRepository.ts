import { supabaseClient } from "./supabase";

export type StorageBucket = 'projects' | 'blogs';

interface StorageRepository {
    uploadFile(bucket: StorageBucket, file: File): Promise<string>;

    getPublicUrl(bucket: StorageBucket, path: string): string;
}

export const storageRepository: StorageRepository = {
    uploadFile: async (bucket: StorageBucket, file: File): Promise<string> => {
        const ext = file.name.split('.').pop();
        const filePath = `${Date.now()}.${ext}`;
        const { data, error } = await supabaseClient
            .storage
            .from(bucket)
            .upload(filePath, file);
            console.log(error);
        if (error) throw error;
        return data.path;
    },
    getPublicUrl: (bucket: StorageBucket, path: string): string => {
        const { data } = supabaseClient
            .storage
            .from(bucket)
            .getPublicUrl(path);
        return data.publicUrl;
    }
}