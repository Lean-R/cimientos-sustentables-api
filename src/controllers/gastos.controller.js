const GastosService = require('../services/gastos.service.js');

const GastosController = {


    //Para renderizar el formulario de nuevo gasto
    renderFormNuevo: async (req, res) => {
        try {
            const { obraId } = req.query;
            res.render("gastos/form", { obraId }); // nombre archivo .pug
        } catch (error) {
            res.status(500).send("Error al cargar el formulario");
        }
    },


    // Obtener todos los gastos
    getGastos: async (req, res) => {
        try {
            const { obra_id, partida_id } = req.query;
            const filtros = {};

            if (obra_id) filtros.obra_id = obra_id;
            // if (partida_id) filtros.partida_id = partida_id;
            
            const gastos = await GastosService.getAll(filtros);
            res.status(200).json(gastos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los gastos", error: error.message });
        }
    },

    // GET /api/gastos/:id
    getGastoById: async (req, res) => {
        try {
            const { id } = req.params; // Extrae el ID de la URL
            const gasto = await GastosService.getById(id);
        
            if (!gasto) {
                return res
                    .status(404)
                    .json({ message: "Gasto no encontrado" });
            }
            res.status(200).json(gasto);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el gasto", error: error.message });
        }
    },

    // Crear un nuevo gasto
    createGasto: async (req, res) => {
        try {
            // Extraemos los datos del cuerpo de la petición
            const { obra_id, partida_id, fecha, proveedor, concepto, monto, estado } = req.body;

            // Validación básica inicial
            if (!obra_id || !concepto || !monto) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const nuevoGasto = await GastosService.create({ 
                    obra_id, partida_id, fecha, proveedor, concepto, monto, estado 
            });

            // if (req.headers.accept && req.headers.accept.includes('text/html')) {
            //     return res.redirect(`/obras/${obra_id}`); 
            // }

            res.status(201).json(nuevoGasto); 
        } catch (error) {
            res.status(500).json({ message: "Error al crear el gasto", error: error.message });
        }
    },


    // DELETE /api/gastos/:id
    deleteGasto: async (req, res) => {
        try {
            const { id } = req.params;
            const eliminado = await GastosService.delete(id);
            
            if (!eliminado) {
                return res
                    .status(404)
                    .json({ message: "No se pudo eliminar: ID inexistente" });
            }

            res.json({ message: "Gasto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el gasto", error: error.message });
        }
    }
};

module.exports = GastosController;