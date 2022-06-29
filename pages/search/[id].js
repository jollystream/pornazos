import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import PaginadoSearch from '../../componentes/[PaginadoSearch]';
import Cards from '../../componentes/Cards';
import Header from '../../componentes/Header';
import Navegacion from '../../componentes/Navegacion';
import NavMovil from '../../componentes/NavMovil';
import { useState } from 'react';
import CategoriasMenu from '../../componentes/CategoriasMenu';
import Footer from '../../componentes/Footer';
export default function Search(props) {

  const [active, setActive] = useState(false);

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
        <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA"/>
        <title>Porn Videos of {props.abuscar} at PORNAZOS.COM</title>
        <meta name="description" content={`In PORNAZOS.COM you will find the best porn of ${props.abuscar} free and online`} />
        <meta name="keywords" content={`${props.abuscar}, pornazos, porn`} />
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.xvideos.com/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.xvideos.com/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.xvideos.com/favicon-16x16.png"/>
        <script async type="text/javascript" src="https://js.juicyads.com/jp.php?c=34b403w2y2a4u4q2u2f4236424&u=https%3A%2F%2Fpornazos.com"></script>
        <script async type="text/javascript" src="https://js.juicyads.com/jp.php?c=34a4y2x2v2a4u4q2v26423c464&u=http%3A%2F%2Fwww.pornazos.com"></script>
      </Head>

      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h3 className="titulo">Search results for <span>{props.abuscar}.</span></h3>
          <div className="grid-videos">
            {
              props.pos.map(res => {
                return <Cards key={res.url} titulo={res.titulo} imagen={res.imagen} avance={res.avance} url={res.url}
                  duracion={res.duracion} calidad={res.calidad} autor={res.autor} />
              })
            }
          </div>
          {
              props.pos.length === 0 ? <div className='content-no-videos'>
                <div className='no-videos'>The result was not found, look for something shorter or click on a category in the menu below.</div>
                <div className='no-videos-tags'><CategoriasMenu /></div>
              </div> : <PaginadoSearch urls={props.url} largo={props.largo} buscar={props.abuscar} />
          }
          

          <Footer/>
        </main>

      </div>



    </div>
  )
}

Search.getInitialProps = async (ctx) => {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api`);
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api2`);
  
  const data1 =  await res1.json();
  const data2 =  await res2.json();

  const data = [...data1.posts, ...data2.posts]




  const url = ctx.query.id
  const numPag = url.split('&')

  var resultado1 = [];
  var resultado2 = [];
  var resultado3 = [];
  var resultado4 = [];

  const abuscar = numPag[0].toLowerCase()

  for (let busqueda of data) {
    let titulo = busqueda.titulo ? busqueda.titulo.toLowerCase() : '' ;
    if (titulo.indexOf(abuscar) !== -1) {
      resultado1.push({
        titulo: busqueda.titulo,
        url: busqueda.url,
        descripcion: busqueda.descripcion,
        tags: busqueda.tags,
        imagen: busqueda.imagen,
        iframe: busqueda.iframe,
        autor: busqueda.autor,
        avance: busqueda.avance,
        calidad: busqueda.calidad,
        duracion: busqueda.duracion
      });
    };
  };
  for (let busqueda of data) {
    let titulo = busqueda.tags ? busqueda.tags.toLowerCase() : '' ;
    if (titulo.indexOf(abuscar) !== -1) {
      resultado2.push({
        titulo: busqueda.titulo,
        url: busqueda.url,
        descripcion: busqueda.descripcion,
        tags: busqueda.tags,
        imagen: busqueda.imagen,
        iframe: busqueda.iframe,
        autor: busqueda.autor,
        avance: busqueda.avance,
        calidad: busqueda.calidad,
        duracion: busqueda.duracion
      });
    };
  };
  for (let busqueda of data) {
    let titulo = busqueda.descripcion ? busqueda.descripcion.toLowerCase() : '';
    if (titulo.indexOf(abuscar) !== -1) {
      resultado3.push({
        titulo: busqueda.titulo,
        url: busqueda.url,
        descripcion: busqueda.descripcion,
        tags: busqueda.tags,
        imagen: busqueda.imagen,
        iframe: busqueda.iframe,
        autor: busqueda.autor,
        avance: busqueda.avance,
        calidad: busqueda.calidad,
        duracion: busqueda.duracion
      });
    };
  };
  for (let busqueda of data) {
    let titulo = busqueda.autor ? busqueda.autor.toLowerCase() : 'porn'
    if (titulo.indexOf(abuscar) !== -1) {
      resultado4.push({
        titulo: busqueda.titulo,
        url: busqueda.url,
        descripcion: busqueda.descripcion,
        tags: busqueda.tags,
        imagen: busqueda.imagen,
        iframe: busqueda.iframe,
        autor: busqueda.autor,
        avance: busqueda.avance,
        calidad: busqueda.calidad,
        duracion: busqueda.duracion
      });
    };
  };

  var resultados = [...resultado1, ...resultado2, ...resultado3, ...resultado4]

  // eliminar duplicados
  var newArray = [];
  var lookupObject = {};
  function removeDuplicates(originalArray, prop) {
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  removeDuplicates(resultados, "iframe");

  const largo = newArray.length
  var pagActual = parseInt(numPag[1]);
  if (!pagActual) {
    pagActual = 0
  };

  const Actual = newArray.slice(pagActual * 36, pagActual * 36 + 36);
  return { pos: Actual, url: pagActual, largo: largo, abuscar: abuscar }
}