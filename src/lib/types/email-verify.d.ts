declare type EmailVerify = {
    email: string;
}

declare type VerifyEmailResponse = {
    code : string;
    message: string;
}

declare type CodeVerify = {
    email: string;
    code: string;
}
