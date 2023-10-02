import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
    ok: boolean;
    profile: User;
}

export default function useUser() {
    const { data, error } = useSWR<ProfileResponse>(
        typeof window === "undefined" ? null : "/api/users/me"
    );
    const router = useRouter();
    useEffect(() => {
      if (data && !data.ok) {
        console.log('로그인 안돼서 로그인 창으로 연결')
        router.replace("/enter");
      }
      console.log(router.pathname);
      if (data && data.ok && router.pathname === "/enter") {
        router.replace("/profile");
      }
    }, [data, router]);
    return { user: data?.profile, isLoading: !data && !error };
}



// SWR
// SWR은 먼저 캐시로부터 데이터를 반환한 후,
// fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략입니다.
// SWR을 사용하면 컴포넌트는 지속적이며 자동으로 데이터 업데이트 스트림을 받게 됩니다. 그리고 UI는 항상 빠르고 반응적입니다.
// SWR은 React 프레임워크인 Next.js를 만든 동일한 팀이 만들었습니다.


// - React Query가 더 많은 기능을 제공하지만 그만큼 더 많은 용량을 차지(3배)
// - 간단한 용도로 사용하기에는 유용하게 사용가능