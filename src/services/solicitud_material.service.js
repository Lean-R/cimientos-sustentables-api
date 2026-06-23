import SolicitudMaterial from "../models/solicitud_material.model.js";

const SolicitudMaterialService = {
  getAll: async (filtros = {}) => {
    const query = {};
    if (filtros.obra_id) query.obra_id = filtros.obra_id;
    if (filtros.partida_rubro) query.partida_rubro = filtros.partida_rubro;
    if (filtros.estado) query.estado = filtros.estado;
    return await SolicitudMaterial.find(query).sort({ createdAt: -1 });
  },

  getById: async (id) => {
    return await SolicitudMaterial.findById(id);
  },

  create: async (data) => {
    return await SolicitudMaterial.create(data);
  },

  update: async (id, data) => {
    return await SolicitudMaterial.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  },

  delete: async (id) => {
    const result = await SolicitudMaterial.findByIdAndDelete(id);
    return result !== null;
  },
};

export default SolicitudMaterialService;
