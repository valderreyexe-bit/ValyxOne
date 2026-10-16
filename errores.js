/* Aviso de errores de santavape.store (Sentry), hecho a mano y liviano (sin librería).
   Si algo se rompe en el celular de un cliente, nos llega el error para arreglarlo.
   También avisa si no carga una imagen o un archivo propio de la página.
   No manda datos personales: ni nombres, ni teléfonos, ni lo que va después del # o el ? en la dirección.
   Solo corre en el sitio publicado. */
(function () {
  var h = location.hostname;
  if (!/(^|\.)santavape\.store$/.test(h)) return;

  var KEY = "9eae96c460d4386566067a4b25b26a03";
  var URL_ENVIO = "https://o4512255919980544.ingest.de.sentry.io/api/4512267568545872/envelope/?sentry_version=7&sentry_key=" + KEY;
  var DSN = "https://" + KEY + "@o4512255919980544.ingest.de.sentry.io/4512267568545872";
  var enviados = 0, vistos = {};

  function id() {
    var s = "";
    for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
    return s;
  }
  function limpiar(u) { return String(u || "").split(/[?#]/)[0].slice(0, 300); }
  function pagina() {
    var p = location.pathname.replace(/^\/|\.html$/g, "");
    return p || "inicio";
  }

  function enviar(tipo, mensaje, extra) {
    if (enviados >= 10) return;
    var clave = tipo + "|" + mensaje;
    if (vistos[clave]) return;
    vistos[clave] = 1; enviados++;
    var ev = {
      event_id: id(),
      timestamp: Date.now() / 1000,
      platform: "javascript",
      level: tipo === "recurso" ? "warning" : "error",
      environment: "produccion",
      release: "santavape@" + (document.querySelector('script[src*="script.js"]') || { src: "" }).src.replace(/.*v=/, "v"),
      request: { url: location.origin + location.pathname, headers: { "User-Agent": navigator.userAgent } },
      tags: {
        zona: pagina(),
        tipo: tipo,
        dispositivo: window.innerWidth < 768 ? "celular" : "compu"
      },
      extra: extra || {}
    };
    if (extra && extra.stack) {
      ev.exception = { values: [{ type: extra.nombre || "Error", value: mensaje, stacktrace: undefined }] };
      ev.extra.stack = String(extra.stack).slice(0, 2000);
    } else {
      ev.message = { formatted: mensaje };
    }
    var cuerpo = JSON.stringify({ event_id: ev.event_id, sent_at: new Date().toISOString(), dsn: DSN }) + "\n" +
      JSON.stringify({ type: "event" }) + "\n" + JSON.stringify(ev);
    try {
      fetch(URL_ENVIO, { method: "POST", body: cuerpo, keepalive: true, headers: { "Content-Type": "text/plain;charset=UTF-8" } }).catch(function () {});
    } catch (e) {}
  }

  // Errores de código
  window.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t !== window && (t.tagName === "IMG" || t.tagName === "SCRIPT" || t.tagName === "LINK")) {
      var src = limpiar(t.src || t.href);
      // Solo archivos propios; las variantes -m/-t ya tienen respaldo automático y no son una falla real
      if (src.indexOf(location.origin) !== 0 || /-[mt]\.webp$/.test(src)) return;
      enviar("recurso", "No cargó: " + src.replace(location.origin, ""), { etiqueta: t.tagName.toLowerCase() });
      return;
    }
    if (!e.message || /^Script error\.?$/.test(e.message)) return; // errores de scripts ajenos, sin datos
    enviar("codigo", e.message, { archivo: limpiar(e.filename).replace(location.origin, ""), linea: e.lineno, columna: e.colno, stack: e.error && e.error.stack, nombre: e.error && e.error.name });
  }, true);

  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason || {};
    var msg = r.message || String(r);
    if (/Failed to fetch|Load failed|NetworkError/i.test(msg)) return; // sin señal en el celular del cliente
    enviar("codigo", "Promesa: " + msg.slice(0, 300), { stack: r.stack, nombre: r.name });
  });

  window.svError = enviar;
})();
