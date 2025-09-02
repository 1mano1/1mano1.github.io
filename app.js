let txttarea = document.getElementById('txttarea');
let contenedor = document.getElementById('contenedor');
let btnagregar = document.getElementById('btnagr');

let array = [];
let idsApi = [];
let sourceIsApi = false;

var LOCAL_KEY = 'tareas';
var PENDING_KEY = 'tareas_pending';

function safeLoadLocal() {
  try {
    var raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function safeSaveLocal(list) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list || [])); }
  catch (e) { }
}

function getPending() {
  try { return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]'); }
  catch (e) { return []; }
}
function savePending(arr) { localStorage.setItem(PENDING_KEY, JSON.stringify(arr)); }
function queueAdd(title) {
  var p = getPending();
  p.push({ op: 'add', title: title, ts: Date.now() });
  savePending(p);
}
function flushPending(callback) {
  var p = getPending();
  if (!p.length) { if (callback) callback(); return; }

  function next(i) {
    if (i >= p.length) {
      savePending([]); // vacía la cola
      if (callback) callback();
      return;
    }
    var item = p[i];
    if (item.op === 'add') {
      fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: item.title })
      })
        .then(function (res) { if (!res.ok) throw new Error(); next(i + 1); })
        .catch(function () {
          // deja lo pendiente desde i en adelante para reintentar luego
          savePending(p.slice(i));
          if (callback) callback();
        });
    } else {
      next(i + 1);
    }
  }
  next(0);
}

// dispara sync al volver a estar online
window.addEventListener('online', function () {
  flushPending(function () { fetchTasks(); });
});

function mostrar() {
  contenedor.innerHTML = "";
  array.forEach(function (a, b) {
    contenedor.innerHTML += `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      ${a}
      <button class="btn btn-danger btn-sm" onclick="eliminar(${b})">
      <i class="bi bi-trash"></i> Eliminar</button>
      
    </div>`;
  });
}

// intenta cargar desde API; si falla, usa localStorage sin borrar
function fetchTasks() {
  fetch('/api/tasks')
    .then(function (res) {
      if (!res.ok) throw new Error('API no disponible');
      return res.json();
    })
    .then(function (rows) {
      array = rows.map(function (r) { return r.title; });
      idsApi = rows.map(function (r) { return r.id; });
      sourceIsApi = true;
      safeSaveLocal(array); // cache local para offline
      mostrar();
    })
    .catch(function () {
      // fallback offline: mantén lo que ya tenías en local SIN vaciar
      var local = safeLoadLocal();
      array = local;            // conserva
      idsApi = [];
      sourceIsApi = false;
      mostrar();
    });
}

function agregar() {
  if (txttarea.value != "") {
    var titulo = txttarea.value;
    txttarea.value = "";

    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titulo })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('POST falló');
        return fetch('/api/tasks').then(function (r) { return r.json(); });
      })
      .then(function (rows) {
        array = rows.map(function (r) { return r.title; });
        idsApi = rows.map(function (r) { return r.id; });
        sourceIsApi = true;
        safeSaveLocal(array);
        mostrar();
      })
      .catch(function () {
        // offline o error → guarda local y encola para sync
        array.push(titulo);
        safeSaveLocal(array);
        queueAdd(titulo);   // se sube cuando vuelva la red
        sourceIsApi = false;
        idsApi = [];
        mostrar();
      });
  }
}

function eliminar(idx) {
  // si lo mostrado viene de API, intenta borrar en servidor
  if (sourceIsApi && idsApi[idx] != null) {
    var id = idsApi[idx];
    fetch('/api/tasks/' + id, { method: 'DELETE' })
      .then(function (res) {
        if (!res.ok) throw new Error('DELETE falló');
        return fetch('/api/tasks').then(function (r) { return r.json(); });
      })
      .then(function (rows) {
        array = rows.map(function (r) { return r.title; });
        idsApi = rows.map(function (r) { return r.id; });
        sourceIsApi = true;
        safeSaveLocal(array);
        mostrar();
      })
      .catch(function () {
        // si falla el server, elimina local para no cortar UX
        array.splice(idx, 1);
        safeSaveLocal(array);
        sourceIsApi = false;
        idsApi = [];
        mostrar();
      });
    return;
  }

  // modo original offline
  array.splice(idx, 1);
  safeSaveLocal(array);
  mostrar();
}
array = safeLoadLocal();
mostrar();

// Si hay red al inicio, primero sincroniza pendientes y luego trae del servidor
if (navigator.onLine) {
  flushPending(function () { fetchTasks(); });
}


btnagregar.addEventListener("click", agregar);

//service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js')
      .catch(console.error);
  });
}
