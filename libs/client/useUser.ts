import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
    ok: boolean;
    profile: User;
}

export default function useUser(pathname?: string) {
    const router = useRouter();

    const { data, error } = useSWR<ProfileResponse>(
        pathname === '/enter' ? null : "/api/users/me"
    );
    useEffect(() => {
      if (data && !data.ok) {
        console.log('로그인 안돼서 로그인 창으로 연결')
        router.replace("/enter");
      }
      if (data && data.ok && router.pathname === "/enter") {
        router.replace("/profile");
      }
    }, [data, router]);
    return { user: data?.profile, isLoading: !data && !error };
}