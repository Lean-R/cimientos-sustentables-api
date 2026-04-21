const PartidasPresupuestariasModel = require("../models/partidas_presupuestarias.model.js");
const crypto = require("crypto");

const PartidasPresupuestariasService = {
  // Obtener todas las partidas con filtros opcionales
  getAll: async (filtros = {}) => {
    let partidas = await PartidasPresupuestariasModel.findAll();

    // Filtrar por obra_id si se proporciona
    if (filtros.obra_id) {
      partidas = partidas.filter((p) => p.obra_id === filtros.obra_id);
    }

    // Filtrar por rubro si se proporciona
    if (filtros.rubro) {
      partidas = partidas.filter((p) => p.rubro === filtros.rubro);
    }

    return partidas;
  },

  // Buscar una partida por ID
  getById: async (id) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    return partidas.find((p) => p.id === id);
  },

  // Buscar partidas por obra_id
  getByObraId: async (obra_id) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    return partidas.filter((p) => p.obra_id === obra_id);
  },

  // Buscar partidas por rubro
  getByRubro: async (rubro) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    return partidas.filter((p) => p.rubro === rubro);
  },

  // Buscar partidas por obra_id y rubro
  getByObraAndRubro: async (obra_id, rubro) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    return partidas.filter((p) => p.obra_id === obra_id && p.rubro === rubro);
  },

  // Crear una nueva partida
  create: async (data) => {
    const partidas = await PartidasPresupuestariasModel.findAll();

    // Calcular precio_parcial para cada item y precio_total
    const itemsConPrecios = data.items.map((item) => ({
      ...item,
      precio_parcial: item.cantidad * item.precio_unitario,
    }));

    const precioTotal = itemsConPrecios.reduce(
      (sum, item) => sum + item.precio_parcial,
      0,
    );

    const nuevaPartida = {
      id: crypto.randomUUID(), // Generar ID único y seguro
      obra_id: data.obra_id,
      rubro: data.rubro,
      items: itemsConPrecios,
      precio_total: precioTotal,
    };

    partidas.push(nuevaPartida);
    await PartidasPresupuestariasModel.save(partidas);
    return nuevaPartida;
  },

  // Actualizar una partida existente
  update: async (id, data) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    const index = partidas.findIndex((p) => p.id === id);

    if (index === -1) return null; // No encontrado

    // Recalcular precios si se proporcionan items
    let itemsActualizados = data.items;
    let precioTotal = partidas[index].precio_total;

    if (data.items) {
      itemsActualizados = data.items.map((item) => ({
        ...item,
        precio_parcial: item.cantidad * item.precio_unitario,
      }));
      precioTotal = itemsActualizados.reduce(
        (sum, item) => sum + item.precio_parcial,
        0,
      );
    }

    const partidaActualizada = {
      ...partidas[index],
      ...data,
      items: itemsActualizados || partidas[index].items,
      precio_total: precioTotal,
      id, // Mantener ID original
    };

    partidas[index] = partidaActualizada;
    await PartidasPresupuestariasModel.save(partidas);
    return partidaActualizada;
  },

  // Eliminar una partida
  delete: async (id) => {
    const partidas = await PartidasPresupuestariasModel.findAll();
    const filtrados = partidas.filter((p) => p.id !== id);

    if (partidas.length === filtrados.length) return false; // No encontró nada

    await PartidasPresupuestariasModel.save(filtrados);
    return true;
  },
};

module.exports = PartidasPresupuestariasService;
