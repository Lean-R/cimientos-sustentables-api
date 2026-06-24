import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model.js";
import { signToken } from "../helpers/jwt.js";

/**
 * Valida credenciales y, si son correctas, firma un JWT.
 * Retorna { user, token } en éxito o { error } en fallo.
 */
export const authenticateUser = async (username, password) => {
  if (!username || !password) {
    return { error: "username and password are required" };
  }

  const usuario = await Usuario.findOne({ username });

  if (!usuario) {
    return { error: "unauthorized" };
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordValida) {
    return { error: "unauthorized" };
  }

  const token = signToken({
    userId: usuario._id,
    username: usuario.username,
    role: usuario.role,
  });

  return { user: usuario, token };
};
