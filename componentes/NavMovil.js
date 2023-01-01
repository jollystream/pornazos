import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CategoriasMenu from "./CategoriasMenu";

const NavMovil = (props) => {

	return (
		<nav className={`${props.active} movil menu-lateral2 shadow-md`}>
			<div className="contenedor-nav">

				<div className="flex flex-wrap items-center justify-start w-full shadow-md py-2">
					<button className="font-bold text-xl p-3 rounded-full
        w-10 h-10 flex justify-center items-center mr-3 transition-all cursor-pointer duration-300 text-slate-900
        hover:text-slate-700" onClick={props.click}>
					{
            props.active? (
              <FontAwesomeIcon icon={faChevronLeft} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )
          }
					</button>
					<span className="font-black text-xl text-black">PORNAZOS</span>
				</div>
				<div className="caja-mavegacion-scroll">
					<CategoriasMenu/>
				</div>
			</div>
		</nav>
	)
}

export default NavMovil