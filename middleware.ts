import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VISIBLE_PATHS } from '@/lib/site-visibility';

export function middleware(request: NextRequest) {
  // Staged-reveal gate only applies to the deployed (production) site.
  // Locally (npm run dev / a dev build) every route is reachable so it can
  // actually be reviewed before deciding what to reveal to the client.
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (VISIBLE_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
