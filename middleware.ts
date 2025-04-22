import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, _) => {
  await auth.protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 