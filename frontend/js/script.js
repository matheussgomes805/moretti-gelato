const menu = document.getElementById("boton-menu");
const navegacion = document.getElementById("menu-navegacion");

//ABRIR Y CERRAR EL MENU
menu.addEventListener("click", function () {
  navegacion.classList.toggle("menu-abierto");
  menu.setAttribute("aria-expanded", "true");

  const estadoActual = menu.getAttribute("aria-expanded");

  if (estadoActual === "false") {
    menu.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-label", "cerrar menu");
  } else {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "abrir menu");
  }
});
