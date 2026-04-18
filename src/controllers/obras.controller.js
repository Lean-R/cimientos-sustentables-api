const fs = require("fs");     //file sistem
const path = require("path"); //

// defino la tura del la DB

const obrasDBPath = path.join(__dirname, "../data/obras.json"); 

const obtenerObras = (req, res) =>{
  try{
    const obrasData = fs.readFileSync(obrasDBPath,'utf-8') //lee obras.json
    const obras = JSON.parse(obrasDBPath) // Transforma en un JSONString lo de obras.js
    res.json(obras)
  }catch(error){
    console.log('Ocurrio un error al obtener los datos de las obras', error);
    res.status(500).JSON({message: 'Error del servidor'})
    
  }
}







// registrar una obra

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const crearObra = (req, res) => {
  try{
  const { nombre, descripcion, ubicacion, presupuestoTotal } = req.body; // pasa los datos necesarios para crear la obra 
    const obrasData = fs.readFileSync(obrasDBPath,'utf-8') //lee obras.json
    const obras = json.parse(obrasData) // Transforma en un JSONString lo de obras.js


    const nuevaObra  = {
      id: obras.length > 0 ? obras[obras.length -1].id +1 : 1, // TERNARIO si HAY obras, agarra la ULTIMA obra y le suma 1 al ID, si esta VACIA le otorga la ID 1
      nombre,
      ubicacion,
      director,
      estado : estado,
      presupuestoTotal
    };

    obras.push(nuevaObra);// guarda la obra
    fs.writeFileSync(obrasDBPath, json.stringify(obras, null ,3))//inversio a PARSE, se guarda en el JSON y lo transforma en texto plano
    res.status(201).json(nuevaObra);// si se guardo correctamente le respondemos con el status 201

  
  }catch(error){
    console.log(`Ocurrio un error al crear la obra`);
    res.status(500).json({message: `Ocurrio un error al guardar la obra`})
    
  }

module.exports = {
  obtenerObras,
  crearObra,
}
}
