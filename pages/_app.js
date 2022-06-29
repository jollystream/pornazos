import '../styles/globals.css';
import '../styles/paginado.css';
import '../styles/cards.css';
import '../styles/estilos-yt.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// This default export is required in a new `pages/_app.js` file.
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return (
      <Component {...pageProps} />
  );
}

export default MyApp