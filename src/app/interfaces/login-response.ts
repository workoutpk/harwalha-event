export interface LoginResponse {
    //   token(arg0: string, token: any): unknown;
    data: {
        login_token: string;
    };
    error: string;
    code: number;
    message: string;
}
