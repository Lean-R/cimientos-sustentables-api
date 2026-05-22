import { Router } from "express";
import ObrasController from "../controllers/obras.controller.js";
import { validarObra } from "../middleware/obras.validator.js";

const { obtenerObras, crearObra, getObraID, borrarObra, actualizarObra } =
  ObrasController;

const router = Router();

router.get("/", obtenerObras);
router.post("/", validarObra, crearObra);
router.get("/:id", getObraID);
router.put("/:id", validarObra, actualizarObra);
router.delete("/:id", borrarObra);

export default router;
