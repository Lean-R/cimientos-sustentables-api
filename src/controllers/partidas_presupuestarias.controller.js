const PartidasPresupuestariasService = require("../services/partidas_presupuestarias.service.js");

const PartidasPresupuestariasController = {
  // GET /api/partidas (con query params opcionales: ?obra_id=1&rubro=materiales)
  getPartidas: async (req, res) => {
    try {
      const { obra_id, rubro } = req.query;
      const filtros = {};

      if (obra_id) filtros.obra_id = obra_id;
      if (rubro) filtros.rubro = rubro;

      const partidas = await PartidasPresupuestariasService.getAll(filtros);
      res.status(200).json(partidas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las partidas presupuestarias",
        error: error.message,
      });
    }
  },

  // GET /api/partidas/:id
  getPartidaById: async (req, res) => {
    try {
      const { id } = req.params;
      const partida = await PartidasPresupuestariasService.getById(id);

      if (!partida) {
        return res
          .status(404)
          .json({ message: "Partida presupuestaria no encontrada" });
      }

      res.status(200).json(partida);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la partida presupuestaria",
        error: error.message,
      });
    }
  },

  // POST /api/partidas
  createPartida: async (req, res) => {
    try {
      const { obra_id, rubro, items } = req.body;

      const nuevaPartida = await PartidasPresupuestariasService.create({
        obra_id,
        rubro,
        items,
      });

      res.status(201).json(nuevaPartida);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear la partida presupuestaria",
        error: error.message,
      });
    }
  },

  // PUT /api/partidas/:id
  updatePartida: async (req, res) => {
    try {
      const { id } = req.params;
      const { obra_id, rubro, items } = req.body;

      const partidaActualizada = await PartidasPresupuestariasService.update(
        id,
        {
          obra_id,
          rubro,
          items,
        },
      );

      if (!partidaActualizada) {
        return res
          .status(404)
          .json({ message: "Partida presupuestaria no encontrada" });
      }

      res.status(200).json(partidaActualizada);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar la partida presupuestaria",
        error: error.message,
      });
    }
  },

  // DELETE /api/partidas/:id
  deletePartida: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await PartidasPresupuestariasService.delete(id);

      if (!eliminado) {
        return res
          .status(404)
          .json({ message: "No se pudo eliminar: ID inexistente" });
      }

      res
        .status(200)
        .json({ message: "Partida presupuestaria eliminada correctamente" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar la partida presupuestaria",
        error: error.message,
      });
    }
  },
};

module.exports = PartidasPresupuestariasController;
