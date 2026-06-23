import SolicitudMaterialService from "../services/solicitud_material.service.js";

const SolicitudMaterialController = {
  // GET /api/materiales
  getAll: async (req, res) => {
    try {
      const { obra_id, partida_rubro, estado } = req.query;
      const filtros = {};
      if (obra_id) filtros.obra_id = obra_id;
      if (partida_rubro) filtros.partida_rubro = partida_rubro;
      if (estado) filtros.estado = estado;

      const solicitudes = await SolicitudMaterialService.getAll(filtros);
      res.status(200).json(solicitudes);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las solicitudes de materiales",
        error: error.message,
      });
    }
  },

  // GET /api/materiales/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const solicitud = await SolicitudMaterialService.getById(id);

      if (!solicitud) {
        return res.status(404).json({
          message: "Solicitud de material no encontrada",
        });
      }

      res.status(200).json(solicitud);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la solicitud de material",
        error: error.message,
      });
    }
  },

  // POST /api/materiales
  create: async (req, res) => {
    try {
      const { obra_id, partida_rubro, subitems, observaciones } = req.body;

      const nuevaSolicitud =
        await SolicitudMaterialService.create({
          obra_id,
          partida_rubro,
          subitems,
          observaciones,
        });

      res.status(201).json(nuevaSolicitud);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear la solicitud de material",
        error: error.message,
      });
    }
  },

  // DELETE /api/materiales/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await SolicitudMaterialService.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          message: "No se pudo eliminar: ID inexistente",
        });
      }

      res.status(200).json({
        message: "Solicitud de material eliminada correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar la solicitud de material",
        error: error.message,
      });
    }
  },
};

export default SolicitudMaterialController;
