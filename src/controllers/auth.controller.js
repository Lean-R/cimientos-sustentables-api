import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  // Verificar que username y password estén presentes
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // Comparar contraseña contra el hash almacenado
    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

    if (!passwordValida) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // Credenciales válidas
    res.status(200).json({ message: "login success" });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
