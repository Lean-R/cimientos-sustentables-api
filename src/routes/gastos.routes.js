import GastosController from "../controllers/gastos.controller.js";
const { renderFormNuevo, getGastos, createGasto, getGastoById, deleteGasto } =
  GastosController;
import { validarGasto } from "../middleware/gastos.validator.js";
import { Router } from "express";

const router = Router();

//Ruta para ver el formulario
router.get("/nuevo", renderFormNuevo);

// Definimos los endpoints
router.get("/", getGastos);
router.post("/", validarGasto, createGasto);

// Rutas dinámicas
router.get("/:id", getGastoById);
router.delete("/:id", deleteGasto);

export default router;
