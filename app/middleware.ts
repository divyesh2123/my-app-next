import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 console.log('Middleware is running for path:', request.nextUrl.pathname);
 if (request.nextUrl.pathname === '/blog') {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}

