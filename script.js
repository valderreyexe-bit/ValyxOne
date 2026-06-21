console.log("Volutt landing page cargada correctamente.");

/* ==========================
   POPUP +18
========================== */

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("age-verification");
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");

    if (!popup) return;

    // Si ya aceptó anteriormente, no mostrar popup
    if (localStorage.getItem("mayorEdad") === "si") {
        popup.remove();
        document.body.classList.remove("popup-active");
        return;
    }

    document.body.classList.add("popup-active");

    if (btnSi) {
        btnSi.addEventListener("click", () => {

            localStorage.setItem("mayorEdad", "si");

            popup.remove();

            document.body.classList.remove("popup-active");
        });
    }

    if (btnNo) {
        btnNo.addEventListener("click", () => {
            window.location.replace("https://www.google.com");
        });
    }

    // Protección extra por si algo falla
    setTimeout(() => {
        document.body.classList.remove("popup-active");
    }, 3000);

});


/* ==========================
   SABORES
========================== */

const productos = {

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
            descripcion: "Mentol puro con una frescura intensa y duradera. Ideal para quienes buscan una sensación ultra refrescante."
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
            descripcion: "La dulzura de la sandía se mezcla con la intensidad de la frambuesa. Frutal, jugosa y deliciosa."
        },

        "Scary Berry": {
            imagen: "IMG/scarryberry.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Scary Berry",
            descripcion: "Explosión de frutos rojos con un sabor intenso y lleno de personalidad. Dulce, vibrante y adictivamente rica."
        },

        "Watermelon Ice": {
            imagen: "IMG/watermelon.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Watermelon Ice",
            descripcion: "Sandía dulce y jugosa acompañada por un refrescante efecto ice. Ligera, fresca y perfecta para todo el día."
        },

        "Sour Strawberry Dragon Fruit": {
            imagen: "IMG/sourstraw.webp",
            titulo: "ELFBAR TRIO 40K PUFFS - Sour Strawberry Dragon Fruit",
            descripcion: "Frutilla ácida combinada con fruta del dragón exótica. Una mezcla tropical con el equilibrio perfecto entre dulzor y acidez."
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
            descripcion: "Una explosión de sabores cítricos y tropicales con una frescura única. Refrescante, intensa y perfecta para cualquier momento."
        }

    },

    summer: {

        "Green Apple Slush": {
            imagen: "IMG/greenappleslush.webp",
            titulo: "ELFBAR SUMMER EDITION - Green Apple Slush",
            descripcion: "La combinación perfecta de manzana verde jugosa y efecto granizado. Dulce, refrescante y llena de sabor."
        },

        "Black Mint": {
            imagen: "IMG/blackmint.webp",
            titulo: "ELFBAR SUMMER EDITION - Black Mint",
            descripcion: "Una explosión de menta intensa con frescura duradera. Ideal para quienes buscan una experiencia limpia y ultra refrescante."
        }

    },

    lostmary: {

        "Grapefruit Passion Guava": {
            imagen: "IMG/lostgrape.webp",
            titulo: "LOST MARY 35K - Grapefruit Passion Guava",
            descripcion: "Una mezcla tropical de pomelo, maracuyá y guayaba. Dulce, exótica y con un toque cítrico refrescante."
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
            descripcion: "Mango maduro y dulce combinado con un toque de hielo. Tropical, intenso y extremadamente refrescante."
        },

        "Miami Mint": {
            imagen: "IMG/lostmiami.webp",
            titulo: "LOST MARY 35K - Miami Mint",
            descripcion: "Menta limpia y refrescante con un sabor suave y duradero. Ideal para quienes buscan frescura pura."
        },

        "Pineapple Ice": {
            imagen: "IMG/lostpineapple.webp",
            titulo: "LOST MARY 35K - Pineapple Ice",
            descripcion: "Piña tropical dulce con un refrescante toque helado. Equilibrado, jugoso y lleno de sabor."
        }

    }

};


/* ==========================
   INICIALIZAR TARJETAS
========================== */

document.querySelectorAll(".product").forEach(card => {

    const tipoProducto = card.dataset.product;

    const botones = card.querySelectorAll(".flavor-buttons button");

    botones.forEach(btn => {

        btn.addEventListener("click", () => {

            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const sabor = btn.textContent.trim();

            const data = productos[tipoProducto][sabor];

            if (!data) return;

            card.querySelector(".product-title").textContent = data.titulo;

            card.querySelector(".product-image").src = data.imagen;

            card.querySelector(".product-description").textContent =
                data.descripcion;

            const buyBtn = card.querySelector(".product-buy-btn");

            buyBtn.href =
                `https://wa.me/5492216205269?text=${encodeURIComponent(
                    `Hola, quiero comprar un ${data.titulo}`
                )}`;

        });

    });

});

document.querySelectorAll(".product").forEach(card => {

    const primerBoton =
        card.querySelector(".flavor-buttons button");

    if (primerBoton) {
        primerBoton.click();
    }

});
