console.log("Santa Vape cargado correctamente.");
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
            console.log('Error al registrar Service Worker: ', err);
        });
    });
}

/* =====================================================================
   CONFIGURACIÓN RÁPIDA
   ---------------------------------------------------------------------
   MODO_REPOSICION = true  -> la mercadería todavía no llegó: los botones
                              dicen "Reservar" y el pedido sale como reserva.
   MODO_REPOSICION = false -> venta normal (cambialo cuando llegue el stock).
   ===================================================================== */
const MODO_REPOSICION = false;
const FECHA_REPOSICION = "lunes 12 / martes 13 de octubre";
const FECHA_CORTA = "12/13 oct"; // versión corta para el aviso de arriba
const WHATSAPP_NUMERO = "5492216205269";
// PROMO: cada 2 vapers del pedido (de cualquier modelo, se pueden mezclar) se descuenta esto
const DESCUENTO_POR_PAR = 1600;

/* =====================================================================
   CATÁLOGO Y STOCK
   ---------------------------------------------------------------------
   ⚠️ El stock NO baja solo: la web es estática. Cada vez que vendas una
   unidad, restale 1 al "stock" de ese sabor acá y volvé a subir este
   archivo. stock 0 = "Sin stock", 1 = "Última unidad", 2+ = "Quedan N".

   Precio y promo de cada línea se editan SOLO acá (el carrito y el
   mensaje de WhatsApp leen de este objeto).
   "imagen" es opcional: si un sabor no tiene foto propia se usa
   la "imagenGenerica" de la línea.
   ===================================================================== */
const productos = {
    ignite: {
        nombre: "Ignite V400 Dual",
        pagina: "ignite-dual-40k.html",
        tarjeta: { clase: "card-ignite", color: "#FF6B00", marca: "Ignite", modelo: "V400 Dual 40K", spec: "V400 · 40K", icono: "fa-fire", desc: "40.000 puffs y sabores frutales bien intensos." },
        precio: 34800,
        promoPar: 68000, // (se calcula solo: 2 x precio - DESCUENTO_POR_PAR)
        emoji: "🔥",
        imagenGenerica: "IMG/ignite/peach-berry-ice.webp",
        sabores: {
            "Blue Razz B Pop":             { imagen: "IMG/ignite/blue-razz-b-pop.webp", stock: 2, descripcion: "Frambuesa azul dulce con un toque de caramelo ácido tipo B-Pop." },
            "Blueberry Ice":               { imagen: "IMG/ignite/blueberry-ice.webp", stock: 3, descripcion: "Arándanos jugosos con un final helado bien refrescante." },
            "Grape Ice":                   { imagen: "IMG/ignite/grape-ice.webp", stock: 2, descripcion: "Uva dulce e intensa con golpe de frío." },
            "Green Apple":                 { imagen: "IMG/ignite/green-apple-ice.webp", stock: 2, descripcion: "Manzana verde crocante con notas ácidas." },
            "Peach Berry Ice":             { imagen: "IMG/ignite/peach-berry-ice.webp", stock: 3, descripcion: "Durazno maduro y frutos rojos con un final helado." },
            "Strawberry Apple Watermelon": { imagen: "IMG/ignite/strawberry-apple-watermelon.webp", stock: 2, descripcion: "Frutilla, manzana y sandía en un blend frutal y jugoso." },
            "Strawberry Banana":           { imagen: "IMG/ignite/strawberry-banana.webp", stock: 2, descripcion: "El clásico licuado de frutilla y banana, cremoso y dulce." },
            "Strawberry Watermelon":       { imagen: "IMG/ignite/strawberry-watermelon.webp", stock: 2, descripcion: "Frutilla dulce con sandía fresca de verano." },
            "Watermelon Ice":              { imagen: "IMG/ignite/watermelon-ice.webp", stock: 2, descripcion: "Sandía dulce con un golpe helado bien marcado." }
        }
    },
    iceking: {
        nombre: "Elfbar Ice King 40K",
        pagina: "elfbar-iceking-40k.html",
        tarjeta: { clase: "card-iceking", color: "#0A9BD6", marca: "Elfbar", modelo: "Ice King 40K", spec: "Ice Boost · 40K", icono: "fa-snowflake", desc: "El golpe de frío más intenso, con pantalla digital." },
        precio: 30800,
        promoPar: 60000,
        emoji: "🧊",
        imagenGenerica: "IMG/iceking/blue-razz-ice.webp",
        sabores: {
            "Blue Razz Ice":          { imagen: "IMG/iceking/blue-razz-ice.webp", stock: 2, descripcion: "Frambuesa azul ácida con el golpe de frío extremo de la línea Ice King." },
            "Cherry Fuse":            { imagen: "IMG/iceking/cherry-fuse.webp", stock: 1, descripcion: "Cereza intensa y dulce con un final fresco." },
            "Grape Ice":              { imagen: "IMG/iceking/grape-ice.webp", stock: 1, descripcion: "Uva dulce y sabrosa con una ráfaga de frío extremo." },
            "Mango Magic":            { imagen: "IMG/iceking/mango-magic.webp", stock: 2, descripcion: "Mango maduro y tropical, bien dulce y jugoso." },
            "Peach":                  { imagen: "IMG/iceking/peach.webp", stock: 2, descripcion: "Durazno aterciopelado, suave y frutal." },
            "Peach Mango Watermelon": { imagen: "IMG/iceking/peach-mango-watermelon.webp", stock: 0, descripcion: "Mezcla tropical de durazno, mango y sandía con final helado." },
            "Tigers Blood":           { imagen: "IMG/iceking/tigers-blood.webp", stock: 1, descripcion: "Frutilla, sandía y un toque de coco: el clásico Tiger's Blood." },
            "Watermelon Ice":         { imagen: "IMG/iceking/watermelon-ice.webp", stock: 0, descripcion: "Sandía dulce con el golpe extra helado de Elfbar." },
            "Miami Mint":             { imagen: "IMG/iceking/miami-mint.webp", stock: 0, descripcion: "Menta limpia, fresca y suave con frescura duradera." }
        }
    },
    lostmary: {
        nombre: "Lost Mary Dura 35K",
        pagina: "lost-mary-dura-35k.html",
        tarjeta: { clase: "card-lostmary", color: "#AF52DE", marca: "Lost Mary", modelo: "Dura 35K", spec: "Dura · 35K", icono: "fa-gem", desc: "35.000 puffs y sabores frutales. Pocas unidades." },
        precio: 27000,
        promoPar: null,
        emoji: "💜",
        imagenGenerica: "IMG/lostmary/green-apple-ice.webp",
        sabores: {
            "Grape Ice":             { imagen: "IMG/lostmary/grape-ice.webp", stock: 0, descripcion: "Uva dulce con final helado." },
            "Green Apple Ice":       { imagen: "IMG/lostmary/green-apple-ice.webp", stock: 1, descripcion: "Manzana verde ácida y bien fresca." },
            "Pineapple Ice":         { imagen: "IMG/lostmary/pineapple-ice.webp", stock: 0, descripcion: "Ananá tropical con un toque helado." },
            "Strawberry Kiwi":       { imagen: "IMG/lostmary/strawberry-kiwi.webp", stock: 0, descripcion: "Frutilla dulce con el toque ácido del kiwi." },
            "Strawberry Watermelon": { imagen: "IMG/lostmary/strawberry-watermelon.webp", stock: 1, descripcion: "Frutilla y sandía, dulce y refrescante." }
        }
    },
    te30k: {
        nombre: "Elfbar TE 30K",
        pagina: "elfbar-te-30k.html",
        tarjeta: { clase: "card-te30k", color: "#5856D6", marca: "Elfbar", modelo: "TE 30K", spec: "Pro Display · 30K", icono: "fa-bolt", desc: "Cuerpo translúcido, calada sedosa y pantalla de batería." },
        precio: 28000,
        promoPar: 57500,
        emoji: "⚡",
        imagenGenerica: "IMG/te-cherrystrazz.webp",
        sabores: {
            "Cherry Strazz":          { stock: 0, imagen: "IMG/te-cherrystrazz.webp", descripcion: "Cerezas dulces combinadas con frutillas ácidas y un golpe fresco." },
            "Peach Mango Watermelon": { stock: 0, imagen: "IMG/te-peachmangowatermelon.webp", descripcion: "Durazno, mango y sandía en un blend tropical." },
            "Pineapple Mango":        { stock: 0, imagen: "IMG/te-pineapplemango.webp", descripcion: "Ananá tropical y mango maduro." },
            "Strawberry Ice":         { stock: 0, imagen: "IMG/te-strawberryice.webp", descripcion: "Frutillas rojas dulces con un final frío." },
            "Bubbaloo Grape":         { stock: 0, imagen: "IMG/te-chicleuva.webp", descripcion: "Inspirado en el clásico chicle de uva." },
            "Blueberry Ice":          { stock: 0, imagen: "IMG/te-blueberry.webp", descripcion: "Arándanos con un acabado mentolado limpio." },
            "Green Apple Ice":        { stock: 0, imagen: "IMG/te-greenappleice.webp", descripcion: "Manzana verde crujiente con frescura helada." },
            "Miami Mint":             { stock: 0, imagen: "IMG/te-miamimint.webp", descripcion: "Menta refrescante de perfil cítrico y limpio." }
        }
    }
};

/* =====================================================================
   ENTREGAS REALES (historias del inicio y de cada localidad)
   ---------------------------------------------------------------------
   Para sumar una: subí la foto a IMG/entregas/ y agregá una línea acá
   arriba de todo (las primeras se muestran primero).
   "loc" tiene que ser una de las claves de LOCALIDADES_NOMBRE.
   ===================================================================== */
const LOCALIDADES_NOMBRE = {
    "san-clemente": "San Clemente", "las-toninas": "Las Toninas", "santa-teresita": "Santa Teresita",
    "mar-del-tuyu": "Mar del Tuyú", "costa-del-este": "Costa del Este", "aguas-verdes": "Aguas Verdes",
    "la-lucila": "La Lucila del Mar", "costa-azul": "Costa Azul", "san-bernardo": "San Bernardo",
    "mar-de-ajo": "Mar de Ajó", "nueva-atlantis": "Nueva Atlantis"
};
const ENTREGAS = [
    { img: "entrega-01.webp", loc: "las-toninas" },    { img: "entrega-02.webp", loc: "santa-teresita" },
    { img: "entrega-03.webp", loc: "san-bernardo" },   { img: "entrega-07.webp", loc: "mar-de-ajo" },
    { img: "entrega-13.webp", loc: "costa-del-este" }, { img: "entrega-18.webp", loc: "la-lucila" },
    { img: "entrega-24.webp", loc: "mar-del-tuyu" },   { img: "entrega-26.webp", loc: "san-clemente" },
    { img: "entrega-05.webp", loc: "las-toninas" },    { img: "entrega-09.webp", loc: "santa-teresita" },
    { img: "entrega-04.webp", loc: "san-bernardo" },   { img: "entrega-10.webp", loc: "mar-de-ajo" },
    { img: "entrega-16.webp", loc: "costa-del-este" }, { img: "entrega-25.webp", loc: "mar-del-tuyu" },
    { img: "entrega-15.webp", loc: "las-toninas" },    { img: "entrega-12.webp", loc: "santa-teresita" },
    { img: "entrega-06.webp", loc: "san-bernardo" },   { img: "entrega-28.webp", loc: "mar-del-tuyu" },
    { img: "entrega-20.webp", loc: "las-toninas" },    { img: "entrega-14.webp", loc: "santa-teresita" },
    { img: "entrega-11.webp", loc: "san-bernardo" },   { img: "entrega-21.webp", loc: "las-toninas" },
    { img: "entrega-17.webp", loc: "santa-teresita" }, { img: "entrega-19.webp", loc: "san-bernardo" },
    { img: "entrega-22.webp", loc: "las-toninas" },    { img: "entrega-23.webp", loc: "santa-teresita" },
    { img: "entrega-27.webp", loc: "santa-teresita" }
];

// Precio de 2 unidades de un mismo modelo, según la promo general
Object.values(productos).forEach(p => { p.promoPar = p.precio * 2 - DESCUENTO_POR_PAR; });

const IMG_RESPALDO = "IMG/perfil3.webp";
const formatoPesos = n => "$" + n.toLocaleString('es-AR');
const imagenDe = (linea, sabor) => productos[linea]?.sabores[sabor]?.imagen || productos[linea]?.imagenGenerica || IMG_RESPALDO;
// Versiones livianas de cada foto: -m (tarjetas, 400px) y -t (miniaturas, 120px)
const tamanio = (src, suf) => /^IMG\/(ignite|iceking|lostmary)\/|^IMG\/te-/.test(src) ? src.replace(/\.webp$/, suf + ".webp") : src;
const imgMedia = src => tamanio(src, "-m");
const imgMini = src => tamanio(src, "-t");
// Estadísticas (Google Analytics). Si no cargó (por ejemplo, un bloqueador), no pasa nada.
const medir = (evento, datos = {}) => { try { if (typeof gtag === "function") gtag("event", evento, datos); } catch (e) {} };
const itemGA = (linea, sabor, cantidad = 1) => ({ item_id: linea, item_name: productos[linea]?.nombre, item_variant: sabor, price: productos[linea]?.precio, quantity: cantidad });
const stockDe = (linea, sabor) => productos[linea]?.sabores[sabor]?.stock ?? 0;
const verbo = MODO_REPOSICION ? "Reservar" : "Agregar al Carrito";

// Si una imagen no existe, mostramos el logo en vez de un ícono roto
document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName !== "IMG" || img.dataset.respaldo) return;
    const src = img.getAttribute("src") || "";
    // Si falta la versión chica (-m / -t), probamos con la foto original
    if (/-[mt]\.webp$/.test(src)) { img.src = src.replace(/-[mt]\.webp$/, ".webp"); return; }
    img.dataset.respaldo = "1";
    img.src = IMG_RESPALDO;
}, true);

document.addEventListener("DOMContentLoaded", () => {
    // 1. MODAL VERIFICACIÓN EDAD
    const popup = document.getElementById("age-verification");
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");
    if (popup) {
        let esMayor = false;
        try { esMayor = (localStorage.getItem("mayorEdad") === "si"); } catch (e) {}

        if (esMayor) {
            popup.remove();
            document.body.classList.remove("popup-active");
        } else {
            document.body.classList.add("popup-active");
            window.scrollTo(0, 0);
            history.replaceState(null, null, ' ');
            if (btnSi) {
                btnSi.focus();
                btnSi.addEventListener("click", () => {
                    try { localStorage.setItem("mayorEdad", "si"); } catch (e) {}
                    popup.style.display = "none";
                    document.body.classList.remove("popup-active");
                });
            }
            if (btnNo) {
                btnNo.addEventListener("click", () => {
                    window.location.replace("https://www.google.com");
                });
            }
        }
    }

    // 2. AVISO DE REPOSICIÓN (hero de la home + aviso en fichas)
    if (MODO_REPOSICION) {
        const heroStatus = document.getElementById("hero-stock-status");
        if (heroStatus) {
            heroStatus.innerHTML = `<span class="pulse-dot" style="background:#FF9500; box-shadow:0 0 8px #FF9500;"></span> Llega ${FECHA_CORTA} · Reservá sin seña`;
        }
        document.querySelectorAll(".reposicion-notice").forEach(el => {
            el.innerHTML = el.classList.contains('reposicion-home')
                ? `<i class="fa-solid fa-clock"></i> Llega el <strong>${FECHA_REPOSICION}</strong>. Reservá hoy <strong>sin seña</strong>: pagás cuando te lo entregamos.`
                : `<i class="fa-solid fa-clock"></i> Mercadería en camino: llega el <strong>${FECHA_REPOSICION}</strong>. Reservá tu sabor <strong>sin seña</strong> y te avisamos por WhatsApp.`;
            el.hidden = false;
        });
    } else {
        const heroStatus = document.getElementById("hero-stock-status");
        if (heroStatus) heroStatus.innerHTML = `<span class="pulse-dot"></span> Llegó stock · Entregas en el día`;
    }

    // 2b. CATÁLOGO AUTOMÁTICO (páginas de localidades): se arma solo con los
    //     precios, promos y stock de arriba, así no hay que editar cada página.
    document.querySelectorAll("[data-catalogo-auto]").forEach(grid => {
        const lineas = Object.entries(productos)
            .map(([id, p]) => ({ id, p, stock: Object.values(p.sabores).reduce((s, x) => s + x.stock, 0) }))
            .sort((a, b) => (b.stock > 0) - (a.stock > 0));
        grid.innerHTML = lineas.map(({ p, stock }) => {
            const t = p.tarjeta || {};
            const badge = stock <= 0 ? '<i class="fa-solid fa-ban"></i> Sin stock'
                : p.promoPar ? `<i class="fa-solid ${t.icono}"></i> 2 x ${formatoPesos(p.promoPar)}`
                : stock <= 5 ? `<i class="fa-solid ${t.icono}"></i> Pocas unidades`
                : `<i class="fa-solid ${t.icono}"></i> ${Object.keys(p.sabores).length} sabores`;
            return `
            <a href="${p.pagina}" class="catalog-card ${t.clase || ''}">
                <div class="card-visual">
                    <div class="card-glow"></div>
                    <span class="card-badge spec">${t.spec || ''}</span>
                    <span class="card-badge promo">${badge}</span>
                    <img src="${imgMedia(p.imagenGenerica || IMG_RESPALDO)}" alt="${p.nombre}" class="catalog-img" loading="lazy" width="190" height="190"${stock <= 0 ? ' style="opacity:0.5;"' : ''}>
                </div>
                <div class="card-content">
                    <div class="card-header-info">
                        <span class="card-brand">${t.marca || ''}</span>
                        <h3 class="card-title">${t.modelo || p.nombre}</h3>
                        <p class="card-desc">${t.desc || ''}</p>
                    </div>
                    <div class="card-footer-info">
                        <div class="card-price-wrap">
                            <span class="price-label">Precio individual</span>
                            <span class="price-val">${formatoPesos(p.precio)}</span>
                        </div>
                        <div class="card-action-btn" aria-label="Ver sabores">
                            <span>Sabores</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </a>`;
        }).join('');
    });

    // WhatsApp flotante oculto mientras se ve la portada del inicio (ya hay mucho en esa pantalla)
    const portada = document.querySelector(".sv-hero");
    if (portada && "IntersectionObserver" in window) {
        document.body.classList.add("en-portada");
        new IntersectionObserver(([e]) => document.body.classList.toggle("en-portada", e.intersectionRatio > 0.35),
            { threshold: [0, 0.35, 1] }).observe(portada);
    }

    // 2c. INICIO ESTILO iOS: catálogo en lista, destacado e historias de entregas
    const resumenLinea = p => {
        const sabores = Object.values(p.sabores);
        const stock = sabores.reduce((s, x) => s + x.stock, 0);
        const conStock = sabores.filter(x => x.stock > 0).length;
        return { stock, conStock };
    };

    document.querySelectorAll("[data-catalogo-lista]").forEach(lista => {
        const lineas = Object.values(productos)
            .map(p => ({ p, ...resumenLinea(p) }))
            .sort((a, b) => (b.stock > 0) - (a.stock > 0));
        lista.innerHTML = lineas.map(({ p, stock, conStock }) => {
            const t = p.tarjeta || {};
            const color = t.color || "#007AFF";
            let detalle, claseDetalle = "";
            if (stock <= 0) { detalle = "Sin stock por ahora"; claseDetalle = "agotado"; }
            else if (stock <= 5) { detalle = `${conStock} ${conStock === 1 ? "sabor" : "sabores"} · últimas ${stock} unidades`; claseDetalle = "pocas"; }
            else detalle = `${conStock} sabores · quedan ${stock}`;
            const promo = p.promoPar && stock > 0
                ? `<span class="ios-chip" style="--c:${color}">2 x ${formatoPesos(p.promoPar)}</span>` : "";
            return `
            <a href="${p.pagina}" class="ios-row ios-prod${stock <= 0 ? " sin-stock" : ""}" style="--c:${color}">
                <span class="ios-prod-img"><img src="${imgMini(p.imagenGenerica || IMG_RESPALDO)}" alt="${p.nombre}" width="64" height="64" loading="lazy"></span>
                <span class="ios-prod-text">
                    <span class="ios-prod-marca">${t.marca || ""}</span>
                    <span class="ios-prod-nombre">${t.modelo || p.nombre}</span>
                    <span class="ios-prod-detalle ${claseDetalle}">${detalle}</span>
                </span>
                <span class="ios-prod-precio">
                    <strong>${formatoPesos(p.precio)}</strong>
                    ${promo}
                </span>
                <i class="fa-solid fa-chevron-right ios-chevron" aria-hidden="true"></i>
            </a>`;
        }).join("");
    });

    // Vidriera: tarjetas grandes deslizables, una por línea
    document.querySelectorAll("[data-vidriera]").forEach(vid => {
        const lineas = Object.values(productos)
            .map(p => ({ p, ...resumenLinea(p) }))
            .sort((a, b) => (b.stock > 0) - (a.stock > 0));
        vid.innerHTML = lineas.map(({ p, stock, conStock }) => {
            const t = p.tarjeta || {};
            let estado, clase = "";
            if (stock <= 0) { estado = "Sin stock por ahora"; clase = "agotado"; }
            else if (stock <= 5) { estado = `Últimas ${stock} unidades`; clase = "pocas"; }
            else estado = `${conStock} sabores disponibles`;
            const promo = p.promoPar && stock > 0 ? `<span class="vit-promo">Llevando 2: ${formatoPesos(p.promoPar)}</span>` : "";
            // Colores derivados calculados acá (color-mix no anda en celulares viejos)
            const hex = (t.color || "#0052FF").replace("#", "");
            const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.substr(i, 2), 16));
            const mezcla = (a) => `rgb(${Math.round(r * a + 255 * (1 - a))}, ${Math.round(g * a + 255 * (1 - a))}, ${Math.round(b * a + 255 * (1 - a))})`;
            const estilo = `--c:#${hex};--c-soft:${mezcla(0.30)};--c-tint:${mezcla(0.09)};--c-sombra:rgba(${r},${g},${b},0.55);--c-osc:rgb(${Math.round(r * 0.8)},${Math.round(g * 0.8)},${Math.round(b * 0.8)})`;
            return `
            <a href="${p.pagina}" class="vit${stock <= 0 ? " sin-stock" : ""}" style="${estilo}">
                <span class="vit-top">
                    <span class="vit-marca">${t.marca || ""}</span>
                    <span class="vit-nombre">${t.modelo || p.nombre}</span>
                    <span class="vit-precio">${formatoPesos(p.precio)}</span>
                </span>
                <span class="vit-img"><img src="${imgMedia(p.imagenGenerica || IMG_RESPALDO)}" alt="${p.nombre}" width="220" height="220" loading="lazy"></span>
                <span class="vit-pie">
                    <span class="vit-info">
                        ${promo}
                        <span class="vit-stock ${clase}">${estado}</span>
                    </span>
                    <span class="vit-ir" aria-hidden="true"><i class="fa-solid fa-chevron-right"></i></span>
                </span>
            </a>`;
        }).join("");
    });

    // Textos de la promo general (salen de DESCUENTO_POR_PAR)
    document.querySelectorAll("[data-promo-texto]").forEach(el => {
        el.textContent = `Llevando 2, de cualquier modelo, ahorrás ${formatoPesos(DESCUENTO_POR_PAR)}.`;
    });
    document.querySelectorAll("[data-promo-linea]").forEach(el => {
        const p = productos[el.closest("[data-product]")?.dataset.product];
        if (p && resumenLinea(p).stock > 0) el.textContent = `2 x ${formatoPesos(p.promoPar)}`;
        else el.hidden = true;
    });

    // "Sumá otro vaper": las otras líneas con stock, con botón para agregar sin salir de la página
    const estiloLinea = t => {
        const hex = (t.color || "#0052FF").replace("#", "");
        const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.substr(i, 2), 16));
        const mezcla = a => `rgb(${Math.round(r * a + 255 * (1 - a))}, ${Math.round(g * a + 255 * (1 - a))}, ${Math.round(b * a + 255 * (1 - a))})`;
        return `--c:#${hex};--c-soft:${mezcla(0.30)};--c-tint:${mezcla(0.09)};--c-sombra:rgba(${r},${g},${b},0.55);--c-osc:rgb(${Math.round(r * 0.8)},${Math.round(g * 0.8)},${Math.round(b * 0.8)})`;
    };
    document.querySelectorAll("[data-cross-sell]").forEach(cont => {
        const actual = cont.dataset.crossSell;
        const lineas = Object.entries(productos)
            .map(([id, p]) => ({ id, p, ...resumenLinea(p) }))
            .filter(x => x.id !== actual && x.stock > 0);
        const seccion = cont.closest("section");
        if (!lineas.length) { if (seccion) seccion.hidden = true; return; }
        cont.innerHTML = lineas.map(({ id, p, stock }) => {
            const t = p.tarjeta || {};
            const estado = stock <= 5 ? `Últimas ${stock} unidades` : `${Object.values(p.sabores).filter(x => x.stock > 0).length} sabores`;
            return `
            <div class="vit vit-cross" style="${estiloLinea(t)}">
                <a href="${p.pagina}" class="vit-link" aria-label="Ver ${p.nombre}"></a>
                <span class="vit-top">
                    <span class="vit-marca">${t.marca || ""}</span>
                    <span class="vit-nombre">${t.modelo || p.nombre}</span>
                    <span class="vit-precio">${formatoPesos(p.precio)} · <span class="${stock <= 5 ? "vit-stock pocas" : ""}">${estado}</span></span>
                </span>
                <span class="vit-img"><img src="${imgMedia(p.imagenGenerica || IMG_RESPALDO)}" alt="" width="180" height="180" loading="lazy"></span>
                <button type="button" class="vit-agregar" data-linea="${id}"><i class="fa-solid fa-plus"></i> Agregar</button>
            </div>`;
        }).join("");
        cont.querySelectorAll(".vit-agregar").forEach(b => b.addEventListener("click", () => abrirSelector(b.dataset.linea)));
    });

    // Hoja de abajo para elegir sabores y cantidades de cualquier línea
    const hoja = document.createElement("div");
    hoja.className = "hoja-sabores";
    hoja.hidden = true;
    hoja.innerHTML = `
        <div class="hoja-panel" role="dialog" aria-modal="true" aria-labelledby="hoja-titulo">
            <div class="hoja-asa" aria-hidden="true"></div>
            <div class="hoja-head">
                <div><span class="hoja-marca"></span><h3 id="hoja-titulo"></h3><span class="hoja-precio"></span></div>
                <button type="button" class="hoja-listo">Listo</button>
            </div>
            <ul class="hoja-lista"></ul>
            <p class="hoja-nota"></p>
        </div>`;
    document.body.appendChild(hoja);
    let hojaLinea = null;
    function pintarHoja() {
        if (!hojaLinea || hoja.hidden) return;
        const p = productos[hojaLinea];
        const nombres = Object.keys(p.sabores).sort((a, b) => (p.sabores[b].stock > 0) - (p.sabores[a].stock > 0));
        hoja.querySelector(".hoja-lista").innerHTML = nombres.map(sabor => {
            const st = p.sabores[sabor].stock, q = enCarritoDe(hojaLinea, sabor);
            const etiqueta = st <= 0 ? "Sin stock" : st === 1 ? "Última unidad" : `Quedan ${st}`;
            return `
            <li class="hoja-fila${st <= 0 ? " agotado" : ""}">
                <img src="${imgMini(imagenDe(hojaLinea, sabor))}" alt="" width="44" height="44" loading="lazy">
                <span class="hoja-sabor"><strong>${sabor}</strong><span>${etiqueta}</span></span>
                ${st > 0 ? `
                <span class="stepper">
                    <button type="button" class="step-btn" data-s="${sabor}" data-d="-1" aria-label="Restar ${sabor}" ${q <= 0 ? "disabled" : ""}>−</button>
                    <span class="step-qty">${q}</span>
                    <button type="button" class="step-btn" data-s="${sabor}" data-d="1" aria-label="Sumar ${sabor}" ${q >= st ? "disabled" : ""}>+</button>
                </span>` : ""}
            </li>`;
        }).join("");
        hoja.querySelectorAll(".step-btn").forEach(b => b.addEventListener("click", () => sumar(hojaLinea, b.dataset.s, Number(b.dataset.d))));
        const { falta1 } = calcularTotales();
        hoja.querySelector(".hoja-nota").textContent = unidadesTotales() === 0 ? "" :
            falta1 ? `Sumá 1 más de cualquier modelo y ahorrás ${formatoPesos(DESCUENTO_POR_PAR)}.` : "Promo aplicada en tu pedido.";
    }
    function abrirSelector(linea) {
        hojaLinea = linea;
        const p = productos[linea], t = p.tarjeta || {};
        hoja.querySelector(".hoja-panel").setAttribute("style", estiloLinea(t));
        hoja.querySelector(".hoja-marca").textContent = t.marca || "";
        hoja.querySelector("#hoja-titulo").textContent = t.modelo || p.nombre;
        hoja.querySelector(".hoja-precio").textContent = `${formatoPesos(p.precio)} c/u`;
        hoja.hidden = false;
        document.body.classList.add("hoja-open");
        pintarHoja();
        hoja.querySelector(".hoja-listo").focus();
    }
    function cerrarSelector() { hoja.hidden = true; document.body.classList.remove("hoja-open"); }
    hoja.querySelector(".hoja-listo").addEventListener("click", cerrarSelector);
    hoja.addEventListener("click", e => { if (e.target === hoja) cerrarSelector(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !hoja.hidden) cerrarSelector(); });

    // Destacado: la promo con más stock disponible
    document.querySelectorAll("[data-destacado-auto]").forEach(card => {
        const candidatas = Object.values(productos)
            .map(p => ({ p, ...resumenLinea(p) }))
            .filter(x => x.p.promoPar && x.stock > 0)
            .sort((a, b) => b.stock - a.stock);
        if (!candidatas.length) { card.hidden = true; return; }
        const { p } = candidatas[0];
        const t = p.tarjeta || {};
        card.style.setProperty("--c", t.color || "#007AFF");
        card.href = p.pagina;
        card.innerHTML = `
            <span class="ios-dest-text">
                <span class="ios-dest-eyebrow">Promo de la semana</span>
                <span class="ios-dest-titulo">2 ${t.modelo || p.nombre} por ${formatoPesos(p.promoPar)}</span>
                <span class="ios-dest-sub">Combiná los sabores que quieras</span>
                <span class="ios-dest-btn">Ver sabores <i class="fa-solid fa-chevron-right"></i></span>
            </span>
            <img src="${imgMedia(p.imagenGenerica || IMG_RESPALDO)}" alt="${p.nombre}" class="ios-dest-img" width="150" height="150" loading="lazy">`;
    });

    // Historias de entregas reales + visor a pantalla completa
    const visor = document.createElement("div");
    visor.className = "historia-visor";
    visor.hidden = true;
    visor.setAttribute("role", "dialog");
    visor.setAttribute("aria-modal", "true");
    visor.setAttribute("aria-label", "Entregas reales");
    visor.innerHTML = `
        <div class="historia-barras"></div>
        <button type="button" class="historia-cerrar" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
        <img class="historia-img" alt="">
        <span class="historia-loc"></span>
        <button type="button" class="historia-nav prev" aria-label="Anterior"></button>
        <button type="button" class="historia-nav next" aria-label="Siguiente"></button>`;
    document.body.appendChild(visor);
    let historiaLista = [], historiaIdx = 0, historiaTimer = null;
    function mostrarHistoria(i) {
        if (i < 0) i = 0;
        if (i >= historiaLista.length) { cerrarHistoria(); return; }
        historiaIdx = i;
        const h = historiaLista[i];
        visor.querySelector(".historia-img").src = `IMG/entregas/${h.img}`;
        visor.querySelector(".historia-img").alt = `Entrega en ${LOCALIDADES_NOMBRE[h.loc] || ""}`;
        visor.querySelector(".historia-loc").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${LOCALIDADES_NOMBRE[h.loc] || ""}`;
        visor.querySelector(".historia-barras").innerHTML = historiaLista.length > 12 ? "" :
            historiaLista.map((_, k) => `<span class="${k < i ? "vista" : k === i ? "actual" : ""}"></span>`).join("");
        clearTimeout(historiaTimer);
        historiaTimer = setTimeout(() => mostrarHistoria(historiaIdx + 1), 5000);
    }
    function abrirHistoria(lista, i) {
        historiaLista = lista;
        visor.hidden = false;
        document.body.classList.add("historia-open");
        mostrarHistoria(i);
        visor.querySelector(".historia-cerrar").focus();
    }
    function cerrarHistoria() {
        clearTimeout(historiaTimer);
        visor.hidden = true;
        document.body.classList.remove("historia-open");
    }
    visor.querySelector(".historia-cerrar").addEventListener("click", cerrarHistoria);
    visor.querySelector(".historia-nav.prev").addEventListener("click", () => mostrarHistoria(historiaIdx - 1));
    visor.querySelector(".historia-nav.next").addEventListener("click", () => mostrarHistoria(historiaIdx + 1));
    document.addEventListener("keydown", e => {
        if (visor.hidden) return;
        if (e.key === "Escape") cerrarHistoria();
        if (e.key === "ArrowRight") mostrarHistoria(historiaIdx + 1);
        if (e.key === "ArrowLeft") mostrarHistoria(historiaIdx - 1);
    });

    document.querySelectorAll("[data-entregas]").forEach(cont => {
        const filtro = cont.dataset.entregas; // "" = todas, o la clave de una localidad
        let lista = filtro ? ENTREGAS.filter(e => e.loc === filtro) : ENTREGAS.slice();
        const primero = cont.dataset.entregasPrimero; // en cada localidad, sus entregas van adelante
        if (primero) lista = [...lista.filter(e => e.loc === primero), ...lista.filter(e => e.loc !== primero)];
        const seccion = cont.closest("[data-entregas-seccion]");
        if (filtro && lista.length === 0) {
            // Si en esa localidad todavía no hay fotos, mostramos las de toda la costa
            lista = ENTREGAS.slice();
            const titulo = seccion?.querySelector("[data-entregas-titulo]");
            if (titulo) titulo.textContent = "Entregas en La Costa";
        }
        if (!lista.length) { if (seccion) seccion.hidden = true; return; }
        const contador = seccion?.querySelector("[data-entregas-total]");
        if (contador) contador.textContent = lista.length;
        cont.innerHTML = lista.map((h, i) => `
            <button type="button" class="historia" data-i="${i}" aria-label="Ver entrega en ${LOCALIDADES_NOMBRE[h.loc] || ""}">
                <img src="IMG/entregas/${h.img.replace(".webp", "-t.webp")}" alt="" loading="lazy" width="120" height="213">
                <span class="historia-etiqueta">${LOCALIDADES_NOMBRE[h.loc] || ""}</span>
            </button>`).join("");
        cont.querySelectorAll(".historia").forEach(b => b.addEventListener("click", () => abrirHistoria(lista, Number(b.dataset.i))));
    });

    // 3. CARRITO Y PROMOCIONES
    let carrito = [];
    try {
        carrito = JSON.parse(localStorage.getItem('santaVapeCart')) || [];
        // Descarta carritos viejos o sabores que ya no existen
        carrito = carrito.filter(i => i.linea && productos[i.linea]?.sabores[i.sabor]);
        carrito.forEach(i => { i.cantidad = Math.min(i.cantidad, stockDe(i.linea, i.sabor)); });
        carrito = carrito.filter(i => i.cantidad > 0);
    } catch (e) { carrito = []; }

    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartCloseBtn = document.querySelector('.cart-close-btn');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartBadge = document.querySelector('.cart-badge');
    const cartFooter = document.querySelector('.cart-footer');
    const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const promoNotice = document.getElementById('promo-notice');
    const cartTitle = document.querySelector('.cart-header h3');
    const palabraPedido = MODO_REPOSICION ? "reserva" : "pedido";
    if (cartTitle) cartTitle.textContent = MODO_REPOSICION ? "Tu Reserva" : "Tu Pedido";
    if (promoNotice) promoNotice.remove(); // los avisos de promo ahora van dentro de la lista

    const unidadesTotales = () => carrito.reduce((s, i) => s + i.cantidad, 0);
    const enCarritoDe = (linea, sabor) => carrito.find(i => i.linea === linea && i.sabor === sabor)?.cantidad || 0;
    const unidadesDeLinea = linea => carrito.filter(i => i.linea === linea).reduce((s, i) => s + i.cantidad, 0);
    const quedanEnLinea = linea => Object.entries(productos[linea].sabores).some(([s, info]) => info.stock > enCarritoDe(linea, s));
    const ahorroPromo = () => DESCUENTO_POR_PAR;

    // Funciones que se vuelven a dibujar cada vez que cambia el carrito
    const alCambiarCarrito = [() => pintarHoja()];

    function guardarCarritoEnMemoria() {
        try { localStorage.setItem('santaVapeCart', JSON.stringify(carrito)); } catch (e) {}
    }

    function carritoAbierto() { return cartSidebar?.classList.contains('active'); }

    function abrirCarrito(abrir) {
        if (!cartSidebar) return;
        cartSidebar.classList.toggle('active', abrir);
        if (cartOverlay) cartOverlay.classList.toggle('active', abrir);
        document.body.classList.toggle('no-scroll', abrir);
        document.body.classList.toggle('cart-open', abrir);
        if (abrir && cartItemsContainer) cartItemsContainer.scrollTop = 0;
    }
    const toggleCart = () => abrirCarrito(!carritoAbierto());

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
    if (cartCloseBtn) {
        cartCloseBtn.setAttribute('aria-label', 'Cerrar carrito');
        cartCloseBtn.addEventListener('click', () => abrirCarrito(false));
    }
    if (cartOverlay) cartOverlay.addEventListener('click', () => abrirCarrito(false));
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', () => abrirCarrito(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && carritoAbierto()) abrirCarrito(false); });

    // Suma o resta unidades respetando el stock. Devuelve true si cambió algo.
    function sumar(linea, sabor, cambio) {
        const stock = stockDe(linea, sabor);
        let item = carrito.find(i => i.linea === linea && i.sabor === sabor);
        const actual = item ? item.cantidad : 0;
        const nueva = actual + cambio;
        if (nueva < 0 || nueva > stock) return false;
        if (!item && nueva > 0) { item = { linea, sabor, cantidad: 0 }; carrito.push(item); }
        if (item) item.cantidad = nueva;
        carrito = carrito.filter(i => i.cantidad > 0);
        if (cambio > 0 && navigator.vibrate) navigator.vibrate(30);
        medir(cambio > 0 ? "add_to_cart" : "remove_from_cart", { currency: "ARS", value: Math.abs(cambio) * productos[linea].precio, items: [itemGA(linea, sabor, Math.abs(cambio))] });
        renderizarCarrito();
        return true;
    }

    // Totales: cada 2 vapers del pedido (de cualquier modelo) descuentan DESCUENTO_POR_PAR
    function calcularTotales() {
        const porLinea = {};
        carrito.forEach(item => {
            porLinea[item.linea] = (porLinea[item.linea] || 0) + item.cantidad;
        });
        const lineas = Object.entries(porLinea).map(([linea, cantidad]) => ({
            linea, cantidad, total: cantidad * productos[linea].precio
        }));
        const unidades = lineas.reduce((s, l) => s + l.cantidad, 0);
        const pares = Math.floor(unidades / 2);
        const ahorro = pares * DESCUENTO_POR_PAR;
        const totalFinal = lineas.reduce((s, l) => s + l.total, 0) - ahorro;
        const falta1 = unidades % 2 === 1;
        return { lineas, totalFinal, ahorro, pares, falta1 };
    }

    // ---- Barra fija inferior con el total ----
    const cartBar = document.createElement('div');
    cartBar.className = 'cart-bar';
    cartBar.hidden = true;
    cartBar.innerHTML = `
        <button type="button" class="cart-bar-btn">
            <span class="cart-bar-count"><i class="fa-solid fa-bag-shopping"></i> <span></span></span>
            <span class="cart-bar-total"></span>
            <span class="cart-bar-cta">Ver ${palabraPedido} <i class="fa-solid fa-arrow-right"></i></span>
        </button>`;
    document.body.appendChild(cartBar);
    cartBar.querySelector('button').addEventListener('click', () => abrirCarrito(true));

    function actualizarBarra(totalItems, totalFinal) {
        const visible = totalItems > 0 && !!cartSidebar;
        cartBar.hidden = !visible;
        document.body.classList.toggle('has-cart-bar', visible);
        if (!visible) return;
        cartBar.querySelector('.cart-bar-count span').textContent = `${totalItems} ${totalItems === 1 ? 'unidad' : 'unidades'}`;
        cartBar.querySelector('.cart-bar-total').textContent = formatoPesos(totalFinal);
        cartBar.classList.remove('bump');
        void cartBar.offsetWidth; // reinicia la animación
        cartBar.classList.add('bump');
    }

    // ---- Datos de entrega: se cargan UNA vez y quedan guardados en el celular ----
    const LOCALIDADES = ["San Clemente del Tuyú", "Las Toninas", "Santa Teresita", "Mar del Tuyú",
        "Costa del Este", "Aguas Verdes", "La Lucila del Mar", "Costa Azul", "San Bernardo del Tuyú",
        "Mar de Ajó", "Nueva Atlantis"];
    const PAGOS = [
        { valor: "Efectivo", icono: "fa-money-bill-wave", detalle: "Al recibir" },
        { valor: "Transferencia", icono: "fa-building-columns", detalle: "Al recibir" }
    ];
    const TEXTO_SIN_SENA = MODO_REPOSICION
        ? "Reservás sin seña: pagás recién cuando te lo entregamos. Se confirma por orden de llegada."
        : "Pagás cuando te lo entregamos.";

    let datosCliente = { nombre: "", localidad: "", direccion: "", pago: "" };
    try { datosCliente = Object.assign(datosCliente, JSON.parse(localStorage.getItem('santaVapeDatos')) || {}); } catch (e) {}
    if (!LOCALIDADES.includes(datosCliente.localidad)) datosCliente.localidad = "";
    if (!PAGOS.some(p => p.valor === datosCliente.pago)) datosCliente.pago = "";
    const datosCompletos = () => !!(datosCliente.nombre && datosCliente.localidad && datosCliente.pago);
    const guardarDatosCliente = () => { try { localStorage.setItem('santaVapeDatos', JSON.stringify(datosCliente)); } catch (e) {} };

    // ---- Pie del carrito: total, a dónde va, aviso sin seña ----
    let cartTotalRow = null, cartEntrega = null, cartSena = null;
    if (cartFooter) {
        cartSena = document.createElement('div');
        cartSena.className = 'cart-sena';
        cartSena.innerHTML = `<i class="fa-solid fa-shield-heart"></i> ${TEXTO_SIN_SENA}`;
        cartFooter.prepend(cartSena);

        cartEntrega = document.createElement('div');
        cartEntrega.className = 'cart-entrega';
        cartFooter.prepend(cartEntrega);

        cartTotalRow = document.createElement('div');
        cartTotalRow.className = 'cart-total-row';
        cartFooter.prepend(cartTotalRow);
    }

    function pintarEntrega() {
        if (!cartEntrega) return;
        cartEntrega.hidden = carrito.length === 0 || !datosCompletos();
        if (cartEntrega.hidden) return;
        const linea2 = [datosCliente.direccion, datosCliente.pago].filter(Boolean).join(' · ');
        cartEntrega.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            <div class="cart-entrega-texto">
                <strong>${escaparHTML(datosCliente.nombre)} · ${datosCliente.localidad}</strong>
                <span>${escaparHTML(linea2)}</span>
            </div>
            <button type="button" class="cart-entrega-cambiar">Cambiar</button>`;
        cartEntrega.querySelector('button').addEventListener('click', () => abrirDatos(false));
    }

    function escaparHTML(t) {
        return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // ---- Ventana "¿A quién y dónde se lo llevamos?" ----
    const modal = document.createElement('div');
    modal.className = 'datos-modal';
    modal.hidden = true;
    modal.innerHTML = `
        <div class="datos-card" role="dialog" aria-modal="true" aria-labelledby="datos-titulo">
            <div class="datos-head">
                <h3 id="datos-titulo">¿A quién se lo llevamos?</h3>
                <button type="button" class="datos-cerrar" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <p class="datos-intro"><i class="fa-solid fa-bolt"></i> Lo cargás <strong>una sola vez</strong>: la próxima vez pedís directo.</p>

            <label class="campo" for="dm-nombre">
                <span>Tu nombre</span>
                <input type="text" id="dm-nombre" autocomplete="given-name" maxlength="40" placeholder="Ej: Juli" enterkeyhint="next">
                <small class="campo-error">Poné tu nombre así sabemos quién es.</small>
            </label>

            <div class="campo" id="dm-localidad-campo">
                <span id="dm-loc-label">Localidad</span>
                <button type="button" class="loc-select" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="dm-loc-label dm-loc-valor">
                    <i class="fa-solid fa-location-dot"></i>
                    <span id="dm-loc-valor" class="loc-valor">Elegí tu localidad</span>
                    <i class="fa-solid fa-chevron-down loc-flecha"></i>
                </button>
                <ul class="loc-lista" role="listbox" aria-labelledby="dm-loc-label" hidden>
                    ${LOCALIDADES.map(l => `<li role="option" tabindex="-1" data-valor="${l}">${l}</li>`).join('')}
                </ul>
                <small class="campo-error">Elegí tu localidad.</small>
            </div>

            <label class="campo" for="dm-direccion">
                <span>Calle, número y referencia <em>(opcional)</em></span>
                <input type="text" id="dm-direccion" autocomplete="street-address" maxlength="90" placeholder="Ej: Calle 39 N° 450, rejas verdes" enterkeyhint="done">
            </label>

            <fieldset class="campo" id="dm-pago-campo">
                <legend>¿Cómo vas a pagar?</legend>
                <div class="pago-opciones">
                    ${PAGOS.map(p => `
                        <label class="pago-op">
                            <input type="radio" name="dm-pago" value="${p.valor}">
                            <span><i class="fa-solid ${p.icono}"></i><b>${p.valor}</b></span>
                        </label>`).join('')}
                </div>
                <small class="campo-error">Elegí efectivo o transferencia.</small>
            </fieldset>

            <p class="datos-sena"><i class="fa-solid fa-shield-heart"></i> ${TEXTO_SIN_SENA}</p>

            <button type="button" class="btn-primary btn-whatsapp datos-enviar">
                <i class="fa-brands fa-whatsapp"></i> <span></span>
            </button>
        </div>`;
    document.body.appendChild(modal);

    const dmNombre = modal.querySelector('#dm-nombre');
    const dmDireccion = modal.querySelector('#dm-direccion');
    const locBtn = modal.querySelector('.loc-select');
    const locValor = modal.querySelector('.loc-valor');
    const locLista = modal.querySelector('.loc-lista');
    const dmEnviar = modal.querySelector('.datos-enviar');
    let enviarAlGuardar = true;

    function abrirLista(abrir) {
        locLista.hidden = !abrir;
        locBtn.setAttribute('aria-expanded', String(abrir));
        locBtn.classList.toggle('abierto', abrir);
        if (abrir) {
            const actual = locLista.querySelector('[aria-selected="true"]') || locLista.firstElementChild;
            actual.scrollIntoView({ block: 'nearest' });
        }
    }
    function elegirLocalidad(valor) {
        datosCliente.localidad = valor;
        locValor.textContent = valor || 'Elegí tu localidad';
        locBtn.classList.toggle('vacio', !valor);
        locLista.querySelectorAll('li').forEach(li => li.setAttribute('aria-selected', String(li.dataset.valor === valor)));
        modal.querySelector('#dm-localidad-campo').classList.remove('error');
    }
    locBtn.addEventListener('click', () => abrirLista(locLista.hidden));
    locBtn.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); abrirLista(true); (locLista.querySelector('[aria-selected="true"]') || locLista.firstElementChild).focus(); }
    });
    locLista.querySelectorAll('li').forEach(li => {
        const tomar = () => { elegirLocalidad(li.dataset.valor); abrirLista(false); locBtn.focus(); };
        li.addEventListener('click', tomar);
        li.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tomar(); }
            if (e.key === 'ArrowDown') { e.preventDefault(); li.nextElementSibling?.focus(); }
            if (e.key === 'ArrowUp') { e.preventDefault(); (li.previousElementSibling || locBtn).focus(); }
            if (e.key === 'Escape') { abrirLista(false); locBtn.focus(); }
        });
    });

    dmNombre.addEventListener('input', () => dmNombre.closest('.campo').classList.remove('error'));
    dmNombre.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); dmNombre.blur(); abrirLista(true); } });
    dmDireccion.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); dmDireccion.blur(); } });
    modal.querySelectorAll('input[name="dm-pago"]').forEach(r => r.addEventListener('change', () => {
        modal.querySelector('#dm-pago-campo').classList.remove('error');
    }));

    function abrirDatos(enviarDespues) {
        enviarAlGuardar = enviarDespues;
        dmNombre.value = datosCliente.nombre;
        dmDireccion.value = datosCliente.direccion;
        elegirLocalidad(datosCliente.localidad);
        modal.querySelectorAll('input[name="dm-pago"]').forEach(r => { r.checked = r.value === datosCliente.pago; });
        modal.querySelectorAll('.campo.error').forEach(c => c.classList.remove('error'));
        abrirLista(false);
        dmEnviar.querySelector('span').textContent = enviarDespues ? `Enviar ${palabraPedido} por WhatsApp` : 'Guardar datos';
        dmEnviar.querySelector('i').style.display = enviarDespues ? '' : 'none';
        modal.hidden = false;
        document.body.classList.add('datos-open');
        modal.querySelector('.datos-card').scrollTop = 0;
    }
    function cerrarDatos() {
        modal.hidden = true;
        document.body.classList.remove('datos-open');
    }
    modal.querySelector('.datos-cerrar').addEventListener('click', cerrarDatos);
    modal.addEventListener('click', e => { if (e.target === modal) cerrarDatos(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) cerrarDatos(); });

    dmEnviar.addEventListener('click', () => {
        const nombre = dmNombre.value.trim();
        const pago = modal.querySelector('input[name="dm-pago"]:checked')?.value || "";
        let primerError = null;
        const marcar = (cond, campo) => { campo.classList.toggle('error', cond); if (cond && !primerError) primerError = campo; };
        marcar(!nombre, dmNombre.closest('.campo'));
        marcar(!datosCliente.localidad, modal.querySelector('#dm-localidad-campo'));
        marcar(!pago, modal.querySelector('#dm-pago-campo'));
        if (primerError) { primerError.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

        datosCliente = { nombre, localidad: datosCliente.localidad, direccion: dmDireccion.value.trim(), pago };
        guardarDatosCliente();
        cerrarDatos();
        pintarEntrega();
        if (enviarAlGuardar) enviarPedido();
    });

    function renderizarCarrito() {
        guardarCarritoEnMemoria();
        const totalItems = unidadesTotales();
        const { lineas, totalFinal, ahorro } = calcularTotales();
        const vacio = carrito.length === 0;

        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
        }
        actualizarBarra(totalItems, totalFinal);
        alCambiarCarrito.forEach(fn => fn());

        if (cartSena) cartSena.hidden = vacio;
        pintarEntrega();
        if (cartTotalRow) {
            cartTotalRow.hidden = vacio;
            cartTotalRow.innerHTML = vacio ? '' : `
                <div class="cart-total-linea"><span>Total (${totalItems} ${totalItems === 1 ? 'unidad' : 'unidades'})</span><strong>${formatoPesos(totalFinal)}</strong></div>
                <div class="cart-total-extra">
                    ${ahorro > 0 ? `<span class="cart-total-ahorro">🔥 Ahorrás ${formatoPesos(ahorro)}</span>` : ''}
                    <span class="cart-total-envio"><i class="fa-solid fa-truck-fast"></i> Envío gratis</span>
                </div>`;
        }

        if (whatsappCheckoutBtn) {
            whatsappCheckoutBtn.style.opacity = vacio ? '0.5' : '1';
            whatsappCheckoutBtn.style.pointerEvents = vacio ? 'none' : 'auto';
            whatsappCheckoutBtn.classList.add('btn-whatsapp');
            whatsappCheckoutBtn.innerHTML = datosCompletos()
                ? `<i class="fa-brands fa-whatsapp" style="font-size: 1.25rem; margin-right: 8px;"></i> Enviar ${palabraPedido} por WhatsApp`
                : `Continuar <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>`;
        }
        if (continueShoppingBtn) {
            continueShoppingBtn.innerHTML = '<i class="fa-solid fa-arrow-left" style="margin-right: 8px;"></i> Seguir comprando';
        }

        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        if (vacio) {
            cartItemsContainer.innerHTML = `
                <div class="cart-vacio">
                    <div class="cart-vacio-icono"><i class="fa-solid fa-basket-shopping"></i></div>
                    <div class="cart-empty-msg" style="margin-top: 0;">Todavía no elegiste sabores.</div>
                    <a href="index.html#productos" class="btn-primary cart-vacio-btn">Ver catálogo</a>
                </div>`;
            cartItemsContainer.querySelector('.cart-vacio-btn').addEventListener('click', () => abrirCarrito(false));
            return;
        }

        carrito.forEach(item => {
            const p = productos[item.linea];
            const sinMas = item.cantidad >= stockDe(item.linea, item.sabor);
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${imgMini(imagenDe(item.linea, item.sabor))}" alt="${p.nombre} - ${item.sabor}" width="60" height="60">
                <div class="cart-item-info">
                    <div class="cart-item-title">${p.nombre}</div>
                    <div class="cart-item-flavor">${item.sabor}</div>
                    <div class="cart-item-row">
                        <div class="cart-item-controls">
                            <button type="button" data-d="-1" aria-label="${item.cantidad === 1 ? 'Quitar' : 'Restar uno de'} ${item.sabor}">${item.cantidad === 1 ? '<i class="fa-solid fa-trash-can"></i>' : '−'}</button>
                            <span class="cart-item-qty">${item.cantidad}</span>
                            <button type="button" data-d="1" aria-label="Sumar uno de ${item.sabor}" ${sinMas ? 'disabled' : ''}>+</button>
                        </div>
                        <span class="cart-item-price">${formatoPesos(p.precio)} c/u</span>
                    </div>
                </div>`;
            div.querySelectorAll('button[data-d]').forEach(b => b.addEventListener('click', () => sumar(item.linea, item.sabor, Number(b.dataset.d))));
            cartItemsContainer.appendChild(div);
        });

        // Aviso de promo: con un número impar de vapers, sumar 1 más (de cualquier modelo) da descuento
        if (calcularTotales().falta1) {
            const a = document.createElement('a');
            a.className = 'promo-aviso';
            a.href = 'index.html#productos';
            a.innerHTML = `<span>🔥 Sumá 1 vaper más, <strong>de cualquier modelo</strong>, y ahorrás ${formatoPesos(DESCUENTO_POR_PAR)}</span><i class="fa-solid fa-chevron-right"></i>`;
            a.addEventListener('click', e => {
                if (document.querySelector('[data-cross-sell], [data-vidriera]')) {
                    e.preventDefault(); abrirCarrito(false);
                    document.querySelector('[data-cross-sell], [data-vidriera]').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            cartItemsContainer.appendChild(a);
        }
    }

    // Compatibilidad con código viejo que llame a cambiarCantidad(index, ±1)
    window.cambiarCantidad = function (index, cambio) {
        const item = carrito[index];
        if (item) sumar(item.linea, item.sabor, cambio);
    };

    // Código corto para identificar cada pedido en WhatsApp (ej: SV-1009-482)
    function codigoPedido() {
        const d = new Date();
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        return `SV-${dd}${mm}-${Math.floor(100 + Math.random() * 900)}`;
    }

    // Mensaje siempre con el mismo formato, fácil de leer y de copiar a tu planilla
    function armarMensaje() {
        const { lineas, totalFinal } = calcularTotales();
        let m = MODO_REPOSICION
            ? `Hola *Santa Vape*! 💨 Quiero *reservar* (llega ${FECHA_REPOSICION}):\n`
            : `Hola *Santa Vape*! 💨 Quiero hacer este pedido:\n`;
        m += `🧾 *Pedido ${codigoPedido()}*\n\n`;
        carrito.forEach(item => {
            m += `• ${item.cantidad}x ${productos[item.linea].nombre} – ${item.sabor}\n`;
        });
        const { pares, ahorro } = calcularTotales();
        if (pares > 0) m += `🔥 Promo ${pares} ${pares === 1 ? "par" : "pares"}: -${formatoPesos(ahorro)}\n`;
        m += `\n💰 *Total: ${formatoPesos(totalFinal)}*\n`;
        m += `💳 Pago: ${datosCliente.pago} al recibir${MODO_REPOSICION ? ' (sin seña)' : ''}\n\n`;
        m += `👤 ${datosCliente.nombre}\n`;
        m += `📍 ${datosCliente.localidad}${datosCliente.direccion ? ` – ${datosCliente.direccion}` : ''}`;
        return m;
    }

    function enviarPedido() {
        if (carrito.length === 0) return;
        medir("generate_lead", { currency: "ARS", value: calcularTotales().totalFinal, localidad: datosCliente.localidad, pago: datosCliente.pago, items: carrito.map(i => itemGA(i.linea, i.sabor, i.cantidad)) });
        const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(armarMensaje())}`;
        carrito = [];
        abrirCarrito(false);
        renderizarCarrito();
        window.open(url, '_blank');
    }

    if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.addEventListener('click', () => {
            if (carrito.length === 0) return;
            medir("begin_checkout", { currency: "ARS", value: calcularTotales().totalFinal, items: carrito.map(i => itemGA(i.linea, i.sabor, i.cantidad)) });
            if (!datosCompletos()) { abrirDatos(true); return; }
            enviarPedido();
        });
    }

    // 4. FICHA DE PRODUCTO: DESPLEGABLE DE SABORES + CANTIDAD CON − / +
    function etiquetaStock(stock) {
        if (stock <= 0) return { texto: "Sin stock", clase: "st-out" };
        if (stock === 1) return { texto: "Última unidad", clase: "st-low" };
        return { texto: `Quedan ${stock}`, clase: "st-ok" };
    }

    document.querySelectorAll(".product").forEach(card => {
        const linea = card.dataset.product;
        const datos = productos[linea];
        if (!datos) return;
        medir("view_item", { currency: "ARS", value: datos.precio, items: [{ item_id: linea, item_name: datos.nombre, price: datos.precio }] });
        const customDropdown = card.querySelector(".custom-dropdown");
        const buyBtn = card.querySelector(".product-buy-btn");
        const stockInfo = card.querySelector(".stock-info");
        const imgEl = card.querySelector(".product-image");
        const descEl = card.querySelector(".product-description");
        const descTitle = card.querySelector(".pdp-desc-title");

        // Orden: primero los que tienen stock, agotados al final
        const nombres = Object.keys(datos.sabores).sort((a, b) =>
            (datos.sabores[b].stock > 0) - (datos.sabores[a].stock > 0));
        const hayStock = nombres.some(s => datos.sabores[s].stock > 0);
        if (!hayStock) card.querySelectorAll(".reposicion-notice").forEach(el => { el.hidden = true; });
        let elegido = nombres[0];

        // Fila "En tu reserva  − 2 +" que reemplaza al botón cuando ya agregaste ese sabor
        let qtyRow = null;
        if (buyBtn) {
            buyBtn.removeAttribute("target");
            qtyRow = document.createElement('div');
            qtyRow.className = 'pdp-qty-row';
            qtyRow.hidden = true;
            qtyRow.innerHTML = `
                <span class="panel-en-carrito"><i class="fa-solid fa-circle-check"></i> <span></span></span>
                <div class="stepper" role="group">
                    <button type="button" class="step-btn" data-d="-1">−</button>
                    <span class="step-qty" aria-live="polite">0</span>
                    <button type="button" class="step-btn" data-d="1">+</button>
                </div>`;
            buyBtn.after(qtyRow);
            qtyRow.querySelectorAll('.step-btn').forEach(b => b.addEventListener('click', () => {
                if (sumar(linea, elegido, Number(b.dataset.d)) && b.dataset.d === "1") {
                    qtyRow.classList.remove('flash'); void qtyRow.offsetWidth; qtyRow.classList.add('flash');
                }
            }));

            buyBtn.addEventListener('click', e => {
                if (stockDe(linea, elegido) <= 0) return; // es el link de "Avisame", lo dejamos abrir
                e.preventDefault();
                if (sumar(linea, elegido, 1)) {
                    qtyRow.classList.remove('flash'); void qtyRow.offsetWidth; qtyRow.classList.add('flash');
                }
            });
        }

        function refrescar() {
            const stock = stockDe(linea, elegido);
            const qty = enCarritoDe(linea, elegido);

            if (stockInfo) {
                const e = qty > 0 && qty >= stock ? { texto: "Ya tenés todas", clase: "st-max" } : etiquetaStock(stock);
                stockInfo.innerHTML = `<span class="flavor-stock ${e.clase}">${e.texto}</span>`;
            }

            if (buyBtn) {
                buyBtn.classList.toggle('btn-avisame', stock <= 0);
                // El color de cada línea viene "inline" en el HTML: lo pisamos para el botón de Avisame
                if (buyBtn.dataset.fondo === undefined) buyBtn.dataset.fondo = buyBtn.style.getPropertyValue('background');
                if (stock <= 0) buyBtn.style.setProperty('background', '#FFFFFF', 'important');
                else if (buyBtn.dataset.fondo) buyBtn.style.setProperty('background', buyBtn.dataset.fondo, 'important');
                else buyBtn.style.removeProperty('background');
                if (stock <= 0) {
                    const texto = encodeURIComponent(`Hola Santa Vape! Avisame cuando vuelva el ${datos.nombre} sabor ${elegido} 🙏`);
                    buyBtn.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
                    buyBtn.target = "_blank";
                    buyBtn.rel = "noopener";
                    buyBtn.innerHTML = '<i class="fa-regular fa-bell"></i> Avisame cuando vuelva';
                } else {
                    buyBtn.href = "#";
                    buyBtn.removeAttribute("target");
                    buyBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> ${verbo}`;
                }
                buyBtn.style.display = qty > 0 ? "none" : "";
            }
            if (qtyRow) {
                qtyRow.hidden = qty === 0;
                qtyRow.querySelector('.panel-en-carrito span').textContent = `En tu ${palabraPedido}`;
                qtyRow.querySelector('.step-qty').textContent = qty;
                qtyRow.querySelector('[data-d="-1"]').setAttribute('aria-label', `Restar uno de ${elegido}`);
                const mas = qtyRow.querySelector('[data-d="1"]');
                mas.setAttribute('aria-label', `Sumar uno de ${elegido}`);
                mas.disabled = qty >= stock;
            }

            // Cantidad elegida al lado de cada sabor en el desplegable
            customDropdown?.querySelectorAll('.dropdown-options li').forEach(li => {
                const q = enCarritoDe(linea, li.dataset.sabor);
                const badge = li.querySelector('.opt-qty');
                if (badge) { badge.hidden = q === 0; badge.textContent = `×${q}`; }
            });
            const headQty = customDropdown?.querySelector('.selected-qty');
            if (headQty) { headQty.hidden = qty === 0; headQty.textContent = `×${qty}`; }
        }

        function elegir(sabor) {
            elegido = sabor;
            const info = datos.sabores[sabor];
            const img = imagenDe(linea, sabor);
            if (imgEl) { delete imgEl.dataset.respaldo; imgEl.src = img; imgEl.alt = `${datos.nombre} - ${sabor}`; }
            if (descEl) descEl.textContent = info.descripcion;
            if (descTitle) descTitle.textContent = `Perfil del sabor: ${sabor}`;
            const selectedTextEl = card.querySelector(".selected-text");
            if (selectedTextEl) {
                selectedTextEl.innerHTML = `
                    <span class="selected-flavor">
                        <img src="${imgMini(img)}" alt="" width="32" height="32">
                        <span class="selected-name">${sabor}</span>
                        <span class="opt-qty selected-qty" hidden></span>
                    </span>`;
            }
            refrescar();
        }

        if (customDropdown) {
            const header = customDropdown.querySelector(".dropdown-header");
            const lista = customDropdown.querySelector(".dropdown-options");
            lista.innerHTML = "";
            lista.setAttribute("role", "listbox");
            header.setAttribute("role", "button");
            header.setAttribute("tabindex", "0");
            header.setAttribute("aria-haspopup", "listbox");
            header.setAttribute("aria-expanded", "false");

            const setAbierto = abierto => {
                customDropdown.classList.toggle("open", abierto);
                header.setAttribute("aria-expanded", String(abierto));
            };

            nombres.forEach(sabor => {
                const info = datos.sabores[sabor];
                const e = etiquetaStock(info.stock);
                const li = document.createElement("li");
                li.setAttribute("role", "option");
                li.setAttribute("tabindex", "-1");
                li.dataset.sabor = sabor;
                if (info.stock <= 0) li.classList.add("agotado");
                li.innerHTML = `
                    <img src="${imgMini(imagenDe(linea, sabor))}" alt="" width="30" height="30" loading="lazy">
                    <span class="opt-name">${sabor}</span>
                    <span class="opt-qty" hidden></span>
                    <span class="flavor-stock ${e.clase}">${e.texto}</span>`;
                const elegirEste = () => {
                    lista.querySelectorAll("li").forEach(o => { o.classList.remove("active"); o.setAttribute("aria-selected", "false"); });
                    li.classList.add("active");
                    li.setAttribute("aria-selected", "true");
                    setAbierto(false);
                    elegir(sabor);
                };
                li.addEventListener("click", elegirEste);
                li.addEventListener("keydown", ev => {
                    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); elegirEste(); header.focus(); }
                    if (ev.key === "ArrowDown") { ev.preventDefault(); li.nextElementSibling?.focus(); }
                    if (ev.key === "ArrowUp") { ev.preventDefault(); (li.previousElementSibling || header).focus(); }
                    if (ev.key === "Escape") { setAbierto(false); header.focus(); }
                });
                lista.appendChild(li);
            });

            header.addEventListener("click", () => setAbierto(!customDropdown.classList.contains("open")));
            header.addEventListener("keydown", ev => {
                if (ev.key === "Enter" || ev.key === " " || ev.key === "ArrowDown") {
                    ev.preventDefault();
                    setAbierto(true);
                    (lista.querySelector("li.active") || lista.firstElementChild)?.focus();
                }
                if (ev.key === "Escape") setAbierto(false);
            });
            document.addEventListener("click", e => {
                if (!customDropdown.contains(e.target)) setAbierto(false);
            });

            const liInicial = lista.firstElementChild;
            if (liInicial) { liInicial.classList.add("active"); liInicial.setAttribute("aria-selected", "true"); }
        }

        alCambiarCarrito.push(refrescar);
        elegir(elegido);
    });

    renderizarCarrito();

    // 5. MENU MOBILE Y DESPLEGABLE
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-group-title), .nav-sublink');
    const whatsappBtnFloat = document.querySelector('.whatsapp-float');

    function mostrarWhatsappFlotante(visible) {
        if (!whatsappBtnFloat) return;
        whatsappBtnFloat.style.transform = visible ? '' : 'scale(0)';
        whatsappBtnFloat.style.opacity = visible ? '1' : '0';
        whatsappBtnFloat.style.pointerEvents = visible ? 'auto' : 'none';
    }

    if (menuToggle && nav) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => {
            const menuAbierto = menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(menuAbierto));
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            mostrarWhatsappFlotante(!menuAbierto);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) { menuToggle.classList.remove('active'); menuToggle.setAttribute('aria-expanded', 'false'); }
            if (nav) nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mostrarWhatsappFlotante(true);
        });
    });

    const catalogToggle = document.querySelector('.nav-group-title');
    const navGroup = document.querySelector('.nav-group');
    if (catalogToggle && navGroup) {
        catalogToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navGroup.classList.toggle('open');
            }
        });
    }

    // 6. FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.setAttribute('aria-expanded', 'false');
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            const abierto = item.classList.toggle('active');
            questionBtn.setAttribute('aria-expanded', String(abierto));
        });
    });

    // 7. CARRUSEL DE MÉTRICAS DE CONFIANZA (solo celular)
    const trustContainer = document.querySelector('.trust-metrics-container');
    if (trustContainer) {
        let autoSlide;
        const iniciarCarrusel = () => {
            if (window.innerWidth <= 768) {
                clearInterval(autoSlide);
                autoSlide = setInterval(() => {
                    const maxScroll = trustContainer.scrollWidth - trustContainer.clientWidth;
                    if (trustContainer.scrollLeft >= maxScroll - 10) {
                        trustContainer.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        trustContainer.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }, 3500);
            }
        };
        iniciarCarrusel();
        trustContainer.addEventListener('touchstart', () => clearInterval(autoSlide), { passive: true });
        trustContainer.addEventListener('touchend', () => setTimeout(iniciarCarrusel, 2000), { passive: true });
    }
});

// Efectos sutiles: aparición al bajar y header con sombra al scrollear
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (header) {
        const marcar = () => header.classList.toggle('con-scroll', window.scrollY > 12);
        marcar();
        window.addEventListener('scroll', marcar, { passive: true });
    }
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || !('IntersectionObserver' in window)) return;
    if (!document.body.classList.contains('home-sv') && !document.body.classList.contains('pdp-sv')) return;
    const piezas = [];
    document.querySelectorAll('.sv-vidriera').forEach(v => {
        Array.from(v.children).forEach((c, i) => { c.style.setProperty('--fx-d', (Math.min(i, 3) * 0.08) + 's'); piezas.push(c); });
    });
    document.querySelectorAll('.sv-main > .sv-section > .sv-h2, .pdp-main > .sv-section > .sv-h2, .sv-pasos, .sv-faq, .sv-locs').forEach(e => piezas.push(e));
    if (!piezas.length) return;
    piezas.forEach(e => e.classList.add('fx'));
    document.body.classList.add('fx-on');
    // Las tarjetas de una vidriera aparecen juntas (en el celu es un carrusel horizontal)
    const mostrar = el => el.classList.contains('sv-vidriera')
        ? Array.from(el.children).forEach(c => c.classList.add('fx-ve'))
        : el.classList.add('fx-ve');
    const io = new IntersectionObserver(entradas => entradas.forEach(e => {
        if (e.isIntersecting) { mostrar(e.target); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    piezas.filter(e => !e.parentElement.classList.contains('sv-vidriera')).forEach(e => io.observe(e));
    document.querySelectorAll('.sv-vidriera').forEach(v => io.observe(v));
    // Red de seguridad: si algo no se disparó, se muestra igual
    setTimeout(() => piezas.forEach(e => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('fx-ve'); }), 1500);
});

// Clics en cualquier botón o link de WhatsApp que no sea el envío del pedido (consultas, "Avisame", flotante)
document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    if (!a) return;
    const donde = a.classList.contains("whatsapp-float") ? "boton_flotante"
        : a.closest(".svf") ? "pie" : a.closest(".pdp") ? "producto" : a.closest(".sv-faq, #faq") ? "preguntas" : "otro";
    medir("contacto_whatsapp", { ubicacion: donde, pagina: location.pathname });
}, true);
