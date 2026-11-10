/* =========================================================
   ÁLBUM DE CUMPLEAÑOS · edición Borahae 💜 — script.js
   JavaScript puro (sin librerías)

   Índice
   0.  Configuración            ← lo principal que debes cambiar
   0b. Los 7 de Bangtan         ← fotos y datos de cada integrante
   1.  Cartas del minijuego     ← textos y datos del juego
   1b. Mensajitos del gusanito  ← textos del segundo juego
   2.  Utilidades
   2b. Días preciosos (su cumpleaños) y sección Bangtan
   3.  Fotos de ejemplo (mientras no pongas las tuyas)
   4.  Contador de tiempo juntos
   5.  Animaciones al hacer scroll
   6.  Línea de tiempo interactiva
   7.  Menú flotante (dock)
   8.  Música + tocadiscos Borahae
   9.  Pantalla de bienvenida
   10. Galería + lightbox (foto en pantalla completa)
   11. Minijuego: Memoria Borahae
   11b. Segundo juego: Gusanito Borahae
   12. Sobre y carta
   13. Corazones de fondo
   14. Confeti y estallidos de corazones
   ========================================================= */


/* ---------------------------------------------------------
   0. ✏️ CONFIGURACIÓN
   --------------------------------------------------------- */
const CONFIG = {
  // Su nombre (se usa en la portada, en "Días preciosos" y en los juegos)
  nombre: 'Sandra',
  nombreCompleto: 'Sandra Milagros Huamán Choque',

  // Su fecha de nacimiento · Formato: 'AAAA-MM-DD'
  fechaNacimiento: '2002-10-19',

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
   0b. ✏️ LOS 7 DE BANGTAN
   Las fotos están en images/bts/ y se llaman así:
     images/bts/jimin-1.jpg, jimin-2.jpg…        (fotos completas)
     images/bts/caras/jimin-1.jpg…               (la cara recortada)
     images/bts/cuadradas/jimin.jpg              (para el rompecabezas)
   - fotos:   cuántas fotos tiene ese integrante
   - portada: qué foto se ve en su tarjeta
   - cara:    qué cara se usa en los juegos
   Todo se usa en la sección "Los 7 de Bangtan" y en los juegos.
   --------------------------------------------------------- */
const BANGTAN = [
  {
    id: 'rm',
    nombre: 'RM',
    real: 'Kim Namjoon',
    hangul: '김남준',
    cumple: '1994-09-12',
    emoji: '🐨',
    bt21: 'Koya',
    rol: 'Líder y rapero',
    color: '#8d70d0',
    dato: 'Es el líder de BTS. En 2018 dio un discurso en la ONU, junto a UNICEF, para animar a los jóvenes a quererse y a usar su propia voz.',
    fotos: 5, portada: 1, cara: 2,
  },
  {
    id: 'jin',
    nombre: 'Jin',
    real: 'Kim Seokjin',
    hangul: '김석진',
    cumple: '1992-12-04',
    emoji: '🐹',
    bt21: 'RJ',
    rol: 'Vocalista · el mayor',
    color: '#f19cbf',
    dato: 'Es el mayor del grupo y se presenta como «Worldwide Handsome». Sus chistes malos son famosos entre ARMY.',
    fotos: 3, portada: 2, cara: 1,
  },
  {
    id: 'suga',
    nombre: 'SUGA',
    real: 'Min Yoongi',
    hangul: '민윤기',
    cumple: '1993-03-09',
    emoji: '🐱',
    bt21: 'Shooky',
    rol: 'Rapero y productor',
    color: '#8fb1f2',
    dato: 'Es rapero y produce muchas canciones del grupo. Como solista también firma con el nombre Agust D.',
    fotos: 2, portada: 1, cara: 1,
  },
  {
    id: 'jhope',
    nombre: 'j-hope',
    real: 'Jung Hoseok',
    hangul: '정호석',
    cumple: '1994-02-18',
    emoji: '🐿️',
    bt21: 'Mang',
    rol: 'Rapero y bailarín',
    color: '#f3c66e',
    dato: 'Su nombre viene de «hope», esperanza: quiere ser la esperanza de sus fans. Es uno de los mejores bailarines del grupo.',
    fotos: 4, portada: 1, cara: 1,
  },
  {
    id: 'jimin',
    nombre: 'Jimin',
    real: 'Park Jimin',
    hangul: '박지민',
    cumple: '1995-10-13',
    emoji: '🐥',
    bt21: 'Chimmy',
    rol: 'Vocalista y bailarín',
    color: '#f5a58c',
    dato: 'Cumple el 13 de octubre: ¡solo seis días antes que tú! Los dos son de Libra.',
    fotos: 3, portada: 1, cara: 3,
  },
  {
    id: 'v',
    nombre: 'V',
    real: 'Kim Taehyung',
    hangul: '김태형',
    cumple: '1995-12-30',
    emoji: '🐯',
    bt21: 'Tata',
    rol: 'Vocalista',
    color: '#7ccfc2',
    dato: 'Él inventó «Borahae» (I purple you) en 2016. Gracias a él, el morado es el color del amor de ARMY.',
    fotos: 3, portada: 1, cara: 2,
  },
  {
    id: 'jungkook',
    nombre: 'Jung Kook',
    real: 'Jeon Jungkook',
    hangul: '전정국',
    cumple: '1997-09-01',
    emoji: '🐰',
    bt21: 'Cooky',
    rol: 'Vocalista · el menor',
    color: '#c79bf0',
    dato: 'Es el menor del grupo. Le dicen «Golden Maknae» porque le sale bien casi todo lo que intenta.',
    fotos: 4, portada: 1, cara: 1,
  },
];

// Rutas de las fotos (no hace falta tocarlas)
function fotoDe(miembro, n = miembro.portada) { return `images/bts/${miembro.id}-${n}.jpg`; }
function caraDe(miembro, n = miembro.cara) { return `images/bts/caras/${miembro.id}-${n}.jpg`; }
function cuadradaDe(miembro) { return `images/bts/cuadradas/${miembro.id}.jpg`; }
function miembroPorId(id) { return BANGTAN.find((m) => m.id === id) || null; }

// ✏️ Datos generales de BTS ("¿Sabías que…?" en la sección Bangtan)
const DATOS_BTS = [
  { icono: '🎤', texto: 'BTS debutó el 13 de junio de 2013 con «No More Dream». Por eso cada junio ARMY celebra la FESTA, su aniversario.' },
  { icono: '🛡️', texto: 'BTS viene de Bangtan Sonyeondan (방탄소년단): «chicos a prueba de balas». Desde 2017 también significa «Beyond The Scene».' },
  { icono: '🎈', texto: 'ARMY significa «Adorable Representative M.C. for Youth». Y yo tengo la suerte de amar a la ARMY más bonita del mundo.' },
  { icono: '🌷', texto: 'En 2017 BTS lanzó con UNICEF la campaña «Love Myself» para proteger a niños y jóvenes de la violencia.' },
  { icono: '💜', texto: '«Borahae» (보라해) mezcla «bora» (morado) y «saranghae» (te amo). Como el morado es el último color del arcoíris, significa amar por mucho, mucho tiempo.' },
];


/* ---------------------------------------------------------
   1. ✏️ CARTAS DEL MINIJUEGO "MEMORIA BORAHAE"
   Cada objeto es UNA pareja de cartas (el juego la duplica).
   Las 7 primeras se arman solas con las caras y los datos de
   BANGTAN (arriba). La última es un recuerdo de ustedes.
   - icono:  el emoji (si no hay foto)
   - foto:   la imagen de la carta
   - titulo: el título del dato que aparece al encontrar la pareja
   - dato:   el texto del dato
   - tipo:   'bts' (dato BTS 💜) o 'nosotros' (recuerdo de ustedes ♥)
   Recomendado: 8 parejas (tablero de 4 × 4).
   --------------------------------------------------------- */
const CARTAS_JUEGO = [
  ...BANGTAN.map((m) => ({
    icono: m.emoji,
    foto: caraDe(m),
    titulo: `${m.nombre} · ${m.real}`,
    dato: m.dato,
    tipo: 'bts',
  })),
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
   1b. ✏️ SEGUNDO JUEGO: "GUSANITO BORAHAE"
   - cadaCuantos: cada cuántos corazones aparece un mensajito
   - meta:        al llegar a esa cantidad, confeti y mensaje especial
   Los mensajitos se van desbloqueando en orden y se quedan
   guardados aunque ella cierre la página.
   --------------------------------------------------------- */
const GUSANITO = {
  cadaCuantos: 5,
  meta: 40,
};

const MENSAJES_GUSANITO = [
  {
    icono: '💜',
    titulo: 'Primer mensajito',
    texto: 'Gracias por existir. Desde que llegaste, mis días tienen otro color… morado, obvio.',
  },
  {
    icono: '😊',
    titulo: 'Lo que más me gusta',
    texto: 'Tu risa. Esa que se te escapa cuando algo te da muchísima gracia. Podría escucharla todo el día.',
  },
  {
    icono: '🎧',
    titulo: 'Una promesa',
    texto: 'Siempre voy a escuchar tus canciones favoritas contigo, aunque las pongas por milésima vez.',
  },
  {
    icono: '🐛',
    titulo: 'Si yo fuera un gusanito…',
    texto: '…igual encontraría la forma de llegar hasta ti. Aunque sea de a poquito, siempre hacia ti.',
  },
  {
    icono: '🫶',
    titulo: 'Mi bias',
    texto: 'Tú tienes tu bias en BTS. Yo tengo el mío desde hace tiempo: eres tú, siempre tú.',
  },
  {
    icono: '🌸',
    titulo: 'Para tu cumpleaños',
    texto: 'Que este año te traiga todo lo que sueñas. Y que me deje estar a tu lado para verlo.',
  },
  {
    icono: '✨',
    titulo: 'Un secreto',
    texto: 'Este gusanito come corazones, pero el mío ya te lo comiste tú hace tiempo. Y no lo quiero de vuelta.',
  },
  {
    icono: '🌈',
    titulo: 'Para siempre',
    texto: 'Te voy a amar hasta el último color del arcoíris. Borahae, mi amor. 💜',
  },
];

// Aparece al llegar a la meta
const MENSAJE_META_GUSANITO = {
  icono: '👑',
  titulo: '¡Eres una campeona!',
  texto: 'Llegaste a la meta. Te ganaste un abrazo larguísimo y un beso por cada corazón que comiste. 💜',
};

// Frases cortas cuando ya desbloqueó todos los mensajitos
const ANIMOS_GUSANITO = [
  '¡Sigue así, mi amor! 💜',
  'Eres la mejor jugadora del mundo.',
  'El gusanito y yo estamos orgullosos de ti.',
  '¡Qué habilidad! Así me conquistaste.',
];


/* ---------------------------------------------------------
   2. UTILIDADES
   --------------------------------------------------------- */
const $ = (selector, contexto = document) => contexto.querySelector(selector);
const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];
const azar = (min, max) => Math.random() * (max - min) + min;
const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

// Imágenes precargadas para dibujarlas en los juegos (canvas)
const CACHE_IMAGENES = {};
function imagen(src) {
  if (!CACHE_IMAGENES[src]) {
    const img = new Image();
    img.src = src;
    CACHE_IMAGENES[src] = img;
  }
  return CACHE_IMAGENES[src];
}
const imagenLista = (img) => Boolean(img && img.complete && img.naturalWidth > 0);

// Su bias (lo elige en la sección "Los 7 de Bangtan")
const CLAVE_BIAS = 'bias-de-ella';
function biasActual() {
  try { return miembroPorId(localStorage.getItem(CLAVE_BIAS)); } catch (e) { return null; }
}
function guardarBias(id) {
  try {
    if (id) localStorage.setItem(CLAVE_BIAS, id);
    else localStorage.removeItem(CLAVE_BIAS);
  } catch (e) { /* sin guardado */ }
}

// Un integrante al azar (su bias sale un poquito más seguido)
function miembroAlAzar() {
  const bias = biasActual();
  return bias && Math.random() < 0.35 ? bias : elegir(BANGTAN);
}

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
   4b. DÍAS PRECIOSOS
   Cuenta cada segundo desde que ella nació y saca
   curiosidades de su vida (usa CONFIG.fechaNacimiento).
   --------------------------------------------------------- */
// 'AAAA-MM-DD' → fecha a la medianoche de aquí (no en hora de Londres)
function fechaLocal(texto) {
  const [anio, mes, dia] = String(texto).split('-').map(Number);
  return new Date(anio, (mes || 1) - 1, dia || 1);
}

// [mes, día en que empieza, nombre, símbolo]
const SIGNOS = [
  [1, 20, 'Acuario', '♒'], [2, 19, 'Piscis', '♓'], [3, 21, 'Aries', '♈'],
  [4, 20, 'Tauro', '♉'], [5, 21, 'Géminis', '♊'], [6, 21, 'Cáncer', '♋'],
  [7, 23, 'Leo', '♌'], [8, 23, 'Virgo', '♍'], [9, 23, 'Libra', '♎'],
  [10, 23, 'Escorpio', '♏'], [11, 22, 'Sagitario', '♐'], [12, 22, 'Capricornio', '♑'],
];

function signoDe(fecha) {
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  let signo = SIGNOS[11]; // Capricornio (del 22 de diciembre al 19 de enero)
  SIGNOS.forEach((s) => {
    if (mes > s[0] || (mes === s[0] && dia >= s[1])) signo = s;
  });
  return { nombre: signo[2], simbolo: signo[3] };
}

// Cuántos días faltan para el próximo cumpleaños y cuántos años cumplirá
function proximoCumple(nacimiento, ahora = new Date()) {
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  let siguiente = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (siguiente < hoy) siguiente = new Date(hoy.getFullYear() + 1, nacimiento.getMonth(), nacimiento.getDate());
  const anterior = new Date(siguiente.getFullYear() - 1, nacimiento.getMonth(), nacimiento.getDate());
  const dias = Math.round((siguiente - hoy) / 86400000);
  return {
    dias,
    esHoy: dias === 0,
    edad: siguiente.getFullYear() - nacimiento.getFullYear(),
    avance: dias === 0 ? 1 : 1 - dias / Math.round((siguiente - anterior) / 86400000),
  };
}

// Mensajito flotante abajo de la pantalla
let temporizadorAviso = 0;
function aviso(texto) {
  let caja = $('#aviso');
  if (!caja) {
    caja = document.createElement('div');
    caja.id = 'aviso';
    caja.className = 'toast';
    caja.setAttribute('role', 'status');
    document.body.append(caja);
  }
  caja.textContent = texto;
  caja.classList.remove('is-shown');
  void caja.offsetWidth;
  caja.classList.add('is-shown');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => caja.classList.remove('is-shown'), 3200);
}

const NACIMIENTO = fechaLocal(CONFIG.fechaNacimiento);
const DEBUT_BTS = new Date(2013, 5, 13); // 13 de junio de 2013

const dias = {
  nombre: $('#dNombre'),
  fecha: $('#dFecha'),
  signo: $('#dSigno'),
  edad: $('#dEdad'),
  total: $('#dTotal'),
  detalle: $('#dDetalle'),
  horas: $('#dHoras'),
  minutos: $('#dMinutos'),
  segundos: $('#dSegundos'),
  latidos: $('#dLatidos'),
  lunas: $('#dLunas'),
  vueltas: $('#dVueltas'),
  debut: $('#dDebut'),
  juntos: $('#dJuntos'),
  proximoTitulo: $('#dProximoTitulo'),
  proximoTexto: $('#dProximoTexto'),
  barra: $('#dBarra'),
};

function plural(n, uno, varios) {
  return `${n.toLocaleString('es')} ${n === 1 ? uno : varios}`;
}

function pintarDiasFijos() {
  if (dias.nombre) dias.nombre.textContent = CONFIG.nombreCompleto;
  $$('[data-nombre]').forEach((el) => { el.textContent = CONFIG.nombre; });

  if (dias.fecha) {
    const texto = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(NACIMIENTO);
    dias.fecha.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  const signo = signoDe(NACIMIENTO);
  if (dias.signo) dias.signo.textContent = `${signo.nombre} ${signo.simbolo}`;

  if (dias.debut) {
    const edadDebut = tiempoJuntos(NACIMIENTO, DEBUT_BTS).anios;
    dias.debut.textContent = plural(edadDebut, 'año', 'años');
  }

  const prox = proximoCumple(NACIMIENTO);
  if (dias.proximoTitulo) {
    if (prox.esHoy) {
      dias.proximoTitulo.textContent = `¡Hoy cumples ${prox.edad}! 🎉`;
      dias.proximoTexto.textContent = 'Feliz cumpleaños, mi amor. Hoy todo el universo es tuyo.';
    } else if (prox.dias === 1) {
      dias.proximoTitulo.textContent = '¡Mañana es tu cumpleaños!';
      dias.proximoTexto.textContent = `Vas a cumplir ${prox.edad} y yo voy a estar ahí para celebrarte.`;
    } else {
      dias.proximoTitulo.textContent = `Faltan ${prox.dias} días`;
      dias.proximoTexto.textContent = `para tu cumpleaños número ${prox.edad}. Ya estoy contando cada uno.`;
    }
  }
  if (dias.barra) dias.barra.style.setProperty('--avance', prox.avance.toFixed(3));
}

function actualizarDias() {
  const ahora = new Date();
  const t = tiempoJuntos(NACIMIENTO, ahora);
  const ms = ahora - NACIMIENTO;

  if (dias.total) dias.total.textContent = t.total.toLocaleString('es');
  if (dias.edad) dias.edad.textContent = plural(t.anios, 'año', 'años');
  if (dias.vueltas) dias.vueltas.textContent = t.anios.toLocaleString('es');
  if (dias.detalle) {
    dias.detalle.textContent = `${plural(t.anios, 'año', 'años')}, ${plural(t.meses, 'mes', 'meses')} y ${plural(t.dias, 'día', 'días')}`;
  }
  if (dias.horas) dias.horas.textContent = String(t.horas).padStart(2, '0');
  if (dias.minutos) dias.minutos.textContent = String(t.minutos).padStart(2, '0');
  if (dias.segundos) {
    const seg = String(t.segundos).padStart(2, '0');
    if (dias.segundos.textContent !== seg) {
      dias.segundos.textContent = seg;
      dias.segundos.classList.remove('is-tick');
      void dias.segundos.offsetWidth;
      dias.segundos.classList.add('is-tick');
    }
  }
  // Un corazón late unas 80 veces por minuto (es un aproximado bonito)
  if (dias.latidos) dias.latidos.textContent = Math.floor(ms / 60000 * 80).toLocaleString('es');
  if (dias.lunas) dias.lunas.textContent = Math.floor(t.total / 29.530588).toLocaleString('es');
  if (dias.juntos && !isNaN(INICIO)) dias.juntos.textContent = tiempoJuntos(INICIO, ahora).total.toLocaleString('es');
}

if (isNaN(NACIMIENTO)) {
  console.warn('⚠️ Revisa CONFIG.fechaNacimiento en script.js. Debe verse así: 2002-10-19');
} else {
  pintarDiasFijos();
  actualizarDias();
  setInterval(actualizarDias, 1000);
}


/* ---------------------------------------------------------
   4c. LOS 7 DE BANGTAN
   Tarjetas que se voltean, fotos que cambian solas y un
   botón para elegir a su bias (los juegos lo recuerdan).
   --------------------------------------------------------- */
const carrusel = $('#members');

function pintarBias() {
  const bias = biasActual();
  $$('.member', carrusel).forEach((tarjeta) => {
    const es = Boolean(bias && tarjeta.dataset.id === bias.id);
    tarjeta.classList.toggle('is-bias', es);
    const boton = $('.member__bias', tarjeta);
    boton.setAttribute('aria-pressed', String(es));
    $('.member__bias-text', boton).textContent = es ? 'Es mi bias' : 'Mi bias';
  });
  const etiqueta = $('#biasLabel');
  if (etiqueta) {
    etiqueta.textContent = bias ? `Tu bias: ${bias.nombre} ${bias.emoji}` : 'Todavía no eliges a tu bias';
    etiqueta.classList.toggle('is-set', Boolean(bias));
  }
}

if (carrusel) {
  const formatoCumple = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' });

  BANGTAN.forEach((m) => {
    const nacio = fechaLocal(m.cumple);
    const prox = proximoCumple(nacio);
    const numeros = Array.from({ length: m.fotos }, (_, k) => k + 1);
    const orden = [m.portada, ...numeros.filter((n) => n !== m.portada)];

    const tarjeta = document.createElement('article');
    tarjeta.className = 'member';
    tarjeta.dataset.id = m.id;
    tarjeta.style.setProperty('--c', m.color);
    tarjeta.innerHTML = `
      <button class="member__flip" type="button" aria-pressed="false" aria-label="Ver los datos de ${m.nombre}">
        <span class="member__inner">
          <span class="member__front">
            <span class="member__photos">
              ${orden.map((n, k) => `<img class="member__photo${k === 0 ? ' is-active' : ''}" src="${fotoDe(m, n)}" alt="${k === 0 ? m.nombre : ''}" loading="lazy">`).join('')}
            </span>
            <span class="member__shade"></span>
            <span class="member__badge" aria-hidden="true">${m.emoji}</span>
            <span class="member__caption">
              <span class="member__kr">${m.hangul}</span>
              <span class="member__name">${m.nombre}</span>
              <span class="member__role">${m.rol}</span>
            </span>
            <span class="member__turn" aria-hidden="true">Tócame ↻</span>
          </span>
          <span class="member__back">
            <span class="member__face"><img src="${caraDe(m)}" alt="" loading="lazy"></span>
            <span class="member__real">${m.real}</span>
            <span class="member__kr2">${m.nombre} · ${m.hangul}</span>
            <span class="member__info">
              <span><b>Cumpleaños</b>${formatoCumple.format(nacio)}</span>
              <span><b>Personaje BT21</b>${m.bt21}</span>
              <span><b>Su próximo cumple</b>${prox.esHoy ? '¡Es hoy! 🎉' : `en ${prox.dias} días`}</span>
            </span>
            <span class="member__fact">${m.dato}</span>
          </span>
        </span>
      </button>
      <button class="member__bias" type="button" aria-pressed="false" aria-label="Elegir a ${m.nombre} como mi bias">
        <span aria-hidden="true">💜</span><span class="member__bias-text">Mi bias</span>
      </button>`;

    const volteo = $('.member__flip', tarjeta);
    volteo.addEventListener('click', () => {
      const abierta = tarjeta.classList.toggle('is-flipped');
      volteo.setAttribute('aria-pressed', String(abierta));
    });

    $('.member__bias', tarjeta).addEventListener('click', () => {
      const actual = biasActual();
      if (actual && actual.id === m.id) {
        guardarBias(null);
        aviso('Listo, ya no tienes bias marcado. ¡Los amas a los siete! 💜');
      } else {
        guardarBias(m.id);
        aviso(`¡${m.nombre} es tu bias! ${m.emoji} Los juegos lo van a recordar`);
        estallidoCorazones($('.member__bias', tarjeta), 12);
      }
      pintarBias();
    });

    carrusel.append(tarjeta);
  });

  pintarBias();

  // Puntitos y flechas del carrusel
  const tarjetas = $$('.member', carrusel);
  const puntos = $('#membersDots');
  tarjetas.forEach((tarjeta, i) => {
    const punto = document.createElement('button');
    punto.type = 'button';
    punto.className = 'members__dot';
    punto.setAttribute('aria-label', `Ver a ${BANGTAN[i].nombre}`);
    punto.addEventListener('click', () => centrarTarjeta(i));
    puntos?.append(punto);
  });

  function centrarTarjeta(i) {
    const tarjeta = tarjetas[Math.max(0, Math.min(tarjetas.length - 1, i))];
    carrusel.scrollTo({
      left: tarjeta.offsetLeft - (carrusel.clientWidth - tarjeta.clientWidth) / 2,
      behavior: menosMovimiento ? 'auto' : 'smooth',
    });
  }

  let centrada = 0;
  function marcarCentrada() {
    const centro = carrusel.scrollLeft + carrusel.clientWidth / 2;
    let mejor = 0;
    let distancia = Infinity;
    tarjetas.forEach((tarjeta, i) => {
      const d = Math.abs(tarjeta.offsetLeft + tarjeta.clientWidth / 2 - centro);
      if (d < distancia) { distancia = d; mejor = i; }
    });
    centrada = mejor;
    tarjetas.forEach((tarjeta, i) => tarjeta.classList.toggle('is-center', i === mejor));
    if (puntos) [...puntos.children].forEach((p, i) => p.classList.toggle('is-active', i === mejor));
  }

  let esperandoCarrusel = false;
  carrusel.addEventListener('scroll', () => {
    if (esperandoCarrusel) return;
    esperandoCarrusel = true;
    requestAnimationFrame(() => { esperandoCarrusel = false; marcarCentrada(); });
  }, { passive: true });
  window.addEventListener('resize', marcarCentrada);
  marcarCentrada();

  $('#membersPrev')?.addEventListener('click', () => centrarTarjeta(centrada - 1));
  $('#membersNext')?.addEventListener('click', () => centrarTarjeta(centrada + 1));

  // Las fotos de cada tarjeta van cambiando solas (una tarjeta a la vez)
  let carruselVisible = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { carruselVisible = e.isIntersecting; }).observe(carrusel);
  } else {
    carruselVisible = true;
  }

  if (!menosMovimiento) {
    let turno = 0;
    setInterval(() => {
      if (!carruselVisible || document.hidden) return;
      const tarjeta = tarjetas[turno % tarjetas.length];
      turno++;
      if (tarjeta.classList.contains('is-flipped')) return;
      const fotos = $$('.member__photo', tarjeta);
      if (fotos.length < 2) return;
      const actual = fotos.findIndex((f) => f.classList.contains('is-active'));
      const siguiente = fotos[(actual + 1) % fotos.length];
      if (!siguiente.complete || siguiente.naturalWidth === 0) return; // aún no carga
      fotos[actual].classList.remove('is-active');
      siguiente.classList.add('is-active');
    }, 1700);
  }
}

// "¿Sabías que…?"
const sabias = { icono: $('#sabiasIcono'), texto: $('#sabiasTexto'), boton: $('#sabiasOtro') };
if (sabias.texto && DATOS_BTS.length) {
  let datoActual = Math.floor(Math.random() * DATOS_BTS.length);
  const pintarDato = () => {
    const dato = DATOS_BTS[datoActual];
    sabias.icono.textContent = dato.icono;
    sabias.texto.textContent = dato.texto;
    const caja = sabias.texto.closest('.sabias');
    caja?.classList.remove('is-new');
    void caja?.offsetWidth;
    caja?.classList.add('is-new');
  };
  pintarDato();
  sabias.boton?.addEventListener('click', () => {
    datoActual = (datoActual + 1) % DATOS_BTS.length;
    pintarDato();
  });
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
    if (e.key === 'Escape') { e.preventDefault(); cerrarLightbox(); }
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
  ponerIcono(ui.datoIcono, carta);
  ui.datoEtiqueta.textContent = carta.tipo === 'nosotros' ? 'Nuestro recuerdo ♥' : 'Dato BTS 💜';
  ui.datoTitulo.textContent = carta.titulo;
  ui.datoTexto.textContent = carta.dato;
  animarPanelDato();

  $$('.chip', ui.coleccion).forEach((chip) => {
    chip.classList.toggle('is-selected', chip.dataset.id === String(id));
  });
}

// Muestra la foto de la carta (o su emoji) dentro de un círculo
function ponerIcono(elemento, carta) {
  elemento.classList.toggle('has-photo', Boolean(carta.foto));
  if (carta.foto) {
    elemento.innerHTML = '';
    const img = new Image();
    img.alt = '';
    img.src = carta.foto;
    img.addEventListener('error', () => { elemento.classList.remove('has-photo'); elemento.textContent = carta.icono; }, { once: true });
    elemento.append(img);
  } else {
    elemento.textContent = carta.icono;
  }
}

function mostrarInstrucciones() {
  ui.datoIcono.classList.remove('has-photo');
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
  ponerIcono(chip, CARTAS_JUEGO[id]);
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
  });

  ui.cerrar.addEventListener('click', cerrarModal);

  // Tocar fuera de la tarjeta cierra
  ui.modal.addEventListener('click', (e) => {
    if (e.target === ui.modal) cerrarModal();
  });

  // Teclado: Esc cierra y Tab no se sale de la ventana
  document.addEventListener('keydown', (e) => {
    if (!ui.modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') { e.preventDefault(); cerrarModal(); }

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
   11b. SEGUNDO JUEGO: GUSANITO BORAHAE
   Un gusanito morado come corazones en un tablero de 15 × 15.
   Los bordes no lastiman: si sale por un lado, entra por el otro.
   Solo pierde si se muerde la colita.
   (Los textos se cambian arriba, en la sección 1b)
   --------------------------------------------------------- */
const wEl = {
  escenario: $('#wStage'),
  lienzo:    $('#wCanvas'),
  capa:      $('#wOverlay'),
  capaEmoji: $('#wOvEmoji'),
  capaTitulo:$('#wOvTitle'),
  capaTexto: $('#wOvText'),
  jugar:     $('#wPlay'),
  jugarTexto:$('#wPlayText'),
  pausa:     $('#wPause'),
  puntos:    $('#wScore'),
  largo:     $('#wLength'),
  nivel:     $('#wLevel'),
  record:    $('#wBest'),
  nota:      $('#wNote'),
  notaIcono: $('#wNoteIcon'),
  notaTag:   $('#wNoteTag'),
  notaTitulo:$('#wNoteTitle'),
  notaTexto: $('#wNoteText'),
  puntitos:  $('#wDots'),
  contador:  $('#wNotesCount'),
  cada:      $('#wCada'),
};

if (wEl.escenario && wEl.lienzo && wEl.lienzo.getContext) {
  const ctx = wEl.lienzo.getContext('2d');
  const CELDAS = 15;
  const CLAVE_RECORD_G = 'gusanito-record';
  const CLAVE_NOTAS_G = 'gusanito-mensajes';
  const DIRS = {
    arriba:    { x: 0,  y: -1 },
    abajo:     { x: 0,  y: 1 },
    izquierda: { x: -1, y: 0 },
    derecha:   { x: 1,  y: 0 },
  };

  const g = {
    estado: 'listo',      // listo | jugando | pausa | fin
    cuerpo: [],           // celdas, la cabeza primero
    previo: [],           // celdas del paso anterior (para moverse suave)
    dir: DIRS.derecha,
    cola: [],             // giros pendientes
    pendiente: 0,         // segmentos por crecer
    comida: null,
    estrella: null,       // { x, y, pasos, total }
    puntos: 0,
    nivel: 1,
    ritmo: 150,           // milisegundos por paso
    fraccion: 1,          // avance entre pasos (para la pausa)
    metaHecha: false,
    muerto: false,
    finEn: 0,
  };

  let tam = 0;            // tamaño del tablero en px
  let celda = 0;          // tamaño de una celda en px
  let particulas = [];
  let visible = false;
  let raf = 0;
  let ultimoCuadro = 0;
  let ultimoPaso = 0;
  let record = leerNumeroG(CLAVE_RECORD_G);
  let notas = Math.min(leerNumeroG(CLAVE_NOTAS_G), MENSAJES_GUSANITO.length);

  if (wEl.cada) wEl.cada.textContent = GUSANITO.cadaCuantos;

  /* --- Guardado (si el navegador no deja, simplemente no guarda) --- */
  function leerNumeroG(clave) {
    try { return parseInt(localStorage.getItem(clave), 10) || 0; } catch (e) { return 0; }
  }
  function guardarNumeroG(clave, valor) {
    try { localStorage.setItem(clave, String(valor)); } catch (e) { /* sin guardado */ }
  }

  /* --- Tamaño del lienzo (nítido en pantallas retina) --- */
  function ajustarLienzo() {
    const caja = wEl.escenario.getBoundingClientRect();
    if (!caja.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    tam = caja.width;
    celda = tam / CELDAS;
    wEl.lienzo.width = Math.round(tam * dpr);
    wEl.lienzo.height = Math.round(tam * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dibujar(g.estado === 'jugando' ? 0 : g.fraccion, performance.now());
  }

  /* --- Preparar una partida --- */
  function celdaLibre() {
    const libres = [];
    for (let y = 0; y < CELDAS; y++) {
      for (let x = 0; x < CELDAS; x++) {
        const ocupada = g.cuerpo.some((s) => s.x === x && s.y === y)
          || (g.comida && g.comida.x === x && g.comida.y === y)
          || (g.estrella && g.estrella.x === x && g.estrella.y === y);
        if (!ocupada) libres.push({ x, y });
      }
    }
    return libres.length ? elegir(libres) : null;
  }

  function reiniciar() {
    const medio = Math.floor(CELDAS / 2);
    g.cuerpo = [{ x: medio, y: medio }, { x: medio - 1, y: medio }, { x: medio - 2, y: medio }];
    g.previo = g.cuerpo.map((s) => ({ ...s }));
    g.dir = DIRS.derecha;
    g.cola = [];
    g.pendiente = 0;
    g.comida = null;
    g.estrella = null;
    g.comida = celdaLibre();
    g.puntos = 0;
    g.nivel = 1;
    g.ritmo = calcularRitmo(1);
    g.fraccion = 1;
    g.metaHecha = false;
    g.muerto = false;
    particulas = [];
    pintarMarcadorG();
  }

  function calcularRitmo(nivel) {
    return Math.max(68, 150 - (nivel - 1) * 9);
  }

  /* --- Marcador --- */
  function pintarMarcadorG() {
    wEl.puntos.textContent = g.puntos;
    wEl.largo.textContent = g.cuerpo.length + g.pendiente;
    wEl.nivel.textContent = g.nivel;
    wEl.record.textContent = record ? record : '—';
  }

  function saltarito(el) {
    const caja = el && el.closest('.stat');
    if (!caja || menosMovimiento) return;
    caja.classList.remove('is-bump');
    void caja.offsetWidth;
    caja.classList.add('is-bump');
  }

  /* --- Mensajitos --- */
  function mostrarNota(nota, etiqueta) {
    wEl.notaIcono.textContent = nota.icono;
    wEl.notaTag.textContent = etiqueta;
    wEl.notaTitulo.textContent = nota.titulo;
    wEl.notaTexto.textContent = nota.texto;
    wEl.nota.classList.remove('is-new');
    void wEl.nota.offsetWidth;
    wEl.nota.classList.add('is-new');
  }

  function pintarNotas() {
    wEl.puntitos.innerHTML = '';
    MENSAJES_GUSANITO.forEach((nota, i) => {
      const abierta = i < notas;
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'worm__dot';
      boton.classList.toggle('is-open', abierta);
      boton.disabled = !abierta;
      boton.textContent = abierta ? nota.icono : '?';
      boton.setAttribute('aria-label', abierta ? `Volver a leer: ${nota.titulo}` : 'Mensajito bloqueado');
      if (abierta) boton.addEventListener('click', () => mostrarNota(nota, `Mensajito ${i + 1}`));
      wEl.puntitos.appendChild(boton);
    });
    wEl.contador.textContent = `${notas}/${MENSAJES_GUSANITO.length}`;
  }

  function desbloquearNota(mostrar = true) {
    if (notas < MENSAJES_GUSANITO.length) {
      const nota = MENSAJES_GUSANITO[notas];
      notas++;
      guardarNumeroG(CLAVE_NOTAS_G, notas);
      pintarNotas();
      const nuevo = wEl.puntitos.children[notas - 1];
      if (nuevo && !menosMovimiento) nuevo.classList.add('is-new');
      if (mostrar) mostrarNota(nota, `Mensajito ${notas} desbloqueado`);
    } else if (mostrar) {
      mostrarNota({ icono: '💜', titulo: '¡Bien hecho!', texto: elegir(ANIMOS_GUSANITO) }, `${g.puntos} corazones`);
    }
  }

  /* --- Capa de mensajes sobre el tablero --- */
  function mostrarCapa(emoji, titulo, texto, boton) {
    wEl.capaEmoji.textContent = emoji;
    wEl.capaTitulo.textContent = titulo;
    wEl.capaTexto.textContent = texto;
    wEl.jugarTexto.textContent = boton;
    wEl.capa.classList.add('is-shown');
  }

  function ocultarCapa() {
    wEl.capa.classList.remove('is-shown');
  }

  /* --- Estados del juego --- */
  function empezar() {
    reiniciar();
    g.estado = 'jugando';
    ultimoPaso = performance.now();
    ocultarCapa();
    wEl.escenario.classList.add('is-playing');
    wEl.escenario.classList.remove('is-hurt');
    wEl.escenario.focus({ preventScroll: true });
    arrancarBucle();
  }

  function pausar() {
    if (g.estado !== 'jugando') return;
    g.fraccion = Math.min(1, (performance.now() - ultimoPaso) / g.ritmo);
    g.estado = 'pausa';
    wEl.escenario.classList.remove('is-playing');
    mostrarCapa('⏸️', 'Pausa', 'El gusanito te espera 💜', 'Continuar');
  }

  function reanudar() {
    if (g.estado !== 'pausa') return;
    g.estado = 'jugando';
    ultimoPaso = performance.now() - g.fraccion * g.ritmo;
    ocultarCapa();
    wEl.escenario.classList.add('is-playing');
    wEl.escenario.focus({ preventScroll: true });
    arrancarBucle();
  }

  function alternarPausa() {
    if (g.estado === 'jugando') pausar();
    else if (g.estado === 'pausa') reanudar();
    else empezar();
  }

  function morir() {
    g.estado = 'fin';
    g.finEn = performance.now();
    g.muerto = true;
    g.previo = g.cuerpo.map((s) => ({ ...s }));
    g.fraccion = 1;
    wEl.escenario.classList.remove('is-playing');
    if (!menosMovimiento) {
      wEl.escenario.classList.remove('is-hurt');
      void wEl.escenario.offsetWidth;
      wEl.escenario.classList.add('is-hurt');
    }
    if (navigator.vibrate) navigator.vibrate(90);

    const nuevoRecord = g.puntos > record;
    if (nuevoRecord) {
      record = g.puntos;
      guardarNumeroG(CLAVE_RECORD_G, record);
      pintarMarcadorG();
    }

    const palabra = g.puntos === 1 ? 'corazón' : 'corazones';
    let texto = `Comiste ${g.puntos} ${palabra}.`;
    if (nuevoRecord && g.puntos > 0) texto += ' ¡Nuevo récord! 🎉';
    else if (record) texto += ` Tu récord es ${record}.`;

    setTimeout(() => {
      if (g.estado === 'fin') mostrarCapa('🥺', '¡Ay, se mordió la colita!', texto, 'Jugar otra vez');
      if (nuevoRecord && g.puntos >= 10 && CONFIG.confeti && !menosMovimiento) lanzarConfeti(60, true);
    }, 750);
  }

  /* --- Controles --- */
  function encolar(nombre) {
    const d = DIRS[nombre];
    const ultima = g.cola.length ? g.cola[g.cola.length - 1] : g.dir;
    if (g.cola.length >= 3 || d === ultima) return;
    if (d.x === -ultima.x && d.y === -ultima.y) return; // no puede darse la vuelta sobre sí mismo
    g.cola.push(d);
  }

  function mover(nombre) {
    if (g.estado === 'fin' && performance.now() - g.finEn < 900) return;
    if (g.estado === 'listo' || g.estado === 'fin') empezar();
    else if (g.estado === 'pausa') reanudar();
    encolar(nombre);
  }

  const TECLAS = {
    ArrowUp: 'arriba', ArrowDown: 'abajo', ArrowLeft: 'izquierda', ArrowRight: 'derecha',
    w: 'arriba', s: 'abajo', a: 'izquierda', d: 'derecha',
    W: 'arriba', S: 'abajo', A: 'izquierda', D: 'derecha',
  };

  document.addEventListener('keydown', (e) => {
    const enfocado = document.activeElement === wEl.escenario;
    if (g.estado !== 'jugando' && !enfocado) return;

    const nombre = TECLAS[e.key];
    if (nombre) {
      e.preventDefault();
      mover(nombre);
      return;
    }

    const esBoton = e.target instanceof HTMLButtonElement;
    if ((e.key === ' ' || e.key === 'p' || e.key === 'P') && !esBoton) {
      e.preventDefault();
      alternarPausa();
    } else if (e.key === 'Enter' && enfocado && g.estado !== 'jugando') {
      e.preventDefault();
      alternarPausa();
    } else if (e.key === 'Escape' && g.estado === 'jugando') {
      e.preventDefault();
      pausar();
    }
  });

  // Deslizar el dedo sobre el tablero
  let toque = null;
  wEl.escenario.addEventListener('touchstart', (e) => {
    if (g.estado !== 'jugando') return;
    const t = e.touches[0];
    toque = { x: t.clientX, y: t.clientY };
  }, { passive: true });

  wEl.escenario.addEventListener('touchmove', (e) => {
    if (!toque) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - toque.x;
    const dy = t.clientY - toque.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 22) return;
    if (Math.abs(dx) > Math.abs(dy)) mover(dx > 0 ? 'derecha' : 'izquierda');
    else mover(dy > 0 ? 'abajo' : 'arriba');
    toque = { x: t.clientX, y: t.clientY };
  }, { passive: false });

  wEl.escenario.addEventListener('touchend', () => { toque = null; });

  // Cruz de control
  $$('.worm__key[data-dir]').forEach((boton) => {
    boton.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      mover(boton.dataset.dir);
    });
  });
  wEl.pausa.addEventListener('click', alternarPausa);
  wEl.jugar.addEventListener('click', alternarPausa);

  // Pausa automática si sale de la pantalla o cambia de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausar();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      if (visible) arrancarBucle();
      else pausar();
    }, { threshold: 0.25 }).observe(wEl.escenario);
  } else {
    visible = true;
  }

  if ('ResizeObserver' in window) new ResizeObserver(ajustarLienzo).observe(wEl.escenario);
  else window.addEventListener('resize', ajustarLienzo);

  /* --- Un paso del gusanito --- */
  function paso() {
    if (g.cola.length) g.dir = g.cola.shift();

    const cabeza = g.cuerpo[0];
    const nx = (cabeza.x + g.dir.x + CELDAS) % CELDAS;
    const ny = (cabeza.y + g.dir.y + CELDAS) % CELDAS;

    const crece = g.pendiente > 0;
    const obstaculos = crece ? g.cuerpo : g.cuerpo.slice(0, -1);
    if (obstaculos.some((s) => s.x === nx && s.y === ny)) {
      morir();
      return;
    }

    g.previo = g.cuerpo.map((s) => ({ ...s }));
    g.cuerpo.unshift({ x: nx, y: ny });
    if (crece) g.pendiente--;
    else g.cuerpo.pop();

    if (g.estrella) {
      if (g.estrella.x === nx && g.estrella.y === ny) {
        const miembro = g.estrella.miembro;
        g.estrella = null;
        comer(3, nx, ny, true, miembro);
      } else if (--g.estrella.pasos <= 0) {
        g.estrella = null;
      }
    }

    if (g.comida && g.comida.x === nx && g.comida.y === ny) {
      g.comida = null;
      comer(1, nx, ny, false);
      g.comida = celdaLibre();
      if (!g.estrella && g.puntos >= 3 && Math.random() < 0.28) {
        const lugar = celdaLibre();
        if (lugar) g.estrella = { ...lugar, pasos: 52, total: 52, miembro: miembroAlAzar() };
      }
    }
  }

  function comer(valor, x, y, esEstrella, miembro = null) {
    const antes = g.puntos;
    g.puntos += valor;
    g.pendiente += 1;

    explotar(x, y, esEstrella, miembro);
    particulas.push({
      tipo: 'texto', texto: miembro ? `+${valor} ${miembro.nombre}` : `+${valor}`,
      x: Math.min(Math.max((x + 0.5) * celda, celda * 2.2), tam - celda * 2.2), y: (y + 0.2) * celda,
      vx: 0, vy: -38, vida: miembro ? 1.3 : 0.9, max: miembro ? 1.3 : 0.9, color: '#6e52b5',
    });

    // Subir de nivel cada 6 corazones
    const nivel = Math.min(10, 1 + Math.floor(g.puntos / 6));
    if (nivel > g.nivel) {
      g.nivel = nivel;
      g.ritmo = calcularRitmo(nivel);
      particulas.push({ tipo: 'aviso', texto: `¡Nivel ${nivel}!`, x: tam / 2, y: tam / 2, vx: 0, vy: -20, vida: 1.3, max: 1.3 });
      saltarito(wEl.nivel);
    }

    saltarito(wEl.puntos);
    pintarMarcadorG();

    // Meta y mensajitos
    const pasoMensaje = Math.floor(g.puntos / GUSANITO.cadaCuantos) > Math.floor(antes / GUSANITO.cadaCuantos);
    if (!g.metaHecha && g.puntos >= GUSANITO.meta) {
      g.metaHecha = true;
      if (pasoMensaje) desbloquearNota(false);
      mostrarNota(MENSAJE_META_GUSANITO, `¡Meta de ${GUSANITO.meta} corazones!`);
      if (CONFIG.confeti && !menosMovimiento) lanzarConfeti(110, true);
    } else if (pasoMensaje) {
      desbloquearNota(true);
    }
  }

  function explotar(x, y, esEstrella, miembro = null) {
    if (menosMovimiento) return;
    const cx = (x + 0.5) * celda;
    const cy = (y + 0.5) * celda;
    const cantidad = esEstrella ? 16 : 10;
    for (let i = 0; i < cantidad; i++) {
      const angulo = (Math.PI * 2 * i) / cantidad + azar(-0.3, 0.3);
      const velocidad = azar(50, 120);
      particulas.push({
        tipo: Math.random() < 0.6 ? 'corazon' : 'brillo',
        x: cx, y: cy,
        vx: Math.cos(angulo) * velocidad, vy: Math.sin(angulo) * velocidad,
        vida: azar(0.5, 0.85), max: 0.85,
        tam: azar(0.22, 0.36) * celda,
        color: miembro ? elegir([miembro.color, '#ffffff', '#f5bad0']) : elegir(COLORES),
      });
    }
  }

  /* --- Bucle de animación --- */
  function arrancarBucle() {
    if (!raf) {
      ultimoCuadro = 0;
      raf = requestAnimationFrame(bucle);
    }
  }

  function bucle(ahora) {
    raf = 0;
    const dt = ultimoCuadro ? Math.min(0.05, (ahora - ultimoCuadro) / 1000) : 0;
    ultimoCuadro = ahora;

    let t = g.fraccion;
    if (g.estado === 'jugando') {
      if (ahora - ultimoPaso > g.ritmo * 4) ultimoPaso = ahora - g.ritmo;
      while (g.estado === 'jugando' && ahora - ultimoPaso >= g.ritmo) {
        ultimoPaso += g.ritmo;
        paso();
      }
      t = g.estado === 'jugando' ? (ahora - ultimoPaso) / g.ritmo : 1;
    }

    actualizarParticulas(dt);
    dibujar(t, ahora);

    if (visible || g.estado === 'jugando') raf = requestAnimationFrame(bucle);
  }

  function actualizarParticulas(dt) {
    particulas = particulas.filter((p) => {
      p.vida -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.tipo === 'corazon' || p.tipo === 'brillo') {
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + 30 * dt;
      }
      return p.vida > 0;
    });
  }

  /* --- Dibujo --- */
  const C_INICIO = [141, 112, 208]; // lavanda (cerca de la cabeza)
  const C_FIN = [236, 155, 187];    // rosa (la colita)

  function mezclar(a, b, t, aclarar = 0) {
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * t + (255 - v) * aclarar));
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  }

  function circulo(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Dibuja algo en una celda (x, y) y, si está cruzando un borde,
  // también su "otra mitad" del lado contrario
  function enCelda(x, y, dibujo) {
    const xs = [x];
    const ys = [y];
    if (x < 0) xs.push(x + CELDAS);
    if (x > CELDAS - 1) xs.push(x - CELDAS);
    if (y < 0) ys.push(y + CELDAS);
    if (y > CELDAS - 1) ys.push(y - CELDAS);
    xs.forEach((cx) => ys.forEach((cy) => dibujo((cx + 0.5) * celda, (cy + 0.5) * celda)));
  }

  function formaCorazon(cx, cy, ancho) {
    const w = ancho;
    const h = ancho * 0.92;
    ctx.beginPath();
    ctx.moveTo(cx, cy + h * 0.5);
    ctx.bezierCurveTo(cx - w * 0.72, cy + h * 0.02, cx - w * 0.5, cy - h * 0.62, cx, cy - h * 0.2);
    ctx.bezierCurveTo(cx + w * 0.5, cy - h * 0.62, cx + w * 0.72, cy + h * 0.02, cx, cy + h * 0.5);
    ctx.closePath();
  }

  function formaEstrella(cx, cy, radio, giro) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? radio : radio * 0.48;
      const a = giro - Math.PI / 2 + (Math.PI * i) / 5;
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
  }

  function posicionesSuaves(t) {
    const ultimoPrevio = g.previo[g.previo.length - 1];
    return g.cuerpo.map((s, i) => {
      const de = g.previo[i] || ultimoPrevio || s;
      let dx = s.x - de.x;
      let dy = s.y - de.y;
      if (dx > 1) dx -= CELDAS;
      if (dx < -1) dx += CELDAS;
      if (dy > 1) dy -= CELDAS;
      if (dy < -1) dy += CELDAS;
      return { x: de.x + dx * t, y: de.y + dy * t };
    });
  }

  function dibujarTablero() {
    ctx.clearRect(0, 0, tam, tam);
    ctx.fillStyle = 'rgba(201, 182, 242, .16)';
    for (let y = 0; y < CELDAS; y++) {
      for (let x = (y % 2); x < CELDAS; x += 2) {
        ctx.fillRect(x * celda, y * celda, celda, celda);
      }
    }
  }

  function dibujarComida(ahora) {
    if (g.comida) {
      const latido = 1 + Math.sin(ahora / 160) * 0.08;
      enCelda(g.comida.x, g.comida.y, (cx, cy) => {
        ctx.save();
        ctx.shadowColor = 'rgba(217, 119, 159, .55)';
        ctx.shadowBlur = celda * 0.45;
        const grad = ctx.createLinearGradient(cx - celda / 2, cy - celda / 2, cx + celda / 2, cy + celda / 2);
        grad.addColorStop(0, '#f5a3c4');
        grad.addColorStop(1, '#9a72dc');
        formaCorazon(cx, cy + celda * 0.04, celda * 0.82 * latido);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
        circulo(cx - celda * 0.17, cy - celda * 0.12, celda * 0.08, 'rgba(255, 255, 255, .7)');
      });
    }

    // Carita de un integrante (vale triple)
    if (g.estrella) {
      const e = g.estrella;
      const restante = e.pasos / e.total;
      const parpadea = restante < 0.25 && Math.floor(ahora / 120) % 2 === 0;
      const foto = imagen(caraDe(e.miembro));
      enCelda(e.x, e.y, (cx, cy) => {
        // anillo con el tiempo que le queda
        ctx.beginPath();
        ctx.arc(cx, cy, celda * 0.68, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * restante);
        ctx.strokeStyle = e.miembro.color;
        ctx.lineWidth = celda * 0.09;
        ctx.lineCap = 'round';
        ctx.stroke();
        if (parpadea) return;
        const r = celda * 0.54 * (1 + Math.sin(ahora / 210) * 0.04);
        ctx.save();
        ctx.shadowColor = e.miembro.color;
        ctx.shadowBlur = celda * 0.6;
        circulo(cx, cy, r + celda * 0.07, '#ffffff');
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();
        if (imagenLista(foto)) {
          ctx.drawImage(foto, cx - r, cy - r, r * 2, r * 2);
        } else {
          circulo(cx, cy, r, e.miembro.color);
          ctx.font = `${Math.round(r * 1.1)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(e.miembro.emoji, cx, cy + r * 0.05);
        }
        ctx.restore();
      });
    }
  }

  function dibujarGusano(t, ahora) {
    const pos = posicionesSuaves(t);
    const total = pos.length;

    // Del final a la cabeza, para que la cabeza quede encima
    for (let i = total - 1; i >= 1; i--) {
      const avance = total <= 2 ? 1 : (i - 1) / (total - 2);
      const onda = menosMovimiento ? 1 : 1 + Math.sin(ahora / 130 - i * 0.9) * 0.05;
      const r = celda * (0.47 - avance * 0.12) * onda;
      const color = mezclar(C_INICIO, C_FIN, avance, i % 2 ? 0.1 : 0);
      enCelda(pos[i].x, pos[i].y, (cx, cy) => {
        circulo(cx, cy, r, color);
        circulo(cx - r * 0.32, cy - r * 0.36, r * 0.32, 'rgba(255, 255, 255, .35)');
      });
    }

    const cabeza = pos[0];
    const comidaCerca = g.comida && distanciaCeldas(g.cuerpo[0], g.comida) <= 2;
    enCelda(cabeza.x, cabeza.y, (cx, cy) => dibujarCabeza(cx, cy, g.dir, ahora, comidaCerca));
  }

  function distanciaCeldas(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.min(dx, CELDAS - dx) + Math.min(dy, CELDAS - dy);
  }

  function dibujarCabeza(x, y, f, ahora, bocaAbierta) {
    const r = celda * 0.58;
    const p = { x: -f.y, y: f.x }; // perpendicular a la dirección

    // Antenitas con bolita rosa
    ctx.strokeStyle = '#6e52b5';
    ctx.lineWidth = celda * 0.075;
    ctx.lineCap = 'round';
    [-1, 1].forEach((lado) => {
      const bx = x + f.x * r * 0.3 + p.x * lado * r * 0.4;
      const by = y + f.y * r * 0.3 + p.y * lado * r * 0.4;
      const tx = x + f.x * r * 1.05 + p.x * lado * r * 1.0;
      const ty = y + f.y * r * 1.05 + p.y * lado * r * 1.0;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(x + f.x * r * 1.1 + p.x * lado * r * 0.45, y + f.y * r * 1.1 + p.y * lado * r * 0.45, tx, ty);
      ctx.stroke();
      circulo(tx, ty, celda * 0.11, '#ec9bbb');
    });

    // Cabeza
    const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    grad.addColorStop(0, '#b29af0');
    grad.addColorStop(1, '#6e52b5');
    circulo(x, y, r, grad);

    // Cachetitos
    [-1, 1].forEach((lado) => {
      circulo(x - f.x * r * 0.05 + p.x * lado * r * 0.62, y - f.y * r * 0.05 + p.y * lado * r * 0.62, r * 0.17, 'rgba(250, 165, 200, .8)');
    });

    // Ojitos (parpadean de vez en cuando; ✕ ✕ si pierde)
    const parpadeo = (ahora % 3600) < 140;
    [-1, 1].forEach((lado) => {
      const ex = x + f.x * r * 0.3 + p.x * lado * r * 0.36;
      const ey = y + f.y * r * 0.3 + p.y * lado * r * 0.36;
      ctx.strokeStyle = '#2e1f52';
      ctx.lineWidth = celda * 0.07;
      if (g.muerto) {
        const k = r * 0.16;
        ctx.beginPath();
        ctx.moveTo(ex - k, ey - k); ctx.lineTo(ex + k, ey + k);
        ctx.moveTo(ex + k, ey - k); ctx.lineTo(ex - k, ey + k);
        ctx.stroke();
      } else if (parpadeo) {
        ctx.beginPath();
        ctx.moveTo(ex - p.x * r * 0.17, ey - p.y * r * 0.17);
        ctx.lineTo(ex + p.x * r * 0.17, ey + p.y * r * 0.17);
        ctx.stroke();
      } else {
        circulo(ex, ey, r * 0.25, '#ffffff');
        circulo(ex + f.x * r * 0.08, ey + f.y * r * 0.08, r * 0.14, '#2e1f52');
        circulo(ex + f.x * r * 0.04 - r * 0.05, ey + f.y * r * 0.04 - r * 0.06, r * 0.05, '#ffffff');
      }
    });

    // Boquita: se abre cuando hay un corazón cerca
    if (bocaAbierta && !g.muerto) {
      circulo(x + f.x * r * 0.74, y + f.y * r * 0.74, r * 0.15, '#3d2a6b');
    }
  }

  function dibujarParticulas() {
    particulas.forEach((p) => {
      const alfa = Math.max(0, Math.min(1, p.vida / p.max * 1.4));
      ctx.globalAlpha = alfa;
      if (p.tipo === 'corazon') {
        formaCorazon(p.x, p.y, p.tam);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (p.tipo === 'brillo') {
        formaEstrella(p.x, p.y, p.tam * 0.6, p.vida * 6);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (p.tipo === 'texto') {
        ctx.font = `600 ${Math.round(celda * 0.6)}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = p.color;
        ctx.fillText(p.texto, p.x, p.y);
      } else if (p.tipo === 'aviso') {
        ctx.font = `italic 600 ${Math.round(celda * 1.3)}px 'Playfair Display', Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = celda * 0.18;
        ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
        ctx.strokeText(p.texto, p.x, p.y);
        ctx.fillStyle = '#6e52b5';
        ctx.fillText(p.texto, p.x, p.y);
      }
    });
    ctx.globalAlpha = 1;
  }

  function dibujar(t, ahora) {
    if (!tam) return;
    dibujarTablero();
    dibujarComida(ahora);
    dibujarGusano(t, ahora);
    dibujarParticulas();
  }

  /* --- Inicio --- */
  reiniciar();
  pintarNotas();
  ajustarLienzo();
  arrancarBucle();
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
