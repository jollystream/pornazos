import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller(buscar, pag) {

  //llamo la url de la que voy a sacar el array de objetos
  let { data } = await axios.get(`https://www.xvideos.com/?k=${buscar}&p=${pag}`);
  let $ = cheerio.load(data);

  //obtengo el contenedor padre del listado de cards
  let contenedor = $("#content > .mozaique");
  
  let obtenerListadoVideos = [];

  var resultados = $('#main > h2 > span').text();
  resultados = resultados ? resultados.replace(/[^\d]/g, '') : null;
  console.log(resultados)

  $(contenedor)
    // del contenedor del listado de cards selecciono la card para sacale los elementos internos
    .find(".thumb-block")
    .each(function () {
      var titulo = $(this).find(".thumb-block > div.thumb-under > p.title a").attr('title');
      var titulo = titulo ? titulo : null

      var urlVideo = $(this).find(".thumb-block .thumb a").attr('href').replace('/video','/video/');
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

      var vistas = $(this).find('.metadata > span > span:nth-child(2) > span:nth-child(2)').text();
      vistas = vistas ? vistas.replace(/-\s/g, '').replace(/Views/g, '') : null;
      console.log(vistas)

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
        vistas
      });
    });
  
    let paginado = [];
    $('#content > div.pagination > ul')
        // del contenedor del listado de cards selecciono la card para sacale los elementos internos
        .find("li")
        .each(function () {
          let pagina = $(this).find("a").text();
          var urlPagina = $(this).find("a").attr('href');
          urlPagina = "/search".concat(urlPagina);
          
    
          //agrego un objeto con los datos de la card
          paginado.push({
            pagina,
            urlPagina
          });
        });

  return {obtenerListadoVideos, paginado, resultados};
}