const ProductoModel = require('../models/producto.model');

// GET /productos
const listar = async (req, res) => {
  try {
    const productos = await ProductoModel.obtenerProductos();
    return res.status(200).json(productos);
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// GET /productos/:id
const obtenerUno = async (req, res) => {
  try {
    const producto = await ProductoModel.obtenerProductoPorId(Number(req.params.id));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(200).json(producto);
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// POST /productos
const crear = async (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio.' });
  }
  if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor que 0.' });
  }
  try {
    const nuevo = await ProductoModel.crearProducto(nombre.trim(), Number(precio));
    return res.status(201).json(nuevo);
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// PUT /productos/:id
const actualizar = async (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio.' });
  }
  if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor que 0.' });
  }
  try {
    const actualizado = await ProductoModel.actualizarProducto(
      Number(req.params.id),
      nombre.trim(),
      Number(precio)
    );
    if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(200).json(actualizado);
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// DELETE /productos/:id
const eliminar = async (req, res) => {
  try {
    const filas = await ProductoModel.eliminarProducto(Number(req.params.id));
    if (filas === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { listar, obtenerUno, crear, actualizar, eliminar };