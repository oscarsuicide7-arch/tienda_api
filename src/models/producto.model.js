const pool = require('../config/db');

// GET todos
const obtenerProductos = async () => {
  const { rows } = await pool.query('SELECT * FROM productos ORDER BY id');
  return rows;
};

// GET por id
const obtenerProductoPorId = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM productos WHERE id = $1',
    [id]
  );
  return rows[0];
};

// POST
const crearProducto = async (nombre, precio) => {
  const { rows } = await pool.query(
    'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
    [nombre, precio]
  );
  return rows[0];
};

// PUT con RETURNING *
const actualizarProducto = async (id, nombre, precio) => {
  const { rows } = await pool.query(
    `UPDATE productos
     SET nombre = $1, precio = $2
     WHERE id = $3
     RETURNING *`,
    [nombre, precio, id]
  );
  return rows[0]; // undefined si el id no existe
};

// DELETE usando rowCount
const eliminarProducto = async (id) => {
  const result = await pool.query(
    'DELETE FROM productos WHERE id = $1',
    [id]
  );
  return result.rowCount; // 0 = no existía, 1 = eliminado
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};