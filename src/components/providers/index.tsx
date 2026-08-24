import { GlobalProvider } from "./_components/global-provider";
import NextAuthProvider from "./_components/next-auth.provider";
import ReactQueryProvider from "./_components/react-query.provider";
import { ThemeProvider } from "./_components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
