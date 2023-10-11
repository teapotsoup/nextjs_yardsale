import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import {useRouter} from "next/router";
import useUser from "@libs/client/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  // const { pathname } = useRouter();
  //
  // useUser(pathname);

  return (
    <div className="w-full max-w-2xl mx-auto">
    <SWRConfig
      value={{
         fetcher: (url: string) => fetch(url).then((response) => response.json()), }}
    >

        <Component {...pageProps} />
    </SWRConfig>
    </div>
  );
}

export default MyApp;
