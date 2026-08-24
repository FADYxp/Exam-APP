export type EditProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
};

export type EditProfileSuccessResponse = {
  status: boolean;
  code: number;
  message: string;
  payload: {
    user: {
      id: string;
      username: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      profilePhoto: string | null;
      emailVerified: boolean;
      phoneVerified: boolean;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type EditProfileErrorResponse = {
  status: boolean;
  message: string;
  code: number;
};
