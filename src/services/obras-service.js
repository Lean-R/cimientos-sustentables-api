import Obra from "../models/obra.model.js";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Función para sembrado automático de datos si la colección en MongoDB está vacía
const seedObras = async () => {
  try {
    const count = await Obra.countDocuments();
    if (count === 0) {
      console.log("ℹ️ No se encontraron obras en MongoDB. Sembrando datos iniciales...");
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const jsonPath = join(__dirname, "../data/obras.json");
      
      const fileData = readFileSync(jsonPath, "utf8");
      const obrasIniciales = JSON.parse(fileData);
      
      // Removemos el campo ID numérico secuencial del JSON antiguo para que MongoDB autogenere sus ObjectIds válidos
      const obrasParaInsertar = obrasIniciales.map(({ id, ...resto }) => resto);
      
      if (obrasParaInsertar.length > 0) {
        await Obra.insertMany(obrasParaInsertar);
        console.log(`✅ Se insertaron ${obrasParaInsertar.length} obras iniciales exitosamente.`);
      }
    }
  } catch (error) {
    console.error("⚠️ Error durante el sembrado inicial de obras:", error.message);
  }
};

// Ejecutar el sembrado automático una vez que la conexión esté abierta y lista
if (mongoose.connection.readyState === 1) {
  seedObras();
} else {
  mongoose.connection.once("open", () => {
    seedObras();
  });
}

const ObrasService = {
  // Obtener todas las obras
  getAllObras: async () => {
    return await Obra.find();
  },

  // Obtener obra por ID
  getObraByID: async (id) => {
    // Si el ID provisto no es un ObjectId válido de MongoDB (por ejemplo, los viejos IDs numéricos),
    // retornamos null de forma segura en lugar de causar un error de casteo de Mongoose (CastError)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Obra.findById(id);
  },

  // Registrar una obra
  createObra: async (data) => {
    const nuevaObra = new Obra(data);
    return await nuevaObra.save();
  },

  // Actualizar una obra
  updateObra: async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    // Mantenemos "runValidators: true" para que valide el nuevo esquema al actualizar
    return await Obra.findByIdAndUpdate(id, data, { 
      new: true, 
      runValidators: true 
    });
  },

  // Borrar una obra
  deleteObra: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const obraBorrada = await Obra.findByIdAndDelete(id);
    return obraBorrada !== null;
  },
};

export default ObrasService;
