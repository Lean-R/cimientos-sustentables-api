const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Cimientos Sustentables API");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
