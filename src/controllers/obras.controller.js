const { leerObras, guardarObras } = require("../models/obra.model");


/**
 *
 * @param {Object} res
 */
const obtenerObras = (res) => {
  try {
    const obras = leerObras();
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
    const obras = leerObras();
    const nuevaObra = {
      id: obras.length > 0 ? obras[obras.length - 1].id + 1 : 1, // TERNARIO si HAY obras, agarra la ULTIMA obra y le suma 1 al ID, si esta VACIA le otorga la ID 1
      nombre,
      direccion,
      provincia,
      director,
      tipo_contratacion,
      estado,
      presupuestoTotal,
    };

    obras.push(nuevaObra); //a;ade la obra al array de obras
    guardarObras(obras); // guarda la obra
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
    const obra = leerObras().find((element) => element.id === parseInt(id)); //lee las obras y busca la obra q coincida por el ID
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
    const obras = leerObras(); //obtiene el array de obras
    const index = obras.findIndex((element) => element.id === parseInt(id)); //recorre el array en busque del ID solicitado, si no lo encuentra, devuelve por efecto el valor -1
    if (index === -1) {
      //si el ID es -1 ....
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return;
    } //sino continua con el codigo
    obras[index] = { ...obras[index], ...req.body }; // obtiene los campos a actualizar
    guardarObras(obras); //modifica el JSON de las obras
    res.json(obras[index]); //devuelve la obra actualizada
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
    const obras = leerObras(); //obtiene el array de obras
    const index = obras.findIndex((element) => element.id === parseInt(id)); //recorre el array en busque del ID solicitado, si no lo encuentra, devuelve por efecto el valor -1
    if (index === -1) {
      //si el ID es -1 ....
      res.status(404).json({ message: "La obra no fue encontrada" }); //devuelve un error not found
      return;
    }
    obras.splice(index, 1);
    guardarObras(obras);
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
