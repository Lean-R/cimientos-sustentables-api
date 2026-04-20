const {leerObras, guardarObras} = require("../models/obra.model")



const getAllObras = () =>{
return leerObras();//devuelve el array de obras
}

const getObraByID = (id) => {
  return leerObras().find(element => element.id === parseInt(id)); // lee las obras y lo filtra por el ID pasado por el parametro
}

const createObra = (data) =>{
    const obra = leerObras(); //lee el array de obras
    const nuevaObra = {
//ternario, si el array de obras esta vacio crea la primera con el id 1
//si ya hay obras, le suma 1 al ID anterior para generar el id         
      id: obra.length > 0 ? obra[obra.length - 1].id + 1 : 1, ...data 
    };
    obra.push(nuevaObra);
//suma al array de obras la nueva obra 
    guardarObras(obra);
//guarda en el archivo JSON
    return nuevaObra;
}

const updateObra = (id, data) =>{
    const obra = leerObras();
// busca y devuelve la posición (index) en el array de la obra con ese ID
    const index = obra.findIndex((element) => element.id === parseInt(id)); 
//si no encuentra el ID, retorna x defecto -1, entonces si Index === -1 retorna un error y se corta el proceso
    if (index === -1) {
        return null
    }
    obra[index] = { ...obra[index], ...data }; // modifica los valores de la obra que el usuario quiere modificar, si no se mando un valor queda igual
    guardarObras(obra); //guarda en el archivo JSON
    return obra[index];
}

const deleteObra = (id) => {
 const obra = leerObras(); 
// busca y devuelve la posición (index) en el array de la obra con ese ID
    const index = obra.findIndex((element) => element.id === parseInt(id)); 
//si no encuentra el ID, retorna x defecto -1, entonces si Index === -1 retorna un error y se corta el proceso
     if (index === -1) {
        return null
    }
    obra.splice(index, 1); // borra la obra que le pasaron en el ID
    guardarObras(obra); //guarda en el archivo JSON

    return true
}




module.exports = {
  getAllObras,
  getObraByID,
  createObra,
  updateObra,
  deleteObra,
};
