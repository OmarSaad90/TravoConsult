import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VISIBLE_PATHS } from '@/lib/site-visibility';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (VISIBLE_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
