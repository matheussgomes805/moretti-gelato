const menu = document.getElementById("boton-menu");
const navegacion = document.getElementById("menu-navegacion");
const overlay = document.querySelector(".overlay");
const botones = document.querySelectorAll("#entrada-salida button");

//ABRIR Y CERRAR EL MENU
menu.addEventListener("click", function () {
  navegacion.classList.toggle("menu-abierto");

  const estadoActual = menu.getAttribute("aria-expanded");

  if (estadoActual === "false") {
    menu.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-label", "cerrar menu");
    menu.innerHTML = '<span class="material-symbols-outlined">close</span>';
    overlay.style.display = "block";
  } else {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "abrir menu");
    menu.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    overlay.style.display = "none";
  }
});

//CERRAR EL MENÚ AL HACER CLIC FUERA (OVERLAY)
overlay.addEventListener("click", function () {
  navegacion.classList.remove("menu-abierto");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "abrir menu");
  menu.innerHTML = '<span class="material-symbols-outlined">menu</span>';
  overlay.style.display = "none";
});

//BOTÓN DE ENTRADA Y SALIDA DE PRODUCTOS
botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botones.forEach(function (b) {
      b.classList.remove("seleccionado");
    });

    boton.classList.add("seleccionado");
  });
});
