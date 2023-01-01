import Head from 'next/head'
import Cards from '../componentes/Cards';
import Header from '../componentes/Header'
import Navegacion from '../componentes/Navegacion';
import { useState, useEffect } from 'react';
import NavMovil from '../componentes/NavMovil';
import Footer from '../componentes/Footer';
import obtenerListadoVideos from '../datos/listadoVideosInicio';

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
        <title>Free HD Porn ❤️, Free Porn Videos in High Definition</title>
        <meta name="description" content="Free HD porn ❌ BEWARE! ❌ If You Enter, YOU DON'T GET OUT! ❌ On our xxx website we have the best free porn ⭐ in high definition. XXX videos with the best quality." />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
      </Head>
      
      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} active={active} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h1 className="font-semibold text-lg sm:text-2xl pb-5">❤️ Free HD Porn Videos ❌❌❌</h1>
          
          <div className="grid-videos">
            {
              props?.listadoVideos.obtenerListadoVideos.map(res => {
                return <Cards key={res.id} titulo={res.titulo} imagen={res.imagen} vistas={res.vistas} url={`${res.urlVideo}`}
                  duracion={res.duracion} calidad={res.calidad} autor={res.autor} />
              })
            }
          </div>

          <div>
            <ul className='flex justify-center items-center flex-wrap pt-12'>
            {
              props?.listadoVideos.paginado.map(res => {
                return (
                  <li key={res.pagina}>
                    <a className={`py-2 px-3 inline-block m-1 bg-transparent  rounded-xl text-lg 
                    font-semibold border  ${res.urlPagina === '#' || !res.urlPagina ? 'border-transparent text-slate-900 bg-transparent hover:border-transparent hover:bg-transparent hover:text-slate-900' : 
                    'border-slate-500 text-slate-900 hover:text-red-600 hover:border-red-600 hover:bg-transparent'}`}
                    href={res.urlPagina}>{res.pagina}</a>
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

export async function getServerSideProps() {
  var listadoVideos = await obtenerListadoVideos();

  return {
    props: {
      listadoVideos: listadoVideos,
    }
  };
}