import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/register";
  let token = request.cookies.get("token")?.value || "";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login ", request.url));
  }
}

export const config = {
  // protected route
  matcher: ["/", "/login", "/about", "/register", "/home", "/post"],
};
