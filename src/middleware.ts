import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/favicon.ico",
  "/api/:path*",
]);

// export default clerkMiddleware();
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // match all except static files and _next
    "/(api|trpc)(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
};
