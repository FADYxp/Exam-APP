export type ForgotPasswordResponse = {
  message: string;
  info: string;
  code: number;
  status: string;
};

export type ResetPasswordFields = {
  email: string;
  newPassword: string;
};
