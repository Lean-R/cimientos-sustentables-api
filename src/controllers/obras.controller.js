const { getAllObras, getObraByID, createObra, updateObra, deleteObra } = require("../services/obras-service");

/**
 * @param {Object} req
 * @param {Object} res
 */
const obtenerObras = (req,res) => {
  try {
    const obras = getAllObras();
    res.json(obras);
  } catch (error) {
    console.log("Ocurrio un error al obtener los datos de las obras", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// registrar una obra

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
const crearObra = (req, res) => {
  try {
    const {
      nombre,
      direccion,
      provincia,
      director,
      tipo_contratacion,
      estado,
      presupuestoTotal,
    } = req.body; // pasa los datos necesarios para crear la obra
       if (!nombre || !direccion || !provincia || !director || !tipo_contratacion || !estado || !presupuestoTotal) { //VALIDACION DE QUE TODOS LOS CAMPOS ESTAN COMPLETOS
      return res.status(400).json({ message: "Se necesita completar todos los campos para crear una obra" });
       }
    const nuevaObra = createObra(req.body)
    res.status(201).json(nuevaObra); // si se guardo correctamente le respondemos con el status 201
  } catch (error) {
    console.log(`Ocurrio un error al crear la obra`);
    res.status(500).json({ message: `Ocurrio un error al guardar la obra` });
  }
};



/**
 *
 * @param {Object} req
 * @param {Object} res
 */
const getObraID = (req, res) => {
  //busca y devuelve la obra
  try {
    const { id } = req.params; // Obtiene el ID
    const  obra = getObraByID(id)
    !obra
      ? res.status(404).json({ message: `Obra con ID ${id} no fue encontrada` })
      : res.status(200).json(obra); // TERNARIO NO LA ENCUENTRA DE ERROR, SI LA ENCUENTRA, LA DEVUELVE
  } catch (error) {
    console.log("Ocurrio un error al buscar la obra");
    res.status(500).json({ message: `Ocurrio un error al buscar la obra` });
  }
};



/**
 *
 * @param {Object} req
 * @param {Object} res
 */
const actualizarObra = (req, res) => {
  try {
    const { id } = req.params;
    const obra = updateObra(id, req.body);
    if (!obra){
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return
    }
    res.status(200).json(obra)
  } catch (error) {
    //error del servidor
    console.log("Ocurrio un error al buscar la obra");
    res.status(500).json({ message: `Ocurrio un error al modificar la obra` });
  }
};



/**
 *
 * @param {Object} req
 * @param {Object} res
 */
const borrarObra = (req, res) => {
  try {
    const { id } = req.params;
    const obra = deleteObra(id)
    if(!obra){
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return
    }
    res
      .status(200)
      .json({ message: `La obra con id ${id} se borro correctamente` });
  } catch (error) {
    console.log("Ocurrio un error al eliminar la obra");
    res.status(500).json({ message: `Ocurrio un error al eliminar la obra` });
  }
};

module.exports = {
  obtenerObras,
  crearObra,
  getObraID,
  actualizarObra,
  borrarObra,
};
