const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productos.controller');

// FÍJATE BIEN: Solo debe decir '/', NO '/productos'
router.get('/', ctrl.listar); 
router.get('/:id', ctrl.obtenerUno);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar); 
router.delete('/:id', ctrl.eliminar);

module.exports = router;