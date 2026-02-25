import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@supabase/supabase-js"

interface AuthState {
    user?: { id: string },
}

const initialState: AuthState = {
    user: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state: AuthState, action: PayloadAction<User | undefined>) => {
            if (action.payload) {
                state.user = { ...action.payload };
            } else {
                state = initialState;
            }
        }
    }
})

export const { setSession } = authSlice.actions;
export default authSlice.reducer;