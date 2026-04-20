const validarGasto = (req, res, next) => {
    const { obra_id, partida_id, concepto, monto } = req.body;

    // 1. Validamos que existan los campos obligatorios
    if (!obra_id || !partida_id || !concepto || !monto) {
        return res.status(400).json({ 
            message: "Error de validación: obra_id, partida_id, concepto y monto son obligatorios." 
        });
    }

    // 2. Validamos que el monto sea un número positivo
    if (isNaN(monto) || monto <= 0) {
        return res.status(400).json({ 
            message: "Error de validación: El monto debe ser un número mayor a cero." 
        });
    }

    // 3. Si todo está OK, llamamos a next()
    next();
};

module.exports = { validarGasto };