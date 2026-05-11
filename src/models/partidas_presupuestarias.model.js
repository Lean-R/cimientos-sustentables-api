import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const filePath = resolve("src/data/partidas_presupuestarias.json");

// Leer todas las partidas presupuestarias
export const findAll = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, retornar array vacío
    return [];
  }
};

// Guardar todas las partidas presupuestarias
export const save = async (partidas) => {
  await writeFile(filePath, JSON.stringify(partidas, null, 2));
};
