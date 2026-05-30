import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Login/Register page
  if (pathname === "/login-register") {
    if (token) {
      return NextResponse.redirect(new URL("/login-user", request.url));
    }
  }

  // Protected route
  if (pathname.startsWith("/login-user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login-register", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login-register", "/login-user"],
};