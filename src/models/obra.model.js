const fs = require("fs"); // file sistem (para interactuar con los archivos)
const path = require("path");

const obrasDBPath = path.join(__dirname, "../data/obras.json"); //esta linea declara el path de las obras de las obras;

const leerObras = () => {
  try {
    const obrasData = fs.readFileSync(obrasDBPath, "utf-8"); //lee obras.json
    const obras = JSON.parse(obrasData); // Transforma el texto de obras.json a codigo de JS
    return obras;
  } catch (error) {
    console.log("Ocurrio un Error al ver las obras ");
    return [];
  }
};

const guardarObras = (nuevaObra) => {
  try {
    fs.writeFileSync(obrasDBPath, JSON.stringify(nuevaObra, null, 3)); //Transforma a JSONString la nueva obra y lo guarda en obrasDBPath
    console.log(`La obra se guardo correctamente`);
    return true;
  } catch (error) {
    console.log(`Ocurrio un error al guardar la obra`);
    return false;
  }
};


module.exports = { leerObras, guardarObras };
