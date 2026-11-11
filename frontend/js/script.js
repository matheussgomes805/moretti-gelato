// Elementos del HTML

// Navegación
const menu = document.getElementById("boton-menu");
const navegacion = document.getElementById("menu-navegacion");
const overlay = document.querySelector(".overlay");

// Productos
const formularioProducto = document.querySelector(".formulario-producto");
const listaProductos = document.getElementById("lista-productos");
const nombre = document.getElementById("nombre");
const formato = document.getElementById("formato-producto");
const cantidad = document.getElementById("cantidad-formato");
const unidad = document.getElementById("unidad-medida");

// Movimientos
const formularioMovimiento = document.querySelector(".formulario-movimiento");
const selectProducto = document.getElementById("producto");
const selectTipoMovimiento = document.getElementById("entrada-salida");
const botones = document.querySelectorAll("#entrada-salida button");
const lote = document.getElementById("lote");
const cantidadMovimiento = document.getElementById("cantidad");

// Datos del sistema
const productos = JSON.parse(localStorage.getItem("productos")) || [];

let movimientos = [];

// Funciones de productos

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarProductos() {
  if (!listaProductos) return;

  listaProductos.innerHTML = "";

  productos.forEach(function (producto) {
    listaProductos.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.formato} (${producto.cantidad} ${producto.unidad})</td>
                <td>
                    <button class="eliminar-producto">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
            `,
    );
  });
}

function cargarProductos() {
  if (!selectProducto) return;

  productos.forEach(function (producto, indice) {
    const opcion = document.createElement("option");

    opcion.value = indice;
    opcion.textContent = producto.nombre;

    selectProducto.appendChild(opcion);
  });
}

// Navegación

function cerrarMenu() {
  if (!menu || !navegacion || !overlay) return;

  navegacion.classList.remove("menu-abierto");

  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "abrir menu");
  menu.innerHTML = '<span class="material-symbols-outlined">menu</span>';

  overlay.style.display = "none";
}

if (menu && navegacion && overlay) {
  menu.addEventListener("click", function () {
    const menuAbierto = navegacion.classList.contains("menu-abierto");

    if (menuAbierto) {
      cerrarMenu();
    } else {
      navegacion.classList.add("menu-abierto");

      menu.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-label", "cerrar menu");
      menu.innerHTML = '<span class="material-symbols-outlined">close</span>';

      overlay.style.display = "block";
    }
  });

  // Cerrar el menú al hacer clic fuera
  overlay.addEventListener("click", cerrarMenu);
}

// Selección de entrada y salida

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botones.forEach(function (b) {
      b.classList.remove("seleccionado");
    });

    boton.classList.add("seleccionado");
  });
});

// Registro de nuevos productos

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
      stock: 0,
    };

    productos.push(producto);

    guardarProductos();

    window.location.href = "productos.html";
  });
}

// Eliminación de productos

if (listaProductos) {
  listaProductos.addEventListener("click", function (event) {
    if (event.target.closest(".eliminar-producto")) {
      const fila = event.target.closest("tr");

      const indice = Array.from(listaProductos.children).indexOf(fila);

      const confirmar = confirm("¿Deseas eliminar este producto?");

      if (confirmar) {
        productos.splice(indice, 1);

        guardarProductos();

        mostrarProductos();
      }
    }
  });
}

// Registro de movimientos

if (formularioMovimiento) {
  formularioMovimiento.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoMovimiento =
      selectTipoMovimiento.querySelector(".seleccionado").textContent;

    const indiceProducto = Number(selectProducto.value);
    const productoSeleccionado = productos[indiceProducto];

    const loteMovimiento = lote.value;
    const cantidadMovimientoValor = Number(cantidadMovimiento.value);

    const movimiento = {
      tipo: tipoMovimiento,
      producto: productoSeleccionado,
      lote: loteMovimiento,
      cantidad: cantidadMovimientoValor,
    };

    // Convertir cajas en unidades
    const unidadesMovimiento =
      cantidadMovimientoValor * productoSeleccionado.cantidad;

    // Comprobar si hay suficiente stock
    if (
      tipoMovimiento === "Salida" &&
      unidadesMovimiento > productoSeleccionado.stock
    ) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    if (tipoMovimiento === "Entrada") {
      productoSeleccionado.stock += unidadesMovimiento;
    } else {
      productoSeleccionado.stock -= unidadesMovimiento;
    }

    guardarProductos();

    movimientos.push(movimiento);

    console.log("Movimientos registrados:", movimientos);
    console.log("Stock actual:", productoSeleccionado.stock);
  });
}

// Inicialización

cargarProductos();
mostrarProductos();
