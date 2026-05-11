import { Router } from "express";
import ObrasController from "../controllers/obras.controller.js";
const { obtenerObras, crearObra, getObraID, borrarObra, actualizarObra } =
  ObrasController;

const router = Router();

router.get("/", obtenerObras);
router.post("/", crearObra);
router.get("/:id", getObraID);
router.put("/:id", actualizarObra);
router.delete("/:id", borrarObra);

export default router;
