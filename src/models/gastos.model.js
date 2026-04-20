const fs = require('fs/promises'); // File System con soporte de Promesas (async/await).
const path = require('path');

const filePath = path.resolve('src/data/gastos.json');

const GastosModel = {
    // Leer todos los gastos
    findAll: async () => {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retornamos un array vacío
            return [];
        }
    },

    // Guardar todos los gastos
    save: async (gastos) => {
        await fs.writeFile(filePath, JSON.stringify(gastos, null, 2));
    }
};

module.exports = GastosModel;
