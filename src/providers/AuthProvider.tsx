import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { supabaseClient } from "../data/supabase";
import { setSession } from "../store/authSlice";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        supabaseClient.auth
            .getSession()
            .then(({ data: { session } }) => {
                dispatch(setSession(session?.user));
            });

        const { data: { subscription } } = supabaseClient.auth
            .onAuthStateChange((_, session) => {
                dispatch(setSession(session?.user));
            });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}