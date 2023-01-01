import Head from 'next/head'
import Cards from '../../componentes/Cards';
import Header from '../../componentes/Header'
import Navegacion from '../../componentes/Navegacion';
import { useState, useEffect } from 'react';
import NavMovil from '../../componentes/NavMovil';
import Footer from '../../componentes/Footer';
import obtenerListadoVideos from '../../datos/listadoVideosPaginado';
import Dmca from '../../componentes/textos/dmca';
import Privacidad from '../../componentes/textos/privacy';
import Terminos from '../../componentes/textos/terms';
import D2257 from '../../componentes/textos/2257';
import Cookies from '../../componentes/textos/cookies';
export default function Home(props) {
  console.log(props.urlOrigen)

  const [active, setActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    setActive(mediaQuery.matches);
  }, []);

  const openClose = () => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  return (
    <div className='contenedor-app'>
      <Head>
        <title>Free HD Porn ❤️</title>
        <meta name="robots" content="noindex"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
      </Head>
      
      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} active={active} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>

          <div>
           {props.urlOrigen === '/p/dmca?index=dmca' ? <Dmca/> :''}
           {props.urlOrigen === '/p/privacy?index=privacy' ? <Privacidad/> :''}
           {props.urlOrigen === '/p/terms?index=terms' ? <Terminos/> :''}
           {props.urlOrigen === '/p/2257?index=2257' ? <D2257/> :''}
           {props.urlOrigen === '/p/cookies?index=cookies' ? <Cookies/> :''}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const urlOrigen = context.resolvedUrl;

  return {
    props: {
      urlOrigen: urlOrigen
    }
  };
}