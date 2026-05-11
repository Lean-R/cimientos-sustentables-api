import { readFile, writeFile } from "fs/promises"; // File System con soporte de Promesas (async/await).
import { resolve } from "path";

const filePath = resolve("src/data/gastos.json");

// Leer todos los gastos
export const findAll = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, retornamos un array vacío
    return [];
  }
};

// Guardar todos los gastos
export const save = async (gastos) => {
  await writeFile(filePath, JSON.stringify(gastos, null, 2));
};
