import Gasto from "../models/gastos.model.js";


const GastosService = {
  getAll: async (filtros = {}) => {
    return await Gasto.find(filtros);
  },

  // Buscar un gasto por ID
  getById: async (id) => {
    return await Gasto.findById(id);
  },

  create: async (data) => {
    if (data.monto) data.monto = parseFloat(data.monto);
    return await Gasto.create(data);

  },

update: async (id, data) => {
    if (data.monto) data.monto = parseFloat(data.monto);

    // { new: true } hace que Mongoose te devuelva el gasto ya modificado.
    // runValidators: true obliga a Mongo a chequear que los nuevos datos cumplan con el Schema.
    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id, 
      data, 
      { new: true, runValidators: true }
    );

    if (!gastoActualizado) {
      throw new Error("Gasto no encontrado");
    }

    return gastoActualizado;
},

delete: async (id) => { 
    const resultado = await Gasto.findByIdAndDelete(id);
    return resultado !== null; // Retorna true si se eliminó, false si no se encontró el gasto      
}    
};

export default GastosService;




/*


// import { findAll, save } from "../models/gastos.model.js";
//import { get } from "http";
import Gasto from "../models/gastos.model.js";
//import { randomUUID } from "crypto";

const GastosService = {
  getAll: async () => {
    return await findAll();
  },

  // Buscar un gasto por ID
  getById: async (id) => {
    const gastos = await findAll();
    return gastos.find((g) => g.id === id);
  },

  create: async (data) => {
    const gastos = await findAll();

    const nuevoGasto = {
      id: randomUUID(), // Generamos un ID único y seguro
      obra_id: data.obra_id,
      partida_id: data.partida_id,
      fecha: data.fecha || new Date().toISOString(),
      proveedor: data.proveedor || "N/D",
      concepto: data.concepto,
      monto: parseFloat(data.monto),
      estado: data.estado || "solicitado",
    };

    gastos.push(nuevoGasto);
    await save(gastos);
    return nuevoGasto;
  },

  delete: async (id) => {
    const gastos = await findAll();
    const filtrados = gastos.filter((g) => g.id !== id);

    if (gastos.length === filtrados.length) return false; // No encontró nada

    await save(filtrados);
    return true;
  },
};

export default GastosService;

*/
