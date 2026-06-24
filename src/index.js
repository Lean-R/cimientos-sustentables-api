import express from "express";
import routes from "./routes/index.js";
import views from "./views/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import seedAdmin from "./helpers/seedAdmin.js";

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Inicializar express
const app = express();

// Si MONGO_URI no está definido, detener el servidor
if (!MONGO_URI) {
  console.error(
    "MONGO_URI no definido. Verifique las variables de entorno (.env)",
  );
  process.exit(1);
}

try {
  await mongoose.connect(MONGO_URI);
  console.log("✅️ DB conectada exitosamente");
} catch (error) {
  console.error("❌ Error conectando a la DB:", error.message);
  process.exit(1);
}

// Verificar/crear usuario admin por defecto
await seedAdmin();

// Middleware para parsear JSON
app.use(express.json());
// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
// Funciones javascript para servir archivos estáticos (CSS, JS, imágenes):
app.use(express.static(join(__dirname, "public")));

// Configurar plantillas PUG
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

// Router para vistas PUG
app.use("/", views);

// Router para API REST
app.use("/api", routes);

// Ejecutar servidor en puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
