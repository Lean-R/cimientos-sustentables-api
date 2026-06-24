import { Router } from "express";
import authRouter from "./auth.routes.js";
import obrasRouter from "./obras.routes.js";
import gastosRouter from "./gastos.routes.js";
import partidasPresupuestariasRouter from "./partidas_presupuestarias.routes.js";
import solicitudMaterialRouter from "./solicitud_material.routes.js";
import authApi from "../middleware/authApi.js";

const router = Router();

// Middleware de autenticación para todas las rutas de la API
// (excepto /auth/login y /auth/logout que están en la whitelist)
router.use(authApi);

// Router para auth
router.use("/auth", authRouter);

// Rutas para gastos
router.use("/gastos", gastosRouter);

// Rutas para obras
router.use("/obras", obrasRouter);

// Rutas para partidas presupuestarias
router.use("/partidas", partidasPresupuestariasRouter);

// Rutas para solicitud de materiales
router.use("/materiales", solicitudMaterialRouter);

export default router;
