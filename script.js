/* =========================================================
   ÁLBUM DE CUMPLEAÑOS · edición Borahae 💜 — script.js
   JavaScript puro (sin librerías)

   Índice
   0.  Configuración            ← lo principal que debes cambiar
   1.  Cartas del minijuego     ← textos y datos del juego
   2.  Utilidades
   3.  Fotos de ejemplo (mientras no pongas las tuyas)
   4.  Contador de tiempo juntos
   5.  Animaciones al hacer scroll
   6.  Línea de tiempo interactiva
   7.  Menú flotante (dock)
   8.  Música + tocadiscos Borahae
   9.  Pantalla de bienvenida
   10. Galería + lightbox (foto en pantalla completa)
   11. Minijuego: Memoria Borahae
   12. Sobre y carta
   13. Corazones de fondo
   14. Confeti y estallidos de corazones
   ========================================================= */


/* ---------------------------------------------------------
   0. ✏️ CONFIGURACIÓN
   --------------------------------------------------------- */
const CONFIG = {
  // Fecha y hora en que empezaron a ser novios.
  // Formato: 'AAAA-MM-DDTHH:MM:SS'
  // Ejemplo: 14 de febrero de 2022 a las 8:30 p.m. → '2022-02-14T20:30:00'
  fechaInicio: '2022-02-14T20:30:00',

  // Nombre que muestra el tocadiscos cuando suena music/cancion.mp3
  nombreCancionFondo: 'Nuestra canción 💜',

  corazonesDeFondo: true, // corazones flotando detrás del contenido
  confeti: true,          // confeti al abrir la sorpresa, la carta y al ganar el juego
  volumenMusica: 0.6,     // de 0 (silencio) a 1 (máximo)
};


/* ---------------------------------------------------------
   1. ✏️ CARTAS DEL MINIJUEGO "MEMORIA BORAHAE"
   Cada objeto es UNA pareja de cartas (el juego la duplica).
   - icono:  el emoji que se ve en la carta
   - titulo: el título del dato que aparece al encontrar la pareja
   - dato:   el texto del dato
   - tipo:   'bts' (dato BTS 💜) o 'nosotros' (recuerdo de ustedes ♥)
   - foto:   (opcional) una foto en vez del emoji, ej. foto: 'images/memoria1.jpg'
   Recomendado: 8 parejas (tablero de 4 × 4). También funciona con 6 o 10.
   --------------------------------------------------------- */
const CARTAS_JUEGO = [
  {
    icono: '💜',
    titulo: 'Borahae (보라해)',
    dato: 'Es «I purple you» en coreano. V lo inventó en 2016: como el morado es el último color del arcoíris, significa «te voy a amar y a confiar en ti por mucho, mucho tiempo». Así te quiero yo.',
    tipo: 'bts',
  },
  {
    icono: '⭐',
    titulo: 'Siete estrellas',
    dato: 'BTS son siete: RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook. Siete estrellas… y tú, la que más brilla en mi cielo.',
    tipo: 'bts',
  },
  {
    icono: '🎤',
    titulo: 'Así empezó todo',
    dato: 'BTS debutó el 13 de junio de 2013 con «No More Dream». Por eso cada junio ARMY celebra la FESTA, su aniversario.',
    tipo: 'bts',
  },
  {
    icono: '🛡️',
    titulo: '¿Qué significa BTS?',
    dato: 'Viene de Bangtan Sonyeondan (방탄소년단): «chicos a prueba de balas». Desde 2017 también significa «Beyond The Scene», ir más allá de lo que se ve.',
    tipo: 'bts',
  },
  {
    icono: '🎈',
    titulo: 'ARMY',
    dato: 'Así se llama su fandom: «Adorable Representative M.C. for Youth». Y yo tengo la suerte de amar a la ARMY más bonita del mundo.',
    tipo: 'bts',
  },
  {
    icono: '🌷',
    titulo: 'Love Myself',
    dato: 'En 2017 BTS lanzó con UNICEF la campaña «Love Myself» para proteger a niños y jóvenes de la violencia. Su mensaje: aprender a quererse a uno mismo.',
    tipo: 'bts',
  },
  {
    icono: '☕',
    titulo: 'Nuestra primera cita',
    dato: 'Los nervios, las risas y esa conversación que no quería que terminara. Ese día supe que quería volver a verte… y otra vez… y siempre.',
    tipo: 'nosotros',
  },
  {
    icono: '🎂',
    titulo: 'Tu día',
    dato: 'Hoy celebro que existes. Eres mi persona favorita, mi lugar seguro y mi canción preferida. ¡Feliz cumpleaños, mi amor!',
    tipo: 'nosotros',
  },
];

// ✏️ Frase según las estrellas que consiga al ganar
const RANGOS_JUEGO = {
  3: '¡Memoria de ARMY nivel experta! 💜',
  2: '¡Casi perfecto! Se nota que eres ARMY de corazón.',
  1: '¡Lo lograste! Aunque mi corazón ya lo habías ganado hace tiempo.',
};


/* ---------------------------------------------------------
   2. UTILIDADES
   --------------------------------------------------------- */
const $ = (selector, contexto = document) => contexto.querySelector(selector);
const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];
const azar = (min, max) => Math.random() * (max - min) + min;
const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rosa, lavanda, dorado y blanco
const COLORES = ['#ec9bbb', '#d9779f', '#c9b6f2', '#ab92e4', '#8d70d0', '#c9a45c', '#ecd9a9', '#f5bad0'];

const SVG_CORAZON = '<svg viewBox="0 0 32 29" aria-hidden="true"><path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 20.6 6.1-8.7 16-11.5 16-20.6C32 3.8 28.2 0 23.6 0z"/></svg>';

// Al recargar, empezar siempre arriba (la bienvenida tapa la página)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);


/* ---------------------------------------------------------
   3. FOTOS DE EJEMPLO
   Si una foto de la carpeta "images" todavía no existe, se
   muestra un recuadro rosa-lavanda con su nombre, para que
   sepas qué archivo poner. Cuando agregues tus fotos,
   desaparecen solos.
   --------------------------------------------------------- */
const FORMAS_GALERIA = [[600, 750], [600, 600], [600, 820], [600, 480], [600, 900], [600, 640]];

function crearFotoEjemplo(nombreArchivo, ancho, alto, conTexto = true) {
  const texto = conTexto
    ? `<text x="50%" y="56%" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#45325f">Pon aquí tu foto</text>
       <text x="50%" y="62%" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#857898">images/${nombreArchivo}</text>`
    : '';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fdebf2"/>
          <stop offset="1" stop-color="#e0d4fb"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="${conTexto ? '44%' : '60%'}" text-anchor="middle" font-size="${conTexto ? 90 : 160}" fill="#ab92e4">♥</text>
      ${texto}
    </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

$$('img[src^="images/"]').forEach((img) => {
  const ponerEjemplo = () => {
    if (img.dataset.ejemplo) return; // evita repetirlo
    img.dataset.ejemplo = 'si';

    const nombre = img.getAttribute('src').replace('images/', '');
    const item = img.closest('.gallery__item');
    let medidas = [600, 600];
    let conTexto = true;

    if (item) {
      const posicion = $$('.gallery__item').indexOf(item);
      medidas = FORMAS_GALERIA[posicion % FORMAS_GALERIA.length];
    } else if (img.closest('.timeline')) {
      medidas = [800, 500];
    } else if (img.closest('.vinyl')) {
      conTexto = false; // en el disco es muy pequeña para leer texto
    }

    img.src = crearFotoEjemplo(nombre, medidas[0], medidas[1], conTexto);
  };

  img.addEventListener('error', ponerEjemplo);
  // Por si la foto ya falló antes de que cargara este script
  if (img.complete && img.naturalWidth === 0) ponerEjemplo();
});


/* ---------------------------------------------------------
   4. CONTADOR DE TIEMPO JUNTOS
   Calcula años, meses, días, horas, minutos y segundos
   reales (respetando meses de 28, 30 y 31 días).
   --------------------------------------------------------- */
const INICIO = new Date(CONFIG.fechaInicio);

const contador = {
  anios: $('#c-anios'),
  meses: $('#c-meses'),
  dias: $('#c-dias'),
  horas: $('#c-horas'),
  minutos: $('#c-minutos'),
  segundos: $('#c-segundos'),
  total: $('#c-total'),
};

// [singular, plural] para que diga "1 Año" y "2 Años"
const UNIDADES = {
  anios: ['Año', 'Años'],
  meses: ['Mes', 'Meses'],
  dias: ['Día', 'Días'],
  horas: ['Hora', 'Horas'],
  minutos: ['Minuto', 'Minutos'],
  segundos: ['Segundo', 'Segundos'],
};

// Suma meses sin "saltarse" meses cortos (ej. 31 de enero + 1 mes = 28/29 de febrero)
function sumarMeses(fecha, cantidad) {
  const nueva = new Date(fecha);
  const dia = nueva.getDate();
  nueva.setDate(1);
  nueva.setMonth(nueva.getMonth() + cantidad);
  const ultimoDiaDelMes = new Date(nueva.getFullYear(), nueva.getMonth() + 1, 0).getDate();
  nueva.setDate(Math.min(dia, ultimoDiaDelMes));
  return nueva;
}

function tiempoJuntos(desde, hasta) {
  if (hasta < desde) {
    return { anios: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0, total: 0 };
  }

  // Meses completos
  let meses = (hasta.getFullYear() - desde.getFullYear()) * 12 + (hasta.getMonth() - desde.getMonth());
  let ancla = sumarMeses(desde, meses);
  if (ancla > hasta) {
    meses--;
    ancla = sumarMeses(desde, meses);
  }

  // Lo que sobra: días, horas, minutos y segundos
  let resto = Math.floor((hasta - ancla) / 1000);
  const dias = Math.floor(resto / 86400);
  resto %= 86400;
  const horas = Math.floor(resto / 3600);
  resto %= 3600;
  const minutos = Math.floor(resto / 60);
  const segundos = resto % 60;

  return {
    anios: Math.floor(meses / 12),
    meses: meses % 12,
    dias,
    horas,
    minutos,
    segundos,
    total: Math.floor((hasta - desde) / 86400000),
  };
}

function actualizarContador() {
  const t = tiempoJuntos(INICIO, new Date());

  Object.keys(UNIDADES).forEach((clave) => {
    const elemento = contador[clave];
    if (!elemento) return;

    const conCero = ['horas', 'minutos', 'segundos'].includes(clave);
    const valor = conCero ? String(t[clave]).padStart(2, '0') : String(t[clave]);

    if (elemento.textContent !== valor) {
      elemento.textContent = valor;

      // Pequeño "salto" del número cuando cambia
      elemento.classList.remove('is-tick');
      void elemento.offsetWidth;
      elemento.classList.add('is-tick');

      const etiqueta = elemento.nextElementSibling;
      if (etiqueta) etiqueta.textContent = UNIDADES[clave][t[clave] === 1 ? 0 : 1];
    }
  });

  if (contador.total) contador.total.textContent = t.total.toLocaleString('es');
}

if (isNaN(INICIO)) {
  console.warn('⚠️ Revisa CONFIG.fechaInicio en script.js. Debe verse así: 2022-02-14T20:30:00');
} else {
  actualizarContador();
  setInterval(actualizarContador, 1000);
}


/* ---------------------------------------------------------
   5. ANIMACIONES AL HACER SCROLL
   Cada elemento con la clase .reveal aparece suavemente
   cuando entra en la pantalla.
   --------------------------------------------------------- */

// Retraso escalonado para las fotos de la galería
$$('.gallery__item').forEach((item, i) => {
  item.style.setProperty('--d', `${(i % 3) * 0.12}s`);
});

function iniciarAnimacionesScroll() {
  const elementos = $$('.reveal');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  elementos.forEach((el) => observador.observe(el));
}


/* ---------------------------------------------------------
   6. LÍNEA DE TIEMPO INTERACTIVA
   La línea se llena a medida que bajas y cada momento se
   "enciende" cuando su círculo pasa por la mitad de la pantalla.
   --------------------------------------------------------- */
const lineaTiempo = $('#timeline');
const momentos = $$('.timeline__item');
let esperandoCuadro = false;

function actualizarLineaTiempo() {
  esperandoCuadro = false;
  if (!lineaTiempo) return;

  const punto = window.innerHeight * 0.62; // altura de la pantalla donde "se enciende"
  const caja = lineaTiempo.getBoundingClientRect();
  const progreso = Math.min(Math.max((punto - caja.top) / caja.height, 0), 1);
  lineaTiempo.style.setProperty('--progreso', progreso.toFixed(4));

  momentos.forEach((momento) => {
    const circulo = $('.timeline__dot', momento).getBoundingClientRect();
    momento.classList.toggle('is-active', circulo.top + circulo.height / 2 < punto);
  });
}

function pedirCuadro() {
  if (esperandoCuadro) return;
  esperandoCuadro = true;
  requestAnimationFrame(actualizarLineaTiempo);
}

if (lineaTiempo) {
  window.addEventListener('scroll', pedirCuadro, { passive: true });
  window.addEventListener('resize', pedirCuadro);
  actualizarLineaTiempo();
}


/* ---------------------------------------------------------
   7. MENÚ FLOTANTE (DOCK)
   Marca la sección en la que estás.
   --------------------------------------------------------- */
const enlacesDock = $$('.dock__link');

function marcarSeccion(id) {
  enlacesDock.forEach((enlace) => {
    const activo = enlace.getAttribute('href') === `#${id}`;
    enlace.classList.toggle('is-active', activo);
    if (activo) enlace.setAttribute('aria-current', 'true');
    else enlace.removeAttribute('aria-current');
  });
}

if (enlacesDock.length && 'IntersectionObserver' in window) {
  const secciones = enlacesDock.map((enlace) => $(enlace.getAttribute('href'))).filter(Boolean);

  // Se activa la sección que cruza la mitad de la pantalla
  const observadorSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) marcarSeccion(entrada.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secciones.forEach((seccion) => observadorSecciones.observe(seccion));
  marcarSeccion('inicio');
}


/* ---------------------------------------------------------
   8. MÚSICA + TOCADISCOS BORAHAE
   - music/cancion.mp3 suena de fondo al abrir la sorpresa.
   - Cada canción de la playlist suena aquí mismo si su mp3
     existe en la carpeta "music". Si no, se abre en YouTube.
   - Los celulares no dejan reproducir audio solo, por eso
     empieza cuando ella toca "Abrir mi sorpresa".
   --------------------------------------------------------- */
const musica = $('#musica');
const btnMusica = $('#musicBtn');
const reproductor = $('#player');
const tocadiscos = $('#deck');
const etiquetaAhora = $('#nowLabel');
const tituloAhora = $('#nowTitle');
const notaPlaylist = $('#playlistNote');
const pistas = $$('.track');

const CANCION_FONDO = musica ? musica.getAttribute('src') : '';
let fondoDisponible = Boolean(CANCION_FONDO);
let pistaActual = null; // null = canción de fondo · si no, el <li> de la playlist
let yaSono = false;

const ICONOS = {
  play: '<svg class="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  pausa: '<svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
  enlace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
};

const tituloDe = (pista) => ($('.track__title', pista)?.textContent || 'canción').trim();
const pistasLocales = () => pistas.filter((pista) => pista.classList.contains('is-local'));

// Pinta el estado (sonando / en pausa) en el tocadiscos, la playlist y el botón flotante
function pintarReproductor() {
  const sonando = Boolean(musica) && !musica.paused;

  if (btnMusica) {
    btnMusica.classList.toggle('is-playing', sonando);
    btnMusica.setAttribute('aria-label', sonando ? 'Pausar música' : 'Reproducir música');
  }
  if (reproductor) reproductor.classList.toggle('is-playing', sonando);
  if (tocadiscos) tocadiscos.setAttribute('aria-label', sonando ? 'Pausar música' : 'Reproducir música');

  if (etiquetaAhora) {
    etiquetaAhora.textContent = sonando ? 'Ahora suena' : (yaSono ? 'En pausa' : 'Toca el disco');
  }
  if (tituloAhora) {
    if (pistaActual) tituloAhora.textContent = tituloDe(pistaActual);
    else tituloAhora.textContent = fondoDisponible ? CONFIG.nombreCancionFondo : 'Elige una canción 💜';
  }

  pistas.forEach((pista) => {
    const esActual = pista === pistaActual;
    pista.classList.toggle('is-current', esActual);
    pista.classList.toggle('is-playing', esActual && sonando);
    const boton = $('.track__btn--play', pista);
    if (boton) boton.setAttribute('aria-label', `${esActual && sonando ? 'Pausar' : 'Reproducir'} ${tituloDe(pista)}`);
  });
}

function reproducir() {
  if (!musica) return;
  musica.play().catch(() => {});
}

// Play / pausa general (botón flotante y disco)
function alternarMusica() {
  if (!musica) return;

  if (!musica.paused) {
    musica.pause();
    return;
  }

  // No hay canción de fondo ni canción elegida → empieza la primera de la playlist
  if (!pistaActual && !fondoDisponible) {
    const primera = pistasLocales()[0];
    if (primera) {
      elegirPista(primera);
    } else if (tocadiscos) {
      // No hay ningún mp3: el disco "tiembla" para invitar a usar la lista
      tocadiscos.classList.remove('is-nudge');
      void tocadiscos.offsetWidth;
      tocadiscos.classList.add('is-nudge');
    }
    return;
  }

  reproducir();
}

function elegirPista(pista) {
  if (!musica) return;
  if (pista === pistaActual) {
    alternarMusica();
    return;
  }
  pistaActual = pista;
  musica.loop = false;
  musica.src = pista.dataset.src;
  reproducir();
  pintarReproductor();
}

function siguientePista() {
  const locales = pistasLocales();
  if (!locales.length) return;
  const posicion = locales.indexOf(pistaActual);
  const siguiente = locales[(posicion + 1) % locales.length];
  if (siguiente === pistaActual) {
    musica.currentTime = 0;
    reproducir();
  } else {
    elegirPista(siguiente);
  }
}

// Muestra el botón ▶ (si hay mp3) o el enlace ↗ (si no)
function marcarPista(pista, esLocal) {
  pista.classList.toggle('is-local', esLocal);
  const boton = $('.track__btn--play', pista);
  const enlace = $('.track__btn--link', pista);
  if (boton) boton.hidden = !esLocal;
  if (enlace) enlace.hidden = esLocal;
  if (notaPlaylist) {
    notaPlaylist.hidden = !pistas.some((p) => !p.classList.contains('is-local') && p.dataset.link);
  }
}

// ¿Existe el mp3? Con Live Server se pregunta al servidor;
// si abres el archivo directo (file://), se prueba con el reproductor.
async function existeCancion(src) {
  try {
    const respuesta = await fetch(src, { method: 'HEAD', cache: 'no-store' });
    const tipo = respuesta.headers.get('content-type') || '';
    return respuesta.ok && !tipo.includes('text/html');
  } catch {
    return new Promise((resolver) => {
      const prueba = new Audio();
      const limite = setTimeout(() => resolver(false), 6000);
      prueba.preload = 'metadata';
      prueba.addEventListener('loadedmetadata', () => { clearTimeout(limite); resolver(true); }, { once: true });
      prueba.addEventListener('error', () => { clearTimeout(limite); resolver(false); }, { once: true });
      prueba.src = src;
    });
  }
}

// Crea los botones de cada canción
pistas.forEach((pista) => {
  const titulo = tituloDe(pista);
  const acciones = document.createElement('div');
  acciones.className = 'track__actions';

  if (pista.dataset.src) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'track__btn track__btn--play';
    boton.hidden = true;
    boton.innerHTML = ICONOS.play + ICONOS.pausa;
    boton.setAttribute('aria-label', `Reproducir ${titulo}`);
    boton.addEventListener('click', () => elegirPista(pista));
    acciones.append(boton);
  }

  if (pista.dataset.link) {
    const enlace = document.createElement('a');
    enlace.className = 'track__btn track__btn--link';
    enlace.href = pista.dataset.link;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.innerHTML = ICONOS.enlace;
    enlace.setAttribute('aria-label', `Escuchar ${titulo} en YouTube (se abre en otra pestaña)`);
    acciones.append(enlace);
  }

  pista.append(acciones);

  if (pista.dataset.src) {
    existeCancion(pista.dataset.src).then((existe) => { if (existe) marcarPista(pista, true); });
  }
});

if (musica) {
  musica.volume = CONFIG.volumenMusica;

  // Por si music/cancion.mp3 ya falló antes de que cargara este script
  if (musica.error || musica.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fondoDisponible = false;

  musica.addEventListener('play', () => {
    yaSono = true;
    if (btnMusica) btnMusica.hidden = false;
    pintarReproductor();
  });

  musica.addEventListener('pause', pintarReproductor);

  musica.addEventListener('ended', () => {
    if (pistaActual) siguientePista();
  });

  musica.addEventListener('error', () => {
    if (pistaActual) {
      // La canción elegida no cargó: la dejamos como enlace a YouTube
      marcarPista(pistaActual, false);
      pistaActual = null;
      if (fondoDisponible) {
        musica.src = CANCION_FONDO;
        musica.loop = true;
      }
    } else {
      // No existe music/cancion.mp3
      fondoDisponible = false;
    }
    if (btnMusica && musica.paused) btnMusica.hidden = !fondoDisponible && !pistaActual;
    pintarReproductor();
  });
}

if (btnMusica) btnMusica.addEventListener('click', alternarMusica);
if (tocadiscos) tocadiscos.addEventListener('click', alternarMusica);
pintarReproductor();


/* ---------------------------------------------------------
   9. PANTALLA DE BIENVENIDA
   --------------------------------------------------------- */
const intro = $('#intro');
const btnAbrir = $('#btnAbrir');

function abrirSorpresa() {
  intro.classList.add('is-hidden');
  document.body.classList.remove('is-locked');
  document.body.classList.add('is-ready');

  iniciarAnimacionesScroll();
  if (fondoDisponible && musica && !musica.error) reproducir();
  if (CONFIG.confeti && !menosMovimiento) lanzarConfeti(110);

  setTimeout(() => intro.remove(), 1200);
}

if (intro && btnAbrir) {
  btnAbrir.addEventListener('click', abrirSorpresa, { once: true });
} else {
  // Si borraste la pantalla de bienvenida, la página funciona igual
  document.body.classList.remove('is-locked');
  document.body.classList.add('is-ready');
  iniciarAnimacionesScroll();
}


/* ---------------------------------------------------------
   10. GALERÍA + LIGHTBOX
   Clic/toque en una foto → se abre en grande.
   Flechas del teclado, deslizar el dedo o botones para cambiar.
   Esc, la X o tocar fuera de la foto para cerrar.
   --------------------------------------------------------- */
const fotos = $$('.gallery__item');

const lb = {
  caja: $('#lightbox'),
  img: $('#lbImg'),
  texto: $('#lbCaption'),
  numero: $('#lbCounter'),
  cerrar: $('#lbClose'),
  anterior: $('#lbPrev'),
  siguiente: $('#lbNext'),
};

let fotoActual = 0;
let focoAnterior = null;

function mostrarFoto(indice) {
  fotoActual = (indice + fotos.length) % fotos.length; // da la vuelta al llegar al final
  const item = fotos[fotoActual];
  const img = $('img', item);
  const pie = $('figcaption', item);

  lb.img.src = img.currentSrc || img.src;
  lb.img.alt = img.alt;
  lb.texto.textContent = pie ? pie.textContent : '';
  lb.numero.textContent = `${fotoActual + 1} / ${fotos.length}`;

  // Reinicia la animación de entrada de la foto
  lb.img.classList.remove('is-changing');
  void lb.img.offsetWidth;
  lb.img.classList.add('is-changing');
}

function abrirLightbox(indice) {
  focoAnterior = document.activeElement;
  mostrarFoto(indice);
  lb.caja.classList.add('is-open');
  lb.caja.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  lb.cerrar.focus({ preventScroll: true });
}

function cerrarLightbox() {
  lb.caja.classList.remove('is-open');
  lb.caja.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  if (focoAnterior) focoAnterior.focus({ preventScroll: true });
}

if (lb.caja && fotos.length) {
  fotos.forEach((item, i) => {
    // Para poder abrirlas también con el teclado (Tab + Enter)
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ver foto: ${$('img', item).alt}`);

    item.addEventListener('click', () => abrirLightbox(i));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirLightbox(i);
      }
    });
  });

  lb.cerrar.addEventListener('click', cerrarLightbox);
  lb.anterior.addEventListener('click', () => mostrarFoto(fotoActual - 1));
  lb.siguiente.addEventListener('click', () => mostrarFoto(fotoActual + 1));

  // Tocar fuera de la foto cierra
  lb.caja.addEventListener('click', (e) => {
    if (e.target === lb.caja || e.target.classList.contains('lightbox__figure')) cerrarLightbox();
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lb.caja.classList.contains('is-open')) return;
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowRight') mostrarFoto(fotoActual + 1);
    if (e.key === 'ArrowLeft') mostrarFoto(fotoActual - 1);
  });

  // Deslizar con el dedo (celular)
  let inicioToque = null;

  lb.caja.addEventListener('touchstart', (e) => {
    inicioToque = e.changedTouches[0].clientX;
  }, { passive: true });

  lb.caja.addEventListener('touchend', (e) => {
    if (inicioToque === null) return;
    const distancia = e.changedTouches[0].clientX - inicioToque;
    if (Math.abs(distancia) > 50) mostrarFoto(fotoActual + (distancia < 0 ? 1 : -1));
    inicioToque = null;
  });
}


/* ---------------------------------------------------------
   11. MINIJUEGO: MEMORIA BORAHAE
   Voltea dos cartas: si son iguales se quedan descubiertas y
   aparece un dato (de BTS o de ustedes). Al encontrar todas,
   se abre la ventana de victoria con estrellas y un premio.
   --------------------------------------------------------- */
const tablero = $('#board');

const ui = {
  movimientos: $('#gMoves'),
  parejas: $('#gPairs'),
  tiempo: $('#gTime'),
  record: $('#gBest'),
  total: $('#gTotal'),
  dato: $('#gFact'),
  datoIcono: $('#gFactIcon'),
  datoEtiqueta: $('#gFactTag'),
  datoTitulo: $('#gFactTitle'),
  datoTexto: $('#gFactText'),
  coleccion: $('#gCollection'),
  reiniciar: $('#gRestart'),
  modal: $('#win'),
  estrellas: $$('.win__star'),
  rango: $('#winRank'),
  resumen: $('#winStats'),
  otraVez: $('#winAgain'),
  cerrar: $('#winClose'),
};

const TOTAL_PAREJAS = CARTAS_JUEGO.length;
const CLAVE_RECORD = 'memoria-borahae-record';
let partida = null;
let focoAntesDelModal = null;

const formatoTiempo = (segundos) =>
  `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;

// Mezcla al azar (algoritmo Fisher–Yates)
function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// El récord se guarda en este navegador (si el navegador lo permite)
function leerRecord() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RECORD));
  } catch {
    return null;
  }
}

function guardarRecord(record) {
  try {
    localStorage.setItem(CLAVE_RECORD, JSON.stringify(record));
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

function pintarRecord() {
  const record = leerRecord();
  ui.record.textContent = record ? record.movimientos : '—';
  ui.record.parentElement.title = record
    ? `Mejor partida: ${record.movimientos} movimientos en ${formatoTiempo(record.segundos)}`
    : 'Todavía no hay récord';
}

function pintarMarcador() {
  ui.movimientos.textContent = partida.movimientos;
  ui.parejas.textContent = `${partida.encontradas}/${TOTAL_PAREJAS}`;
}

function segundosJugados() {
  return partida.inicio ? Math.floor((Date.now() - partida.inicio) / 1000) : 0;
}

function iniciarReloj() {
  partida.inicio = Date.now();
  partida.reloj = setInterval(() => {
    ui.tiempo.textContent = formatoTiempo(segundosJugados());
  }, 1000);
}

function detenerReloj() {
  if (!partida) return;
  clearInterval(partida.reloj);
  partida.reloj = null;
  partida.segundos = segundosJugados();
  ui.tiempo.textContent = formatoTiempo(partida.segundos);
}

function animarPanelDato() {
  ui.dato.classList.remove('is-new');
  void ui.dato.offsetWidth;
  ui.dato.classList.add('is-new');
}

function mostrarDato(id) {
  const carta = CARTAS_JUEGO[id];
  ui.datoIcono.textContent = carta.icono;
  ui.datoEtiqueta.textContent = carta.tipo === 'nosotros' ? 'Nuestro recuerdo ♥' : 'Dato BTS 💜';
  ui.datoTitulo.textContent = carta.titulo;
  ui.datoTexto.textContent = carta.dato;
  animarPanelDato();

  $$('.chip', ui.coleccion).forEach((chip) => {
    chip.classList.toggle('is-selected', chip.dataset.id === String(id));
  });
}

function mostrarInstrucciones() {
  ui.datoIcono.textContent = '✨';
  ui.datoEtiqueta.textContent = 'Cómo jugar';
  ui.datoTitulo.textContent = '¿Lista, mi amor?';
  ui.datoTexto.textContent = 'Toca dos cartas para darles la vuelta. Si son iguales, se quedan descubiertas y te cuento un secreto.';
}

// Huecos vacíos donde se van guardando los datos descubiertos
function pintarColeccion() {
  ui.coleccion.innerHTML = '';
  for (let i = 0; i < TOTAL_PAREJAS; i++) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.disabled = true;
    chip.setAttribute('aria-label', 'Dato por descubrir');
    ui.coleccion.append(chip);
  }
}

function agregarAColeccion(id) {
  const chip = ui.coleccion.children[partida.descubiertos.length - 1];
  if (!chip) return;
  chip.disabled = false;
  chip.dataset.id = id;
  chip.textContent = CARTAS_JUEGO[id].icono;
  chip.classList.add('is-found');
  chip.setAttribute('aria-label', `Volver a leer: ${CARTAS_JUEGO[id].titulo}`);
  chip.addEventListener('click', () => mostrarDato(id));
}

function crearCarta(id, posicion) {
  const info = CARTAS_JUEGO[id];
  const carta = document.createElement('button');
  carta.type = 'button';
  carta.className = 'card';
  carta.dataset.id = id;
  carta.style.setProperty('--i', posicion);
  carta.setAttribute('aria-label', 'Carta boca abajo');
  carta.innerHTML = `
    <span class="card__inner">
      <span class="card__face card__back" aria-hidden="true">${SVG_CORAZON}</span>
      <span class="card__face card__front" aria-hidden="true"><span class="card__emoji"></span></span>
    </span>`;

  const emoji = $('.card__emoji', carta);
  emoji.textContent = info.icono;

  // Si la carta tiene foto y la foto existe, se usa en vez del emoji
  if (info.foto) {
    const foto = new Image();
    foto.alt = '';
    foto.addEventListener('load', () => emoji.replaceWith(foto), { once: true });
    foto.src = info.foto;
  }

  carta.addEventListener('click', () => voltear(carta));
  return carta;
}

function nuevoJuego() {
  if (!tablero) return;
  if (partida) clearInterval(partida.reloj);

  partida = {
    primera: null,
    segunda: null,
    bloqueo: false,
    movimientos: 0,
    encontradas: 0,
    inicio: 0,
    segundos: 0,
    reloj: null,
    descubiertos: [],
  };

  const ids = CARTAS_JUEGO.map((_, i) => i);
  const mazo = barajar([...ids, ...ids]);

  tablero.innerHTML = '';
  mazo.forEach((id, posicion) => tablero.append(crearCarta(id, posicion)));
  tablero.setAttribute('aria-label', `Tablero con ${mazo.length} cartas`);

  ui.tiempo.textContent = '00:00';
  if (ui.total) ui.total.textContent = TOTAL_PAREJAS;
  pintarMarcador();
  pintarRecord();
  pintarColeccion();
  mostrarInstrucciones();
}

function voltear(carta) {
  if (partida.bloqueo || carta.classList.contains('is-flipped')) return;
  if (!partida.reloj && !partida.inicio) iniciarReloj();

  const id = Number(carta.dataset.id);
  carta.classList.add('is-flipped');
  carta.setAttribute('aria-label', `Carta: ${CARTAS_JUEGO[id].titulo}`);

  if (!partida.primera) {
    partida.primera = carta;
    return;
  }

  partida.segunda = carta;
  partida.movimientos++;
  pintarMarcador();

  if (partida.primera.dataset.id === carta.dataset.id) acierto();
  else fallo();
}

function acierto() {
  const ronda = partida;
  const { primera, segunda } = ronda;
  const id = Number(primera.dataset.id);

  ronda.primera = null;
  ronda.segunda = null;
  ronda.encontradas++;
  ronda.descubiertos.push(id);
  pintarMarcador();

  const terminado = ronda.encontradas === TOTAL_PAREJAS;
  if (terminado) detenerReloj();

  // Espera a que termine el giro para celebrar
  setTimeout(() => {
    if (partida !== ronda) return; // se reinició el juego mientras tanto
    [primera, segunda].forEach((carta) => {
      carta.classList.add('is-matched');
      carta.setAttribute('aria-disabled', 'true');
    });
    estallidoCorazones(segunda);
    mostrarDato(id);
    agregarAColeccion(id);
  }, 450);

  if (terminado) {
    setTimeout(() => { if (partida === ronda) victoria(); }, 1600);
  }
}

function fallo() {
  const ronda = partida;
  const { primera, segunda } = ronda;
  ronda.bloqueo = true;

  setTimeout(() => {
    if (partida !== ronda) return;
    primera.classList.add('is-wrong');
    segunda.classList.add('is-wrong');
  }, 500);

  setTimeout(() => {
    if (partida !== ronda) return;
    [primera, segunda].forEach((carta) => {
      carta.classList.remove('is-flipped', 'is-wrong');
      carta.setAttribute('aria-label', 'Carta boca abajo');
    });
    ronda.primera = null;
    ronda.segunda = null;
    ronda.bloqueo = false;
  }, 1100);
}

function calcularEstrellas(movimientos) {
  if (movimientos <= Math.ceil(TOTAL_PAREJAS * 1.75)) return 3;
  if (movimientos <= Math.ceil(TOTAL_PAREJAS * 2.75)) return 2;
  return 1;
}

function victoria() {
  const { movimientos, segundos } = partida;
  const estrellas = calcularEstrellas(movimientos);

  ui.estrellas.forEach((estrella, i) => estrella.classList.toggle('is-on', i < estrellas));
  ui.rango.textContent = RANGOS_JUEGO[estrellas];

  let resumen = `Lo hiciste en ${movimientos} movimientos y ${formatoTiempo(segundos)}.`;
  const record = leerRecord();
  const esRecord = !record
    || movimientos < record.movimientos
    || (movimientos === record.movimientos && segundos < record.segundos);

  if (esRecord) {
    guardarRecord({ movimientos, segundos });
    pintarRecord();
    if (record) resumen += ' ¡Nuevo récord! 🏆';
  }
  ui.resumen.textContent = resumen;

  abrirModal();
  if (CONFIG.confeti && !menosMovimiento) lanzarConfeti(120, true);
}

function abrirModal() {
  focoAntesDelModal = document.activeElement;
  ui.modal.classList.add('is-open');
  ui.modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  ui.otraVez.focus({ preventScroll: true });
}

function cerrarModal() {
  ui.modal.classList.remove('is-open');
  ui.modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  const destino = focoAntesDelModal && document.contains(focoAntesDelModal) ? focoAntesDelModal : ui.reiniciar;
  destino.focus({ preventScroll: true });
}

if (tablero) {
  nuevoJuego();

  ui.reiniciar.addEventListener('click', nuevoJuego);

  ui.otraVez.addEventListener('click', () => {
    cerrarModal();
    nuevoJuego();
    ui.reiniciar.focus({ preventScroll: true });
    $('#juego').scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth' });
  });

  ui.cerrar.addEventListener('click', cerrarModal);

  // Tocar fuera de la tarjeta cierra
  ui.modal.addEventListener('click', (e) => {
    if (e.target === ui.modal) cerrarModal();
  });

  // Teclado: Esc cierra y Tab no se sale de la ventana
  document.addEventListener('keydown', (e) => {
    if (!ui.modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') cerrarModal();

    if (e.key === 'Tab') {
      const enfocables = [ui.otraVez, ui.cerrar];
      const actual = enfocables.indexOf(document.activeElement);
      e.preventDefault();
      const siguiente = e.shiftKey ? actual - 1 : actual + 1;
      enfocables[(siguiente + enfocables.length) % enfocables.length].focus();
    }
  });
}


/* ---------------------------------------------------------
   12. SOBRE Y CARTA
   Al tocar el sobre: se abre la solapa, sube el papel
   y luego aparece la carta completa, párrafo por párrafo.
   --------------------------------------------------------- */
const sobre = $('#envelope');
const cajaSobre = $('#envelopeWrap');
const carta = $('#letter');

// Orden de aparición de cada párrafo
$$('.letter__body > *').forEach((el, i) => el.style.setProperty('--i', i));

if (sobre && cajaSobre && carta) {
  sobre.addEventListener('click', () => {
    if (sobre.classList.contains('is-open')) return;
    sobre.classList.add('is-open');

    setTimeout(() => {
      cajaSobre.classList.add('is-gone');

      setTimeout(() => {
        cajaSobre.hidden = true;
        carta.hidden = false;
        void carta.offsetWidth; // fuerza al navegador a notar el cambio antes de animar
        carta.classList.add('is-visible');

        // Lleva la vista al inicio de la carta
        const arriba = carta.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: arriba, behavior: menosMovimiento ? 'auto' : 'smooth' });

        if (CONFIG.confeti && !menosMovimiento) lanzarConfeti(45, true);
      }, 500);
    }, menosMovimiento ? 0 : 1500);
  });
}


/* ---------------------------------------------------------
   13. CORAZONES DE FONDO
   --------------------------------------------------------- */
const capaCorazones = $('#hearts');

function crearCorazon() {
  if (document.hidden || capaCorazones.childElementCount >= 16) return;

  const esBrillo = Math.random() < 0.22;
  const corazon = document.createElement('span');
  corazon.className = 'heart';
  corazon.textContent = esBrillo ? '✦' : '♥';
  corazon.style.setProperty('--x', `${azar(0, 100)}vw`);
  corazon.style.setProperty('--s', `${esBrillo ? azar(10, 18) : azar(12, 30)}px`);
  corazon.style.setProperty('--c', esBrillo ? '#c9a45c' : elegir(COLORES));
  corazon.style.setProperty('--o', azar(0.2, 0.5).toFixed(2));
  corazon.style.setProperty('--dur', `${azar(9, 16)}s`);
  corazon.style.setProperty('--drift', `${azar(-80, 80)}px`);
  corazon.style.setProperty('--rot', `${azar(-40, 40)}deg`);
  corazon.addEventListener('animationend', () => corazon.remove());

  capaCorazones.appendChild(corazon);
}

if (CONFIG.corazonesDeFondo && !menosMovimiento && capaCorazones) {
  setInterval(crearCorazon, 1200);
}


/* ---------------------------------------------------------
   14. CONFETI Y ESTALLIDOS DE CORAZONES
   lanzarConfeti(cantidad, soloCorazones)
   estallidoCorazones(elemento) → corazoncitos que salen de él
   --------------------------------------------------------- */
function lanzarConfeti(cantidad = 100, soloCorazones = false) {
  const capa = document.createElement('div');
  capa.className = 'confetti';
  capa.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < cantidad; i++) {
    const pieza = document.createElement('i');

    if (soloCorazones || Math.random() < 0.3) {
      pieza.className = 'is-heart';
      pieza.textContent = Math.random() < 0.85 ? '♥' : '✦';
    }

    pieza.style.setProperty('--x', `${azar(0, 100)}vw`);
    pieza.style.setProperty('--w', `${azar(6, 13)}px`);
    pieza.style.setProperty('--c', elegir(COLORES));
    pieza.style.setProperty('--drift', `${azar(-120, 120)}px`);
    pieza.style.setProperty('--rot', `${azar(-540, 540)}deg`);
    pieza.style.setProperty('--dur', `${azar(2.6, 5)}s`);
    pieza.style.setProperty('--delay', `${azar(0, 0.8)}s`);

    capa.appendChild(pieza);
  }

  document.body.appendChild(capa);
  setTimeout(() => capa.remove(), 6500);
}

function estallidoCorazones(elemento, cantidad = 10) {
  if (menosMovimiento || !elemento) return;

  const caja = elemento.getBoundingClientRect();
  const centroX = caja.left + caja.width / 2;
  const centroY = caja.top + caja.height / 2;

  for (let i = 0; i < cantidad; i++) {
    const angulo = (Math.PI * 2 * i) / cantidad + azar(-0.3, 0.3);
    const distancia = azar(40, 80);
    const pieza = document.createElement('i');
    pieza.className = 'burst';
    pieza.setAttribute('aria-hidden', 'true');
    pieza.textContent = Math.random() < 0.7 ? '♥' : '✦';
    pieza.style.setProperty('--x', `${centroX}px`);
    pieza.style.setProperty('--y', `${centroY}px`);
    pieza.style.setProperty('--dx', `${Math.cos(angulo) * distancia}px`);
    pieza.style.setProperty('--dy', `${Math.sin(angulo) * distancia}px`);
    pieza.style.setProperty('--s', `${azar(12, 20)}px`);
    pieza.style.setProperty('--c', elegir(COLORES));
    pieza.addEventListener('animationend', () => pieza.remove());
    document.body.appendChild(pieza);
  }
}
