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
        imagen: "IMG/durazno+.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Blue Razz Ice",
        descripcion: "Frambuesa azul dulce con un intenso efecto ice."
    },

    "Blueberry Pom Slushy": {
        imagen: "IMG/mangomagic.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Blueberry Pom Slushy",
        descripcion: "Mezcla intensa de frutos rojos con una frescura equilibrada."
    },

    "Cool Mentol": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Cool Mentol",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "La Grape": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - La Grape",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "PinneApple Lime": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - PinneApple Lime",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "Raspberry Watermelon": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Raspberry Watermelon",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "Scary Berry": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Scary Berry",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "Watermelon Ice": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Watermelon Ice",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
    },

    "Sour Strawberry Dragon Fruit": {
        imagen: "IMG/tigers.png",
        titulo: "ELFBAR TRIO 40K PUFFS - Sour Strawberry Dragon Fruit",
        descripcion: "Sandía dulce y jugosa acompañada por un refrescante toque helado."
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
