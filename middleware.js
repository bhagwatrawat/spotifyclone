import {getToken} from 'next-auth/jwt';
import { NextResponse } from 'next/server';
export async function middleware(req) {
    // Token will exist if the user is logged in 
    const token=await getToken({req,secret:process.env.JWT_SECRET});
    // allow the requests if the following is true;
    // 1.the token exists
    // 2. its a requests for next-auth session and provider fetching
    const {pathname}=req.nextUrl;
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next();
    }
    if(!token && pathname!=='/login' && !pathname.includes('_next')){
         return NextResponse.redirect(new URL('/login',req.nextUrl));
    }
}
// export const config = {
//     matcher: '/api/:path*',
//   }