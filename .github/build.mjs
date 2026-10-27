// Arma la versión publicada en _site/: misma web, pero comprimida y sin comentarios.
// Los archivos del repo quedan legibles para editarlos (stock, precios, etc.).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync } from "fs";
import { join, extname } from "path";
import { transformSync } from "esbuild";

const SRC = ".", OUT = "_site";
const SALTEAR = new Set([".git", ".github", "_site", "node_modules", "README.md"]);

const js = (code) => transformSync(code, { loader: "js", minify: true, legalComments: "none", target: "es2018" }).code.trim();
const css = (code) => transformSync(code, { loader: "css", minify: true, legalComments: "none" }).code.trim();

function html(code) {
  const guardados = [];
  const guardar = (s) => `\u0000${guardados.push(s) - 1}\u0000`;
  code = code.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (m, attrs, body) => {
    if (!body.trim()) return guardar(m);
    if (/application\/ld\+json/i.test(attrs)) return guardar(`<script${attrs}>${JSON.stringify(JSON.parse(body))}</script>`);
    if (/type=/i.test(attrs) && !/javascript|module/i.test(attrs)) return guardar(m);
    return guardar(`<script${attrs}>${js(body)}</script>`);
  });
  code = code.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (m, attrs, body) => guardar(`<style${attrs}>${css(body)}</style>`));
  code = code.replace(/<(pre|textarea)[\s\S]*?<\/\1>/gi, guardar);
  code = code.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");
  code = code.replace(/\s+/g, " ").replace(/>\s+</g, "> <").trim();
  return code.replace(/\u0000(\d+)\u0000/g, (_, i) => guardados[+i]);
}

function recorrer(dir) {
  for (const nombre of readdirSync(join(SRC, dir))) {
    if (SALTEAR.has(nombre) || nombre.endsWith(".py")) continue;
    const rel = join(dir, nombre), de = join(SRC, rel), a = join(OUT, rel);
    if (statSync(de).isDirectory()) { mkdirSync(a, { recursive: true }); recorrer(rel); continue; }
    const ext = extname(nombre).toLowerCase();
    if (nombre === "script.js") writeFileSync(a, js(`(()=>{\n${readFileSync(de, "utf8")}\n})();`)); // encerrado: acorta también los nombres principales
    else if (ext === ".js") writeFileSync(a, js(readFileSync(de, "utf8")));
    else if (ext === ".css") writeFileSync(a, css(readFileSync(de, "utf8")));
    else if (ext === ".html") writeFileSync(a, html(readFileSync(de, "utf8")));
    else copyFileSync(de, a);
  }
}

mkdirSync(OUT, { recursive: true });
recorrer("");
console.log("Listo: _site/");
