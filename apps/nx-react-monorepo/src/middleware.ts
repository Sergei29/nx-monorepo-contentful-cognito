import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isPrivatePage } from './lib/common';

/**
 * @description middleware is applied to all routes, use conditionals to select
 */
export default withAuth(
  async function middleware(req) {
    const isAuthenticated = !!req.nextauth.token;
    const isPrivate = isPrivatePage(req.nextUrl.pathname);

    if (isPrivate && !isAuthenticated) {
      /**
       * @description IF user is NOT authenticated and tries to load
       * either of private pages then redirect to homepage
       */
      return NextResponse.redirect(req.nextUrl.origin);
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // if (isPrivatePage(req.nextUrl.pathname)) {
        //   /**
        //    * @description IF user is NOT authenticated and tries to load
        //    * either of private pages then request to signin
        //    */
        //   return token !== null;
        // }

        // if this is false, it will always request user to login
        // return token !== null;

        return true;
      },
    },
  }
);

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
