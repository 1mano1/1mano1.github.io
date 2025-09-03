let txttarea = document.getElementById('txttarea');
let contenedor = document.getElementById('contenedor');
let btnagregar = document.getElementById('btnagr');

let array = [];         
let idsApi = [];         
let sourceIsApi = false; 


var LOCAL_KEY   = 'tareas';
var PENDING_KEY = 'tareas_pending';     
var IDMAP_KEY   = 'tareas_idmap';       


function safeLoadLocal() {
  try {
    var raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}
function safeSaveLocal(list) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list || [])); }
  catch(e) {}
}
function loadIdMap() {
  try {
    var raw = localStorage.getItem(IDMAP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) {
    return {};
  }
}
function saveIdMap(map) {
  try { localStorage.setItem(IDMAP_KEY, JSON.stringify(map || {})); }
  catch(e) {}
}
function getIdForTitle(title) {
  var map = loadIdMap();
  return Object.prototype.hasOwnProperty.call(map, title) ? map[title] : null;
}

function getPending() {
  try { return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]'); }
  catch(e){ return []; }
}
function savePending(arr) { localStorage.setItem(PENDING_KEY, JSON.stringify(arr)); }

function queueAdd(title) {
  var p = getPending();
  p.push({ op: 'add', title: title, ts: Date.now() });
  savePending(p);
}

function queueDelete(id, title) {
  var p = getPending();
  p.push({ op: 'del', id: id, title: title, ts: Date.now() });
  savePending(p);
}

function queueDeleteByTitle(title) {
  var p = getPending();
  p.push({ op: 'del_title', title: title, ts: Date.now() });
  savePending(p);
}

// Eliminar una tarea que aun no se había posteado, queda add pendiente
function removePendingAddByTitle(title) {
  var p = getPending();
  var i = p.length - 1;
  var changed = false;
  while (i >= 0) {
    if (p[i].op === 'add' && p[i].title === title) {
      p.splice(i, 1);
      changed = true;
    }
    i--;
  }
  if (changed) savePending(p);
  return changed;
}

// ejecuta la cola en orden, si se corta, deja lo que falta.
function flushPending(callback) {
  var p = getPending();
  if (!p.length) { if (callback) callback(); return; }

  // Resolutor de id por título con caché temporal
  let lastList = null;
  function resolveIdByTitle(title) {
    let id = getIdForTitle(title);
    if (id != null) return Promise.resolve(id);

  
    const ensureList = lastList
      ? Promise.resolve(lastList)
      : fetch('/api/tasks').then(r => r.ok ? r.json() : Promise.reject())
                          .then(rows => (lastList = rows))
                          .catch(() => null);

    return ensureList.then(rows => {
      if (!rows) return null;
      const found = rows.find(r => r.title === title);
      return found ? found.id : null;
    });
  }

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
      .then(function(res){
        if (!res.ok) throw new Error('add failed');
        next(i+1);
      })
      .catch(function(){
        // deja pendientes desde i en adelante
        savePending(p.slice(i));
        if (callback) callback();
      });
      return;
    }

    if (item.op === 'del') {
      if (item.id == null) { // por seguridad, intenta resolver por título
        resolveIdByTitle(item.title).then(id => {
          if (id == null) { next(i+1); return; }
          fetch('/api/tasks/' + id, { method: 'DELETE' })
            .then(res => { if (!res.ok) throw new Error('del failed'); next(i+1); })
            .catch(() => { savePending(p.slice(i)); if (callback) callback(); });
        });
        return;
      }
      fetch('/api/tasks/' + item.id, { method: 'DELETE' })
      .then(function(res){
        if (!res.ok) throw new Error('del failed');
        next(i+1);
      })
      .catch(function(){
        savePending(p.slice(i)); // deja pendientes desde i
        if (callback) callback();
      });
      return;
    }

    if (item.op === 'del_title') {
      resolveIdByTitle(item.title).then(id => {
        if (id == null) { // si no existe en server, considerar resuelto
          next(i+1);
          return;
        }
        fetch('/api/tasks/' + id, { method: 'DELETE' })
          .then(res => { if (!res.ok) throw new Error('del failed'); next(i+1); })
          .catch(() => { savePending(p.slice(i)); if (callback) callback(); });
      });
      return;
    }

    // continua si es una operación desconocida
    next(i+1);
  }
  next(0);
}

//el helper refresca el server solo si hay red 
function refreshFromServerIfOnline() {
  if (navigator.onLine) {
    fetchTasks();
  }
}

// dispara sync al volver a estar online
window.addEventListener('online', function(){
  flushPending(function(){
    refreshFromServerIfOnline();
  });
});

function mostrar(){
  contenedor.innerHTML = "";
  for (var b = 0; b < array.length; b++) {
    var a = array[b];
    contenedor.innerHTML += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <span>${a}</span>
        <button class="btn btn-danger btn-sm" onclick="eliminar(${b})">
          Eliminar
        </button>
      </div>
    `;
  }
}

function fetchTasks(){
  fetch('/api/tasks')
    .then(function(res){
      if (!res.ok) throw new Error('API no disponible');
      return res.json();
    })
    .then(function(rows){
      array  = rows.map(function(r){ return r.title; });
      idsApi = rows.map(function(r){ return r.id; });
      sourceIsApi = true;

    
      var map = {};
      for (var i = 0; i < rows.length; i++) {
        
        map[rows[i].title] = rows[i].id;
      }
      saveIdMap(map);

      safeSaveLocal(array); // cache local para offline
      mostrar();
    })
    .catch(function(){
      var local = safeLoadLocal();
      array = local;
      idsApi = [];
      sourceIsApi = false;
      mostrar();
    });
}

function agregar(){
  if (txttarea.value.trim() === "") return;

  var titulo = txttarea.value.trim();
  txttarea.value = "";

  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: titulo })
  })
  .then(function(res){
    if (!res.ok) throw new Error('POST falló');
    return fetch('/api/tasks').then(function(r){ return r.json(); });
  })
  .then(function(rows){
    array  = rows.map(function(r){ return r.title; });
    idsApi = rows.map(function(r){ return r.id; });
    sourceIsApi = true;

    var map = {};
    for (var i = 0; i < rows.length; i++) map[rows[i].title] = rows[i].id;
    saveIdMap(map);

    safeSaveLocal(array);
    mostrar();
  })
  .catch(function(){
    // offline, guarda local y encola para sync
    array.push(titulo);
    safeSaveLocal(array);
    queueAdd(titulo);
    sourceIsApi = false;
    idsApi = [];
    mostrar();
  });
}

function eliminar(idx){
  // si lo mostrado viene de una api, intenta borrar en servidor
  if (sourceIsApi && idsApi[idx] != null) {
    var id = idsApi[idx];
    var title = array[idx];

    fetch('/api/tasks/' + id, { method: 'DELETE' })
      .then(function(res){
        if (!res.ok) throw new Error('DELETE falló');
        return fetch('/api/tasks').then(function(r){ return r.json(); });
      })
      .then(function(rows){
        array  = rows.map(function(r){ return r.title; });
        idsApi = rows.map(function(r){ return r.id; });
        sourceIsApi = true;

        var map = {};
        for (var i = 0; i < rows.length; i++) map[rows[i].title] = rows[i].id;
        saveIdMap(map);

        safeSaveLocal(array);
        mostrar();
      })
      .catch(function(){
        // sin red solo elimina local
        array.splice(idx, 1);
        idsApi.splice(idx, 1);
        safeSaveLocal(array);
        queueDelete(id, title);
        sourceIsApi = false;
        mostrar();
      });
    return;
  }

  var titleLocal = array[idx];
  array.splice(idx, 1);
  safeSaveLocal(array);

  if (!removePendingAddByTitle(titleLocal)) {
    const idGuess = getIdForTitle(titleLocal);
    if (idGuess != null) {
      queueDelete(idGuess, titleLocal);
    } else {
      queueDeleteByTitle(titleLocal);
    }
  }

  mostrar();
}

array = safeLoadLocal();
mostrar();

if (navigator.onLine) {
  flushPending(function(){
    refreshFromServerIfOnline();
  });
}

btnagregar.addEventListener("click", agregar);

// ======= service worker =======
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js')
      .catch(console.error);
  });
}
