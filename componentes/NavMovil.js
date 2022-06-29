import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CategoriasMenu from "./CategoriasMenu";

const NavMovil = (props) => {

	return (
		<nav className={`${props.active} movil menu-lateral2`}>
			<div className="contenedor-nav">

				<div className="contenedor-logo movil">
					<button id="boton-menu2" className="boton-menu" onClick={props.click}><FontAwesomeIcon icon={faBars} /></button>
					<span className="logo" id="logo-movil">PORNAZOS.COM</span>
				</div>
				<div className="caja-mavegacion-scroll">
					<CategoriasMenu/>
				</div>
			</div>
		</nav>
	)
}

export default NavMovil