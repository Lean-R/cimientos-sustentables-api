const { Router } = require("express");
const router = Router();
const obrasRouter = require("./obras.routes");
const gastosRouter = require("./gastos.routes");

// Rutas para gastos
router.use("/gastos", gastosRouter);

router.use("/obras", obrasRouter);

module.exports = router;
