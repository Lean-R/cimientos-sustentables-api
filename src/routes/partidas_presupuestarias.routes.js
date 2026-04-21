const {
  getPartidas,
  getPartidaById,
  createPartida,
  updatePartida,
  deletePartida,
} = require("../controllers/partidas_presupuestarias.controller.js");
const {
  validarPartidaPresupuestaria,
} = require("../middleware/partidas_presupuestarias.validator.js");
const { Router } = require("express");
const router = Router();

// Rutas para partidas presupuestarias
// GET /api/partidas - Obtener todas (con query params opcionales)
router.get("/", getPartidas);

// POST /api/partidas - Crear nueva partida
router.post("/", validarPartidaPresupuestaria, createPartida);

// GET /api/partidas/:id - Obtener partida por ID
router.get("/:id", getPartidaById);

// PUT /api/partidas/:id - Actualizar partida
router.put("/:id", validarPartidaPresupuestaria, updatePartida);

// DELETE /api/partidas/:id - Eliminar partida
router.delete("/:id", deletePartida);

module.exports = router;
