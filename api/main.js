import {
  buscarPokemon,
  buscarPokemonPorNombre,
} from "./controllers/controllers.js";

let root = document.getElementById("root");
// vamos a tener un addeverListener que va a escuchar que escribo en el input y ejecuta el buscar por nombre
let botonDeBusqueda = document.getElementById("buscarPokemon");
let barraDeBusqueda = document.getElementById("barrarPokemon");
/* realizo un addEventListener que va a ver que boton clickeo y accionara a otra pagina*/
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let previousUrl = "";
let nextUrl = "";

// DECLARACION FUNCION PARA LLAMAR A LA API Y MOSTRAR EEN PANTALLA LAS CARDS
async function mostrarPokemones(url) {
  let objetoPokemon = await buscarPokemon(url);
  // console.log("Estoy dentro de la funcion ejemplo", objetoPokemon.arrayDePokemones);

  previousUrl = objetoPokemon.previous;
  nextUrl = objetoPokemon.next;

  let html = "";
  objetoPokemon.arrayDePokemones.forEach((cadaPokemon) => {
    let cardPokemon = `<div class="card">
      <span>${cadaPokemon.nombre}</span>
      <span>${cadaPokemon.id}</span>
      <span>${cadaPokemon.tipos[0].type.name}</span>
      <img class="card-image" src='${cadaPokemon.imagen}'/>
    </div>`;
    // root.innerHTML += cardPokemon;//esta instruccion se ejecuto 20 veces que es el numero de cartas de pokemon que existen
    //para evitar que se ejecute 20 veces lo que hacemos es crear una variable llamada html vacia y vamos almacenando todos los pokemon
    html += cardPokemon;
  });
  root.innerHTML = html;
}

botonDeBusqueda.addEventListener("click", async function (event) {
  event.preventDefault(); //evito que se refresque la pagina luego del click
  let pokemonBuscado = await buscarPokemonPorNombre(barraDeBusqueda.value);
  let cardPokemon = `<div class="card">
                      <span>${pokemonBuscado.nombre}</span>
                      <span>${pokemonBuscado.id}</span>
                      <span>${pokemonBuscado.tipos[0].type.name}</span>
                      <img class="card-image" src='${pokemonBuscado.imagen}'/>
                    </div>`;
  root.innerHTML = cardPokemon;
});

previousBtn.addEventListener("click", async () => {
  // va a llamarme a la paina anterior
  mostrarPokemones(previousUrl);
});

nextBtn.addEventListener("click", async () => {
  // va a llamarme a la paina siguiente
  // va a mostrar pokemones
  mostrarPokemones(nextUrl);
});
// INVOCACION PRIMER LLAMADO A LA API SIN URL (PAGINA 1)
mostrarPokemones();
//iterar almacenar y enviar
