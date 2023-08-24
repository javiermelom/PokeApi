// llamados a la api
export async function buscarPokemon(url) {
  let data = await fetch(url || `https://pokeapi.co/api/v2/pokemon/`); // con esta instruccion hacemos la peticion con fetch y guardamos en variable data
  // en la linea anterior se borro el (www)
  let dataParseada = await data.json(); //data.json sirve para traducir o ser legible los datos sobre javaScript y guardamos en variable dataParseada
  // console.log(dataParseada.results);// se deja para hacer pruebas y verificar que este funcionando la funcion dentro de consola
  // return dataParseada.results;// debemos retornar los datos para que puedan ser mostrados en el llamado que se hace a la funcion en main.js
  // dataParseada.results va a ser igual a un array con objetos dentro = [{url,name},{url,name},{url,name},{},{},{}]
  // console.log(dataParseada.results);

  let arrayDePokemones = []; //declaramos un array vacio para luego ejecutar el loop for y llenarlo con informacion

  for (let i = 0; i < dataParseada.results.length; i++) {
    const pokemon = dataParseada.results[i];
    let pokemonData = await fetch(pokemon.url);
    let pokemonParseado = await pokemonData.json();
    let pokemonFormateado = {
      id: pokemonParseado.id,
      nombre: pokemonParseado.name,
      tipos: pokemonParseado.types,
      imagen: pokemonParseado.sprites.other.dream_world.front_default,
    };
    // console.log(pokemonFormateado);
    arrayDePokemones.push(pokemonFormateado);
  }
  return {
    previous: dataParseada.previous,
    next: dataParseada.next,
    arrayDePokemones: arrayDePokemones, //[{},{},{},{}]
  };
}

export async function buscarPokemonPorNombre(nombre) {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  let pokemonParseado = await data.json();

  let pokemonFormateado = {
    id: pokemonParseado.id,
    nombre: pokemonParseado.name,
    tipos: pokemonParseado.types,
    imagen: pokemonParseado.sprites.other.dream_world.front_default,
  };
  // console.log(pokemonFormateado);
  return pokemonFormateado;
}
// FUNCIONES DE PRUEBA CON NODE
// saludar();
// buscarPokemon();
// buscarPokemonPorNombre("charizard")

export async function paginaSiguiente() {}

export async function paginaAnterior() {}
