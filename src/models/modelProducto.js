// 1. Importar la conexión a la base de datos
const pool =require('../configdb/db.js');

async function listarProductos(){
    try {
        const r = await pool.query(`SELECT p.id, p.nombre, p.precio, p.stock,
                p.categoria_id, c.nombre AS categoria
         FROM productos p
         JOIN categorias c ON c.id = p.categoria_id
         WHERE p.activo = true
         ORDER BY p.id`);
        return r.rows;
    } catch (error) {
        console.error('ERROR REAL:', error.message);
        throw error;
    }
}

async function obtenerProductoPorId(id){
    const r = await pool.query(`SELECT p.id, p.nombre, p.precio, p.stock,
                p.categoria_id, c.nombre AS categoria
         FROM productos p
         JOIN categorias c ON c.id = p.categoria_id
         WHERE p.id = $1 AND p.activo = true`, [id]);
    return r.rows[0];
}

async function crearProducto(nombre, precio, stock, categoria_id){
    const r = await pool.query(`INSERT INTO productos (nombre, precio, stock, categoria_id)
         VALUES ($1, $2, $3, $4) RETURNING *`, [nombre, precio, stock, categoria_id]);
    return r.rows[0];
}

async function actualizarProducto(id, nombre, precio, stock, categoria_id){
    const r = await pool.query(`UPDATE productos
         SET nombre = $1, precio = $2, stock = $3, categoria_id = $4
         WHERE id = $5 AND activo = true RETURNING *`,
        [nombre, precio, stock, categoria_id, id]);
    return r.rows[0];
}

async function eliminarProducto(id){
    const r = await pool.query(`UPDATE productos SET activo = false
         WHERE id = $1 AND activo = true RETURNING *`, [id]);
    return r.rows[0];
}

async function actualizarStock(id, nuevoStock){
    const r = await pool.query(`UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *`, [nuevoStock, id]);
    return r.rows[0];
}
module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    actualizarStock
}
