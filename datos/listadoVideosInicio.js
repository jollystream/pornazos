import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller() {

  //llamo la url de la que voy a sacar el array de objetos
  let { data } = await axios.get("https://www.xvideos.com/");
  let $ = cheerio.load(data);

  //obtengo el contenedor padre del listado de cards
  let contenedor = $("#content > .mozaique.cust-nb-cols");
  
  let obtenerListadoVideos = [];
  $(contenedor)
    // del contenedor del listado de cards selecciono la card para sacale los elementos internos
    .find(".thumb-block")
    .each(async function () {
      var titulo = $(this).find(".thumb-block > div.thumb-under > p.title a").attr('title');
      var titulo = titulo ? titulo : null
      
      var urlVideo = $(this).find(".thumb-block .thumb a").attr('href').replace('/video','/video/');
      urlVideo = urlVideo.replace('/regional/', '/')
      var urlVideo = urlVideo ? urlVideo : null

      var imagen = $(this).find(".thumb-block .thumb img").attr('data-src');
      // Reemplaza ".THUMBNUM." por ".1." en la imagen
      imagen = imagen.replace(".THUMBNUM.", ".1.");
      var imagen = imagen ? imagen : null;

      var id = $(this).find(".thumb-block .thumb img").attr('data-videoid');
      var id = id ? id : null

      var calidad = $(this).find(".video-hd-mark").text();
      var calidad = calidad ? calidad : null

      var autor = $(this).find('.metadata .name').text();
      var autor = autor ? autor : null

      var duracion = $(this).find('.metadata .duration').text();
      var duracion = duracion ? duracion : null

      var vistas = $(this).find('p.metadata > span > span:nth-child(2) > span:nth-child(2)').text();
      vistas = vistas ? vistas.replace(/-\s/g, '').replace(/Views/g, '') : null;

      var urlAutor = $(this).find('.metadata a').attr('href');
      var urlAutor = urlAutor ? urlAutor : null

      //agrego un objeto con los datos de la card
      obtenerListadoVideos.push({
        titulo,
        urlVideo,
        imagen,
        id,
        calidad,
        autor,
        duracion,
        urlAutor,
        vistas,
      });
    });

  let paginado = [];
  $('.pagination ul')
    // del contenedor del listado de cards selecciono la card para sacale los elementos internos
    .find("li")
    .each(function () {
      let urlPagina = $(this).find("a").attr('href');
      let pagina = $(this).find("a").text();

      //agrego un objeto con los datos de la card
      paginado.push({
        pagina,
        urlPagina
      });
    });


  return {obtenerListadoVideos, paginado};
}