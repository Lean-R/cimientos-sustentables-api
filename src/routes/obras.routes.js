const { Router } = require("express");
const { obtenerObras, crearObra, getObraID, borrarObra, actualizarObra } = require("../controllers/obras.controller");

const router = Router();

router.get("/", obtenerObras);
router.post("/", crearObra);
router.get("/:id", getObraID);
router.put("/:id", actualizarObra);
router.delete("/:id", borrarObra);



module.exports = router;
