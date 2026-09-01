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
        "Peach Mango Watermelon": {
            imagen: "IMG/ignite.webp",
            titulo: "IGNITE ICE 40K PUFFS - Peach Mango Watermelon",
            descripcion: "Una combinación tropical de durazno, mango y sandía. Dulce, jugosa y con un refrescante efecto ice.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "Tutti Fruit Mix": {
            imagen: "IMG/ignite.webp",
            titulo: "IGNITE ICE 40K PUFFS - Tutti Fruit Mix",
            descripcion: "Mezcla intensa de frutas dulces con un perfil equilibrado y refrescante. Ideal para quienes buscan un sabor completo y diferente.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "Cherry Watermelon": {
            imagen: "IMG/ignite.webp",
            titulo: "IGNITE ICE 40K PUFFS - Cherry Watermelon",
            descripcion: "La intensidad de la cereza se combina con la frescura de la sandía para lograr un sabor dulce, frutal y muy refrescante.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "Pineapple Kiwi Dragon Fruit": {
            imagen: "IMG/ignite.webp",
            titulo: "IGNITE ICE 40K PUFFS - Pineapple Kiwi Dragon Fruit",
            descripcion: "Ananá, kiwi y fruta del dragón en una mezcla tropical con notas dulces, ácidas y un final helado.",
etiqueta: "❌️SIN STOCK❌️"
        },
        "Watermelon": {
            imagen: "IMG/ignite.webp",
            titulo: "IGNITE ICE 40K PUFFS - Watermelon",
            descripcion: "Sandía madura con un efecto ice suave. Un clásico refrescante y muy equilibrado.",
etiqueta: "❌️SIN STOCK❌️"
        }
    },
    trio: {
        "Blue Razz Ice": {
            imagen: "IMG/bluerazz.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Blue Razz Ice",
            descripcion: "Frambuesa azul dulce con un intenso toque helado. Refrescante, vibrante y llena de sabor."
        },
        "Blueberry Pom Slushy": {
            imagen: "IMG/pomslushy.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Blueberry Pom Slushy",
            descripcion: "Arándano y granada combinados en una mezcla frutal estilo granizado. Dulce, fresca y muy equilibrada."
        },
        "Cool Mentol": {
            imagen: "IMG/coolmentol.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Cool Mentol",
            descripcion: "Mentol puro con una frescura intensa y duradera. Ideal para quienes buscan una sensación ultra refrescante.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "La Grape": {
            imagen: "IMG/lagrape.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - La Grape",
            descripcion: "Uva dulce y jugosa con un sabor suave e intenso. Una opción clásica que nunca falla."
        },
        "PineApple Lime": {
            imagen: "IMG/pineapplelime.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - PineApple Lime",
            descripcion: "Piña tropical madura combinada con el toque cítrico del limón. Refrescante y perfectamente equilibrada."
        },
        "Raspberry Watermelon": {
            imagen: "IMG/raspberrywatermelon.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Raspberry Watermelon",
            descripcion: "La dulzura de la sandía se mezcla con la intensidad de la frambuesa. Frutal, jugosa y deliciosa.",
etiqueta: "❌️SIN STOCK❌️"
        },
        "Scary Berry": {
            imagen: "IMG/scarryberry.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Scary Berry",
            descripcion: "Explosión de frutos rojos con un sabor intenso y lleno de personalidad. Dulce, vibrante y adictivamente rica."
        },
        "Watermelon Ice": {
            imagen: "IMG/watermelon.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Watermelon Ice",
            descripcion: "Sandía dulce y jugosa acompañada por un refrescante efecto ice. Ligera, fresca y perfecta para todo el día.",
etiqueta: "❌️SIN STOCK❌️"
        },
        "Sour Strawberry Dragon Fruit": {
            imagen: "IMG/sourstraw.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Sour Strawberry Dragon Fruit",
            descripcion: "Frutilla ácida combinada con fruta del dragón exótica. Una mezcla tropical con el equilibrio perfecto entre dulzor y acidez.",
            etiqueta: "🔥 Últimas unidades"
        }
    },
    iceking: {
        "DragonStrawNana": {
            imagen: "IMG/dragonstrawberrybanana.webp",
            titulo: "ELFBAR ICE KING - DragonStrawNana",
            descripcion: "La exótica fruta del dragón se combina con frutilla y banana para crear un sabor tropical, dulce y extremadamente suave."
        },
        "Baja Splash": {
            imagen: "IMG/bajasplash.webp",
            titulo: "ELFBAR ICE KING - Baja Splash",
            descripcion: "Una explosión de sabores cítricos y tropicales con una frescura única. Refrescante, intensa y perfecta para cualquier momento.",
            etiqueta: "❌️SIN STOCK❌️"
        }
    },
    summer: {
        "Green Apple Slush": {
            imagen: "IMG/greenappleslush.webp",
            titulo: "ELFBAR SUMMER EDITION - Green Apple Slush",
            descripcion: "La combinación perfecta de manzana verde jugosa y efecto granizado. Dulce, refrescante y llena de sabor.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "Black Mint": {
            imagen: "IMG/blackmint.webp",
            titulo: "ELFBAR SUMMER EDITION - Black Mint",
            descripcion: "Una explosión de menta intensa con frescura duradera. Ideal para quienes buscan una experiencia limpia y ultra refrescante.",
etiqueta: "❌️SIN STOCK❌️"
        }
    },
    lostmary: {
        "Grapefruit Passion Guava": {
            imagen: "IMG/lostgrape.webp",
            titulo: "LOST MARY 35K - Grapefruit Passion Guava",
            descripcion: "Una mezcla tropical de pomelo, maracuyá y guayaba. Dulce, exótica y con un toque cítrico refrescante.",
            etiqueta: "❌️SIN STOCK❌️"
        },
        "Green Apple Ice": {
            imagen: "IMG/lostgreen.webp",
            titulo: "LOST MARY 35K - Green Apple Ice",
            descripcion: "Manzana verde intensa con un final helado. Fresco, ligeramente ácido y muy refrescante en cada calada."
        },
        "Hawaiian Juice": {
            imagen: "IMG/losthawaian.webp",
            titulo: "LOST MARY 35K - Hawaiian Juice",
            descripcion: "Blend tropical inspirado en Hawái, con frutas dulces y jugosas. Suave, exótico y perfecto para todo el día."
        },
        "Mango Ice": {
            imagen: "IMG/lostmango.webp",
            titulo: "LOST MARY 35K - Mango Ice",
            descripcion: "Mango maduro y dulce combinado con un toque de hielo. Tropical, intenso y extremadamente refrescante.",
            etiqueta: "🔥 Últimas unidades"
        },
        "Miami Mint": {
            imagen: "IMG/lostmiami.webp",
            titulo: "LOST MARY 35K - Miami Mint",
            descripcion: "Menta limpia y refrescante con un sabor suave y duradero. Ideal para quienes buscan frescura pura."
        },
        "Pineapple Ice": {
            imagen: "IMG/lostpineapple.webp",
            titulo: "LOST MARY 35K - Pineapple Ice",
            descripcion: "Piña tropical dulce con un refrescante toque helado. Equilibrado, jugoso y lleno de sabor.",
            etiqueta: "🔥 Últimas unidades"
        }
    }
};
document.addEventListener("DOMContentLoaded", () => {
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
    let carrito = JSON.parse(localStorage.getItem('santaVapeCart')) || []; 
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartCloseBtn = document.querySelector('.cart-close-btn');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartBadge = document.querySelector('.cart-badge');
    const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
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
        let totalDinero = 0; 
        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; margin-top: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                    <div style="font-size: 3rem; color: var(--border-color);"><i class="fa-solid fa-basket-shopping"></i></div>
                    <div class="cart-empty-msg" style="margin-top: 0;">Tu carrito está vacío.</div>
                    <a href="#productos" class="btn-primary" style="padding: 12px 24px; font-size: 0.95rem; width: fit-content;" onclick="document.querySelector('.cart-close-btn').click();">Ver Catálogo</a>
                </div>
            `;
            if(cartBadge) cartBadge.textContent = '0';
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
            if (item.titulo.includes("IGNITE")) precioUnidad = 31500;
            else if (item.titulo.includes("ELFBAR")) precioUnidad = 29700;
            else if (item.titulo.includes("LOST MARY")) precioUnidad = 24500;
            totalDinero += (precioUnidad * item.cantidad);
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
        if(whatsappCheckoutBtn) {
            whatsappCheckoutBtn.innerHTML = `<i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; margin-right: 8px;"></i> Enviar Pedido ($${totalDinero.toLocaleString('es-AR')})`;
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
            let totalFinal = 0; 
            carrito.forEach(item => {
                let precioUnidad = 0;
                if (item.titulo.includes("IGNITE")) precioUnidad = 31500;
                else if (item.titulo.includes("ELFBAR")) precioUnidad = 29700;
                else if (item.titulo.includes("LOST MARY")) precioUnidad = 24500;
                let subtotal = precioUnidad * item.cantidad;
                totalFinal += subtotal; 
                mensaje += `📦 *${item.cantidad}x ${item.titulo}*\n`;
                mensaje += `   💵 Subtotal: $${subtotal.toLocaleString('es-AR')}\n`;
                mensaje += `   └─────────────────\n\n`;
            });
            mensaje += `💰 *TOTAL A ABONAR: $${totalFinal.toLocaleString('es-AR')}*\n\n`;
            mensaje += "📍 Aguardo respuesta para confirmar el stock y coordinar la entrega. ¡Gracias!";
            carrito = [];
            renderizarCarrito();
            toggleCart(); 
            const url = `https://api.whatsapp.com/send?phone=5492216205269&text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    }
    document.querySelectorAll(".product").forEach(card => {
        const tipoProducto = card.dataset.product;
        const customDropdown = card.querySelector(".custom-dropdown");
        let productoSeleccionado = null; 
        function actualizarProducto(sabor) {
            productoSeleccionado = productos[tipoProducto]?.[sabor];
            if (!productoSeleccionado) return;
            const titleEl = card.querySelector(".product-title");
            if (titleEl) titleEl.textContent = productoSeleccionado.titulo;
            const imgEl = card.querySelector(".product-image");
            if (imgEl) imgEl.src = productoSeleccionado.imagen;
            const descEl = card.querySelector(".product-description");
            if (descEl) descEl.textContent = productoSeleccionado.descripcion;
        }
        if (customDropdown) {
            const header = customDropdown.querySelector(".dropdown-header");
            const selectedText = customDropdown.querySelector(".selected-text");
            const options = customDropdown.querySelectorAll(".dropdown-options li");
            const saborInicialLimpio = options[0].textContent.trim();
            header.addEventListener("click", () => {
                customDropdown.classList.toggle("open");
            });
            options.forEach(option => {
                const nombreSaborLimpio = option.textContent.trim();
                const productoInfo = productos[tipoProducto]?.[nombreSaborLimpio];
                if (productoInfo && productoInfo.etiqueta) {
                    const badge = document.createElement('span');
                    badge.innerHTML = productoInfo.etiqueta;
                    badge.style.cssText = "margin-left: 10px; font-size: 0.65rem; background: rgba(255, 60, 0, 0.1); color: #ff3c00; padding: 3px 8px; border-radius: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;";
                    if(productoInfo.etiqueta.includes('⚡')) {
                        badge.style.background = "rgba(0, 82, 255, 0.1)";
                        badge.style.color = "var(--primary-blue)";
                    }
                    option.appendChild(badge);
                }
                option.addEventListener("click", () => {
                    options.forEach(opt => opt.classList.remove("active"));
                    option.classList.add("active");
                    selectedText.textContent = nombreSaborLimpio;
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
        const buyBtn = card.querySelector(".product-buy-btn");
        if (buyBtn) {
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                if (productoSeleccionado) {
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
    const tabButtons = document.querySelectorAll('.model-tab-btn');
    const modelContents = document.querySelectorAll('.model-content');
    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                modelContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    window.dispatchEvent(new Event('resize')); 
                }
            });
        });
    }
});
