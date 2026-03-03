export class SupabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SupabaseError';
        Object.setPrototypeOf(this, SupabaseError.prototype);
    }
}

export class SupabaseAuthError extends SupabaseError {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
        Object.setPrototypeOf(this, SupabaseAuthError.prototype);
    }
}

export class SupabaseDatabaseError extends SupabaseError {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
        Object.setPrototypeOf(this, SupabaseDatabaseError.prototype);
    }
}

export class SupabaseStorageError extends SupabaseError {
    constructor(message: string) {
        super(message);
        this.name = 'StorageError';
        Object.setPrototypeOf(this, SupabaseStorageError.prototype);
    }
}

export type AppSupabaseError = SupabaseAuthError | SupabaseDatabaseError | SupabaseStorageError;