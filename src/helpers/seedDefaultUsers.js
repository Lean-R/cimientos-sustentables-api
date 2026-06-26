import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model.js";

const SALT_ROUNDS = 10;

const DEFAULT_USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "gerencia", password: "gerencia123", role: "gerencia" },
  { username: "obra", password: "obra123", role: "obra" },
];

export const seedDefaultUsers = async () => {
  try {
    for (const user of DEFAULT_USERS) {
      const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

      const { upsertedCount } = await Usuario.updateOne(
        { username: user.username },
        {
          $setOnInsert: {
            username: user.username,
            passwordHash,
            role: user.role,
          },
        },
        { upsert: true },
      );

      if (upsertedCount === 1) {
        console.log(`✅ Usuario "${user.username}" creado exitosamente.`);
      } else {
        console.log(`ℹ️  Usuario "${user.username}" ya existe, se omite.`);
      }
    }
  } catch (error) {
    console.error("❌ Error al crear usuarios por defecto:", error.message);
  }
};
