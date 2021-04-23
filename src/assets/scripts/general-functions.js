/** Funcion que muestra los mensajes con ID messageModal */
function showMessage(message) {
  //alert(message);
  document.querySelector("#messageText").innerHTML = message; //Agregar texto
   let elem = document.querySelector('#messageModal');
   let instance = M.Modal.init(elem, {});
   instance.open();
}

function showRemoveConfirmationWindow(message) {
  //alert(message);
   let elem = document.querySelector('#removeConfirmationModal');
   let instance = M.Modal.init(elem, {});
   instance.open();
}

function closeAllModal(modalId){
  let elem = document.querySelectorAll('.modal');
   let instances = M.Modal.init(elem, {});
   instances.close();
}

//alert('Hi');
