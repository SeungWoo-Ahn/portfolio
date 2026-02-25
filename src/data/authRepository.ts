import type { LoginRequest } from "../types/domain/authTypes";
import { supabaseClient } from "./supabase"

interface AuthRepository {
    login(request: LoginRequest): Promise<void>;
    logout(): Promise<void>;
}

export const authRepository: AuthRepository = {
    login: async (requset: LoginRequest): Promise<void> => {
        const { error } = await supabaseClient.auth
            .signInWithPassword({ ...requset });
        if (error) throw error;
    },
    logout: async (): Promise<void> => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
    }
}