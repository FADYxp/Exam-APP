declare type Token = {
  sub: string;
  accessToken: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    passwordResetCode: string;
    passwordResetExpires: string;
    resetCodeVerified: boolean;
  };
  iat: number;
  exp: number;
  jti: string;
};
