import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import Paginado from '../componentes/[Paginado]';
import Cards from '../componentes/Cards';
import Header from '../componentes/Header'
import Navegacion from '../componentes/Navegacion';
import { useEffect, useState } from 'react';
import NavMovil from '../componentes/NavMovil';
import Footer from '../componentes/Footer';
export default function Home(props) {

  console.log(props.datax.results)
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
        <meta name="keywords" content='Pornazos, porn, porno, pornazo, free porn, homemade porn, videos,  pornazos top, video porno, porn video, Pornazos we have the best free porn' />
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.xvideos.com/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.xvideos.com/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.xvideos.com/favicon-16x16.png"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>
          <h3 className="titulo">Recommended Videos</h3>
          <div className="grid-videos">
            {
              props.datax.results.map(res => {
                return <Cards key={res.username} titulo={res.display_name} imagen={res.image_url_360x270} avance={res.image_url_360x270} url={`${res.username}`}
                  duracion={res.username} calidad={res.username} autor={res.username} />
              })
            }
          </div>

          <Paginado urls={0} largo={props.largo} />

          <Footer />
        </main>
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api`);
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api2`);
  const res3 = await fetch(`https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=vbZnQ&client_ip=request_ip&limit=100`);

  const data1 =  await res1.json();
  const data2 =  await res2.json();
  const data3 =  await res3.json();

  const data = [...data1.posts, ...data2.posts]

  // eliminar duplicados
  var newArray = [];
  var newArrayBeta = [];
  var lookupObject = {};
  var posInit = [];
  function removeDuplicates(originalArray, prop) {
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArrayBeta.push(lookupObject[i]);
    }
    //desordeno el array
    
    return newArrayBeta;
  }
  removeDuplicates(data, "iframe");

  //largo del array db
 const largo = newArrayBeta.length


  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  var aleatorio = await getRandomArbitrary(0, largo - 36);
  var aleatorio2 = parseInt(aleatorio);
  posInit = newArrayBeta.slice(aleatorio2, aleatorio2 + 36);

  console.log('Cantidad de Posts:', largo);

  return { pos: posInit, largo: largo, datax: data3 }
}