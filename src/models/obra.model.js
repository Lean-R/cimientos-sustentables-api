import { readFileSync, writeFileSync } from "fs"; // file sistem (para interactuar con los archivos)
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const obrasDBPath = join(__dirname, "../data/obras.json"); //esta linea declara el path de las obras de las obras;

const leerObras = () => {
  try {
    const obrasData = readFileSync(obrasDBPath, "utf-8"); //lee obras.json
    const obras = JSON.parse(obrasData); // Transforma el texto de obras.json a codigo de JS
    return obras;
  } catch (error) {
    console.log("Ocurrio un Error al ver las obras ");
    return [];
  }
};

const guardarObras = (nuevaObra) => {
  try {
    writeFileSync(obrasDBPath, JSON.stringify(nuevaObra, null, 3)); //Transforma a JSONString la nueva obra y lo guarda en obrasDBPath
    console.log(`La obra se guardo correctamente`);
    return true;
  } catch (error) {
    console.log(`Ocurrio un error al guardar la obra`);
    return false;
  }
};

export { leerObras, guardarObras };
