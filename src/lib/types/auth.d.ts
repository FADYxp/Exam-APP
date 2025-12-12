import { User } from "next-auth";

export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type LoginFields = {
  email: string;
  password: string;
};
