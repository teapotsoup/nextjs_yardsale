import {
    NextFetchEvent,
    NextRequest,
    NextResponse,
} from 'next/server';
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // const ua = userAgent(req);
    // if (ua.isBot) {
    //     return new NextResponse("plz don't be a bot. Be human,", {
    //         status: 403,
    //     });
    // }
    if (!req.url.includes("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.has('carrot-session')) {
            return NextResponse.redirect(new URL("/enter", req.url));
        }
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};