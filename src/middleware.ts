import { pathnames } from "@/libs/i18nNavigation";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { AppConfig } from "./utils/config";

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  pathnames,
});

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  if (
    request.nextUrl.pathname.includes("/sign-in") ||
    request.nextUrl.pathname.includes("/sign-up") ||
    isProtectedRoute(request)
  ) {
    return clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        const locale =
          req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? "";

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        auth().protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
