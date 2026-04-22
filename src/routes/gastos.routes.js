const { renderFormNuevo, getGastos, createGasto, getGastoById, deleteGasto } = require('../controllers/gastos.controller.js');
const { validarGasto } = require("../middleware/gastos.validator");
const { Router } = require("express");
const router = Router();


//Ruta para ver el formulario
router.get("/nuevo", renderFormNuevo);

// Definimos los endpoints
router.get('/', getGastos);
router.post('/', validarGasto, createGasto);

// Rutas dinámicas
router.get("/:id", getGastoById);
router.delete("/:id", deleteGasto);

module.exports = router;