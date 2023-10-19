import { getIronSession } from "iron-session/edge";
import {
    NextFetchEvent,
    NextRequest,
    NextResponse,
    userAgent,
} from 'next/server';
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // const ua = userAgent(req);
    // if (ua.isBot) {
    //     return new NextResponse("plz don't be a bot. Be human,", {
    //         status: 403,
    //     });
    // }
    // const res = NextResponse.next();
    // const session = await getIronSession(req, res, {
    //     cookieName: "carrot-session",
    //     password: process.env.COOKIE_PASSWORD!,
    // });
    //
    // if (!session.user && !req.url.includes("/enter")) {
    //     req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    //     req.nextUrl.pathname = "/enter";
    //     return NextResponse.redirect(req.nextUrl);
    // }
    // return NextResponse.json({ ok: true });
}

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};