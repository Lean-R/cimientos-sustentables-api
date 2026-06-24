import { verifyToken } from "../helpers/jwt.js";

// Rutas de API que no requieren autenticación
const PUBLIC_ROUTES = ["/auth/login", "/auth/logout"];

const authApi = (req, res, next) => {
  // Saltar validación para rutas públicas
  if (PUBLIC_ROUTES.includes(req.path)) {
    return next();
  }

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: "unauthorized" });
  }

  req.user = payload;
  next();
};

export default authApi;
