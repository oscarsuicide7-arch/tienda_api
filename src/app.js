const express = require('express');
// Importamos las rutas
const routesProductos = require('./routes/productos.routes.js');

const app = express();
app.use(express.json());

// ESTA ES LA LÍNEA MÁGICA: Aquí le decimos a Express que use las rutas
app.use('/productos', routesProductos);

// Manejo de ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;