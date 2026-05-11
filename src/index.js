import express from "express";
import routes from "./routes/index.js";
import views from "./views/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

// Inicializar express
const app = express();

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
