import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import Paginado from '../../componentes/[Paginado]';
import Cards from '../../componentes/Cards';
import { useState } from 'react';
import Header from '../../componentes/Header';
import Navegacion from '../../componentes/Navegacion';
import NavMovil from '../../componentes/NavMovil';
import Footer from '../../componentes/Footer';

export default function Pag(props) {

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
        <title>Free Porn Videos. PORNAZOS.COM</title>
        <meta name="description" content="Are you looking for free HD porn? ❌❌❌ On our website xxx Pornazos we have the best free porn ⭐ in high definition. Xxx videos with the best quality, we are the best!" />
        <meta name="keywords" content='Pornazos, porn, porno, pornazo, free porn, homemade porn, videos,  pornazos top, video porno, porn video, Pornazos we have the best free porn'/>
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.xvideos.com/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.xvideos.com/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.xvideos.com/favicon-16x16.png"/>
        <script async type="text/javascript" src="https://js.juicyads.com/jp.php?c=34b403w2y2a4u4q2u2f4236424&u=https%3A%2F%2Fpornazos.com"></script>
        <script async type="text/javascript" src="https://js.juicyads.com/jp.php?c=34a4y2x2v2a4u4q2v26423c464&u=http%3A%2F%2Fwww.pornazos.com"></script>
      </Head>


      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} />
        <Navegacion click={openClose} active={active}/>
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h3 className="titulo">Latest Uploaded Videos Pag {props.urlx}</h3>
          <div className="grid-videos">
            {
              props.pos.map(res => {
                return <Cards key={res.url} titulo={res.titulo} imagen={res.imagen} avance={res.avance} url={res.url}
                  duracion={res.duracion} calidad={res.calidad} autor={res.autor} />
              })
            }
          </div>
          <Paginado urls={props.urlx} largo={props.largo} />

          <Footer/>
        </main>



      </div>
    </div>
  )
}

Pag.getInitialProps = async (ctx) => {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api`);
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api2`);
  
  const data1 =  await res1.json();
  const data2 =  await res2.json();

  const data = [...data1.posts, ...data2.posts]



  const urlx = await ctx.query.id

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
  removeDuplicates(data, "iframe");

  const postpush = newArray.slice(urlx * 36, urlx * 36 + 36);
  const largoActual = postpush.length
  const largo = newArray.length
  return { pos: postpush, urlx: urlx, largo: largo, largoActual: largoActual }
}