import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import views from "./views/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import seedAdmin from "./helpers/seedAdmin.js";

// crear un servidor HTTP y un servidor de WebSocket con Socket.IO
import { createServer } from "http";
import { Server } from "socket.io";

// Configurar __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Inicializar express
const app = express();

// Creamos el servidor HTTP y lo vinculamos con Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

// Si MONGO_URI no está definido, detener el servidor
if (!MONGO_URI) {
  console.error(
    "MONGO_URI no definido. Verifique las variables de entorno (.env)",
  );
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error(
    "JWT_SECRET no definido. Verifique las variables de entorno (.env)",
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
// Middleware para leer cookies
app.use(cookieParser());
// Funciones javascript para servir archivos estáticos (CSS, JS, imágenes):
app.use(express.static(join(__dirname, "public")));

// Configurar plantillas PUG
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

// Router para vistas PUG
app.use("/", views);

// Router para API REST
app.use("/api", routes);

// Escuchador de WebSockets para el Chat en Tiempo Real
io.on("connection", (socket) => {
  console.log("⚡ Un usuario se ha conectado al chat de la obra");

// Escuchamos cuando alguien envía un mensaje desde el modal flotante
socket.on("mensaje", (datos) => {
  console.log("📥 Mensaje recibido en servidor:", datos);
  
  // Lo retransmitimos en milisegundos a todos los usuarios conectados
  io.emit("mensaje", datos);
});

socket.on("disconnect", () => {
  console.log("❌ Un usuario se desconectó");
});
});

// Ponemos a escuchar al httpServer, NO a la app directamente
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// // Ejecutar servidor en puerto definido
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
