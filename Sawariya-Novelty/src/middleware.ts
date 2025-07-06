import { NextResponse } from 'next/server';

export function middleware() {
  // For now, just allow all requests - authentication will be handled at page level
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
