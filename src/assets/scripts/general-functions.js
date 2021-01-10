/** Funcion que muestra los mensajes con ID messageModal */
function showMessage(message) {
  //alert(message);
  document.querySelector("#messageText").innerHTML = message; //Agregar texto
   let elem = document.querySelector('#messageModal');
   let instance = M.Modal.init(elem, {});
   instance.open();
}

//alert('Hi');
