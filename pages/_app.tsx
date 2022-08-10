import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  //각주가 문제가 있다.
  return (
    <SWRConfig
      value={{

         fetcher: (url: string) => fetch(url).then((response) => response.json()), }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
