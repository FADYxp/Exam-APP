import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
import LoginService from "./lib/services/login.service";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Username and password are required");
        }
        const fields = {
          username: credentials.username,
          password: credentials.password,
        };

        const response: LoginResponse = await LoginService(fields);


        if ("message" in  response) {
          throw new Error(response.message);
        }

        return {
          id: response.payload.user.id,
          accessToken: response.payload.token,
          user: response.payload.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user , trigger , session}) => {
      if (user) {
        token.accessToken = user?.accessToken;
        token.user = user?.user;
      }
      if (trigger === "update" ) {
        token.user = {
          ...token.user , 
            ...session.user
        }

        if (session.accessToken) { 
            token.accessToken = session.accessToken; 
        }
      }
      
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token?.user;

      return session;
    },
  },
};

