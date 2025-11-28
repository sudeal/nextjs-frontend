import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import i18nConfig from "@/i18n";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  const locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value || i18nConfig.defaultLocale;

  
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: [
    
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

