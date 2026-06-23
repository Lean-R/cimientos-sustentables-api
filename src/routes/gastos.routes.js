import GastosController from "../controllers/gastos.controller.js";
import { validarGasto } from "../middleware/gastos.validator.js";
import { Router } from "express";

const { getGastos, createGasto, getGastoById, deleteGasto } = GastosController;

const router = Router();

// Definimos los endpoints
router.get("/", getGastos);
router.post("/", validarGasto, createGasto);

// Rutas dinámicas
router.get("/:id", getGastoById);
router.delete("/:id", deleteGasto);

export default router;
