import Link from "next/link";
import Head from "next/head";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import Header from "../../componentes/Header";
import Navegacion from "../../componentes/Navegacion";
import NavMovil from "../../componentes/NavMovil";
import Cards from "../../componentes/Cards";
import Footer from "../../componentes/Footer";
import videoIndividual from '../../pages/datos/videoIndividual'
import obtenerListadoVideos from '../../pages/datos/listadoVideosSearch';

export default function Video(props) {

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
    <div>
      <Head>
        <title>{`${props?.video?.autor} - ${props?.video?.titulo} - ${props?.video?.actriz1} - ${props?.video?.actriz2}`}</title>
        <meta name="description" content={`${props?.video?.actriz1} - ${props?.video?.actriz2} - ${props?.video?.autor} - ${props?.video?.titulo} - ${props?.video?.listadoTags?.[0]?.tag} - ${props?.video?.listadoTags?.[1]?.tag} - ${props?.video?.listadoTags?.[2]?.tag} - ${props?.video?.listadoTags?.[3]?.tag} - ${props?.video?.listadoTags?.[4]?.tag}`} />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </Head>

      <div className={`contenedor ${active ? "active" : ""}`} id="contenedor">
        <Header click={openClose} active={active} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main
          className={`main ${active ? active : ""} contenedor-video-nopadding`}
        >
          <div className="contenedor-video-play">
            {props?.video?.iframe ? (
              ""
            ) : (
              <div className="iframe-contenedor-centrar novideo">
                <div className="iframe-contenedor novideo">
                  <div className="embed-container centrado">
                    <h4>The video does not exist</h4>
                  </div>
                </div>
              </div>
            )}

            <div className={`iframe-contenedor-centrar ${props?.video?.iframe ? "" : "none"}`}>
              <div className="iframe-contenedor">
                <div className="embed-container">
                  {props?.video?.iframe ? parse(props?.video?.iframe) : ""}
                </div>
              </div>
            </div>

            <div className="px-3 md:px-0 mt-5">
              <h1 className="inline text-xl font-semibold">
                {props?.video?.titulo ? (
                  <>
                    {
                      props?.video?.duracion ? (
                        <span className="py-1 px-2 bg-slate-800 text-white mr-1 inline-block rounded-xl text-sm">
                        {props?.video?.duracion ? props?.video?.duracion : ""}</span>
                      ):''
                    }  
                    {
                      props?.video?.calidad ? (
                        <span className="py-1 px-2 bg-red-600 text-white mr-1 inline-block text-sm rounded-xl">
                        {props?.video?.calidad ? props?.video?.calidad : ""}</span>
                      ):''
                    }
                    {' '}{props?.video?.titulo}
                  </>
                ) : (
                  <p className="video-no-existe-titulo">
                    Hoops it seems that the video does not exist, look for
                    another among the related videos.
                  </p>
                )}
              </h1>
            </div>

            <div className="hidden">
              <p className="descripcion-video-dentro">
                {`${props?.video?.actriz1} - ${props?.video?.actriz2} - ${props?.video?.autor} - ${props?.video?.titulo} - ${props?.video?.listadoTags?.[0]?.tag} - ${props?.video?.listadoTags?.[1]?.tag} - ${props?.video?.listadoTags?.[2]?.tag} - ${props?.video?.listadoTags?.[3]?.tag} - ${props?.video?.listadoTags?.[4]?.tag}`}
              </p>
            </div>
            <div className={`categorias-bajo-video ${props?.video?.listadoTags ? "" : "no-tags"}`}>
              <ul className="mt-3">
                <li>
                  <a className="py-1 pr-3 rounded-xl bg-transparent text-black inline-block mr-2 mb-2 text-base font-black">
                  Tags:</a>
                </li>
                <li>
                {
                    props?.video?.autor ? (
                      <Link
                    href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/?k=${
                      props?.video?.autor
                        ? props?.video?.autor
                          ?props?.video?.autor
                          : "porn"
                        : "porn"
                    }`}
                  >
                    <a className="py-1 px-3 rounded-xl bg-red-600 text-white font-semibold inline-block 
                    hover:bg-red-700 transition-all duration-300 mr-2 mb-2">
                      {props?.video?.autor
                        ? props?.video?.autor
                          ? props?.video?.autor
                          : "Free Porn Videos"
                        : "Free Porn Videos"}
                    </a>
                  </Link>
                    ):""
                  }
                </li>
                <li>
                {
                    props?.video?.actriz1 ? (
                      <Link
                    href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/?k=${
                      props?.video?.actriz1
                        ? props?.video?.actriz1
                          ?props?.video?.actriz1
                          : "porn"
                        : "porn"
                    }`}
                  >
                    <a className="py-1 px-3 rounded-xl bg-red-600 text-white font-semibold inline-block 
                    hover:bg-red-700 transition-all duration-300 mr-2 mb-2">
                      {props?.video?.actriz1
                        ? props?.video?.actriz1
                          ? props?.video?.actriz1
                          : "Free Porn Videos"
                        : "Free Porn Videos"}
                    </a>
                  </Link>
                    ):""
                  }
                </li>
                <li>
                {
                    props?.video?.actriz2 ? (
                      <Link
                    href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/?k=${
                      props?.video?.actriz2
                        ? props?.video?.actriz2
                          ?props?.video?.actriz2
                          : "porn"
                        : "porn"
                    }`}
                  >
                    <a className="py-1 px-3 rounded-xl bg-red-600 text-white font-semibold inline-block 
                    hover:bg-red-700 transition-all duration-300  mb-2">
                      {props?.video?.actriz2
                        ? props?.video?.actriz2
                          ? props?.video?.actriz2
                          : "Free Porn Videos"
                        : "Free Porn Videos"}
                    </a>
                  </Link>
                    ):""
                  }
                </li>
                {props?.video?.listadoTags
                  ? props?.video?.listadoTags.map((res, i) => {
                      return (
                        <li key={i}>
                          <Link
                            href={`${
                              process.env.NEXT_PUBLIC_URL_WEB
                            }/search/?k=${res.tag.toLowerCase()}`}
                          >
                            <a className="py-1 px-3 rounded-xl bg-slate-800 text-white inline-block 
                            hover:bg-slate-900 transition-all duration-300 mr-2 mb-2 text-base">
                              <span>{res.tag}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>

          <h3 className="inline-block text-xl font-semibold px-3 md:px-0 mb-5">Related porn videos with {props?.relacionados}</h3>
          <div className="grid-videos">
            {
              props?.listadoVideos?.obtenerListadoVideos
                .filter(video => video.id)  // Filtra los videos que tienen un id
                .map(res => {
                  return <Cards key={res?.id} vistas={res?.vistas} titulo={res?.titulo} imagen={res?.imagen} url={`${res?.urlVideo}`}
                    duracion={res?.duracion} calidad={res?.calidad} autor={res?.autor} />
                })
            }
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {

const urlOrigen = context.resolvedUrl;
const url = await urlOrigen.replace('/video/','/video');
const video = await videoIndividual(url);

const buscar = await context.query.k;
const pag = await context.query.p;
const tag1 = video?.listadoTags?.[0]?.tag;
const tag2 = video?.listadoTags?.[1]?.tag;
const tag3 = video?.autor;
const tag4 = video?.actriz1;
const relacionados = `${tag1}, ${tag2}, ${tag3}, ${tag4}`

var listadoVideos = await obtenerListadoVideos(relacionados, pag);
  
const posInit = ''
  return {
    props: {
      pos:posInit,
      video: video,
      listadoVideos: listadoVideos,
      relacionados: relacionados
    }
  };
}