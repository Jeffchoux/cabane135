import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isAuthed = !!req.auth;

  if (!isAuthed && !isLoginPage) {
    const url = new URL("/admin/login", nextUrl);
    return NextResponse.redirect(url);
  }
  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
