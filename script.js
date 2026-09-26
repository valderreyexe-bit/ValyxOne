console.log("Santa Vape cargado correctamente.");
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
            console.log('Error al registrar Service Worker: ', err);
        });
    });
}

const productos = {
    ignite: {
        "MANGO ICE + PEACH WATERMELON ICE": {
            imagen: "IMG/ignite-peachmangowatermelon.webp",
            titulo: "IGNITE V-MIX 40K - Mango Ice + Peach Watermelon Ice",
            descripcion: "Doble tanque: Mango helado intenso por un lado y la frescura dulce de durazno y sandía por el otro. Vapealos solos o combinalos.",
sinStock: true
        },
        "MANGO ICE + PASSION FRUIT GUAVA": {
            imagen: "IMG/ignite-mangopassionfruitguava.webp",
            titulo: "IGNITE V-MIX 40K - Mango Ice + Passion Fruit Guava",
            descripcion: "Doble tanque: Clásico mango maduro helado junto a un blend ultra exótico de maracuyá."
        },
        "STRAWBERRY GRAPE ICE + KIWI WATERMELON ICE": {
            imagen: "IMG/ignite-strawberrygrapekiwiwater.webp",
            titulo: "IGNITE V-MIX 40K - Strawberry Grape Ice + Kiwi Watermelon Ice",
            descripcion: "Doble tanque: Uva dulce bien fresca combinada con una mezcla cítrica y jugosa de kiwi y sandía helada.",
            sinStock: true
        },
        "WATERMELON ICE + GRAPE ICE": {
            imagen: "IMG/ignite-watermelongrape.webp",
            titulo: "IGNITE V-MIX 40K - Watermelon Ice + Grape Ice",
            descripcion: "Doble tanque: Los dos favoritos de siempre. Sandía helada de un lado y uva escarchada del otro en un solo vaper."
        },
        "STRAWBERRY KIWI ICE + GRAPE KIWI ICE": {
            imagen: "IMG/ignite-strawberrykiwigrape.webp",
            titulo: "IGNITE V-MIX 40K - Strawberry Kiwi Ice + Grape Kiwi Ice",
            descripcion: "Doble tanque: El contraste perfecto entre frutilla-kiwi helado y el toque agridulce y vibrante de uva-kiwi ice."
        },
        "PINNEAPPLE ICE + PASSION FRUIT SOUR KIWI": {
            imagen: "IMG/ignite-passionfruitguavakiwipinneapple.webp",
            titulo: "IGNITE V-MIX 40K - Pinneapple Ice + Passion Fruit Sour Kiwi",
            descripcion: "Doble tanque: Ananá tropical refrescante emparejado con una explosión ácida y aromática de maracuyá y kiwi."
        },
    },
    iceking: {
        "Blueberry Ice": {
            imagen: "IMG/iceking-blueberryice.webp",
            titulo: "ELFBAR ICE KING 40K - Blueberry Ice",
            descripcion: "Arándanos jugosos combinados con un golpe helado ultra refrescante e intenso.",
            sinStock: true
        },
        "Grape Ice": {
            imagen: "IMG/iceking-grape.webp",
            titulo: "ELFBAR ICE KING 40K - Grape Ice",
            descripcion: "Uva dulce y sabrosa con una ráfaga de frío extremo característica de la línea Ice King."
        },
        "Strawberry Ice": {
            imagen: "IMG/iceking-strawberry.webp",
            titulo: "ELFBAR ICE KING 40K - Strawberry Ice",
            descripcion: "Frutillas maduras y dulces acompañadas por una fresca e intensa sensación helada."
        },
        "Peach Mango Watermelon": {
            imagen: "IMG/iceking-peachmangowater.webp",
            titulo: "ELFBAR ICE KING 40K - Peach Mango Watermelon",
            descripcion: "Mezcla tropical de durazno, mango y sandía con un final helado irresistible."
        },
        "Green Apple Ice": {
            imagen: "IMG/iceking-greenapple.webp",
            titulo: "ELFBAR ICE KING 40K - Green Apple Ice",
            descripcion: "Manzana verde jugosa con notas ligeramente ácidas y un efecto frígido desbordante."
        },
        "Cranberry Pineapple Juice": {
            imagen: "IMG/iceking-cranberrypineapple.webp",
            titulo: "ELFBAR ICE KING 40K - Cranberry Pineapple Juice",
            descripcion: "Jugo de arándano agridulce y piña tropical en una combinación vibrante y súper helada."
        },
        "Miami Mint": {
            imagen: "IMG/iceking-miamimint.webp",
            titulo: "ELFBAR ICE KING 40K - Miami Mint",
            descripcion: "Menta limpia, fresca y suave con un nivel de frescura óptimo y duradero."
        },
        "Watermelon Ice": {
            imagen: "IMG/iceking-watermelonice.webp",
            titulo: "ELFBAR ICE KING 40K - Watermelon Ice",
            descripcion: "El clásico e infaltable sabor a sandía dulce con el golpe extra helado de Elfbar."
        }
    },
    te30k: {
        "Cherry strazz": {
            imagen: "IMG/te-cherrystrazz.webp",
            titulo: "ELFBAR TE 30K - Cherry strazz",
            descripcion: "Cerezas dulces combinadas con frutillas ácidas y un golpe fresco perfectamente balanceado."
        },
        "Peach mango Watermelon": {
            imagen: "IMG/te-peachmangowatermelon.webp",
            titulo: "ELFBAR TE 30K - Peach mango Watermelon",
            descripcion: "El blend tropical perfecto entre durazno aterciopelado, mango dulce y sandía jugosa."
        },
        "Pineapple mango": {
            imagen: "IMG/te-pineapplemango.webp",
            titulo: "ELFBAR TE 30K - Pineapple mango",
            descripcion: "Fusión exótica de piña tropical y mango maduro con gran intensidad en cada calada."
        },
        "Strawberry Ice": {
            imagen: "IMG/te-strawberryice.webp",
            titulo: "ELFBAR TE 30K - Strawberry Ice",
            descripcion: "Frutillas rojas dulces con un final frío refrescante que resalta todo su sabor."
        },
        "Bubbalo Grape": {
            imagen: "IMG/te-chicleuva.webp",
            titulo: "ELFBAR TE 30K - Bubbalo Grape",
            descripcion: "Inspirado en el clásico chicle de uva: dulzor intenso, frutal y con un toque nostálgico.",
            sinStock: true
        },
        "Blueberry ice": {
            imagen: "IMG/te-blueberry.webp",
            titulo: "ELFBAR TE 30K - Blueberry ice",
            descripcion: "Arándanos silvestres con un acabado mentolado limpio y duradero.",
            sinStock: true
        },
        "Green Apple Ice": {
            imagen: "IMG/te-greenappleice.webp",
            titulo: "ELFBAR TE 30K - Green Apple Ice",
            descripcion: "Manzana verde crujiente con notas ácidas y una frescura helada envolvente."
        },
        "Miami mint": {
            imagen: "IMG/te-miamimint.webp",
            titulo: "ELFBAR TE 30K - Miami mint",
            descripcion: "Menta refrescante de perfil cítrico y limpio, ideal para un vapeo fresco y constante."
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. MODAL VERIFICACIÓN EDAD
    const popup = document.getElementById("age-verification");
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");
    if (popup) {
        if (localStorage.getItem("mayorEdad") === "si") {
            popup.remove();
            document.body.classList.remove("popup-active");
        } else {
            document.body.classList.add("popup-active");
            window.scrollTo(0, 0); 
            history.replaceState(null, null, ' '); 
            if (btnSi) {
                btnSi.addEventListener("click", () => {
                    localStorage.setItem("mayorEdad", "si");
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

    // 2. NUEVO BANNER CARRUSEL (NUEVOS INGRESOS / LOST MARY)
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (track && dots.length > 0) {
        let currentSlide = 0;
        const totalSlides = dots.length;
        let slideInterval;

        function updateSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            let next = (currentSlide + 1) % totalSlides;
            updateSlide(next);
        }

        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateSlide(i);
                startAutoSlide();
            });
        });

        startAutoSlide();

        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(slideInterval));
            container.addEventListener('mouseleave', startAutoSlide);
            container.addEventListener('touchstart', () => clearInterval(slideInterval), { passive: true });
            container.addEventListener('touchend', startAutoSlide, { passive: true });
        }
    }

    // 3. LÓGICA DEL CARRITO Y PROMOCIONES
    let carrito = JSON.parse(localStorage.getItem('santaVapeCart')) || []; 
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartCloseBtn = document.querySelector('.cart-close-btn');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartBadge = document.querySelector('.cart-badge');
    const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const promoNotice = document.getElementById('promo-notice');

    function guardarCarritoEnMemoria() {
        localStorage.setItem('santaVapeCart', JSON.stringify(carrito));
    }

    function toggleCart() {
        if(cartSidebar) cartSidebar.classList.toggle('active');
        if(cartOverlay) cartOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    if(cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
    if(cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    if(continueShoppingBtn) continueShoppingBtn.addEventListener('click', toggleCart);

    function renderizarCarrito() {
        guardarCarritoEnMemoria(); 
        if(!cartItemsContainer) return; 
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        
        let iceKingCount = 0;
        let teCount = 0;
        let igniteCount = 0;
        let totalOtros = 0;

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; margin-top: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                    <div style="font-size: 3rem; color: var(--border-color);"><i class="fa-solid fa-basket-shopping"></i></div>
                    <div class="cart-empty-msg" style="margin-top: 0;">Tu carrito está vacío.</div>
                    <a href="#productos" class="btn-primary" style="padding: 12px 24px; font-size: 0.95rem; width: fit-content;" onclick="document.querySelector('.cart-close-btn').click();">Ver Catálogo</a>
                </div>
            `;
            if(cartBadge) cartBadge.textContent = '0';
            if(promoNotice) promoNotice.style.display = 'none';
            if(whatsappCheckoutBtn) {
                whatsappCheckoutBtn.innerHTML = '<i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; margin-right: 8px;"></i> Enviar Pedido';
                whatsappCheckoutBtn.style.opacity = '0.5';
                whatsappCheckoutBtn.style.pointerEvents = 'none';
            }
            return;
        }

        if(whatsappCheckoutBtn) {
            whatsappCheckoutBtn.style.opacity = '1';
            whatsappCheckoutBtn.style.pointerEvents = 'auto';
        }

        carrito.forEach((item, index) => {
            totalItems += item.cantidad;
            let precioUnidad = 0;
            
            if (item.titulo.includes("ICE KING")) {
                precioUnidad = 30800;
                iceKingCount += item.cantidad;
            } else if (item.titulo.includes("TE 30K")) {
                precioUnidad = 28000;
                teCount += item.cantidad;
            } else if (item.titulo.includes("IGNITE")) {
                precioUnidad = 34800;
                igniteCount += item.cantidad;
            } else {
                precioUnidad = 24500;
                totalOtros += (precioUnidad * item.cantidad);
            }

            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.titulo}</div>
                        <div class="cart-item-flavor">$${precioUnidad.toLocaleString('es-AR')} c/u</div>
                        <div class="cart-item-controls">
                            <button onclick="cambiarCantidad(${index}, -1)">-</button>
                            <span class="cart-item-qty">${item.cantidad}</span>
                            <button onclick="cambiarCantidad(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        const icePairs = Math.floor(iceKingCount / 2);
        const iceSingles = iceKingCount % 2;
        const totalIceKing = (icePairs * 60000) + (iceSingles * 30800);

        const tePairs = Math.floor(teCount / 2);
        const teSingles = teCount % 2;
        const totalTE = (tePairs * 57500) + (teSingles * 28000);

        const ignitePairs = Math.floor(igniteCount / 2);
        const igniteSingles = igniteCount % 2;
        const totalIgnite = (ignitePairs * 68000) + (igniteSingles * 34800);

        const totalFinal = totalOtros + totalIceKing + totalTE + totalIgnite;

        if (promoNotice) {
            let avisos = [];
            if (icePairs > 0) avisos.push("🔥 Promo Ice King (2 x $60.000) aplicada");
            if (tePairs > 0) avisos.push("🔥 Promo TE 30K (2 x $57.500) aplicada");
            if (ignitePairs > 0) avisos.push("🔥 Promo Ignite V-Mix (2 x $68.000) aplicada");
            
            if (avisos.length > 0) {
                promoNotice.innerHTML = avisos.join("<br>");
                promoNotice.style.display = 'block';
            } else {
                promoNotice.style.display = 'none';
            }
        }

        if(whatsappCheckoutBtn) {
            whatsappCheckoutBtn.innerHTML = `<i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; margin-right: 8px;"></i> Enviar Pedido ($${totalFinal.toLocaleString('es-AR')})`;
        }
        if(cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
        }
    }

    renderizarCarrito();

    window.cambiarCantidad = function(index, cambio) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        renderizarCarrito();
    };

    if(whatsappCheckoutBtn) {
        whatsappCheckoutBtn.addEventListener('click', () => {
            let mensaje = "Hola *Santa Vape*!💨\nQuiero confirmar el siguiente pedido:\n\n";
            
            let iceKingCount = 0;
            let teCount = 0;
            let igniteCount = 0;
            let totalOtros = 0;

            carrito.forEach(item => {
                let precioUnidad = 0;

                if (item.titulo.includes("ICE KING")) {
                    precioUnidad = 30800;
                    iceKingCount += item.cantidad;
                } else if (item.titulo.includes("TE 30K")) {
                    precioUnidad = 28000;
                    teCount += item.cantidad;
                } else if (item.titulo.includes("IGNITE")) {
                    precioUnidad = 34800;
                    igniteCount += item.cantidad;
                } else {
                    precioUnidad = 24500;
                    totalOtros += (precioUnidad * item.cantidad);
                }

                mensaje += `📦 *${item.cantidad}x ${item.titulo}*\n`;
                if (!item.titulo.includes("ICE KING") && !item.titulo.includes("TE 30K") && !item.titulo.includes("IGNITE")) {
                    mensaje += `   💵 Subtotal: $${(precioUnidad * item.cantidad).toLocaleString('es-AR')}\n`;
                }
                mensaje += `   └─────────────────\n\n`;
            });

            const icePairs = Math.floor(iceKingCount / 2);
            const iceSingles = iceKingCount % 2;
            const totalIceKing = (icePairs * 60000) + (iceSingles * 30800);

            const tePairs = Math.floor(teCount / 2);
            const teSingles = teCount % 2;
            const totalTE = (tePairs * 57500) + (teSingles * 28000);

            const ignitePairs = Math.floor(igniteCount / 2);
            const igniteSingles = igniteCount % 2;
            const totalIgnite = (ignitePairs * 68000) + (igniteSingles * 34800);

            const totalFinal = totalOtros + totalIceKing + totalTE + totalIgnite;

            if (iceKingCount > 0) {
                mensaje += `🧊 *Total Elfbar Ice King:* $${totalIceKing.toLocaleString('es-AR')}\n`;
                if (icePairs > 0) mensaje += `   *(Promo 2 x $60.000 aplicada)* 🔥\n\n`;
                else mensaje += `\n`;
            }

            if (teCount > 0) {
                mensaje += `⚡ *Total Elfbar TE 30K:* $${totalTE.toLocaleString('es-AR')}\n`;
                if (tePairs > 0) mensaje += `   *(Promo 2 x $57.500 aplicada)* 🔥\n\n`;
                else mensaje += `\n`;
            }

            if (igniteCount > 0) {
                mensaje += `🔥 *Total Ignite V-Mix:* $${totalIgnite.toLocaleString('es-AR')}\n`;
                if (ignitePairs > 0) mensaje += `   *(Promo 2 x $68.000 aplicada)* 🔥\n\n`;
                else mensaje += `\n`;
            }

            mensaje += `💰 *TOTAL A ABONAR: $${totalFinal.toLocaleString('es-AR')}*\n\n`;
            mensaje += "📍 Aguardo respuesta para confirmar el stock y coordinar la entrega. ¡Gracias!";
            
            carrito = [];
            renderizarCarrito();
            toggleCart(); 
            const url = `https://api.whatsapp.com/send?phone=5492216205269&text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    }

// 4. SELECTOR DE SABORES (PDP)
    document.querySelectorAll(".product").forEach(card => {
        const tipoProducto = card.dataset.product;
        const customDropdown = card.querySelector(".custom-dropdown");
        const buyBtn = card.querySelector(".product-buy-btn");
        let productoSeleccionado = null; 
        
        function actualizarProducto(sabor) {
            productoSeleccionado = productos[tipoProducto]?.[sabor];
            if (!productoSeleccionado) return;
            
            const imgEl = card.querySelector(".product-image");
            if (imgEl) imgEl.src = productoSeleccionado.imagen;
            
            const descEl = card.querySelector(".product-description");
            if (descEl) descEl.textContent = productoSeleccionado.descripcion;

            const selectedTextEl = card.querySelector(".selected-text");
            if (selectedTextEl) {
                selectedTextEl.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${productoSeleccionado.imagen}" style="width: 24px; height: 24px; object-fit: contain; flex-shrink: 0; border-radius: 4px;">
                        <span>${sabor}</span>
                    </div>
                `;
            }

            // LÓGICA DE STOCK EN EL BOTÓN DE COMPRA
            if (buyBtn) {
                if (productoSeleccionado.sinStock) {
                    buyBtn.style.opacity = "0.4";
                    buyBtn.style.pointerEvents = "none";
                    buyBtn.innerHTML = '<i class="fa-solid fa-ban" style="margin-right: 8px;"></i> Agotado Temporalmente';
                    buyBtn.style.background = 'var(--text-muted)';
                    buyBtn.style.boxShadow = 'none';
                } else {
                    buyBtn.style.opacity = "1";
                    buyBtn.style.pointerEvents = "auto";
                    buyBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Agregar al Carrito';
                    buyBtn.style.background = '';
                    buyBtn.style.boxShadow = '';
                }
            }
        }

        if (customDropdown) {
            const header = customDropdown.querySelector(".dropdown-header");
            const selectedText = customDropdown.querySelector(".selected-text");
            const options = customDropdown.querySelectorAll(".dropdown-options li");
            
            // --- INICIO DE LA NUEVA LÓGICA DE STOCK ---
            let saborInicialLimpio = options[0].textContent.trim();
            options.forEach(opt => opt.classList.remove("active"));
            
            for (let i = 0; i < options.length; i++) {
                let nombreSabor = options[i].textContent.trim();
                let infoProducto = productos[tipoProducto]?.[nombreSabor];
                
                if (infoProducto && !infoProducto.sinStock) {
                    saborInicialLimpio = nombreSabor;
                    options[i].classList.add("active");
                    break; // Corta la búsqueda apenas encuentra uno con stock
                }
            }
            
            // Por si absolutamente todos los sabores están sin stock
            if (!Array.from(options).some(opt => opt.classList.contains("active"))) {
                options[0].classList.add("active");
            }
            // --- FIN DE LA NUEVA LÓGICA ---
            
            header.addEventListener("click", () => {
                customDropdown.classList.toggle("open");
            });

            options.forEach(option => {
                const nombreSaborLimpio = option.textContent.trim();
                const productoInfo = productos[tipoProducto]?.[nombreSaborLimpio];

                if (productoInfo && productoInfo.imagen) {
                    const imgThumb = document.createElement('img');
                    imgThumb.src = productoInfo.imagen;
                    imgThumb.style.cssText = "width: 26px; height: 26px; object-fit: contain; flex-shrink: 0; margin-right: 12px; border-radius: 4px;";
                    option.prepend(imgThumb);
                    option.style.display = "flex";
                    option.style.alignItems = "center";
                }

                // LÓGICA VISUAL EN LA LISTA DESPLEGABLE
                if (productoInfo && productoInfo.sinStock) {
                    option.style.opacity = "0.4";
                    option.style.background = "var(--bg-alt)";
                    
                    const badgeAgotado = document.createElement('span');
                    badgeAgotado.innerHTML = "Sin Stock";
                    badgeAgotado.style.cssText = "margin-left: auto; font-size: 0.65rem; background: #FF3B30; color: #FFF; padding: 3px 8px; border-radius: 20px; font-weight: 800; text-transform: uppercase;";
                    option.appendChild(badgeAgotado);
                } else if (productoInfo && productoInfo.etiqueta) {
                    const badge = document.createElement('span');
                    badge.innerHTML = productoInfo.etiqueta;
                    badge.style.cssText = "margin-left: auto; font-size: 0.65rem; background: rgba(255, 60, 0, 0.1); color: #ff3c00; padding: 3px 8px; border-radius: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;";
                    if(productoInfo.etiqueta.includes('⚡')) {
                        badge.style.background = "rgba(0, 82, 255, 0.1)";
                        badge.style.color = "var(--primary-blue)";
                    }
                    option.appendChild(badge);
                }

                option.addEventListener("click", () => {
                    options.forEach(opt => opt.classList.remove("active"));
                    option.classList.add("active");
                    customDropdown.classList.remove("open");
                    actualizarProducto(nombreSaborLimpio);
                });
            });

            document.addEventListener("click", (e) => {
                if (!customDropdown.contains(e.target)) {
                    customDropdown.classList.remove("open");
                }
            });
            actualizarProducto(saborInicialLimpio);
        }

        if (buyBtn) {
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                if (productoSeleccionado && !productoSeleccionado.sinStock) {
                    const originalText = buyBtn.innerHTML;
                    const originalBg = buyBtn.style.background;
                    const originalShadow = buyBtn.style.boxShadow;
                    buyBtn.style.background = '#25D366'; 
                    buyBtn.style.boxShadow = '0 10px 25px -5px rgba(37, 211, 102, 0.4)';
                    buyBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 10px; font-size: 1.4rem;"></i> ¡Agregado!';
                    if (navigator.vibrate) navigator.vibrate(50);
                    setTimeout(() => {
                        buyBtn.style.background = originalBg;
                        buyBtn.style.boxShadow = originalShadow;
                        buyBtn.innerHTML = originalText;
                        const itemExistente = carrito.find(item => item.titulo === productoSeleccionado.titulo);
                        if (itemExistente) {
                            itemExistente.cantidad += 1;
                        } else {
                            carrito.push({
                                titulo: productoSeleccionado.titulo,
                                imagen: productoSeleccionado.imagen,
                                cantidad: 1
                            });
                        }
                        renderizarCarrito(); 
                        toggleCart(); 
                    }, 600); 
                }
            });
        }
    });

    // 5. MENU MOBILE Y DESPLEGABLE
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-group-title), .nav-sublink');
    const whatsappBtnFloat = document.querySelector('.whatsapp-float');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const menuAbierto = menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            if (whatsappBtnFloat) {
                if (menuAbierto) {
                    whatsappBtnFloat.style.transform = 'scale(0)';
                    whatsappBtnFloat.style.opacity = '0';
                    whatsappBtnFloat.style.pointerEvents = 'none';
                } else {
                    whatsappBtnFloat.style.transform = ''; 
                    whatsappBtnFloat.style.opacity = '1';
                    whatsappBtnFloat.style.pointerEvents = 'auto';
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (nav) nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if (whatsappBtnFloat) {
                whatsappBtnFloat.style.transform = '';
                whatsappBtnFloat.style.opacity = '1';
                whatsappBtnFloat.style.pointerEvents = 'auto';
            }
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
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // 7. CARRUSEL DE MÉTRICAS DE CONFIANZA (RECUPERADO)
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
        trustContainer.addEventListener('touchstart', () => {
            clearInterval(autoSlide);
        }, { passive: true });
        trustContainer.addEventListener('touchend', () => {
            setTimeout(iniciarCarrusel, 2000);
        }, { passive: true });
    }
});
