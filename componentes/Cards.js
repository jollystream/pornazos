import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Cards = (props) => {
  return (
    <div key={props?.id}>
      <div className="flex flex-col flex-wrap relative">
        <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}${props?.url}`}>
          <a className="w-full h-auto">
            <div className="relative56">
              <div className="absolute top-0 left-0 w-full h-full">
                <img
                  className="w-full h-auto"
                  src={props?.imagen}
                  alt={props?.titulo}
                  width={300}
                  height={170}
                />
              </div>
            </div>
          </a>
        </Link>
        {props?.calidad ? (
          <span className="ml-2 px-2 py-1 text-xs rounded-md bg-red-600 text-white absolute top-2 right-2">
            {props?.calidad}
          </span>
        ) : (
          ""
        )}
      </div>
      <div>
        <Link href={`${process.env.NEXT_PUBLIC_URL_WEB}${props?.url}`}>
          <a className="text-base w-full block text-slate-900 transition-all duration-200 hover:text-red-600 line-clamp-2">
            <span>{props?.titulo}</span>
          </a>
        </Link>
      </div>
      <div className="flex justify-between pt-3">
        <div>
          <span>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL_WEB}/search/?k=${
                props?.autor ? props?.autor : "porn"
              }`}
            >
              <a className="text-base font-semibold text-slate-900 transition-all duration-200 hover:text-red-600 line-clamp-1">
                {props?.autor ? props?.autor : "Free Porn Videos"}
              </a>
            </Link>
          </span>
        </div>

        <div className="text-xs font-semibold text-slate-700 flex items-center">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faEye} className='mr-1'/> {props?.vistas}
          </span>
          <span className="ml-2 px-2 py-1 rounded-md bg-slate-900 text-white flex items-center justify-center line-clamp-1">
            {props?.duracion}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;