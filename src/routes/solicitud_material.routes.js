import { Router } from "express";
import SolicitudMaterialController from "../controllers/solicitud_material.controller.js";

const {
  getAll,
  getById,
  create,
  delete: deleteSolicitud,
} = SolicitudMaterialController;

const router = Router();

// GET /api/materiales - Obtener todas (con query params opcionales)
router.get("/", getAll);

// POST /api/materiales - Crear nueva solicitud
router.post("/", create);

// GET /api/materiales/:id - Obtener solicitud por ID
router.get("/:id", getById);

// DELETE /api/materiales/:id - Eliminar solicitud
router.delete("/:id", deleteSolicitud);

export default router;
