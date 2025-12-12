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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const fields = {
          email: credentials.email,
          password: credentials.password,
        };

        const payload: ApiResponse<LoginResponse> = await LoginService(fields);


        if ("code" in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
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

