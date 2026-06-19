console.log("Volutt landing page cargada correctamente.");

/* ==========================
   POPUP +18
========================== */

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("age-verification");
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");

    if (popup && btnSi && btnNo) {

        document.body.classList.add("popup-active");

        btnSi.addEventListener("click", () => {
            popup.style.display = "none";
            document.body.classList.remove("popup-active");
        });

        btnNo.addEventListener("click", () => {
            window.location.href = "https://www.google.com";
        });
    }

});


/* ==========================
   SABORES
========================== */

const sabores = {

    "Blue Razz Ice": {
        imagen: "IMG/bluerazz.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Blue Razz Ice",
        descripcion: "Frambuesa azul dulce con un intenso efecto ice."
    },

    "Blueberry Pom Slushy": {
        imagen: "IMG/mangomagic.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Blueberry Pom Slushy",
        descripcion: "Mezcla frutal de arándano y granada con una frescura estilo granizado."
    },

    "Cool Mentol": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Cool Mentol",
        descripcion: "Sabor intenso a mentol con una sensación extra refrescante."
    },

    "La Grape": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - La Grape",
        descripcion: "Uva dulce y jugosa con un perfil suave y equilibrado."
    },

    "PineApple Lime": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - PineApple Lime",
        descripcion: "Piña tropical acompañada por el toque cítrico y fresco del limón."
    },

    "Raspberry Watermelon": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Raspberry Watermelon",
        descripcion: "Combinación de frambuesa dulce y sandía jugosa perfectamente balanceada."
    },

    "Scary Berry": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Scary Berry",
        descripcion: "Explosión de frutos rojos con un sabor intenso y refrescante."
    },

    "Watermelon Ice": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Watermelon Ice",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "Sour Strawberry Dragon Fruit": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Sour Strawberry Dragon Fruit",
        descripcion: "Fresa ácida combinada con la suavidad exótica de la fruta del dragón."
    },

};

let saborSeleccionado = "Blue Razz Ice";

function seleccionarSabor(sabor) {

    // Quitar selección anterior
document.querySelectorAll(".flavor-buttons button").forEach(btn => {
    btn.classList.remove("active");
});

// Marcar botón seleccionado
document.querySelectorAll(".flavor-buttons button").forEach(btn => {
    if (btn.textContent.trim() === sabor) {
        btn.classList.add("active");
    }
});

    saborSeleccionado = sabor;

    const textoSabor = document.getElementById("selected-flavor");
    const imagen = document.getElementById("product-image");
    const titulo = document.getElementById("product-title");
    const descripcion = document.getElementById("product-description");

    if (textoSabor) {
        textoSabor.textContent =
            "Sabor seleccionado: " + sabor;
    }

    if (imagen) {
        imagen.src = sabores[sabor].imagen;
    }

    if (titulo) {
        titulo.textContent = sabores[sabor].titulo;
    }

    if (descripcion) {
        descripcion.textContent = sabores[sabor].descripcion;
    }

    actualizarWhatsApp();
}

function actualizarWhatsApp() {

    const buyBtn = document.getElementById("buy-btn");

    if (!buyBtn) return;

    const mensaje =
        `Hola, quiero comprar un ELFBAR TRIO 40K PUFFS sabor ${saborSeleccionado}`;

    buyBtn.href =
        `https://wa.me/5492966611389?text=${encodeURIComponent(mensaje)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    seleccionarSabor("Blue Razz Ice");
});
