import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default withAuth(
    async function middleware(req) {
        // const pathName = req.nextUrl.pathname

        // const isAuth = await getToken({ req })
        // const isLoginPage = pathName.startsWith('/login')

        // const sensitiveRoutes = ['/edit-profile']
        // const isAccessingSensitiveRoute = sensitiveRoutes.some(route => pathName.startsWith(route))



        // if (isLoginPage) {
        //     if (isAuth) {
        //         return NextResponse.redirect(new URL('/dashboard', req.url))
        //     }

        //     return NextResponse.next()
        // }

        // if (!isAuth && isAccessingSensitiveRoute) {
        //     return NextResponse.redirect(new URL('/login', req.url))
        // }

        // if (pathName === '/') {
        //     return NextResponse.redirect(new URL('/dashboard', req.url))
        // }
    }, {
    callbacks: {
        async authorized() {
            return true
        }
    }
}
)

export const config = {
    matcher: ['/profile/:path*', '/sign-in']
}