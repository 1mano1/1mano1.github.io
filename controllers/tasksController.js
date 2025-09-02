// controllers/tasksController.js
const db = require('../lib/db.js');

// crear tabla una sola vez al inicio
function ensureSchema() {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  db.query(sql, function (err) {
    if (err) {
      console.error('Error creando tabla tasks:', err.message);
    } else {
      console.log('Tabla tasks lista');
    }
  });
}

function getTasks(req, res) {
  db.query('SELECT id, title, created_at FROM tasks ORDER BY id DESC', function (err, rows) {
    if (err) return res.status(500).json({ error: 'Error consultando tareas' });
    return res.json(rows);
  });
}

function postTask(req, res) {
  const title = (req.body && req.body.title ? String(req.body.title) : '').trim();
  if (!title) return res.status(400).json({ error: 'title requerido' });

  db.query('INSERT INTO tasks (title) VALUES (?)', [title], function (err, result) {
    if (err) return res.status(500).json({ error: 'Error insertando tarea' });
    return res.status(201).json({ id: result.insertId, title: title });
  });
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'id inválido' });

  db.query('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: 'Error eliminando tarea' });
    return res.json({ ok: true });
  });
}

module.exports = { ensureSchema, getTasks, postTask, deleteTask };
