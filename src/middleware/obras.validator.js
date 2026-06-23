// Tipos de contratación válidos para las obras
export const TIPOS_CONTRATACION_VALIDOS = [
  "licitacion",
  "privada",
  "inversion",
];

// Estados válidos para las obras
export const ESTADOS_VALIDOS = [
  "Trámites",
  "Planificación",
  "Construcción",
  "Cierre",
];

/**
 * Middleware para validar los datos de una obra.
 * Se utiliza tanto para la creación (POST) como para la actualización (PUT).
 */
export const validarObra = (req, res, next) => {
  const {
    nombre,
    direccion,
    provincia,
    director,
    tipo_contratacion,
    estado,
    telefono,
  } = req.body;

  // 1. Validar que existan los campos obligatorios
  if (
    !nombre ||
    !direccion ||
    !provincia ||
    !director ||
    !tipo_contratacion ||
    !estado
  ) {
    return res.status(400).json({
      message:
        "Error de validación: nombre, direccion, provincia, director, tipo_contratacion y estado son requeridos.",
    });
  }

  // 2. Validar que el tipo de contratación sea uno de los permitidos
  if (!TIPOS_CONTRATACION_VALIDOS.includes(tipo_contratacion)) {
    return res.status(400).json({
      message: `Error de validación: El tipo de contratación debe ser uno de los siguientes: ${TIPOS_CONTRATACION_VALIDOS.join(", ")}.`,
    });
  }

  // 3. Validar que el estado sea uno de los permitidos
  if (!ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({
      message: `Error de validación: El estado debe ser uno de los siguientes: ${ESTADOS_VALIDOS.join(", ")}.`,
    });
  }

  // 4. Validar formato simple de teléfono si está presente
  if (telefono && typeof telefono !== "string") {
    return res.status(400).json({
      message: "Error de validación: El teléfono debe ser una cadena de texto.",
    });
  }

  next();
};
