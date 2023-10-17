import {withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"

declare module "iron-session"{
    interface IronSessionData{
      user?:{
        id:number
      }
    }
  }
  
const cookieOptions={
    cookieName:"carrot-session",
    password:process.env.COOKIE_PASSWORD!
}

export function withApiSession(fn:any){
    return withIronSessionApiRoute(fn,cookieOptions) // 쿠키를 가져와 암호화를 푼다음 요청 안에 쿠키 내용을 넣어준다.
}

export function withSsrSession(handler: any) {
    return withIronSessionSsr(handler, cookieOptions); // withApiSession과 기능은 동일한데 SSR 전용 헬퍼 함수이다.
    // getServerSideProps에서 인증 기능을 사용 할 수 있다.
}


// Iron session
// 데이터를 저장하기 위해 서명되고 암호화된 쿠키를 사용하는 Node.js stateless session 유틸리티.
// Next.js, Express, Nest.js, Fastify 및 모든 Node.js HTTP 프레임워크와 함께 작동합니다.
// 세션 데이터는 암호화된 쿠키("seals")에 저장됩니다. 그리고 당신의 서버만이 세션 데이터를 디코딩(decode)할 수 있습니다.
// 세션 ID가 없으므로 서버 관점에서 iron session을 "stateless"로 만듭니다.

// JWT는 암호화되지 않고 서명이 되어있음
// 유저가 안에 있는 정보를 볼 수 없음
// 세션을 위한 백엔드 구축이 필요 없음