import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes, faAd } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {

    const [buscar, setBuscar] = useState('');
    const [search, setSearch] = useState(true);

    if (buscar == '') {
        setBuscar('porn');
    }

    const buscador = () => {
        if (search) {
            setSearch(false);
        } else {
            setSearch(true);
        }
    }

    return (
        <header className={`header ${search ? 'search' : 'nosearch'}`}>
            <div className="contenedor-logo">
                <button id="boton-menu" className="boton-menu" onClick={props.click}><FontAwesomeIcon icon={faBars} /></button>
                <Link href={process.env.NEXT_PUBLIC_URL_WEB}><a className="logo">PORNAZOS.COM</a></Link>
            </div>

            <div className={`barra-busqueda ${search ? 'search' : 'nosearch'}`}>
                <input onChange={(e) => setBuscar(e.target.value)} type='text' placeholder="Search" />
                <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/${buscar}`}>
                    <a>
                        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </a>
                </Link>
            </div>

            <div className="botones-header">
                <div className={`search ${search}`}>
                    <FontAwesomeIcon onClick={buscador} icon={faSearch} />
                </div>
                <div className={`times ${search}`}>
                    <FontAwesomeIcon onClick={buscador} icon={faTimes} />
                </div>
            </div>
        </header>
    )
}

export default Header