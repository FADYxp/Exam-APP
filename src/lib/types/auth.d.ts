import { User } from "next-auth";

export type LoginResponse = {
  message?: string;
  status: string;
  code: number;
  payload: {
    user: User["user"];
    token: string;
  }
};

export type LoginFields = {
  username: string;
  password: string;
};
