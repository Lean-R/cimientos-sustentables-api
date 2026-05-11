import PartidasPresupuestariasController from "../controllers/partidas_presupuestarias.controller.js";
const {
  getPartidas,
  getPartidaById,
  createPartida,
  updatePartida,
  deletePartida,
} = PartidasPresupuestariasController;
import { validarPartidaPresupuestaria } from "../middleware/partidas_presupuestarias.validator.js";
import { Router } from "express";

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

export default router;
