import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const useAuth = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return { user, isLoggedIn: !!user } as const;
};