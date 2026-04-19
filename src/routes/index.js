const { Router } = require("express");
const router = Router();
const obrasRouter = require("./obras.routes");
const gastosRouter = require("./gastos.routes");
const partidasPresupuestariasRouter = require("./partidas_presupuestarias.routes");

// Rutas para gastos
router.use("/gastos", gastosRouter);

// Rutas para obras
router.use("/obras", obrasRouter);

// Rutas para partidas presupuestarias
router.use("/partidas", partidasPresupuestariasRouter);

module.exports = router;
