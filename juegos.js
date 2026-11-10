/* =========================================================
   ÁLBUM DE CUMPLEAÑOS · edición Borahae 💜 — juegos.js
   La Sala de juegos y los juegos nuevos.
   (La Memoria y el Gusanito están en script.js)

   Índice
   1. Utilidades de los juegos
   2. Sala de juegos (abrir y cerrar cada juego)
   3. Torre Borahae (bloques que caen)
   4. Lluvia de amor (atrapar)
   5. ¿Quién es? (adivina el integrante)
   6. Rompecabezas

   Usa cosas de script.js: BANGTAN, caraDe, cuadradaDe,
   biasActual, miembroAlAzar, imagen, lanzarConfeti…
   ========================================================= */


/* ---------------------------------------------------------
   1. UTILIDADES DE LOS JUEGOS
   --------------------------------------------------------- */
const leerJSON = (clave) => {
  try { return JSON.parse(localStorage.getItem(clave)); } catch (e) { return null; }
};
const guardarJSON = (clave, valor) => {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin guardado */ }
};

const formatoReloj = (seg) => `${String(Math.floor(seg / 60)).padStart(2, '0')}:${String(seg % 60).padStart(2, '0')}`;
const limitar = (v, min, max) => Math.max(min, Math.min(max, v));

// Ajusta un <canvas> a su tamaño en pantalla (nítido en pantallas retina)
function prepararLienzo(lienzo, ancho, alto) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  lienzo.width = Math.max(1, Math.round(ancho * dpr));
  lienzo.height = Math.max(1, Math.round(alto * dpr));
  const ctx = lienzo.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

function trazarCorazon(ctx, cx, cy, ancho) {
  const w = ancho;
  const h = ancho * 0.92;
  ctx.beginPath();
  ctx.moveTo(cx, cy + h * 0.5);
  ctx.bezierCurveTo(cx - w * 0.72, cy + h * 0.02, cx - w * 0.5, cy - h * 0.62, cx, cy - h * 0.2);
  ctx.bezierCurveTo(cx + w * 0.5, cy - h * 0.62, cx + w * 0.72, cy + h * 0.02, cx, cy + h * 0.5);
  ctx.closePath();
}

function trazarEstrella(ctx, cx, cy, radio, giro = 0) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? radio : radio * 0.48;
    const a = giro - Math.PI / 2 + (Math.PI * i) / 5;
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
}

function trazarRedondeado(ctx, x, y, w, h, r) {
  const radio = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radio, y);
  ctx.arcTo(x + w, y, x + w, y + h, radio);
  ctx.arcTo(x + w, y + h, x, y + h, radio);
  ctx.arcTo(x, y + h, x, y, radio);
  ctx.arcTo(x, y, x + w, y, radio);
  ctx.closePath();
}

// Dibuja la carita de un integrante dentro de un círculo
function dibujarCarita(ctx, miembro, cx, cy, r, anillo = true) {
  const foto = imagen(caraDe(miembro));
  if (anillo) {
    ctx.save();
    ctx.shadowColor = miembro.color;
    ctx.shadowBlur = r * 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r + Math.max(2, r * 0.12), 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  if (imagenLista(foto)) {
    ctx.drawImage(foto, cx - r, cy - r, r * 2, r * 2);
  } else {
    ctx.fillStyle = miembro.color;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.font = `${Math.round(r * 1.1)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(miembro.emoji, cx, cy + r * 0.06);
  }
  ctx.restore();
}

// La capa con mensaje (Empezar / Pausa / ¡Perdiste!) de cada juego
function crearCapa(id) {
  const raiz = document.getElementById(id);
  if (!raiz) return null;
  const parte = (nombre) => raiz.querySelector(`[data-ov="${nombre}"]`);
  const el = {
    emoji: parte('emoji'),
    titulo: parte('titulo'),
    texto: parte('texto'),
    boton: parte('boton'),
    botonTexto: parte('boton-texto'),
  };
  return {
    boton: el.boton,
    mostrar({ emoji, titulo, texto, boton } = {}) {
      if (emoji !== undefined) el.emoji.textContent = emoji;
      if (titulo !== undefined) el.titulo.textContent = titulo;
      if (texto !== undefined) el.texto.textContent = texto;
      if (boton !== undefined) el.botonTexto.textContent = boton;
      raiz.classList.add('is-shown');
    },
    ocultar() { raiz.classList.remove('is-shown'); },
  };
}

// Corazoncitos, brillos y textos que salen volando en los lienzos
function crearParticulas() {
  let lista = [];
  return {
    estallido(x, y, colores, cantidad = 10, tam = 10, fuerza = 1) {
      if (menosMovimiento) return;
      for (let i = 0; i < cantidad; i++) {
        const angulo = (Math.PI * 2 * i) / cantidad + azar(-0.3, 0.3);
        const velocidad = azar(60, 140) * fuerza;
        lista.push({
          tipo: Math.random() < 0.6 ? 'corazon' : 'brillo',
          x, y,
          vx: Math.cos(angulo) * velocidad,
          vy: Math.sin(angulo) * velocidad,
          vida: azar(0.5, 0.9), max: 0.9,
          tam: azar(0.7, 1.2) * tam,
          color: elegir(colores),
        });
      }
    },
    texto(x, y, texto, color = '#6e52b5', tam = 18, vida = 1) {
      lista.push({ tipo: 'texto', x, y, vx: 0, vy: -38, vida, max: vida, texto, color, tam });
    },
    actualizar(dt) {
      lista = lista.filter((p) => {
        p.vida -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.tipo !== 'texto') {
          p.vx *= 0.93;
          p.vy = p.vy * 0.93 + 60 * dt;
        }
        return p.vida > 0;
      });
    },
    dibujar(ctx) {
      lista.forEach((p) => {
        ctx.globalAlpha = limitar((p.vida / p.max) * 1.5, 0, 1);
        if (p.tipo === 'corazon') {
          trazarCorazon(ctx, p.x, p.y, p.tam);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.tipo === 'brillo') {
          trazarEstrella(ctx, p.x, p.y, p.tam * 0.55, p.vida * 5);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          ctx.font = `600 ${Math.round(p.tam)}px Poppins, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.lineJoin = 'round';
          ctx.lineWidth = Math.max(3, p.tam / 4.5);
          ctx.strokeStyle = 'rgba(255, 255, 255, .92)';
          ctx.strokeText(p.texto, p.x, p.y);
          ctx.fillStyle = p.color;
          ctx.fillText(p.texto, p.x, p.y);
        }
      });
      ctx.globalAlpha = 1;
    },
    limpiar() { lista = []; },
    get cantidad() { return lista.length; },
  };
}

// Botón que actúa apenas lo tocas (sin esperar a soltar)
function botonRapido(boton, accion) {
  boton.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button > 0) return;
    e.preventDefault();
    accion();
  });
  boton.addEventListener('click', (e) => { if (e.detail === 0) accion(); }); // teclado
  boton.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Botón que repite su acción mientras se mantiene presionado
function botonRepetible(boton, accion, espera = 170, cada = 55) {
  let primero = 0;
  let repetir = 0;
  const parar = () => { clearTimeout(primero); clearInterval(repetir); };
  boton.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button > 0) return;
    e.preventDefault();
    try { boton.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
    parar();
    accion();
    primero = setTimeout(() => { repetir = setInterval(accion, cada); }, espera);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => boton.addEventListener(ev, parar));
  boton.addEventListener('click', (e) => { if (e.detail === 0) accion(); });
  boton.addEventListener('contextmenu', (e) => e.preventDefault());
}

const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));


/* ---------------------------------------------------------
   2. SALA DE JUEGOS
   Cada tarjeta abre su juego en pantalla completa. El botón
   "atrás" del celular también lo cierra.
   --------------------------------------------------------- */
const SALA = (() => {
  const ganchos = {};
  let actual = null;
  let origen = null;
  let conHistorial = false;
  let temporizadorCierre = 0;
  const fondo = () => $$('.hero, main, .footer, .dock, .music-btn');

  const RECORDS = {
    memoria: () => {
      const r = leerJSON('memoria-borahae-record');
      return r ? `Récord: ${r.movimientos} movimientos` : '';
    },
    gusanito: () => {
      const r = Number(leerJSON('gusanito-record')) || 0;
      return r ? `Récord: ${r} corazones` : '';
    },
    torre: () => {
      const r = Number(leerJSON('torre-record')) || 0;
      return r ? `Récord: ${r.toLocaleString('es')} puntos` : '';
    },
    lluvia: () => {
      const r = Number(leerJSON('lluvia-record')) || 0;
      return r ? `Récord: ${r.toLocaleString('es')} puntos` : '';
    },
    quien: () => {
      const r = Number(leerJSON('quien-record')) || 0;
      return r ? `Récord: ${r} puntos` : '';
    },
    puzzle: () => {
      const r = leerJSON('puzzle-record') || {};
      const partes = [];
      if (r[3]) partes.push(`3×3 en ${r[3]}`);
      if (r[4]) partes.push(`4×4 en ${r[4]}`);
      return partes.length ? `Récord: ${partes.join(' · ')} mov.` : '';
    },
  };

  function pintarRecords() {
    $$('[data-record]').forEach((el) => {
      const texto = RECORDS[el.dataset.record]?.() || '';
      el.textContent = texto || 'Sin récord aún';
      el.classList.toggle('has-record', Boolean(texto));
    });
  }

  let carasListas = false;
  function precargarCaras() {
    if (carasListas) return;
    carasListas = true;
    BANGTAN.forEach((m) => imagen(caraDe(m)));
  }

  function abrir(id, boton) {
    const sala = document.getElementById(`sala-${id}`);
    if (!sala || actual === id) return;
    if (actual) cerrar(true);
    clearTimeout(temporizadorCierre);
    actual = id;
    origen = boton || document.activeElement;
    precargarCaras();

    sala.classList.remove('is-closing');
    sala.classList.add('is-open');
    sala.scrollTop = 0;
    document.documentElement.classList.add('sala-abierta');
    fondo().forEach((el) => { el.inert = true; });

    try {
      history.pushState({ sala: id }, '');
      conHistorial = true;
    } catch (e) {
      conHistorial = false;
    }

    ganchos[id]?.abrir?.();
    requestAnimationFrame(() => $('[data-cerrar-sala]', sala)?.focus({ preventScroll: true }));
  }

  function cerrar(desdeHistorial = false) {
    if (!actual) return;
    const id = actual;
    const sala = document.getElementById(`sala-${id}`);
    actual = null;
    ganchos[id]?.cerrar?.();

    sala.classList.add('is-closing');
    temporizadorCierre = setTimeout(() => sala.classList.remove('is-open', 'is-closing'), menosMovimiento ? 0 : 240);
    document.documentElement.classList.remove('sala-abierta');
    fondo().forEach((el) => { el.inert = false; });
    pintarRecords();

    if (!desdeHistorial && conHistorial && history.state && history.state.sala) history.back();
    conHistorial = false;
    origen?.focus?.({ preventScroll: true });
  }

  window.addEventListener('popstate', () => { if (actual) cerrar(true); });

  $$('[data-abrir-sala]').forEach((boton) => {
    boton.addEventListener('click', () => abrir(boton.dataset.abrirSala, boton));
  });
  $$('[data-cerrar-sala]').forEach((boton) => boton.addEventListener('click', () => cerrar()));

  pintarRecords();

  return {
    abrir,
    cerrar,
    pintarRecords,
    al(id, opciones) { ganchos[id] = opciones; },
    get actual() { return actual; },
  };
})();

// La Memoria (de script.js): al abrirla, reparte las cartas con animación
SALA.al('memoria', {
  abrir() {
    const juego = $('#sala-memoria .game');
    if (!juego) return;
    juego.classList.add('is-visible');
    if (typeof partida !== 'undefined' && partida && partida.movimientos === 0 && !partida.inicio && typeof nuevoJuego === 'function') {
      nuevoJuego();
    }
  },
});


/* ---------------------------------------------------------
   3. TORRE BORAHAE
   Bloques que caen: cada integrante es una pieza distinta.
   Completa una fila para que desaparezca. Cuatro filas a la
   vez es un ¡BORAHAE!
   --------------------------------------------------------- */
(() => {
  const el = {
    escenario: $('#tStage'),
    lienzo: $('#tCanvas'),
    siguiente: $('#tNext'),
    siguienteNombre: $('#tNextName'),
    puntos: $('#tScore'),
    lineas: $('#tLines'),
    nivel: $('#tLevel'),
    record: $('#tBest'),
    pausa: $('#tPause'),
  };
  if (!el.escenario || !el.lienzo) return;

  const capa = crearCapa('tOverlay');
  const COLS = 10;
  const FILAS = 20;
  const OCULTAS = 2;            // filas de arriba donde aparecen las piezas
  const VISIBLES = FILAS - OCULTAS;
  const CLAVE = 'torre-record';
  const FORMAS = [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[1, 1], [1, 1]],                                         // O
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],                        // T
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],                        // S
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],                        // Z
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],                        // J
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],                        // L
  ];
  const PIEZAS = BANGTAN.slice(0, 7).map((miembro, i) => ({ miembro, forma: FORMAS[i % FORMAS.length] }));
  const PUNTOS_LINEAS = [0, 100, 300, 500, 800];
  const NOMBRES_LINEAS = ['', '¡Línea!', '¡Doble!', '¡Triple!', '¡BORAHAE! 💜'];

  const t = {
    estado: 'listo',        // listo | jugando | limpiando | pausa | fin
    tablero: [],
    pieza: null,            // { indice, forma, x, y }
    siguiente: 0,
    bolsa: [],
    puntos: 0,
    lineas: 0,
    nivel: 1,
    caida: 800,
    ultimaCaida: 0,
    bloqueoDesde: 0,
    reinicios: 0,
    filasLimpiando: [],
    limpiandoDesde: 0,
  };

  let record = Number(leerJSON(CLAVE)) || 0;
  let ctx = null;
  let ctxSig = null;
  let ancho = 0;
  let alto = 0;
  let celda = 20;
  let ox = 0;
  let oy = 0;
  let azulejos = [];
  let abierta = false;
  let raf = 0;
  let ultimoCuadro = 0;
  const part = crearParticulas();

  const ritmo = (nivel) => Math.max(75, Math.round(800 * Math.pow(0.84, nivel - 1)));
  const tableroVacio = () => Array.from({ length: FILAS }, () => Array(COLS).fill(-1));

  function sacarDeBolsa() {
    if (!t.bolsa.length) t.bolsa = barajar(PIEZAS.map((_, i) => i));
    return t.bolsa.pop();
  }

  function choca(forma, x, y) {
    for (let r = 0; r < forma.length; r++) {
      for (let c = 0; c < forma[r].length; c++) {
        if (!forma[r][c]) continue;
        const nx = x + c;
        const ny = y + r;
        if (nx < 0 || nx >= COLS || ny >= FILAS) return true;
        if (ny >= 0 && t.tablero[ny][nx] !== -1) return true;
      }
    }
    return false;
  }

  function girarForma(forma, sentido) {
    const n = forma.length;
    return forma.map((fila, r) => fila.map((_, c) => (sentido > 0 ? forma[n - 1 - c][r] : forma[c][n - 1 - r])));
  }

  const enSuelo = () => t.pieza && choca(t.pieza.forma, t.pieza.x, t.pieza.y + 1);

  // Mover o girar en el suelo da un poquito más de tiempo antes de fijar la pieza
  function darTiempo() {
    if (enSuelo() && t.reinicios < 15) {
      t.bloqueoDesde = performance.now();
      t.reinicios++;
    }
  }

  function aparecer() {
    const indice = t.siguiente;
    t.siguiente = sacarDeBolsa();
    const forma = PIEZAS[indice].forma.map((fila) => [...fila]);
    t.pieza = { indice, forma, x: Math.floor((COLS - forma[0].length) / 2), y: OCULTAS - 1 };
    t.bloqueoDesde = 0;
    t.reinicios = 0;
    t.ultimaCaida = performance.now();
    pintarSiguiente();
    if (choca(t.pieza.forma, t.pieza.x, t.pieza.y)) terminar();
  }

  function mover(dx) {
    if (t.estado !== 'jugando') return false;
    if (choca(t.pieza.forma, t.pieza.x + dx, t.pieza.y)) return false;
    t.pieza.x += dx;
    darTiempo();
    return true;
  }

  function girar(sentido = 1) {
    if (t.estado !== 'jugando') return;
    const pieza = t.pieza;
    if (pieza.forma.length === 2) return; // la pieza cuadrada no cambia
    const nueva = girarForma(pieza.forma, sentido);
    const empujes = [[0, 0], [-1, 0], [1, 0], [0, -1], [-2, 0], [2, 0], [0, 1]];
    for (const [ex, ey] of empujes) {
      if (!choca(nueva, pieza.x + ex, pieza.y + ey)) {
        pieza.forma = nueva;
        pieza.x += ex;
        pieza.y += ey;
        darTiempo();
        return;
      }
    }
  }

  function bajar(suave) {
    if (t.estado !== 'jugando') return false;
    if (choca(t.pieza.forma, t.pieza.x, t.pieza.y + 1)) return false;
    t.pieza.y++;
    t.bloqueoDesde = 0;
    t.reinicios = 0;
    t.ultimaCaida = performance.now();
    if (suave) {
      t.puntos += 1;
      pintarMarcador();
    }
    return true;
  }

  function soltar() {
    if (t.estado !== 'jugando') return;
    let distancia = 0;
    while (!choca(t.pieza.forma, t.pieza.x, t.pieza.y + 1)) {
      t.pieza.y++;
      distancia++;
    }
    t.puntos += distancia * 2;
    fijar();
  }

  function fijar() {
    const { forma, x, y, indice } = t.pieza;
    let todoOculto = true;
    forma.forEach((fila, r) => fila.forEach((v, c) => {
      if (!v) return;
      if (y + r >= 0) t.tablero[y + r][x + c] = indice;
      if (y + r >= OCULTAS) todoOculto = false;
    }));
    t.pieza = null;

    if (todoOculto) {
      terminar();
      return;
    }

    const llenas = [];
    t.tablero.forEach((fila, r) => { if (fila.every((v) => v !== -1)) llenas.push(r); });

    if (!llenas.length) {
      pintarMarcador();
      aparecer();
      return;
    }

    // ¡Filas completas!
    const n = llenas.length;
    t.puntos += PUNTOS_LINEAS[n] * t.nivel;
    t.lineas += n;
    t.filasLimpiando = llenas;
    t.limpiandoDesde = performance.now();
    t.estado = 'limpiando';

    llenas.forEach((r) => {
      for (let c = 0; c < COLS; c += 2) {
        const v = t.tablero[r][c];
        const color = v >= 0 ? PIEZAS[v].miembro.color : '#c9b6f2';
        part.estallido(ox + (c + 0.5) * celda, oy + (r - OCULTAS + 0.5) * celda, [color, '#ffffff', '#f5bad0'], 3, celda * 0.5, 0.8);
      }
    });
    const medioY = oy + (llenas.reduce((a, b) => a + b, 0) / n - OCULTAS + 0.5) * celda;
    part.texto(ancho / 2, medioY, NOMBRES_LINEAS[n], n === 4 ? '#c2629a' : '#6e52b5', Math.max(18, celda * (n === 4 ? 1.1 : 0.9)), 1.2);
    if (n === 4 && CONFIG.confeti && !menosMovimiento) lanzarConfeti(70, true);
    if (navigator.vibrate) navigator.vibrate(n === 4 ? [30, 40, 30] : 20);

    const nivel = 1 + Math.floor(t.lineas / 8);
    if (nivel > t.nivel) {
      t.nivel = nivel;
      t.caida = ritmo(nivel);
      setTimeout(() => part.texto(ancho / 2, alto * 0.35, `¡Nivel ${nivel}!`, '#9c7a36', Math.max(20, celda * 1.05), 1.3), 350);
    }
    pintarMarcador();
  }

  function terminarLimpieza() {
    const filas = new Set(t.filasLimpiando);
    t.tablero = t.tablero.filter((_, r) => !filas.has(r));
    while (t.tablero.length < FILAS) t.tablero.unshift(Array(COLS).fill(-1));
    t.filasLimpiando = [];
    t.estado = 'jugando';
    aparecer();
  }

  function pintarMarcador() {
    el.puntos.textContent = t.puntos.toLocaleString('es');
    el.lineas.textContent = t.lineas;
    el.nivel.textContent = t.nivel;
    el.record.textContent = record ? record.toLocaleString('es') : '—';
  }

  function pintarSiguiente() {
    const pieza = PIEZAS[t.siguiente];
    if (!pieza || !ctxSig) return;
    el.siguienteNombre.textContent = `${pieza.miembro.nombre} ${pieza.miembro.emoji}`;
    const lado = el.siguiente.clientWidth || 64;
    ctxSig.clearRect(0, 0, lado, lado);
    const forma = pieza.forma;
    const filasUsadas = forma.map((fila, r) => (fila.some(Boolean) ? r : -1)).filter((r) => r >= 0);
    const colsUsadas = forma[0].map((_, c) => (forma.some((fila) => fila[c]) ? c : -1)).filter((c) => c >= 0);
    const cs = Math.min(lado / 4.4, lado / (colsUsadas.length + 0.6));
    const ancho0 = colsUsadas.length * cs;
    const alto0 = filasUsadas.length * cs;
    filasUsadas.forEach((r, i) => colsUsadas.forEach((c, j) => {
      if (!forma[r][c]) return;
      const az = azulejos[t.siguiente];
      if (az) ctxSig.drawImage(az.lienzo, (lado - ancho0) / 2 + j * cs, (lado - alto0) / 2 + i * cs, cs, cs);
    }));
  }

  // Un azulejo pre-dibujado por integrante: marco de su color + su carita
  function crearAzulejos() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const lado = Math.max(8, Math.round(celda * dpr));
    azulejos = PIEZAS.map(({ miembro }) => {
      const lienzo = document.createElement('canvas');
      lienzo.width = lado;
      lienzo.height = lado;
      const g = lienzo.getContext('2d');
      const borde = lado * 0.05;
      const radio = lado * 0.24;
      trazarRedondeado(g, borde, borde, lado - borde * 2, lado - borde * 2, radio);
      g.fillStyle = miembro.color;
      g.fill();

      const foto = imagen(caraDe(miembro));
      const dentro = lado * 0.14;
      g.save();
      trazarRedondeado(g, dentro, dentro, lado - dentro * 2, lado - dentro * 2, radio * 0.7);
      g.clip();
      if (imagenLista(foto)) {
        g.drawImage(foto, dentro, dentro, lado - dentro * 2, lado - dentro * 2);
      } else {
        g.fillStyle = 'rgba(255, 255, 255, .4)';
        g.fillRect(0, 0, lado, lado);
        g.font = `${Math.round(lado * 0.42)}px sans-serif`;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(miembro.emoji, lado / 2, lado / 2 + lado * 0.04);
      }
      g.restore();

      const brillo = g.createLinearGradient(0, 0, 0, lado);
      brillo.addColorStop(0, 'rgba(255, 255, 255, .5)');
      brillo.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
      trazarRedondeado(g, borde, borde, lado - borde * 2, lado - borde * 2, radio);
      g.fillStyle = brillo;
      g.fill();
      g.lineWidth = Math.max(1, lado * 0.035);
      g.strokeStyle = 'rgba(255, 255, 255, .75)';
      g.stroke();
      return { lienzo, listo: imagenLista(foto) };
    });
    pintarSiguiente();
  }

  function ajustar() {
    const caja = el.escenario.getBoundingClientRect();
    if (!caja.width || !caja.height) return;
    ancho = caja.width;
    alto = caja.height;
    ctx = prepararLienzo(el.lienzo, ancho, alto);
    celda = Math.min(ancho / COLS, alto / VISIBLES);
    ox = (ancho - celda * COLS) / 2;
    oy = (alto - celda * VISIBLES) / 2;
    const lado = el.siguiente.clientWidth || 64;
    ctxSig = prepararLienzo(el.siguiente, lado, lado);
    crearAzulejos();
    dibujar(performance.now());
  }

  function dibujarAzulejo(indice, c, r, alfa = 1) {
    const az = azulejos[indice];
    if (!az || r < 0) return;
    ctx.globalAlpha = alfa;
    ctx.drawImage(az.lienzo, ox + c * celda, oy + r * celda, celda, celda);
    ctx.globalAlpha = 1;
  }

  function dibujar(ahora) {
    if (!ctx) return;
    // Cuando cargan las caritas, se vuelven a pintar los azulejos
    if (azulejos.some((az, i) => !az.listo && imagenLista(imagen(caraDe(PIEZAS[i].miembro))))) crearAzulejos();

    ctx.clearRect(0, 0, ancho, alto);

    // Cuadrícula suave
    ctx.fillStyle = 'rgba(201, 182, 242, .17)';
    for (let r = 0; r < VISIBLES; r++) {
      for (let c = 0; c < COLS; c++) {
        trazarRedondeado(ctx, ox + c * celda + celda * 0.08, oy + r * celda + celda * 0.08, celda * 0.84, celda * 0.84, celda * 0.2);
        ctx.fill();
      }
    }

    // Bloques fijos
    for (let r = OCULTAS; r < FILAS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = t.tablero[r] ? t.tablero[r][c] : -1;
        if (v >= 0) dibujarAzulejo(v, c, r - OCULTAS);
      }
    }

    // Filas que se están borrando: destello blanco
    if (t.estado === 'limpiando') {
      const avance = limitar((ahora - t.limpiandoDesde) / 280, 0, 1);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.35 + 0.6 * Math.abs(Math.sin(avance * Math.PI * 2))})`;
      t.filasLimpiando.forEach((r) => {
        trazarRedondeado(ctx, ox, oy + (r - OCULTAS) * celda, celda * COLS, celda, celda * 0.3);
        ctx.fill();
      });
    }

    // Sombra (dónde va a caer) y pieza actual
    if (t.pieza && (t.estado === 'jugando' || t.estado === 'pausa')) {
      const { forma, x, y, indice } = t.pieza;
      let sombraY = y;
      while (!choca(forma, x, sombraY + 1)) sombraY++;
      forma.forEach((fila, r) => fila.forEach((v, c) => {
        if (v && sombraY + r >= OCULTAS) dibujarAzulejo(indice, x + c, sombraY + r - OCULTAS, 0.22);
      }));
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, oy, ancho, alto);
      ctx.clip();
      forma.forEach((fila, r) => fila.forEach((v, c) => {
        if (v) dibujarAzulejo(indice, x + c, y + r - OCULTAS);
      }));
      ctx.restore();
    }

    part.dibujar(ctx);
  }

  function bucle(ahora) {
    raf = 0;
    const dt = ultimoCuadro ? Math.min(0.05, (ahora - ultimoCuadro) / 1000) : 0;
    ultimoCuadro = ahora;

    if (t.estado === 'jugando') {
      if (ahora - t.ultimaCaida >= t.caida) {
        bajar(false);
        t.ultimaCaida = ahora;
      }
      if (t.estado === 'jugando' && enSuelo()) {
        if (!t.bloqueoDesde) t.bloqueoDesde = ahora;
        if (ahora - t.bloqueoDesde >= 480) fijar();
      } else {
        t.bloqueoDesde = 0;
      }
    } else if (t.estado === 'limpiando' && ahora - t.limpiandoDesde >= 280) {
      terminarLimpieza();
    }

    part.actualizar(dt);
    dibujar(ahora);
    if (abierta) raf = requestAnimationFrame(bucle);
  }

  function arrancar() {
    if (!raf) {
      ultimoCuadro = 0;
      raf = requestAnimationFrame(bucle);
    }
  }

  function empezar() {
    t.tablero = tableroVacio();
    t.bolsa = [];
    t.puntos = 0;
    t.lineas = 0;
    t.nivel = 1;
    t.caida = ritmo(1);
    t.filasLimpiando = [];
    part.limpiar();
    t.siguiente = sacarDeBolsa();
    t.estado = 'jugando';
    aparecer();
    capa.ocultar();
    el.escenario.classList.add('is-playing');
    pintarMarcador();
    el.escenario.focus({ preventScroll: true });
  }

  function pausar() {
    if (t.estado === 'limpiando') terminarLimpieza();
    if (t.estado !== 'jugando') return;
    t.estado = 'pausa';
    el.escenario.classList.remove('is-playing');
    capa.mostrar({ emoji: '⏸️', titulo: 'Pausa', texto: 'La torre te espera 💜', boton: 'Continuar' });
  }

  function reanudar() {
    if (t.estado !== 'pausa') return;
    t.estado = 'jugando';
    t.ultimaCaida = performance.now();
    t.bloqueoDesde = 0;
    capa.ocultar();
    el.escenario.classList.add('is-playing');
    el.escenario.focus({ preventScroll: true });
  }

  function terminar() {
    t.estado = 'fin';
    t.finEn = performance.now();
    el.escenario.classList.remove('is-playing');
    const nuevo = t.puntos > record;
    if (nuevo) {
      record = t.puntos;
      guardarJSON(CLAVE, record);
    }
    pintarMarcador();
    if (navigator.vibrate) navigator.vibrate(90);
    let texto = `Hiciste ${t.puntos.toLocaleString('es')} puntos y ${t.lineas} ${t.lineas === 1 ? 'línea' : 'líneas'}.`;
    if (nuevo && t.puntos > 0) texto += ' ¡Nuevo récord! 🎉';
    else if (record) texto += ` Tu récord es ${record.toLocaleString('es')}.`;
    setTimeout(() => {
      if (t.estado !== 'fin') return;
      capa.mostrar({ emoji: '🏰', titulo: '¡Se llenó la torre!', texto, boton: 'Jugar otra vez' });
      if (nuevo && t.puntos >= 1500 && CONFIG.confeti && !menosMovimiento) lanzarConfeti(80, true);
    }, 500);
  }

  // Acción de un botón: si no está jugando, primero empieza o continúa
  // Recién perdió: espera un ratito para que vea su puntaje
  const muyPronto = () => t.estado === 'fin' && performance.now() - (t.finEn || 0) < 1300;

  function accionar(fn) {
    if (muyPronto()) return;
    if (t.estado === 'listo' || t.estado === 'fin') { empezar(); return; }
    if (t.estado === 'pausa') { reanudar(); return; }
    fn();
  }

  capa.boton.addEventListener('click', () => (t.estado === 'pausa' ? reanudar() : empezar()));
  el.pausa.addEventListener('click', () => {
    if (t.estado === 'jugando' || t.estado === 'limpiando') pausar();
    else if (t.estado === 'pausa') reanudar();
  });

  $$('#sala-torre .pad-btn').forEach((boton) => {
    const accion = boton.dataset.accion;
    if (accion === 'izquierda') botonRepetible(boton, () => accionar(() => mover(-1)));
    else if (accion === 'derecha') botonRepetible(boton, () => accionar(() => mover(1)));
    else if (accion === 'abajo') botonRepetible(boton, () => accionar(() => bajar(true)), 120, 45);
    else if (accion === 'rotar') botonRapido(boton, () => accionar(() => girar(1)));
    else if (accion === 'soltar') botonRapido(boton, () => accionar(soltar));
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (SALA.actual !== 'torre') return;
    const k = e.key;
    if (t.estado === 'jugando') {
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { e.preventDefault(); mover(-1); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { e.preventDefault(); mover(1); }
      else if (k === 'ArrowDown' || k === 's' || k === 'S') { e.preventDefault(); bajar(true); }
      else if (k === 'ArrowUp' || k === 'x' || k === 'X' || k === 'w' || k === 'W') { e.preventDefault(); girar(1); }
      else if (k === 'z' || k === 'Z') { e.preventDefault(); girar(-1); }
      else if (k === ' ') { e.preventDefault(); soltar(); }
      else if (k === 'p' || k === 'P' || k === 'Escape') { e.preventDefault(); pausar(); }
    } else if (t.estado === 'limpiando') {
      if (k === 'Escape' || k === 'p' || k === 'P') { e.preventDefault(); pausar(); }
      else if (k.startsWith('Arrow') || k === ' ') e.preventDefault();
    } else if (t.estado === 'pausa') {
      if (k === 'p' || k === 'P' || ((k === ' ' || k === 'Enter') && !(e.target instanceof HTMLButtonElement))) {
        e.preventDefault();
        reanudar();
      }
    } else if ((k === 'Enter' || k === ' ') && !(e.target instanceof HTMLButtonElement)) {
      e.preventDefault();
      if (!muyPronto()) empezar();
    }
  });

  // Gestos sobre el tablero: deslizar mueve, tocar gira, deslizar rápido abajo suelta
  let gesto = null;
  el.lienzo.addEventListener('pointerdown', (e) => {
    if (t.estado !== 'jugando') return;
    gesto = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, inicio: performance.now(), movio: false };
    try { el.lienzo.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
  });
  el.lienzo.addEventListener('pointermove', (e) => {
    if (!gesto || e.pointerId !== gesto.id || t.estado !== 'jugando') return;
    const paso = celda * 0.9;
    while (e.clientX - gesto.x >= paso) { mover(1); gesto.x += paso; gesto.movio = true; }
    while (e.clientX - gesto.x <= -paso) { mover(-1); gesto.x -= paso; gesto.movio = true; }
    while (e.clientY - gesto.y >= celda) { bajar(true); gesto.y += celda; gesto.movio = true; }
    if (e.clientY < gesto.y) gesto.y = e.clientY;
  });
  el.lienzo.addEventListener('pointerup', (e) => {
    if (!gesto || e.pointerId !== gesto.id) return;
    const duracion = performance.now() - gesto.inicio;
    const dx = e.clientX - gesto.x0;
    const dy = e.clientY - gesto.y0;
    if (t.estado === 'jugando') {
      if (!gesto.movio && Math.hypot(dx, dy) < 12 && duracion < 320) girar(1);
      else if (dy > celda * 2.2 && duracion < 300 && Math.abs(dy) > Math.abs(dx) * 1.5) soltar();
    }
    gesto = null;
  });
  el.lienzo.addEventListener('pointercancel', () => { gesto = null; });

  document.addEventListener('visibilitychange', () => { if (document.hidden) pausar(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { if (abierta) ajustar(); }).observe(el.escenario);

  SALA.al('torre', {
    abrir() {
      abierta = true;
      t.tablero = t.tablero.length ? t.tablero : tableroVacio();
      if (t.estado === 'listo') t.siguiente = sacarDeBolsa();
      ajustar();
      pintarMarcador();
      arrancar();
    },
    cerrar() {
      pausar();
      abierta = false;
    },
  });
})();


/* ---------------------------------------------------------
   4. LLUVIA DE AMOR
   Mueve la nubecita y atrapa lo que cae:
   corazón +1 · carita +5 (tu bias +10) · estrella = puntos dobles
   Las nubes de tormenta quitan una vida.
   --------------------------------------------------------- */
(() => {
  const el = {
    escenario: $('#lStage'),
    lienzo: $('#lCanvas'),
    vidas: $('#lLives'),
    puntos: $('#lScore'),
    record: $('#lBest'),
  };
  if (!el.escenario || !el.lienzo) return;

  const capa = crearCapa('lOverlay');
  const CLAVE = 'lluvia-record';
  const VIDAS = 3;
  // ✏️ Frases que aparecen al llegar a ciertos puntos
  const FRASES = [
    [50, '¡Eres increíble! 💜'],
    [120, '¡Qué reflejos, mi amor!'],
    [250, 'Así atrapaste mi corazón 💘'],
    [400, '¡ARMY imparable!'],
    [600, 'Bangtan estaría orgulloso 💜'],
  ];

  const s = {
    estado: 'listo',   // listo | jugando | pausa | fin
    puntos: 0,
    vidas: VIDAS,
    objetos: [],
    x: 0.5,
    objetivo: 0.5,
    tiempo: 0,
    proximo: 0,
    combo: 0,
    doble: 0,
    golpe: 0,
    feliz: 0,
    frase: 0,
  };
  let record = Number(leerJSON(CLAVE)) || 0;
  let ctx = null;
  let W = 0;
  let H = 0;
  let abierta = false;
  let raf = 0;
  let ultimoCuadro = 0;
  const teclas = { izquierda: false, derecha: false };
  const part = crearParticulas();

  function ajustar() {
    const caja = el.escenario.getBoundingClientRect();
    if (!caja.width || !caja.height) return;
    W = caja.width;
    H = caja.height;
    ctx = prepararLienzo(el.lienzo, W, H);
    dibujar(performance.now());
  }

  function pintarMarcador() {
    el.puntos.textContent = s.puntos.toLocaleString('es');
    el.record.textContent = record ? record.toLocaleString('es') : '—';
    el.vidas.textContent = '♥'.repeat(Math.max(0, s.vidas)) + '♡'.repeat(Math.max(0, VIDAS - s.vidas));
  }

  function generar() {
    const dificultad = Math.min(1, s.tiempo / 100);
    const r = Math.random();
    const pTormenta = 0.13 + dificultad * 0.15;
    let tipo = 'corazon';
    if (r < pTormenta) tipo = 'tormenta';
    else if (r < pTormenta + 0.045) tipo = 'estrella';
    else if (r < pTormenta + 0.045 + 0.24) tipo = 'cara';
    s.objetos.push({
      tipo,
      miembro: tipo === 'cara' ? miembroAlAzar() : null,
      x: azar(0.09, 0.91),
      y: -0.08,
      v: (0.26 + dificultad * 0.32) * azar(0.85, 1.15) * (tipo === 'cara' ? 0.92 : 1),
      fase: azar(0, Math.PI * 2),
    });
    s.proximo = (0.9 - dificultad * 0.5) * azar(0.75, 1.2);
  }

  function radioDe(obj) {
    if (obj.tipo === 'cara') return W * 0.072;
    if (obj.tipo === 'tormenta') return W * 0.075;
    return W * 0.05;
  }

  function atrapar(obj, px, py) {
    const bias = biasActual();
    const multi = s.doble > 0 ? 2 : 1;
    if (obj.tipo === 'tormenta') {
      s.vidas--;
      s.golpe = 0.6;
      s.combo = 0;
      part.texto(px, py - W * 0.12, '¡Ay!', '#6e52b5', Math.max(18, W * 0.06), 0.9);
      if (navigator.vibrate) navigator.vibrate(80);
      pintarMarcador();
      if (s.vidas <= 0) terminar();
      return;
    }

    s.combo++;
    s.feliz = 0.35;
    let ganados = 0;
    if (obj.tipo === 'corazon') {
      ganados = 1 * multi;
      part.estallido(px, py - W * 0.05, ['#f5a3c4', '#c9b6f2', '#ffffff'], 7, W * 0.035);
      part.texto(px, py - W * 0.12, `+${ganados}`, '#c2629a', Math.max(15, W * 0.045), 0.7);
    } else if (obj.tipo === 'cara') {
      const esBias = Boolean(bias && obj.miembro.id === bias.id);
      ganados = (esBias ? 10 : 5) * multi;
      part.estallido(px, py - W * 0.05, [obj.miembro.color, '#ffffff', '#f5bad0'], 12, W * 0.04);
      const textoX = limitar(px, W * 0.25, W * 0.75);
      part.texto(textoX, py - W * 0.13, `+${ganados} ${obj.miembro.nombre}${esBias ? ' 💜' : ''}`, '#6e52b5', Math.max(15, W * 0.048), 1.1);
    } else if (obj.tipo === 'estrella') {
      s.doble = 7;
      part.estallido(px, py - W * 0.05, ['#f3c66e', '#ecd9a9', '#ffffff'], 14, W * 0.04);
      part.texto(W / 2, H * 0.4, '¡Puntos dobles! ✨', '#9c7a36', Math.max(18, W * 0.06), 1.4);
    }
    s.puntos += ganados;

    if (s.combo % 10 === 0) {
      s.puntos += 10;
      part.texto(W / 2, H * 0.3, `¡Combo ×${s.combo}! +10`, '#c2629a', Math.max(18, W * 0.058), 1.3);
    }
    while (s.frase < FRASES.length && s.puntos >= FRASES[s.frase][0]) {
      part.texto(W / 2, H * 0.22, FRASES[s.frase][1], '#6e52b5', Math.max(17, W * 0.055), 2);
      s.frase++;
    }
    pintarMarcador();
  }

  function actualizar(dt) {
    s.tiempo += dt;
    s.doble = Math.max(0, s.doble - dt);
    s.golpe = Math.max(0, s.golpe - dt);
    s.feliz = Math.max(0, s.feliz - dt);

    // Movimiento de la nubecita (suave)
    const velocidadTecla = 1.15;
    if (teclas.izquierda) s.objetivo -= velocidadTecla * dt;
    if (teclas.derecha) s.objetivo += velocidadTecla * dt;
    s.objetivo = limitar(s.objetivo, 0.1, 0.9);
    s.x += (s.objetivo - s.x) * Math.min(1, dt * 14);

    s.proximo -= dt;
    if (s.proximo <= 0) generar();

    const px = s.x * W;
    const py = H * 0.87;
    const media = W * 0.13;
    s.objetos = s.objetos.filter((obj) => {
      if (s.estado !== 'jugando') return true;
      obj.y += obj.v * dt;
      obj.fase += dt * 2.6;
      const r = radioDe(obj);
      const ox = (obj.x + Math.sin(obj.fase) * 0.012) * W;
      const oy = obj.y * H;
      if (oy + r * 0.5 >= py - H * 0.05 && oy - r <= py + H * 0.03 && Math.abs(ox - px) <= media + r * 0.35) {
        atrapar(obj, ox, py);
        return false;
      }
      if (obj.y > 1.12) {
        if (obj.tipo !== 'tormenta') s.combo = 0;
        return false;
      }
      return true;
    });
  }

  function dibujarTormenta(cx, cy, r) {
    ctx.save();
    ctx.fillStyle = '#6a5a8c';
    [[-0.45, 0.1, 0.55], [0.05, -0.2, 0.7], [0.5, 0.1, 0.5], [0, 0.25, 0.6]].forEach(([dx, dy, rr]) => {
      ctx.beginPath();
      ctx.arc(cx + dx * r, cy + dy * r, rr * r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#7d6ea0';
    ctx.beginPath();
    ctx.arc(cx - 0.05 * r, cy - 0.3 * r, 0.42 * r, 0, Math.PI * 2);
    ctx.fill();
    // rayito
    ctx.beginPath();
    ctx.moveTo(cx + 0.05 * r, cy + 0.55 * r);
    ctx.lineTo(cx - 0.18 * r, cy + 1.0 * r);
    ctx.lineTo(cx + 0.02 * r, cy + 0.98 * r);
    ctx.lineTo(cx - 0.12 * r, cy + 1.4 * r);
    ctx.lineTo(cx + 0.25 * r, cy + 0.85 * r);
    ctx.lineTo(cx + 0.05 * r, cy + 0.86 * r);
    ctx.closePath();
    ctx.fillStyle = '#f3c66e';
    ctx.fill();
    // carita enojada
    ctx.strokeStyle = '#2e1f52';
    ctx.lineWidth = Math.max(1.5, r * 0.08);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 0.35 * r, cy - 0.12 * r);
    ctx.lineTo(cx - 0.12 * r, cy - 0.02 * r);
    ctx.moveTo(cx + 0.35 * r, cy - 0.12 * r);
    ctx.lineTo(cx + 0.12 * r, cy - 0.02 * r);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy + 0.32 * r, 0.14 * r, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.restore();
  }

  function dibujarNube(ahora) {
    const px = s.x * W + (s.golpe > 0 ? Math.sin(ahora / 25) * W * 0.012 : 0);
    const py = H * 0.87;
    const r = W * 0.075;
    ctx.save();
    if (s.doble > 0) {
      ctx.shadowColor = 'rgba(243, 198, 110, .95)';
      ctx.shadowBlur = r * 1.2;
    } else {
      ctx.shadowColor = 'rgba(110, 82, 181, .35)';
      ctx.shadowBlur = r * 0.6;
    }
    ctx.fillStyle = s.golpe > 0 ? '#d9cdf0' : '#ffffff';
    [[-1.05, 0.2, 0.72], [-0.45, -0.25, 0.92], [0.35, -0.3, 0.98], [1.0, 0.15, 0.75], [0, 0.3, 0.85]].forEach(([dx, dy, rr]) => {
      ctx.beginPath();
      ctx.arc(px + dx * r, py + dy * r, rr * r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Carita
    const ojoY = py - r * 0.05;
    ctx.strokeStyle = '#3d2a6b';
    ctx.fillStyle = '#3d2a6b';
    ctx.lineWidth = Math.max(2, r * 0.11);
    ctx.lineCap = 'round';
    [-1, 1].forEach((lado) => {
      const ex = px + lado * r * 0.38;
      if (s.feliz > 0) {
        ctx.beginPath();
        ctx.arc(ex, ojoY + r * 0.06, r * 0.13, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      } else if (s.golpe > 0) {
        ctx.beginPath();
        ctx.moveTo(ex - r * 0.1, ojoY - r * 0.1);
        ctx.lineTo(ex + r * 0.1, ojoY + r * 0.1);
        ctx.moveTo(ex + r * 0.1, ojoY - r * 0.1);
        ctx.lineTo(ex - r * 0.1, ojoY + r * 0.1);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(ex, ojoY, r * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ex - r * 0.03, ojoY - r * 0.04, r * 0.035, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#3d2a6b';
      }
      ctx.save();
      ctx.fillStyle = 'rgba(245, 160, 195, .75)';
      ctx.beginPath();
      ctx.arc(px + lado * r * 0.68, py + r * 0.18, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(px, py + r * 0.12, r * 0.16, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
    // corazoncito en la nube
    trazarCorazon(ctx, px + r * 0.95, py - r * 0.55, r * 0.42);
    ctx.fillStyle = '#c9a0f0';
    ctx.fill();
  }

  function dibujar(ahora) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    // Destello cuando te cae un rayo
    if (s.golpe > 0.35) {
      ctx.fillStyle = `rgba(110, 82, 181, ${(s.golpe - 0.35) * 0.5})`;
      ctx.fillRect(0, 0, W, H);
    }

    const bias = biasActual();
    s.objetos.forEach((obj) => {
      const r = radioDe(obj);
      const cx = (obj.x + Math.sin(obj.fase) * 0.012) * W;
      const cy = obj.y * H;
      if (obj.tipo === 'corazon') {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.sin(obj.fase) * 0.25);
        ctx.shadowColor = 'rgba(217, 119, 159, .5)';
        ctx.shadowBlur = r * 0.8;
        const grad = ctx.createLinearGradient(-r, -r, r, r);
        grad.addColorStop(0, '#f7a6c8');
        grad.addColorStop(1, '#9a72dc');
        trazarCorazon(ctx, 0, 0, r * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, .7)';
        ctx.beginPath();
        ctx.arc(-r * 0.38, -r * 0.28, r * 0.17, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (obj.tipo === 'cara') {
        dibujarCarita(ctx, obj.miembro, cx, cy, r);
        if (bias && bias.id === obj.miembro.id) {
          trazarCorazon(ctx, cx + r * 0.8, cy + r * 0.75, r * 0.7);
          ctx.fillStyle = '#c2629a';
          ctx.fill();
        }
      } else if (obj.tipo === 'estrella') {
        ctx.save();
        ctx.shadowColor = 'rgba(201, 164, 92, .9)';
        ctx.shadowBlur = r;
        trazarEstrella(ctx, cx, cy, r * 1.1, ahora / 600);
        const grad = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
        grad.addColorStop(0, '#f6e6b8');
        grad.addColorStop(1, '#c9a45c');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      } else {
        dibujarTormenta(cx, cy, r);
      }
    });

    dibujarNube(ahora);

    if (s.combo >= 3 && s.estado === 'jugando') {
      ctx.font = `600 ${Math.round(Math.max(13, W * 0.04))}px Poppins, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(110, 82, 181, .75)';
      ctx.fillText(`Combo ×${s.combo}`, W / 2, H * 0.03);
    }
    if (s.doble > 0) {
      ctx.fillStyle = 'rgba(201, 164, 92, .9)';
      ctx.fillRect(W * 0.3, H * 0.015, W * 0.4 * (s.doble / 7), 4);
    }

    part.dibujar(ctx);
  }

  function bucle(ahora) {
    raf = 0;
    const dt = ultimoCuadro ? Math.min(0.05, (ahora - ultimoCuadro) / 1000) : 0;
    ultimoCuadro = ahora;
    if (s.estado === 'jugando') actualizar(dt);
    part.actualizar(dt);
    dibujar(ahora);
    if (abierta) raf = requestAnimationFrame(bucle);
  }

  function arrancar() {
    if (!raf) {
      ultimoCuadro = 0;
      raf = requestAnimationFrame(bucle);
    }
  }

  function empezar() {
    Object.assign(s, {
      estado: 'jugando', puntos: 0, vidas: VIDAS, objetos: [], x: 0.5, objetivo: 0.5,
      tiempo: 0, proximo: 0.6, combo: 0, doble: 0, golpe: 0, feliz: 0, frase: 0,
    });
    part.limpiar();
    capa.ocultar();
    el.escenario.classList.add('is-playing');
    pintarMarcador();
    el.escenario.focus({ preventScroll: true });
  }

  function pausar() {
    if (s.estado !== 'jugando') return;
    s.estado = 'pausa';
    teclas.izquierda = false;
    teclas.derecha = false;
    el.escenario.classList.remove('is-playing');
    capa.mostrar({ emoji: '⏸️', titulo: 'Pausa', texto: 'La nubecita te espera ☁️', boton: 'Continuar' });
  }

  function reanudar() {
    if (s.estado !== 'pausa') return;
    s.estado = 'jugando';
    capa.ocultar();
    el.escenario.classList.add('is-playing');
    el.escenario.focus({ preventScroll: true });
  }

  function terminar() {
    s.estado = 'fin';
    s.finEn = performance.now();
    el.escenario.classList.remove('is-playing');
    const nuevo = s.puntos > record;
    if (nuevo) {
      record = s.puntos;
      guardarJSON(CLAVE, record);
    }
    pintarMarcador();
    let texto = `Atrapaste ${s.puntos.toLocaleString('es')} puntos de amor.`;
    if (nuevo && s.puntos > 0) texto += ' ¡Nuevo récord! 🎉';
    else if (record) texto += ` Tu récord es ${record.toLocaleString('es')}.`;
    setTimeout(() => {
      if (s.estado !== 'fin') return;
      capa.mostrar({ emoji: '🌧️', titulo: '¡Se acabaron las vidas!', texto, boton: 'Jugar otra vez' });
      if (nuevo && s.puntos >= 150 && CONFIG.confeti && !menosMovimiento) lanzarConfeti(80, true);
    }, 600);
  }

  capa.boton.addEventListener('click', () => (s.estado === 'pausa' ? reanudar() : empezar()));

  // Mover con el dedo o con el mouse
  const apuntar = (e) => {
    if (s.estado !== 'jugando') return;
    const caja = el.escenario.getBoundingClientRect();
    s.objetivo = limitar((e.clientX - caja.left) / caja.width, 0.1, 0.9);
  };
  el.escenario.addEventListener('pointermove', apuntar);
  el.escenario.addEventListener('pointerdown', (e) => {
    apuntar(e);
    if (s.estado === 'jugando' && e.pointerType !== 'mouse') {
      try { el.escenario.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (SALA.actual !== 'lluvia') return;
    const k = e.key;
    if (s.estado === 'jugando') {
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { e.preventDefault(); teclas.izquierda = true; }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { e.preventDefault(); teclas.derecha = true; }
      else if (k === 'p' || k === 'P' || k === 'Escape' || k === ' ') { e.preventDefault(); pausar(); }
    } else if (s.estado === 'pausa') {
      if (k === 'p' || k === 'P' || ((k === ' ' || k === 'Enter') && !(e.target instanceof HTMLButtonElement))) {
        e.preventDefault();
        reanudar();
      }
    } else if ((k === 'Enter' || k === ' ') && !(e.target instanceof HTMLButtonElement)) {
      e.preventDefault();
      if (s.estado !== 'fin' || performance.now() - (s.finEn || 0) > 1300) empezar();
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') teclas.izquierda = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') teclas.derecha = false;
  });

  document.addEventListener('visibilitychange', () => { if (document.hidden) pausar(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { if (abierta) ajustar(); }).observe(el.escenario);

  SALA.al('lluvia', {
    abrir() {
      abierta = true;
      ajustar();
      pintarMarcador();
      arrancar();
    },
    cerrar() {
      pausar();
      abierta = false;
    },
  });
})();


/* ---------------------------------------------------------
   5. ¿QUIÉN ES?
   Una carita aparece borrosa y muy de cerca, y de a poco se
   ve mejor. Mientras antes adivine, más puntos gana.
   --------------------------------------------------------- */
(() => {
  const el = {
    marco: $('#qFrame'),
    foto: $('#qImg'),
    tiempo: $('#qTimer'),
    opciones: $('#qOptions'),
    mensaje: $('#qFeedback'),
    siguiente: $('#qNext'),
    ronda: $('#qRound'),
    puntos: $('#qScore'),
    record: $('#qBest'),
  };
  if (!el.marco || !el.foto) return;

  const capa = crearCapa('qOverlay');
  const RONDAS = 10;
  const DURACION = 8000; // milisegundos que tarda en aclararse la foto
  const CLAVE = 'quien-record';
  let record = Number(leerJSON(CLAVE)) || 0;

  const q = {
    estado: 'listo',   // listo | cargando | pregunta | respuesta | fin
    ronda: 0,
    puntos: 0,
    aciertos: 0,
    actual: null,
    inicio: 0,
    temporizador: 0,
    usadas: new Set(),
    anterior: null,
    turno: 0,
  };

  function pintarMarcador() {
    el.ronda.textContent = `${Math.min(q.ronda, RONDAS)}/${RONDAS}`;
    el.puntos.textContent = q.puntos;
    el.record.textContent = record || '—';
  }

  function ponerFoto(transicion, transform, filtro) {
    el.foto.style.transition = transicion;
    el.foto.style.transform = transform;
    el.foto.style.filter = filtro;
  }

  function nuevaRonda() {
    q.ronda++;
    if (q.ronda > RONDAS) {
      terminar();
      return;
    }

    // Un integrante distinto al anterior y una foto que todavía no salió
    let miembro;
    let n;
    let intentos = 0;
    do {
      miembro = elegir(BANGTAN);
      n = 1 + Math.floor(Math.random() * miembro.fotos);
      intentos++;
    } while ((q.usadas.has(`${miembro.id}-${n}`) || miembro === q.anterior) && intentos < 60);
    q.usadas.add(`${miembro.id}-${n}`);
    q.anterior = miembro;
    q.actual = { miembro, n };

    const otros = barajar(BANGTAN.filter((m) => m !== miembro)).slice(0, 3);
    el.opciones.innerHTML = '';
    barajar([miembro, ...otros]).forEach((m) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'qopt';
      boton.dataset.id = m.id;
      boton.style.setProperty('--c', m.color);
      boton.innerHTML = `<span class="qopt__emoji" aria-hidden="true">${m.emoji}</span><span class="qopt__name">${escapar(m.nombre)}</span>`;
      boton.disabled = true;
      boton.addEventListener('click', () => responder(m, boton));
      el.opciones.append(boton);
    });

    el.marco.classList.remove('is-right', 'is-wrong');
    el.mensaje.textContent = '¿Quién se esconde aquí?';
    el.siguiente.hidden = true;
    el.tiempo.style.transition = 'none';
    el.tiempo.style.width = '100%';

    // Empieza muy de cerca y borrosa
    const desvioX = azar(-14, 14).toFixed(1);
    const desvioY = azar(-10, 12).toFixed(1);
    ponerFoto('none', `scale(3.1) translate(${desvioX}%, ${desvioY}%)`, 'blur(16px) saturate(1.2)');
    q.estado = 'cargando';
    const turno = ++q.turno;
    const arrancarRonda = () => {
      if (turno !== q.turno || q.estado !== 'cargando') return;
      void el.foto.offsetWidth;
      ponerFoto(`transform ${DURACION}ms linear, filter ${DURACION}ms linear`, 'scale(1.12) translate(0, 0)', 'blur(1.5px) saturate(1)');
      void el.tiempo.offsetWidth;
      el.tiempo.style.transition = `width ${DURACION}ms linear`;
      el.tiempo.style.width = '0%';
      q.inicio = performance.now();
      q.estado = 'pregunta';
      $$('.qopt', el.opciones).forEach((b) => { b.disabled = false; });
      clearTimeout(q.temporizador);
      q.temporizador = setTimeout(() => responder(null, null), DURACION + 150);
    };
    el.foto.onload = arrancarRonda;
    el.foto.onerror = arrancarRonda;
    el.foto.src = caraDe(miembro, n);
    if (el.foto.complete && el.foto.naturalWidth > 0) requestAnimationFrame(arrancarRonda);
    pintarMarcador();
  }

  function revelar() {
    const actual = getComputedStyle(el.foto);
    ponerFoto('none', actual.transform, actual.filter);
    void el.foto.offsetWidth;
    ponerFoto('transform .55s cubic-bezier(.2,.7,.2,1), filter .55s ease', 'scale(1) translate(0, 0)', 'blur(0px) saturate(1)');
    const ancho = getComputedStyle(el.tiempo).width;
    el.tiempo.style.transition = 'none';
    el.tiempo.style.width = ancho;
  }

  function responder(elegido, boton) {
    if (q.estado !== 'pregunta') return;
    q.estado = 'respuesta';
    clearTimeout(q.temporizador);
    revelar();

    const correcto = q.actual.miembro;
    const botones = $$('.qopt', el.opciones);
    botones.forEach((b) => {
      b.disabled = true;
      if (b.dataset.id === correcto.id) b.classList.add('is-right');
    });

    if (elegido === correcto) {
      const pasado = performance.now() - q.inicio;
      const ganados = Math.max(20, Math.round(100 - 80 * (pasado / DURACION)));
      q.puntos += ganados;
      q.aciertos++;
      el.mensaje.innerHTML = `¡Sí! Es <strong>${escapar(correcto.nombre)}</strong> ${correcto.emoji} · +${ganados}`;
      el.marco.classList.add('is-right');
      estallidoCorazones(el.marco, 12);
    } else {
      if (boton) boton.classList.add('is-wrong');
      el.mensaje.innerHTML = elegido
        ? `¡Casi! Era <strong>${escapar(correcto.nombre)}</strong> ${correcto.emoji}`
        : `¡Se acabó el tiempo! Era <strong>${escapar(correcto.nombre)}</strong> ${correcto.emoji}`;
      el.marco.classList.add('is-wrong');
    }

    pintarMarcador();
    el.siguiente.textContent = q.ronda >= RONDAS ? 'Ver mi resultado' : 'Siguiente';
    el.siguiente.hidden = false;
    el.siguiente.focus({ preventScroll: true });
  }

  function terminar() {
    q.estado = 'fin';
    q.ronda = RONDAS;
    const nuevo = q.puntos > record;
    if (nuevo) {
      record = q.puntos;
      guardarJSON(CLAVE, record);
    }
    pintarMarcador();
    el.siguiente.hidden = true;

    let rango = 'Lo importante es que los amas… y que yo te amo a ti. 💜';
    if (q.aciertos === RONDAS) rango = '¡Perfecto! Los reconoces hasta con los ojos cerrados. ARMY nivel leyenda 💜';
    else if (q.aciertos >= 8) rango = '¡Increíble! Se nota que tu corazón es morado.';
    else if (q.aciertos >= 5) rango = '¡Muy bien! Bangtan estaría orgulloso de ti.';

    let texto = `${q.aciertos} de ${RONDAS} aciertos. ${rango}`;
    if (nuevo && q.puntos > 0) texto += ' ¡Nuevo récord! 🎉';
    capa.mostrar({ emoji: q.aciertos >= 8 ? '🏆' : '💜', titulo: `${q.puntos} puntos`, texto, boton: 'Jugar otra vez' });
    if (q.aciertos >= 8 && CONFIG.confeti && !menosMovimiento) lanzarConfeti(90, true);
  }

  function empezar() {
    Object.assign(q, { estado: 'listo', ronda: 0, puntos: 0, aciertos: 0, actual: null, anterior: null });
    q.usadas = new Set();
    capa.ocultar();
    nuevaRonda();
  }

  capa.boton.addEventListener('click', empezar);
  el.siguiente.addEventListener('click', () => {
    if (q.estado === 'respuesta') nuevaRonda();
  });

  // Teclas 1–4 para responder, Enter para seguir
  document.addEventListener('keydown', (e) => {
    if (SALA.actual !== 'quien') return;
    if (q.estado === 'pregunta' && /^[1-4]$/.test(e.key)) {
      const boton = $$('.qopt', el.opciones)[Number(e.key) - 1];
      if (boton) boton.click();
    }
  });

  SALA.al('quien', {
    abrir() { pintarMarcador(); },
    cerrar() {
      // Si sale a la mitad, la partida se reinicia la próxima vez
      if (q.estado === 'pregunta' || q.estado === 'respuesta' || q.estado === 'cargando') {
        clearTimeout(q.temporizador);
        q.turno++;
        q.estado = 'listo';
        q.ronda = 0;
        q.puntos = 0;
        el.opciones.innerHTML = '';
        el.siguiente.hidden = true;
        el.mensaje.textContent = '¿Quién se esconde aquí?';
        capa.mostrar({ emoji: '🔍', titulo: '¿Quién es?', texto: 'Una carita aparece borrosa y de a poco se ve mejor. ¡Adivina quién es lo más rápido que puedas!', boton: 'Empezar' });
        pintarMarcador();
      }
    },
  });

  pintarMarcador();
})();


/* ---------------------------------------------------------
   6. ROMPECABEZAS
   Elige a un integrante, mezcla y desliza las piezas hasta
   armar su foto. Toca una pieza en la misma fila o columna
   que el espacio vacío para moverla.
   --------------------------------------------------------- */
(() => {
  const el = {
    tablero: $('#pBoard'),
    miembros: $('#pMembers'),
    mezclar: $('#pShuffle'),
    ver: $('#pPeek'),
    movimientos: $('#pMoves'),
    tiempo: $('#pTime'),
    record: $('#pBest'),
  };
  if (!el.tablero || !el.miembros) return;

  const capa = crearCapa('pOverlay');
  const CLAVE = 'puzzle-record';

  const z = {
    n: 3,
    miembro: null,
    posiciones: [],   // posiciones[celda] = pieza que está ahí (la última es el vacío)
    vacio: 0,
    piezas: [],
    movimientos: 0,
    acumulado: 0,
    inicio: 0,
    reloj: 0,
    resuelto: false,
    construido: false,
  };

  const segundos = () => Math.floor(z.acumulado + (z.inicio ? (Date.now() - z.inicio) / 1000 : 0));

  function pintarMarcador() {
    el.movimientos.textContent = z.movimientos;
    el.tiempo.textContent = formatoReloj(segundos());
    const r = leerJSON(CLAVE) || {};
    el.record.textContent = r[z.n] ? `${r[z.n]} mov.` : '—';
  }

  function detenerReloj() {
    z.acumulado = segundos();
    z.inicio = 0;
    clearInterval(z.reloj);
    z.reloj = 0;
  }

  function iniciarReloj() {
    if (z.inicio || z.resuelto) return;
    z.inicio = Date.now();
    clearInterval(z.reloj);
    z.reloj = setInterval(() => { el.tiempo.textContent = formatoReloj(segundos()); }, 500);
  }

  function pintarElegidos() {
    $$('.pick', el.miembros).forEach((b) => {
      const activo = b.dataset.id === z.miembro.id;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-checked', String(activo));
    });
    $$('.seg', el.tablero.parentElement).forEach((b) => {
      const activo = Number(b.dataset.n) === z.n;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });
  }

  function colocar(pieza, celda) {
    pieza.style.setProperty('--col', celda % z.n);
    pieza.style.setProperty('--fila', Math.floor(celda / z.n));
  }

  function construir() {
    z.construido = true;
    $$('.ptile', el.tablero).forEach((p) => p.remove());
    const total = z.n * z.n;
    el.tablero.style.setProperty('--n', z.n);
    el.tablero.style.setProperty('--foto', `url("${cuadradaDe(z.miembro)}")`);
    el.tablero.classList.remove('is-solved');
    z.piezas = [];
    for (let id = 0; id < total - 1; id++) {
      const pieza = document.createElement('button');
      pieza.type = 'button';
      pieza.className = 'ptile';
      pieza.dataset.id = id;
      pieza.setAttribute('aria-label', `Pieza ${id + 1}`);
      const col = id % z.n;
      const fila = Math.floor(id / z.n);
      pieza.style.backgroundPosition = `${(col / (z.n - 1)) * 100}% ${(fila / (z.n - 1)) * 100}%`;
      pieza.addEventListener('click', () => {
        const celda = z.posiciones.indexOf(id);
        moverDesde(celda);
      });
      el.tablero.insertBefore(pieza, el.tablero.firstChild);
      z.piezas[id] = pieza;
    }
    mezclar();
  }

  function intercambiar(a, b) {
    [z.posiciones[a], z.posiciones[b]] = [z.posiciones[b], z.posiciones[a]];
    const total = z.n * z.n;
    [a, b].forEach((celda) => {
      const id = z.posiciones[celda];
      if (id !== total - 1) colocar(z.piezas[id], celda);
    });
  }

  function mezclar() {
    const total = z.n * z.n;
    z.posiciones = Array.from({ length: total }, (_, i) => i);
    z.vacio = total - 1;
    let anterior = -1;
    const pasos = z.n === 3 ? 140 : 320;
    for (let i = 0; i < pasos || resuelto(); i++) {
      const vecinos = vecinosDe(z.vacio).filter((v) => v !== anterior);
      const elegido = elegir(vecinos);
      [z.posiciones[z.vacio], z.posiciones[elegido]] = [z.posiciones[elegido], z.posiciones[z.vacio]];
      anterior = z.vacio;
      z.vacio = elegido;
    }
    z.posiciones.forEach((id, celda) => { if (id !== total - 1) colocar(z.piezas[id], celda); });
    z.movimientos = 0;
    z.acumulado = 0;
    z.inicio = 0;
    clearInterval(z.reloj);
    z.resuelto = false;
    el.tablero.classList.remove('is-solved');
    el.tablero.classList.add('is-shuffling');
    setTimeout(() => el.tablero.classList.remove('is-shuffling'), 450);
    capa.ocultar();
    pintarMarcador();
  }

  function vecinosDe(celda) {
    const n = z.n;
    const fila = Math.floor(celda / n);
    const col = celda % n;
    const lista = [];
    if (fila > 0) lista.push(celda - n);
    if (fila < n - 1) lista.push(celda + n);
    if (col > 0) lista.push(celda - 1);
    if (col < n - 1) lista.push(celda + 1);
    return lista;
  }

  const resuelto = () => z.posiciones.every((id, celda) => id === celda);

  function moverDesde(celda) {
    if (z.resuelto || celda < 0) return;
    const n = z.n;
    const e = z.vacio;
    const fr = Math.floor(celda / n);
    const fc = celda % n;
    const er = Math.floor(e / n);
    const ec = e % n;
    if (celda === e || (fr !== er && fc !== ec)) {
      const pieza = z.piezas[z.posiciones[celda]];
      if (pieza) {
        pieza.classList.remove('is-nope');
        void pieza.offsetWidth;
        pieza.classList.add('is-nope');
      }
      return;
    }
    // Se mueven todas las piezas entre la tocada y el espacio vacío
    const paso = fr === er ? (fc < ec ? -1 : 1) : (fr < er ? -n : n);
    let actual = e;
    while (actual !== celda) {
      const vecino = actual + paso;
      intercambiar(actual, vecino);
      actual = vecino;
      z.movimientos++;
    }
    z.vacio = celda;
    iniciarReloj();
    pintarMarcador();
    if (resuelto()) ganar();
  }

  function ganar() {
    z.resuelto = true;
    detenerReloj();
    pintarMarcador();
    el.tablero.classList.add('is-solved');
    const r = leerJSON(CLAVE) || {};
    const nuevo = !r[z.n] || z.movimientos < r[z.n];
    if (nuevo) {
      r[z.n] = z.movimientos;
      guardarJSON(CLAVE, r);
      pintarMarcador();
    }
    const m = z.miembro;
    let texto = `${z.movimientos} movimientos en ${formatoReloj(segundos())}.`;
    if (nuevo) texto += ' ¡Nuevo récord! 🎉';
    setTimeout(() => {
      if (!z.resuelto) return;
      capa.mostrar({ emoji: m.emoji, titulo: `¡Armaste a ${m.nombre}!`, texto, boton: 'Jugar otra vez' });
      if (CONFIG.confeti && !menosMovimiento) lanzarConfeti(70, true);
    }, 1100);
  }

  // Elegir integrante
  BANGTAN.forEach((m) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'pick';
    boton.dataset.id = m.id;
    boton.setAttribute('role', 'radio');
    boton.setAttribute('aria-checked', 'false');
    boton.setAttribute('aria-label', m.nombre);
    boton.style.setProperty('--c', m.color);
    boton.innerHTML = `<img src="${caraDe(m)}" alt="" loading="lazy"><span>${escapar(m.nombre)}</span>`;
    boton.addEventListener('click', () => {
      z.miembro = m;
      pintarElegidos();
      construir();
    });
    el.miembros.append(boton);
  });

  // Dificultad
  $$('.seg', el.tablero.parentElement).forEach((boton) => {
    boton.addEventListener('click', () => {
      const n = Number(boton.dataset.n);
      if (n === z.n) return;
      z.n = n;
      pintarElegidos();
      construir();
    });
  });

  el.mezclar.addEventListener('click', mezclar);
  capa.boton.addEventListener('click', mezclar);

  // Ver la foto completa mientras se mantiene presionado
  const verSi = (e) => { e.preventDefault(); el.tablero.classList.add('is-peek'); };
  const verNo = () => el.tablero.classList.remove('is-peek');
  el.ver.addEventListener('pointerdown', verSi);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => el.ver.addEventListener(ev, verNo));
  el.ver.addEventListener('click', (e) => {
    if (e.detail !== 0) return; // con teclado se muestra un ratito
    el.tablero.classList.add('is-peek');
    setTimeout(verNo, 1400);
  });
  el.ver.addEventListener('contextmenu', (e) => e.preventDefault());

  // Flechas: mueven la pieza que está junto al espacio vacío
  el.tablero.addEventListener('keydown', (e) => {
    const n = z.n;
    const e0 = z.vacio;
    const mapa = { ArrowLeft: e0 % n < n - 1 ? e0 + 1 : -1, ArrowRight: e0 % n > 0 ? e0 - 1 : -1, ArrowUp: e0 + n < n * n ? e0 + n : -1, ArrowDown: e0 - n >= 0 ? e0 - n : -1 };
    if (e.key in mapa) {
      e.preventDefault();
      moverDesde(mapa[e.key]);
    }
  });

  SALA.al('puzzle', {
    abrir() {
      if (!z.construido) {
        z.miembro = biasActual() || BANGTAN[0];
        pintarElegidos();
        construir();
      }
      pintarMarcador();
      if (!z.resuelto && z.movimientos > 0) iniciarReloj();
    },
    cerrar() { detenerReloj(); },
  });
})();


/* ---------------------------------------------------------
   Esc cierra la sala (si no estás en plena partida)
   --------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !SALA.actual || e.defaultPrevented) return;
  if (document.querySelector('.win.is-open, .lightbox.is-open')) return;
  SALA.cerrar();
});
