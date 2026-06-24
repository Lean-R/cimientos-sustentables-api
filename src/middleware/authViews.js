import { verifyToken } from "../helpers/jwt.js";

// Ruta pública (login) y ruta de logout no requieren autenticación
const PUBLIC_ROUTES = ["/", "/login", "/logout"];

const authViews = (req, res, next) => {
  const token = req.cookies?.token;
  const payload = token ? verifyToken(token) : null;

  // Si el usuario está autenticado y quiere ir al login, redirigir a obras
  if (payload && req.path === "/") {
    return res.redirect("/obras");
  }

  // Saltar validación para rutas públicas
  if (PUBLIC_ROUTES.includes(req.path)) {
    return next();
  }

  // No autenticado → redirect al login
  if (!payload) {
    return res.redirect("/");
  }

  req.user = payload;
  next();
};

export default authViews;
