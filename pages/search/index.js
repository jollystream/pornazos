import Head from 'next/head'
import Header from '../../componentes/Header';
import Navegacion from '../../componentes/Navegacion';
import NavMovil from '../../componentes/NavMovil';
import { useState } from 'react';
import CategoriasMenu from '../../componentes/CategoriasMenu';
import Footer from '../../componentes/Footer';

export default function Searchs(props) {

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
        <title>We have not found what you are looking for, try looking for something else. PORNAZOS.COM</title>
        <meta name="description" content='We have not found what you are looking for, try looking for something else. PORNAZOS.COM' />
        <meta name="keywords" content='We have not found what you are looking for, try looking for something else. PORNAZOS.COM' />
      </Head>

      <div className={`contenedor ${active ? 'active' : ''}`} id="contenedor">

        <Header click={openClose} />
        <Navegacion click={openClose} active={active} />
        <NavMovil click={openClose} active={active} />

        <main className={`main ${active ? active : ''}`}>

          {
              props.pos === 1 ? <div className='content-no-videos'>
                <div className='no-videos'>The result was not found, look for something shorter or click on a category in the menu below.</div>
                <div className='no-videos-tags'><CategoriasMenu /></div>
              </div> : "" 
          }
          

          <Footer/>
        </main>

      </div>



    </div>
  )
}

Searchs.getInitialProps = async (ctx) => {
  
const pos = 1
  return { pos: pos }
}