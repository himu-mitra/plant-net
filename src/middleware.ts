import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;
    // console.log("tokeen", token);
    console.log("pathname---------", pathname)

    // if (!token && (pathname.startsWith("/api/order"))) {
    //     const url = new URL("/login", request.url);
    //     url.searchParams.set("redirect", request.nextUrl.href);
    //     return NextResponse.redirect(url);
    // }

    if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && (pathname.startsWith("/api/order"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!token && (pathname.startsWith("/dashboard"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if ((token?.role !== "admin") && pathname.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/logout", request.url));
    }

    if (
        !["admin", "seller"].includes(token?.role as string) &&
        (pathname.startsWith("/api/dashboard/seller") || pathname.startsWith("/dashboard/seller"))
    ) {
        return NextResponse.redirect(new URL("/logout", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/api/order",
        "/plant/:path*",
        "/dashboard/:path*",
        "/api/dashboard/:path*",
    ],
}