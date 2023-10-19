import {
    NextFetchEvent,
    NextRequest,
    NextResponse,
} from 'next/server';
import { getIronSession } from "iron-session/edge";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, {
        cookieName: "carrot-session",
        password: process.env.COOKIE_PASSWORD!,
    });
    if (!session.user && !req.url.includes("/enter")) {
        req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
        req.nextUrl.pathname = "/enter";
        return NextResponse.redirect(req.nextUrl);
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};