import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookies = request.cookies.get('token');
    if (cookies) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/auth/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/user/:path*']
}