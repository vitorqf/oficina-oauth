import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

const redirect = (req: NextRequest, url: string) => {
  return NextResponse.redirect(new URL(url, req.url));
};

const verifySession = async (token: string) => {
  const response = await fetch("http://127.0.0.1:3000/api/auth/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (response.status === 200) {
    return true;
  }

  return false;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const session = getCookie("session", { req, res });

  if (!session) {
    console.log("no session");
    const res = redirect(req, "/login");
    return res;
  }

  const parsedSession = JSON.parse(decodeURIComponent(session));
  const accessToken = parsedSession.accessToken;

  if (!accessToken) {
    console.log("no access token");
    const res = redirect(req, "/login");
    return res;
  }

  const isValid = await verifySession(accessToken);

  if (!isValid) {
    console.log("invalid session");
    const res = redirect(req, "/login");
    return res;
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
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};
