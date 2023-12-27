import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import nProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>TextQuest</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
