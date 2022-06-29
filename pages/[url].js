import Link from 'next/link';
import Head from 'next/head';
import fetch from 'isomorphic-fetch'
import parse from "html-react-parser"
import { useState } from 'react';
import Header from '../componentes/Header';
import Navegacion from '../componentes/Navegacion';
import NavMovil from '../componentes/NavMovil';
import Cards from '../componentes/Cards';
import Footer from '../componentes/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {

    const [active, setActive] = useState(false);

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
                <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA"/>
                <title>{`${props.pos ? props.pos.titulo : ''}`}</title>
                <meta name="description" content={`${props.pos ? props.pos.descripcion : ''}`} />
                <meta name="keywords" content={`${props.pos ? props.pos.tags : ''}`} />
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

                <main className={`main ${active ? active : ''} contenedor-video-nopadding`}>
                    <div className='contenedor-video-play'>
                    
                    {props.pos ? '' :<div className='iframe-contenedor-centrar novideo'>
                            <div className='iframe-contenedor novideo'>
                                <div className='embed-container centrado'><h4>The video does not exist</h4> </div>
                            </div>
                        </div> }

                        <div className={`iframe-contenedor-centrar ${props.pos ? '' : 'none'}`}>
                            <div className='iframe-contenedor'>
                                <div className='embed-container'>{props.pos ? parse(props.pos.iframe) : ''}</div>
                            </div>
                        </div>

                        <div className={`titulo-contenedor-dentro-video ${props.pos ? '' : 'no-autor'}`}>
                            <div className='autor-duracion-calidad-bajo-video'>
                                <div className={`autor ${props.pos ? '' : 'no-autor'}`}>
                                    <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/${props.pos ? (props.pos.autor ? props.pos.autor.toLowerCase() : 'porn') : 'porn'}`}>
                                        <a>{props.pos ? (props.pos.autor ? props.pos.autor.toLowerCase() : 'PORNAZOS.COM') : 'PORNAZOS.COM'}</a></Link>
                                </div>
                                <div className='duracion-calidad-contenedor'>
                                    <div className='duracion'>
                                        <span>{props.pos ? props.pos.duracion : ''}</span>
                                    </div>
                                    <div className='calidad'>
                                        <span>{props.pos ?props.pos.calidad : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='titulo-contenedor-dentro-video'>
                            <h1 className='titulo-video-dentro'>{props.pos ? props.pos.titulo : <p className='video-no-existe-titulo'>
                                Hoops it seems that the video does not exist, look for another among the related videos.
                                </p>}</h1>
                        </div>


                        <div className='titulo-contenedor-dentro-video'>
                            <p className='descripcion-video-dentro'>{props.pos ? props.pos.descripcion : ''}</p>
                        </div>
                        <div className={`categorias-bajo-video ${props.pos ? '' : 'no-tags'}`}>
                            <ul>
                                <li className={`categoria tags`}>
                                    <a>Tags: </a>
                                </li>
                                {props.pos ? props.categorias.map((res, i) => {
                                    return (
                                        <li className='categoria' key={i}>
                                            <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/${res.toLowerCase()}`}>
                                                <a><span>{res}</span></a>
                                            </Link>
                                        </li>
                                    )
                                }) : ''}
                            </ul>
                        </div>

                    </div>
                    <h3 className="titulo">Recommended Videos of <span>{props.abuscar}.</span></h3>
                    <div className="grid-videos">
                        {
                            props.postrel.map(res => {
                                return <Cards key={res.url} titulo={res.titulo} imagen={res.imagen} avance={res.avance} url={res.url}
                                    duracion={res.duracion} calidad={res.calidad} autor={res.autor} />
                            })
                        }
                    </div>

                    <Footer/>
                </main>

            </div>



        </div>
    )
}
Post.getInitialProps = async (ctx) => {
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api`);
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL_WEB}/api/api2`);
    
    const data1 =  await res1.json();
    const data2 =  await res2.json();

    const data = [...data1.posts, ...data2.posts]

    const datapost = data.filter(i => i.url === ctx.query.url);
    const pos = datapost[0]

    var categorias =  ['porn', 'porn']
    if (pos){
        categorias = pos.tags.split(',');
    }else{
        categorias = ['porn', 'porn']
    }

    var resultado1 = [];
    var resultado2 = [];
    var resultado3 = [];

    const abuscar = categorias[0].toLowerCase()

    for (let busqueda of data) {
        let titulo = busqueda.titulo.toLowerCase();
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
        let titulo = busqueda.tags ? busqueda.tags.toLowerCase() : '';
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
        let titulo = busqueda.descripcion.toLowerCase();
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

    var resultados = [...resultado1, ...resultado2, ...resultado3]

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

    const postpush = newArray.slice(0, 24);
console.log(abuscar)

    return { pos: pos, categorias: categorias, postrel: postpush, abuscar: abuscar }
}

export default Post;