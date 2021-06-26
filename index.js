const DIRECCION_DERECHA = "DIRECCION_DERECHA";
const DIRECCION_IZQUIERDA = "DIRECCION_IZQUIERDA";
const DIRECCION_ABAJO = "DIRECCION_ABAJO";
const DIRECCION_ARRIBA = "DIRECCION_ARRIBA";
const TEXT_FILE = "data.txt";
const fs = require("fs");

const optimizarLamparitas = (cantidadFilas,cantidadColumnas,habitacion) => {
  for(let fila = 0; fila < cantidadFilas; fila++){
    for(let columna = 0; columna < cantidadColumnas; columna++){
      if(!hayPared(habitacion[fila][columna]) && !hayLamparita(habitacion[fila][columna])){
        const posicion = {fila,columna};
        const limite = {cantidadFilas,cantidadColumnas}
        
        if( !revisarAldedor(posicion,DIRECCION_DERECHA,limite,habitacion) &&
            !revisarAldedor(posicion,DIRECCION_IZQUIERDA,limite,habitacion) &&
            !revisarAldedor(posicion,DIRECCION_ARRIBA,limite,habitacion) &&
            !revisarAldedor(posicion,DIRECCION_ABAJO,limite,habitacion)
          )
          habitacion[fila][columna] = '2';
      }
    } 
  }
  return habitacion;
}

const hayPared = (unaPosicion) =>{
  return unaPosicion == 1;
}

const hayLamparita = (unaPosicion) =>{
  return unaPosicion == 2;
}

const noEncuentroLimite = (unNumero, limiteSuperior) =>{
  return (0 <= unNumero)&&(unNumero < limiteSuperior);
}

const revisarAldedor = (posicion,direccion,limite,habitacion) =>{
  let hayLamparita = false;
  switch(direccion){
    case DIRECCION_DERECHA:
      hayLamparita = moverDerecha(posicion,limite,habitacion);
      break;
    case DIRECCION_IZQUIERDA:
      hayLamparita = moverIzquierda(posicion,limite,habitacion);
      break;
    case DIRECCION_ARRIBA:
      hayLamparita = moverArriba(posicion,limite,habitacion);
      break;
    case DIRECCION_ABAJO:
      hayLamparita = moverAbajo(posicion,limite,habitacion);
      break;
    default:
      break;
  }
  return hayLamparita;
}

const moverDerecha = (posicion,limite,habitacion) =>{
  let encontrePared = false;
  let encontreLamparita = false;
  const {fila,columna} = posicion;
  const {cantidadColumnas} = limite;
  
  if(noEncuentroLimite(columna + 1,cantidadColumnas)){
    let c = columna + 1;
    
    while(!encontreLamparita && !encontrePared && c < cantidadColumnas){
      if(hayPared(habitacion[fila][c])) encontrePared = true;
      if(hayLamparita(habitacion[fila][c])) encontreLamparita = true;
      c++;
    }
  }
  return encontreLamparita;
}

const moverIzquierda = (posicion,limite,habitacion) =>{
  let encontrePared = false;
  let encontreLamparita = false;
  const {fila,columna} = posicion;
  const {cantidadColumnas} = limite;
  
  if(noEncuentroLimite(columna - 1,cantidadColumnas)){
    let c = columna - 1;
    
    while(!encontreLamparita && !encontrePared && c >= 0){
      if(hayPared(habitacion[fila][c])) encontrePared = true;
      if(hayLamparita(habitacion[fila][c])) encontreLamparita = true;
      c--;
    }
  }
  return encontreLamparita;
}

const moverArriba = (posicion,limite,habitacion) =>{
  let encontrePared = false;
  let encontreLamparita = false;
  const {fila,columna} = posicion;
  const {cantidadFilas} = limite;
  
  if(noEncuentroLimite(fila + 1,cantidadFilas)){
    let f = fila +1;
          
    while(!encontreLamparita && !encontrePared && f < cantidadFilas){
      if(hayPared(habitacion[f][columna])) encontrePared = true;
      if(hayLamparita(habitacion[f][columna])) encontreLamparita = true;
      f++;
    }
  }
  return encontreLamparita;
}

const moverAbajo = (posicion,limite,habitacion) =>{
  let encontrePared = false;
  let encontreLamparita = false;
  const {fila,columna} = posicion;
  const {cantidadFilas} = limite;
  
  if(noEncuentroLimite(fila - 1,cantidadFilas)){
    let f = fila -1;

    while(!encontreLamparita && !encontrePared && f >= 0){
      if(hayPared(habitacion[f][columna])) encontrePared = true;
      if(hayLamparita(habitacion[f][columna])) encontreLamparita = true;
      f--;
    }
  }
  return encontreLamparita;
}

const imprimirMatriz = (filas,matriz) =>{
  console.log("matriz lamparitas colocadas ");
  for(let fila = 0; fila < filas ; fila++){
    console.log(matriz[fila]);
  }
}

const leerArchivo = () =>{
  let respuesta = [];
  let data = [];
  try {
    data = fs.readFileSync(TEXT_FILE).toString().replace(/\r/g,"").split('\n');
    for(let indice = 0; indice<data.length; indice++){
      if(data[indice].length > 0) respuesta.push(data[indice]);
    }
    return respuesta; 
  } catch (err) {
    console.log(`fallo al leer el archivo ${err.message}`)
  }
}

const generarMatriz = (data) =>{
  let matriz = [];
  let cantidadFilas = data.length;
  let cantidadColumnas;

  for(let fila = 0; fila < cantidadFilas; fila++){
    matriz[fila] = [];
    if(data[fila].length > 0){
      matriz[fila] = data[fila].split(" ");
    } 
  }
  cantidadColumnas = matriz[0].length;
  
  return {matriz,cantidadFilas, cantidadColumnas};
}

let data = leerArchivo();
let {cantidadFilas,cantidadColumnas,matriz} = generarMatriz(data);

let matrizResultado = optimizarLamparitas(cantidadFilas,cantidadColumnas,matriz);

imprimirMatriz(cantidadFilas,matrizResultado);


