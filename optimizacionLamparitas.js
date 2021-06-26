const MATRIZ_PRUEBA = [[0,0,0,1],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const DIRECCION_DERECHA = "DIRECCION_DERECHA";
const DIRECCION_IZQUIERDA = "DIRECCION_IZQUIERDA";
const DIRECCION_ABAJO = "DIRECCION_ABAJO";
const DIRECCION_ARRIBA = "DIRECCION_ARRIBA";

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
          habitacion[fila][columna] = 2;
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
  for(let fila = 0; fila < filas ; fila++){
    console.log(matriz[fila]);
  }
}

let matrizResultado = optimizarLamparitas(4,4,MATRIZ_PRUEBA);
console.log("matriz lamparitas colocadas ");
imprimirMatriz(4,matrizResultado);


