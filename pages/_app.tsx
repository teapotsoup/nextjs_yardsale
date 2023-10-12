import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import {useRouter} from "next/router";
import useUser from "@libs/client/useUser";

import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  // const { pathname } = useRouter();
  //
  // useUser(pathname);
    console.log("APP IS RUNNING");

  return (
    <div className="w-full max-w-2xl mx-auto">
    <SWRConfig
      value={{
         fetcher: (url: string) => fetch(url).then((response) => response.json()), }}
    >

        <Component {...pageProps} />
    </SWRConfig>
        {/*<Script*/}
        {/*    src="https://developers.kakao.com/sdk/js/kakao.js"*/}
        {/*    strategy="lazyOnload"*/}
        {/*/>*/}
        {/*<Script*/}
        {/*    src="https://connect.facebook.net/en_US/sdk.js"*/}
        {/*    onLoad={() => {*/}
        {/*        window.fbAsyncInit  = function () {*/}
        {/*            FB.init({*/}
        {/*                appId: "your-app-id",*/}
        {/*                autoLogAppEvents: true,*/}
        {/*                xfbml: true,*/}
        {/*                version: "v13.0",*/}
        {/*            });*/}
        {/*        };*/}
        {/*    }}*/}
        {/*/>*/}
    </div>
  );
}

export default MyApp;
