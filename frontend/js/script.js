const menu = document.getElementById("boton-menu");
const navegacion = document.getElementById("menu-navegacion");
const overlay = document.querySelector(".overlay");
const botones = document.querySelectorAll("#entrada-salida button");
const formularioProducto = document.querySelector(".formulario-producto");
const listaProductos = document.getElementById("lista-productos");

//CAMPOS DEL FORMULARIO DE PRODUCTOS
const nombre = document.getElementById("nombre");
const formato = document.getElementById("formato-producto");
const cantidad = document.getElementById("cantidad-formato");
const unidad = document.getElementById("unidad-medida");

const productos = [];

//PRODUCTOS DE PRUEBA
productos.push(
  {
    nombre: "Helado de coco",
    formato: "recipiente",
    cantidad: 5,
    unidad: "l",
  },
  {
    nombre: "Leche entera",
    formato: "botella",
    cantidad: 1,
    unidad: "l",
  },
);

//MOSTRAR PRODUCTOS EN LA TABLA
function mostrarProductos() {
  productos.forEach(function (producto) {
    listaProductos.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.formato} (${producto.cantidad} ${producto.unidad})</td>
          <td>Acciones</td>
        </tr>
      `,
    );
  });
}

if (listaProductos) {
  mostrarProductos();
}

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

//REGISTRO DE NUEVOS PRODUCTOS
if (formularioProducto) {
  formularioProducto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreProducto = nombre.value;
    const formatoProducto = formato.value;
    const cantidadProducto = Number(cantidad.value);
    const unidadProducto = unidad.value;

    const producto = {
      nombre: nombreProducto,
      formato: formatoProducto,
      cantidad: cantidadProducto,
      unidad: unidadProducto,
    };

    productos.push(producto);

    console.log(productos);

    console.log("Formulario enviado");
  });
}
