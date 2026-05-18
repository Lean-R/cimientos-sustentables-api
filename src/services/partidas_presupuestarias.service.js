import PartidaPresupuestaria from "../models/partidas_presupuestarias.model.js";

const PartidasPresupuestariasService = {
  // Obtener todas las partidas con filtros opcionales
  getAll: async (filtros = {}) => {
    const query = {};

    if (filtros.obra_id) query.obra_id = filtros.obra_id;
    if (filtros.rubro) query.rubro = filtros.rubro;

    return await PartidaPresupuestaria.find(query);
  },

  // Buscar una partida por ID
  getById: async (id) => {
    return await PartidaPresupuestaria.findById(id);
  },

  // Buscar partidas por obra_id
  getByObraId: async (obra_id) => {
    return await PartidaPresupuestaria.find({ obra_id });
  },

  // Buscar partidas por rubro
  getByRubro: async (rubro) => {
    return await PartidaPresupuestaria.find({ rubro });
  },

  // Buscar partidas por obra_id y rubro
  getByObraAndRubro: async (obra_id, rubro) => {
    return await PartidaPresupuestaria.find({ obra_id, rubro });
  },

  // Crear una nueva partida
  create: async (data) => {
    // Calcular precio_parcial para cada item
    const itemsConPrecios = data.items.map((item) => ({
      ...item,
      precio_parcial: item.cantidad * item.precio_unitario,
    }));

    // Calcular precio_total sumando los precios parciales de cada item
    const precioTotal = itemsConPrecios.reduce(
      (sum, item) => sum + item.precio_parcial,
      0,
    );

    const partida = new PartidaPresupuestaria({
      obra_id: data.obra_id,
      rubro: data.rubro,
      items: itemsConPrecios,
      precio_total: precioTotal,
    });

    return await partida.save();
  },

  // Actualizar una partida existente
  update: async (id, data) => {
    const updateData = { ...data };

    // Recalcular precios si se proporcionan items
    if (updateData.items) {
      updateData.items = updateData.items.map((item) => ({
        ...item,
        precio_parcial: item.cantidad * item.precio_unitario,
      }));
      updateData.precio_total = updateData.items.reduce(
        (sum, item) => sum + item.precio_parcial,
        0,
      );
    }

    return await PartidaPresupuestaria.findByIdAndUpdate(id, updateData, {
      returnDocument: "after", // "new" está deprecado
      runValidators: true,
    });
  },

  // Eliminar una partida
  delete: async (id) => {
    const result = await PartidaPresupuestaria.findByIdAndDelete(id);
    return result !== null;
  },
};

export default PartidasPresupuestariasService;
