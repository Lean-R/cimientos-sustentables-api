import { Router } from "express";
import authRouter from "./auth.routes.js";
import obrasRouter from "./obras.routes.js";
import gastosRouter from "./gastos.routes.js";
import partidasPresupuestariasRouter from "./partidas_presupuestarias.routes.js";

const router = Router();

// Router para auth
router.use("/auth", authRouter);

// Rutas para gastos
router.use("/gastos", gastosRouter);

// Rutas para obras
router.use("/obras", obrasRouter);

// Rutas para partidas presupuestarias
router.use("/partidas", partidasPresupuestariasRouter);

export default router;
