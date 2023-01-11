import '../styles/globals.css';
import '../styles/paginado.css';
import '../styles/cards.css';
import '../styles/estilos-yt.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import NextNProgress from "nextjs-progressbar";
import Popcash from '../componentes/popcash';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <NextNProgress color="red"/>
    <Popcash/>
    <Component {...pageProps}/>
  </>
  );
}

export default MyApp