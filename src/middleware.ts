import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [ "/account", "/exams" ];
const authRoutes = ["/login", "/register" , "/forgot-password"];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) || request.nextUrl.pathname === "/") {

    if (token) {
      return NextResponse.next();
    }
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {

    if (!token) {
      return NextResponse.next();
    }
    if (token) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
