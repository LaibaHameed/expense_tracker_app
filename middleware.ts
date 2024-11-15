// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Define public routes using createRouteMatcher
// const isPublicRoute = createRouteMatcher(['/']);

// // Use the middleware
// export default clerkMiddleware((auth, req) => {
//   if (isPublicRoute(req)) {
//     // Allow unauthenticated access
//     return;
//   }

//   // Authenticated access
//   auth.protect();
// });

// export const config = {
//   matcher: [
//     // Match all routes except Next.js internals and static files
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Include all API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 