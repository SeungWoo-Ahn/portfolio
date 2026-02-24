export interface User {
    email: string;
    role: UserType;
}

export type UserType = 'ADMIN' | 'USER';