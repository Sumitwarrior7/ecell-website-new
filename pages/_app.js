import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/auth";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player"),
  { ssr: false } // This will load the component only on client side
);
const Controls = dynamic(
  () => import("@lottiefiles/react-lottie-player"),
  { ssr: false } // This will load the component only on client side
);

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url, { shallow }) => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", (url, { shallow }) => {
      setLoading(false);
    });
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta name="robots" content="index, follow" />
        </Head>
        {loading ? (
          <Player
            autoplay
            loop
            src="https://assets8.lottiefiles.com/packages/lf20_b0firirj.json"
            style={{ height: "300px", width: "300px" }}
          >
            <Controls visible={false} />
          </Player>
        ) : (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-Y2J09VFNXJ`}
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-Y2J09VFNXJ');
                `}
            </Script>
            <Component {...pageProps} />
            <Analytics />
            <div>
              <Toaster position={"bottom-right"} />
            </div>
          </>
        )}
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
