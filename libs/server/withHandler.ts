import { NextApiRequest, NextApiResponse } from "next";

type method = "GET"|"POST"|"DELETE"

type ConfigType={
  methods:method[],
  isPrivate?:boolean,
  handler: (req: NextApiRequest, res: NextApiResponse) => void
}

export type ResponseType={
  ok:boolean;
  [key:string]:any
}


export default function withHandler(
  {methods, isPrivate=true, handler}: ConfigType
) {
  // nextJs가 실행해야 할 함수를 리턴하는 withHandler 함수
  return async function (req: NextApiRequest, res: NextApiResponse):Promise<any>  {

    if(req.method && !methods.includes(req.method as method)){
      return res.status(405).end()
    }
    if(isPrivate && !req.session.user){
      return res.status(401).json({ok:false, error: "plz log in"})
    }
    try{
      await handler(req,res)
    }catch(error){
      console.log(error);
      return res.status(500).json({error})
    }
  };
}

// 자주 쓰는 HTTP 상태 코드
//
// 200 OK: 요청이 성공적으로 되었습니다. (성공)
//
// 400 Bad Request: 이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미합니다. (클라이언트에서 Request할 때 발생한 문제)
//
// 403 Forbidden: 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다. 401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.
//
// 405 Method Not Allowed: 요청한 메서드는 서버에서 알고 있지만, 제거되었고 사용할 수 없습니다. (허용되지 않은 메서드 사용)
//
// 500 Internal Server Error: 서버가 처리 방법을 모르는 상황이 발생했습니다. 서버는 아직 처리 방법을 알 수 없습니다.
