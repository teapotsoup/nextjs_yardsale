import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";


function CustomUser() {
  const { user } = useUser();
  return null;
}



function MyApp({ Component, pageProps }: AppProps) {
  //각주가 문제가 있다.
  return (
    <div className="w-full max-w-2xl mx-auto">
    <SWRConfig
      value={{
         fetcher: (url: string) => fetch(url).then((response) => response.json()), }}
    >

      <CustomUser />
        <Component {...pageProps} />
    </SWRConfig>
    </div>
  );
}

export default MyApp;
