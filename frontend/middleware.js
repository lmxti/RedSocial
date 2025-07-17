// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("jwt")?.value;

  const isAuthPage = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login";
  const isProtected = req.nextUrl.pathname.startsWith("/home");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/home/:path*"], // aplica a estas rutas
};
