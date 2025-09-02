const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

const tasksRouter = require('./routes/tasksRouter');
app.use('/api', tasksRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const { ensureSchema } = require('./controllers/tasksController');
ensureSchema();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
