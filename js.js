/* Esta función obtiene los valores nombre del producto, cantidad, precio y calculará el total de la linea
a continuación pasará los parametros a la funcion insertarFilaTabla(), recalculara el Total y pondrá los valores a 0 o en blanco.
*/
function insertarFila() {
  // 2 ptos
  insertarFilaTabla(); //Llama a la funcion que crea los nodos
  recalcularTotal(); //Llama a la funcion que muestra el Total de (Base imposable, IVA, Total Factura).
  limpiarDatos(); //Llama a la funcion que limpia los valores de Producto, Cantidad y Precio
}

/* Creamos los nodos y añadimos la fila al final de la lista de la compra
 */
function insertarFilaTabla() {
  // 2,5 ptos
  //Ontenemos los valores introducidos por el usuario
  let producto = document.getElementById("producte");
  let cantidad = document.getElementById("quantitat");
  let precio = document.getElementById("preu");
  //Añadimos la validación de que los valores introducidos sean numéricos y que la cantidad sea mayor que 0.
  if (isNaN(cantidad.value) || cantidad.value <= 0) {
    alert("La cantidad debe ser un número mayor que 0.");
    return;
  }
  if (isNaN(precio.value) || precio.value <= 0) {
    alert("El precio debe ser un número mayor que 0.");
    return;
  }
  //Creamos los nodos y los añadimos a la fila
  let fila = document.createElement("tr");
  let celdaProducto = document.createElement("td");
  let celdaCantidad = document.createElement("td");
  let celdaPrecio = document.createElement("td");
  let celdaTotal = document.createElement("td");
  // Añadimos los valores a las celdas y las añadimos a la fila
  celdaProducto.textContent = producto.value;
  celdaCantidad.textContent = cantidad.value;
  celdaPrecio.textContent = precio.value;
  celdaTotal.textContent = celdaCantidad.textContent * celdaPrecio.textContent;
  // Añadimos la fila a la tabla
  fila.appendChild(celdaProducto);
  fila.appendChild(celdaCantidad);
  fila.appendChild(celdaPrecio);
  fila.appendChild(celdaTotal);
  let tabla = document.getElementById("tabla");
  tabla.appendChild(fila);
  // Obtenemos los valores actuales de los totales
  let importe = document.getElementById("base-imponible");
  let iva = document.getElementById("iva");
  let total = document.getElementById("total");
  // Actualizamos los valores de los totales
  importe.textContent = celdaTotal.textContent;
  iva.textContent = (celdaTotal.textContent * 21) / 100;
  total.textContent =
    parseFloat(importe.textContent) + parseFloat(iva.textContent);
}

/*
En esta funcion calculamos el total de todas las lineas, IVA y Total de la Factura y lo mostramos en la parte gris de la factura.
*/
function recalcularTotal() {
  //  2,5 ptos
  // Obtenemos los valores actuales de los totales
  let importe = document.getElementById("base-imponible");
  let iva = document.getElementById("iva");
  let total = document.getElementById("total");
  // Calculamos el total de todas las lineas
  let filas = document.getElementById("tabla").rows;
  let totalLineas = 0;
  for (let i = 1; i < filas.length; i++) {
    let totalLinea = parseFloat(filas[i].cells[3].textContent);
    totalLineas += totalLinea;
  }
  // Actualizamos los valores de los totales
  importe.textContent = totalLineas;
  iva.textContent = (totalLineas * 21) / 100;
  total.textContent = parseFloat(importe.textContent) + parseFloat(iva.textContent);
}

/* Ponemos el producto, la cantidad y el precio a '' o a 0 */
function limpiarDatos() {
  // 0 ptos
  // Obtenemos los valores de los inputs de Producto, Cantidad y Precio y los limpiamos
  let producto = document.getElementById("producte");
  let cantidad = document.getElementById("quantitat");
  let precio = document.getElementById("preu");
  producto.value = "";
  cantidad.value = "";
  precio.value = "";
}

/*Pregunta que fila queremos borrar y la elimina de la lista de la compra. Finalmente recalcula la compra
 */
function eliminarFila() {
  // 2 ptos
  //oBTENEMOS la fila que queremos borrar y la borramos de la lista de la compra. Finalmente recalcula la compra
  let fila = prompt("Introduce el número de la fila que deseas borrar:");
  let elemento = document.getElementById("tabla");
  if (isNaN(fila) || fila <= 0 || fila > elemento.rows.length) {
    alert("La fila introducida no es válida.");
    return;
  } else {
    elemento.deleteRow(fila); //Borra la fila seleccionada
   
    recalcularTotal(); //Cuando se borra una linea se recalculan los totales
  }
}
