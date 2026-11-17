// Llamar al modelo de Producto
const Producto = require('../models/modelProducto.js');
const Categoria = require('../models/modelCategoria.js')
//Validacion de datos
const datosValidados = d => d.nombre && Number(d.precio) > 0 && Number(d.stock) >= 0 && idValid(d.categoria_id);
// Validacion de id (entero mayor a 0)
const idValid = id => Number.isInteger(Number(id)) && Number(id) > 0 ;

async function listarProductos(req, res) {
    res.status(200).json(await Producto.listarProductos());
}

async function obtenerProductoPorId(req, res) {
    const id = Number(req.params.id);
    if (!idValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    const producto = await Producto.obtenerProductoPorId(id);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
}

async function crearProducto(req, res) {
    const { nombre, precio, stock,categoria_id } = req.body ?? {};
    if (!datosValidados({ nombre, precio, stock,categoria_id })) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    
    res.status(201).json(await Producto.crearProducto(nombre, precio, stock,categoria_id));
}

async function actualizarProducto(req, res) {
    const id = Number(req.params.id);
    const { nombre, precio, stock,categoria_id } = req.body ?? {};
    if (!idValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    if (!datosValidados({ nombre, precio, stock,categoria_id })) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
  

    // Se envían los datos por separado, igual que los recibe el modelo
    const actualizado = await Producto.actualizarProducto(id, nombre, precio, stock,categoria_id);
    if (!actualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(actualizado);
}

async function eliminarProducto(req, res) {
    const id = Number(req.params.id);
    if (!idValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    const eliminado = await Producto.eliminarProducto(id);
    if (!eliminado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    // 204 = todo bien, pero sin contenido en la respuesta
    res.status(204).end();
}

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}