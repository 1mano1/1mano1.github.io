let txttarea = document.getElementById('txttarea');
let contenedor = document.getElementById('contenedor');
let btnagregar = document.getElementById('btnagr')

let array = [];

if(localStorage.getItem('tareas')){
    array = JSON.parse(localStorage.getItem('tareas'));
    mostrar();
}

function mostrar(){
    contenedor.innerHTML = "";
    array.forEach((a,b) => {
        contenedor.innerHTML += `<div> ${a}<button onclick="eliminar(${b})">Eliminar</button></div>`;
    })
}

function guardarlocal(){
    localStorage.setItem('tareas', JSON.stringify(array));
}


function agregar(){
    if(txttarea.value != ""){
        array.push(txttarea.value);
        txttarea.value = "";
        mostrar();
        guardarlocal();
    }
}

function eliminar(pop){
    array.splice(pop,1);
    mostrar();
    guardarlocal();
}
btnagregar.addEventListener("click", agregar);

if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .catch(console.error);
    });
}