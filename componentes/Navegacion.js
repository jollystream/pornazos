import CategoriasMenu from "./CategoriasMenu";

const Navegacion = (props) => {

    return (
        <nav className={`menu-lateral ${props.click} menu-laeral-pc`}>
            <div className={`div-content-menu ${props.active}`}>
			    <CategoriasMenu/>
            </div>
		</nav>
    )
}

export default Navegacion