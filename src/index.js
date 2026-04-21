const express = require("express");
const routes = require("./routes");
const views = require("./views");

const PORT = process.env.PORT || 3001;

// Inicializar express
const app = express();

// Middleware para parsear JSON
app.use(express.json());
// Middleware para parseos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar plantillas PUG
app.set("view engine", "pug");
app.set("views", "./src/views");

// Router para vistas PUG
app.use("/", views);
// Router para API REST
app.use("/api", routes);

// Ejecutar servidor en puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
