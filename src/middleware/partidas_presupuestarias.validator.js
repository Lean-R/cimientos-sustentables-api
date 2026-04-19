// Rubros válidos para partidas presupuestarias
const RUBROS_VALIDOS = [
  "materiales",
  "mano_de_obra",
  "electricidad",
  "aberturas",
  "sanitarios",
  "pintura",
  "herreria",
  "carpinteria",
  "plomeria",
  "gas",
  "aire_acondicionado",
  "otros",
];

const validarPartidaPresupuestaria = async (req, res, next) => {
  const { obra_id, rubro, items } = req.body;

  // Validar que existan los campos obligatorios
  if (!obra_id) {
    return res.status(400).json({
      message: "Error de validación: obra_id es obligatorio.",
    });
  }

  if (!rubro) {
    return res.status(400).json({
      message: "Error de validación: rubro es obligatorio.",
    });
  }

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({
      message: "Error de validación: items debe ser un array.",
    });
  }

  // Validar que haya al menos 1 item
  if (items.length === 0) {
    return res.status(400).json({
      message:
        "Error de validación: Debe haber al menos 1 item en la partida presupuestaria.",
    });
  }

  // Validar que el rubro sea válido
  if (!RUBROS_VALIDOS.includes(rubro)) {
    return res.status(400).json({
      message: `Error de validación: El rubro debe ser uno de los siguientes: ${RUBROS_VALIDOS.join(", ")}.`,
    });
  }

  // Validar cada item
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Validar que cada item tenga los campos necesarios (precio_parcial se calcula automáticamente)
    if (
      !item.cantidad ||
      !item.unidad_medida ||
      !item.detalle ||
      item.precio_unitario === undefined
    ) {
      return res.status(400).json({
        message: `Error de validación: El item ${i + 1} debe tener cantidad, unidad_medida, detalle y precio_unitario.`,
      });
    }

    // Validar que cantidad sea un número positivo
    if (isNaN(item.cantidad) || item.cantidad <= 0) {
      return res.status(400).json({
        message: `Error de validación: La cantidad del item ${i + 1} debe ser un número mayor a cero.`,
      });
    }

    // Validar que precio_unitario sea un número positivo
    if (isNaN(item.precio_unitario) || item.precio_unitario <= 0) {
      return res.status(400).json({
        message: `Error de validación: El precio_unitario del item ${i + 1} debe ser un número mayor a cero.`,
      });
    }
  }

  // Si todo está bien, llamar a next()
  next();
};

module.exports = { validarPartidaPresupuestaria, RUBROS_VALIDOS };
