import Link from "next/link";
const Cards = (props) => {

    return (
        <div className="contenedor-cards video">
            <div className="contenedor-img-avance">
                <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/${props.url}`}>
                    <a className="a-contenedora-img-avance">
                        <div className="contenedora-img-avance-hover">
                            <div className="contenedor-img">
                                <img className="img-portada" src={props.imagen} alt={props.titulo} title={props.titulo} width={300} height={170} />
                            </div>
                        </div>
                    </a>
                </Link>
                <div className="contenedor-titulo-card">
                    <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/${props.url}`}>
                        <a className="a-contenedora-titulo">
                            <h3 className="titulo-card">{props.titulo}</h3>
                        </a>
                    </Link>
                </div>
                <div className="contenedor-metadata-card">
                    <div className="contenedor-metadata">
                        <span className="metadata-duracion">{props.duracion}</span>
                        <span className="metadata-separador"> - </span>
                        <span className="metadata-calidad">{props.calidad}</span>
                    </div>
                    <div className="contenedor-metadata">
                        <span className="metadata-autor">
                            <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/${props.autor ? props.autor.toLowerCase() : 'porn'}`}>
                                <a>{props.autor ? props.autor : 'PORNAZOS.COM'}</a>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards