import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model.js";

const SALT_ROUNDS = 10;
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const seedAdmin = async () => {
  try {
    const existe = await Usuario.findOne({ username: ADMIN_USERNAME });

    if (existe) {
      // Usuario admin ya existe, se omite creación
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

    await Usuario.create({
      username: ADMIN_USERNAME,
      passwordHash,
      role: "admin",
    });

    console.log(`✅ Usuario "${ADMIN_USERNAME}" creado exitosamente.`);
  } catch (error) {
    console.error("❌ Error al crear usuario admin:", error.message);
  }
};

export default seedAdmin;
