import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Paginado = (props) => {

    const router = useRouter();
    const numUrl = parseInt(props.urls);
    const largo = parseInt(props.largo / 36)

    useEffect(() => {
        const atras = () => {
            if (numUrl <= 0) {
                router.push('/');
            }
            if (numUrl > largo) {
                router.push(`/pag/${largo}`);
            }
        }
        atras();
    }, [props.urls]);

    return (
        <div className="contenedor-paginado">

            {numUrl < 1 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${parseInt(props.urls) - 1}`}><a className="btn-paginado btn-paginado-atras movil-none"><FontAwesomeIcon icon={faChevronLeft}/></a></Link>}

            {numUrl < 12 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl - 12}`}><a className="btn-paginado movil-none">{numUrl - 12}</a></Link>}
            {numUrl < 2 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl - 2}`}><a className="btn-paginado">{numUrl - 2}</a></Link>}
            {numUrl < 1 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl - 1}`}><a className="btn-paginado">{numUrl - 1}</a></Link>}
            <a className="btn-paginado btn-paginado-activo">{numUrl}</a>
            {numUrl > largo - 1 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl + 1}`}><a className="btn-paginado">{numUrl + 1}</a></Link>}
            {numUrl > largo - 2 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl + 2}`}><a className="btn-paginado">{numUrl + 2}</a></Link>}
            {numUrl > largo - 12 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl + 12}`}><a className="btn-paginado movil-none">{numUrl + 12}</a></Link>}

            {numUrl > largo - 1 ? '' : <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/pag/${numUrl + 1}`}><a className="btn-paginado btn-paginado-siguiente movil-none"><FontAwesomeIcon icon={faChevronRight}/></a></Link>}
        </div>
    )
}
export default Paginado