import type { AuthError, PostgrestError } from "@supabase/supabase-js";
import { SupabaseAuthError, SupabaseDatabaseError, SupabaseError, SupabaseStorageError, type AppSupabaseError } from "./errorTypes";

export const isSupabaseError = (error: unknown): error is AppSupabaseError => {
    return error instanceof SupabaseError;
}

const AuthErrorsRecord: Record<string, string> = {
    'invalid_credentials': '이메일/비밀번호가 일치하지 않습니다',
    'user_not_found': '존재하지 않는 사용자입니다',
};

export const wrapAuthError = (error: AuthError): SupabaseAuthError => {
    const code = error.code || '';
    const message = AuthErrorsRecord[code] ?? '인증 과정에서 오류가 발생했습니다';
    return new SupabaseAuthError(message);
}

const DatabaseErrorsRecord: Record<string, string> = {
    '23505': '이미 존재하는 데이터입니다',
    '23502': '필수 입력 항목이 누락되었습니다',
    'PGRST116': '데이터를 찾을 수 없습니다',
    '42703': '존재하지 않는 데이터입니다',
};

export const wrapDatabaseError = (error: PostgrestError): SupabaseDatabaseError => {
    const code = error.code || '';
    const message = DatabaseErrorsRecord[code] ?? 'DB 처리 과정에서 오류가 발생했습니다';
    return new SupabaseDatabaseError(message);
}

const StorageErrorsRecord: Record<number, string> = {
    400: '잘못된 요청입니다 (파일 형식 등)',
    403: '파일 접근 권한이 없습니다',
    404: '파일을 찾을 수 없습니다',
    413: '파일 크기가 너무 커서 업로드할 수 없습니다',
    415: '지원하지 않는 미디어 타입입니다',
    500: '스토리지 서버 내부 오류가 발생했습니다',
};

export const wrapStorageError = (statusCode: string | undefined): SupabaseStorageError => {
    const code = statusCode ? Number(statusCode) : -1;
    const message = StorageErrorsRecord[code] ?? 'Storage 처리 과정에서 오류가 발생했습니다';
    return new SupabaseStorageError(message);
}