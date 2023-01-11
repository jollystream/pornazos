import Head from 'next/head'
import Cards from '../../componentes/Cards';
import Header from '../../componentes/Header'
import Navegacion from '../../componentes/Navegacion';
import { useState, useEffect } from 'react';
import NavMovil from '../../componentes/NavMovil';
import Footer from '../../componentes/Footer';
import obtenerListadoVideos from '../../datos/listadoVideosSearch';
import { BreadcrumbJsonLd, WebPageJsonLd } from 'next-seo';

export default function Home(props) {

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
        <title>Free Porn Videos {props?.busqueda} ❌❌❌ {props?.listadoVideos?.resultados} Results {props?.pagina ? `⭐ Page: ${props?.pagina}`:''}</title>
        <meta name="description" content="Free HD porn ❌ BEWARE! ❌ If You Enter, YOU DON'T GET OUT! ❌ On our xxx website we have the best free porn ⭐ in high definition. XXX videos with the best quality." />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, notranslate' />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href='https://pornazos.com'  />
        <meta property="og:locale" content="en_US"  />
        <meta property="og:title" content='Free HD Porn ❤️, Free Porn Videos in High Definition'  />
        <meta property="og:description" content="Free HD porn ❌ BEWARE! ❌ If You Enter, YOU DON'T GET OUT! ❌ On our xxx website we have the best free porn ⭐ in high definition. XXX videos with the best quality."  />
        <meta property="og:url" content='https://pornazos.com'  />
        <meta property="og:site_name" content="PORNAZOS.COM"  />
        <meta property="og:image" content='https://cdn77-pic.xvideos-cdn.com/videos/thumbs169lll/f9/5d/65/f95d65147ce9c3b3154866baeee13aab/f95d65147ce9c3b3154866baeee13aab.16.jpg'  />
        <meta property="og:image:width" content="600"  />
        <meta property="og:image:height" content="337"  />
        <meta property="og:image:type" content="image/jpg"  />
        <meta name="author" content="PORNAZOS"  />
        <meta name="twitter:card" content="summary_large_image"  />
      </Head>
      
      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} active={active} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h1 className="font-semibold text-lg sm:text-2xl pb-5"
          >Free Porn Videos {props?.busqueda} ❌❌❌ {props?.listadoVideos?.resultados} Results ⭐ Page: {props?.pagina} .</h1>
          <div className="grid-videos">
            {
              props?.listadoVideos?.obtenerListadoVideos
                .filter(video => video.id)  // Filtra los videos que tienen un id
                .map(res => {
                  return <Cards key={res?.id} vistas={res.vistas} titulo={res?.titulo} imagen={res?.imagen} url={`${res?.urlVideo}`}
                    duracion={res?.duracion} calidad={res?.calidad} autor={res?.autor} />
                })
            }
          </div>

          <div className="paginado">
            <ul>
            {
              props?.listadoVideos?.paginado.map(res => {
                return (
                  <li key={res.pagina}>
                    {
                      // Si la urlPagina es "#" o está vacía, muestra un span
                      res.urlPagina === "#" || !res.urlPagina.length ?
                      <span>{res.pagina}</span> :
                      // En otro caso, muestra una etiqueta a
                      <a href={
                        // Si la urlPagina es "/search", asigna "#" al atributo href
                        res.urlPagina === "/search" ? "#" : res.urlPagina
                      }>{res.pagina}</a>
                    }
                  </li>
                )
              })
            }
            </ul>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const urlOrigen = await context.query.id //context.resolvedUrl;
  const busqueda = await context.query.k
  const pag = await context.query.p

  var listadoVideos = await obtenerListadoVideos(urlOrigen, busqueda, pag);

  return {
    props: {
      listadoVideos: listadoVideos,
      busqueda: busqueda,
      pagina: pag,
    }
  };
}