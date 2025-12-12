export type EditProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
};

export type EditProfileSuccessResponse = {
  message: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    password?: string;
    isVerified: boolean;
    createdAt: string;
    passwordChangedAt?: string;
    passwordResetCode?: string;
    passwordResetExpires?: string;
    resetCodeVerified?: boolean;
  };
};

export type EditProfileErrorResponse = {
  message: string;
  code: number;
};
