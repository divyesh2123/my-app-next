import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/favicon.ico"];
const PUBLIC_FILE = /\.[a-zA-Z0-9]+$/;

function getCookieValue(cookieHeader: string, name: string) {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.substring(name.length + 1);
}

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    PUBLIC_PATHS.includes(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const token = getCookieValue(cookieHeader, "accessToken");

  if (pathname.startsWith("/api")) {
    const headers = new Headers(request.headers);
    if (token && !headers.has("x-access-token")) {
      headers.set("x-access-token", token);
    }

    const destination = `http://localhost:8080${pathname}${url.search}`;
    const apiRequest = new Request(destination, {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });

    return fetch(apiRequest);
  }

  if (!token) {
    const loginUrl = new URL("/login", url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|_static|favicon\.ico).*)"],
};

