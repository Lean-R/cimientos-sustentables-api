const obras = [];

// obtener obras
const obtenerObras = (req, res) => {
  res.json(obras);
};

// registrar una obra
const crearObra = (req, res) => {
  const { nombre, descripcion, ubicacion, presupuesto } = req.body;

  const nuevaObra = {
    id: obras.length + 1,
    nombre,
    descripcion,
    ubicacion,
    presupuesto,
  };

  obras.push(nuevaObra);
  res.status(201).json(nuevaObra);
};

module.exports = {
  obtenerObras,
  crearObra,
};
