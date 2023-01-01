import Head from 'next/head'
import Cards from '../../componentes/Cards';
import Header from '../../componentes/Header'
import Navegacion from '../../componentes/Navegacion';
import { useEffect, useState } from 'react';
import NavMovil from '../../componentes/NavMovil';
import Footer from '../../componentes/Footer';
import obtenerListadoVideos from '../../datos/listadoVideosSearch';
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
        <title>Free Porn Videos {props?.busqueda} ❌❌❌ {props?.listadoVideos?.resultados} Results  {props?.pagina ? `⭐ Page: ${props?.pagina}`:''}</title>
        <meta name="description" content="" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
      </Head>
      
      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} active={active} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h1 className="font-semibold text-lg sm:text-2xl pb-5"
          >Free Porn Videos {props?.busqueda} ❌❌❌ {props?.listadoVideos?.resultados} Results ⭐ Page: {props?.pagina}</h1>
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

          <div>
            <ul className='flex justify-center items-center flex-wrap pt-12'>
            {
              props?.listadoVideos?.paginado.map((res, index) => {
                let urlPagina = res.urlPagina;
                if ((!urlPagina || urlPagina === '' || urlPagina === '/search') && index > 0) {
                  urlPagina = props.listadoVideos.paginado[index - 1].urlPagina;

                  var numero =0;
                  // Utilizamos una expresión regular para buscar el número después de p=
                  if (urlPagina.match(/p=(\d+)/) !== null) {
                    var numero = urlPagina.match(/p=(\d+)/)[1];
                  }
                  // Convertimos el número a un entero y lo incrementamos en 1
                  const numeroIncrementado = parseInt(numero) + 1;
                  console.log(numeroIncrementado)
                  // Reemplazamos el número en la URL por su valor incrementado en 1
                  urlPagina = urlPagina.replace(`&p=${numero}`, `&p=${numeroIncrementado}`);
                }
                return (
                  <li key={res.pagina}>
                    <a className={`py-2 px-3 inline-block m-1 bg-transparent  rounded-xl text-lg 
                      font-semibold border  ${urlPagina === '/search#' || !urlPagina || res.pagina == props.pagina || urlPagina === '/search' ? 'border-transparent text-slate-900 bg-transparent hover:border-transparent hover:bg-transparent hover:text-slate-900' : 
                      'border-slate-500 text-slate-900 hover:text-red-600 hover:border-red-600 hover:bg-transparent'}`}
                     href={urlPagina}>{res.pagina}</a>
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
  const buscar = await context.query.k
  var pag = parseInt(context.query.p) +1;
  pag = pag?pag:1;

  var listadoVideos = await obtenerListadoVideos(buscar, pag);

  return {
    props: {
      listadoVideos: listadoVideos,
      busqueda: buscar,
      pagina: pag,
    }
  };
}