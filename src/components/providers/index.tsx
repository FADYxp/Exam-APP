import { GlobalProvider } from "./_components/global-provider";
import NextAuthProvider from "./_components/next-auth.provider";
import ReactQueryProvider from "./_components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <GlobalProvider>{children}</GlobalProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
