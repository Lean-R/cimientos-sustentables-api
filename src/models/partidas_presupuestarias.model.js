const fs = require("fs/promises");
const path = require("path");

const filePath = path.resolve("src/data/partidas_presupuestarias.json");

const PartidasPresupuestariasModel = {
  // Leer todas las partidas presupuestarias
  findAll: async () => {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, retornar array vacío
      return [];
    }
  },

  // Guardar todas las partidas presupuestarias
  save: async (partidas) => {
    await fs.writeFile(filePath, JSON.stringify(partidas, null, 2));
  },
};

module.exports = PartidasPresupuestariasModel;
