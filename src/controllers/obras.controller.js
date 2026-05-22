import ObrasService from "../services/obras-service.js";
const { getAllObras, getObraByID, createObra, updateObra, deleteObra } =
  ObrasService;

/**
 * @param {Object} req
 * @param {Object} res
 */
const obtenerObras = async (req, res) => {
  try {
    const obras = await getAllObras();
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
const crearObra = async (req, res) => {
  try {
    const nuevaObra = await createObra(req.body);
    res.status(201).json(nuevaObra); // si se guardo correctamente le respondemos con el status 201
  } catch (error) {
    console.log(`Ocurrio un error al crear la obra`, error);
    res.status(500).json({ message: `Ocurrio un error al guardar la obra` });
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
const getObraID = async (req, res) => {
  //busca y devuelve la obra
  try {
    const { id } = req.params; // Obtiene el ID
    const obra = await getObraByID(id);
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
const actualizarObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await updateObra(id, req.body);
    if (!obra) {
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return;
    }
    res.status(200).json(obra);
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
const borrarObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await deleteObra(id);
    if (!obra) {
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return;
    }
    res
      .status(200)
      .json({ message: `La obra con id ${id} se borro correctamente` });
  } catch (error) {
    console.log("Ocurrio un error al eliminar la obra");
    res.status(500).json({ message: `Ocurrio un error al eliminar la obra` });
  }
};

export default {
  obtenerObras,
  crearObra,
  getObraID,
  actualizarObra,
  borrarObra,
};
