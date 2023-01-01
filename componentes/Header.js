import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faTimes,
  faAd,
  faXmark,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const [buscar, setBuscar] = useState("");
  const [search, setSearch] = useState(true);

  if (buscar === "") {
    setBuscar("porn");
  }

  const buscador = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  console.log(props.active)

  return (
    <header className={`header ${search ? "search" : "nosearch"} shadow-md`}>
      <div className="flex flex-wrap items-center justify-start">
        <button className="font-bold text-xl p-3 rounded-full
        w-10 h-14 flex justify-center items-center mr-3 transition-all cursor-pointer duration-300 text-slate-900
        hover:text-slate-700" 
        onClick={props.click}>
          {
            props.active? (
              <FontAwesomeIcon icon={faChevronLeft} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )
          }
        </button>
        <Link href={process.env.NEXT_PUBLIC_URL_WEB}>
          <a className="font-black text-xl text-black">PORNAZOS</a>
        </Link>
      </div>

      <div className={`barra-busqueda ${search ? "search" : "nosearch"}`}>
        <input
          onChange={(e) => setBuscar(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/?k=${buscar}`}>
          <a>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
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
  );
};

export default Header;
