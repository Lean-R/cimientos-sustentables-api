const GastosService = require('../services/gastos.service.js');

const GastosController = {
    // Obtener todos los gastos
    getGastos: async (req, res) => {
        try {
            const gastos = await GastosService.getAll();
            res.status(200).json(gastos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los gastos", error: error.message });
        }
    },

    // GET /api/gastos/:id
    getGastoById: async (req, res) => {
        const { id } = req.params; // Extrae el ID de la URL
        const gasto = await GastosService.getById(id);
        
        if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });
        res.json(gasto);
    },

    // Crear un nuevo gasto
    createGasto: async (req, res) => {
        try {
            // Extraemos los datos del cuerpo de la petición
            const { obra_id, partida_id, concepto, monto, fecha, estado } = req.body;

            // Validación básica inicial
            if (!obra_id || !partida_id || !concepto || !monto) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const nuevoGasto = await GastosService.create({ 
                obra_id, partida_id, concepto, monto, fecha, estado 
            });

            res.status(201).json(nuevoGasto);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el gasto", error: error.message });
        }
    },

    // DELETE /api/gastos/:id
    deleteGasto: async (req, res) => {
        const { id } = req.params;
        const eliminado = await GastosService.delete(id);
        
        if (!eliminado) return res.status(404).json({ message: "No se pudo eliminar: ID inexistente" });
        res.json({ message: "Gasto eliminado correctamente" });
    }
};

module.exports = GastosController;