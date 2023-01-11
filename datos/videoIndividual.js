import axios from "axios";
import * as cheerio from "cheerio";

export default async function controller(props) {

  //llamo la url de la que voy a sacar el array de objetos
  let { data } = await axios.get(`https://www.xvideos.com${props}`);
  let $ = cheerio.load(data);

  //obtengo el contenedor padre del listado de cards
  let contenedor = $("#page.video-page .video-tags-list.cropped ul");
  let titulo = $("head > title").text().replace(' - XVIDEOS.COM','');
  let duracion = $('.page-title .duration').text();
  let calidad = $(".page-title .video-hd-mark").text();
  let autor = $(".main-uploader .name").text();
  let actriz1 = $("li:nth-child(2) > a.is-pornstar > span.name").text();
  let actriz2 = $("li:nth-child(3) > a.is-pornstar > span.name").text();
  let iframeOrigen = $("#copy-video-embed").attr('value');
  let iframe = `${iframeOrigen.slice(0,7)} sandbox="allow-same-origin allow-scripts" ${iframeOrigen.slice(8,999)}`
  let vistas = $("#v-views > strong.mobile-hide").text();
  let foto = $("head > meta:nth-child(14)").attr('content').replace('thumbs169ll/', 'thumbs169lll/');
  let duracionSegundos = $("head > meta:nth-child(13)").attr('content');
  var jsonLD = $("script[type='application/ld+json']").text();
  var jsonLD = JSON.parse(jsonLD);
  let uploadDate = jsonLD?.uploadDate;
  let durationJson = jsonLD?.duration;
  let contentUrl = jsonLD?.contentUrl;

  let obtenerListadoTags = [];
  $(contenedor)
    // del contenedor del listado de tags selecciono la tags para sacale los elementos internos
    .find("ul li")
    .each(function () {
      let tag = $(this).find(".is-keyword").text();
      let tagUrl = $(this).find(".is-keyword").attr('href');
      
      //agrego un objeto con los datos de las tags
      obtenerListadoTags.push({
        tag, tagUrl
      });
    });
  
  const listadoTags = obtenerListadoTags.filter(item => item.tag !== '');

  return {titulo, duracion, calidad, autor, actriz1, actriz2, durationJson,
    listadoTags, iframe, vistas, foto, duracionSegundos, jsonLD, uploadDate, contentUrl};
}