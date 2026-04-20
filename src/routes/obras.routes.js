const { Router } = require("express");
const { obtenerObras, crearObra } = require("../controllers/obras.controller");

const router = Router();

router.get("/", obtenerObras);
router.post("/", crearObra);

module.exports = router;
