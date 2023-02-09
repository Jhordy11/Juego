const selecciones =document.querySelectorAll('.jugador__opciones_img')
const jugadaJugador = document.querySelector(".jugadaJugador");
const jugadaComputadora = document.querySelector(".jugadaComputadora");
const puntaje = document.querySelector(".marcador__puntaje");
const linea  = document.querySelector(".linea");
const advertencia = document.querySelector(".jugador__advertencia");
const mensaje = document.querySelector(".resultado")
const opciones = ["piedra", "papel", "tijera"];
const partidasPierde = [
  ["piedra", "papel"],
  ["papel", "tijera"],
  ["tijera", "piedra"],
];
const puntos = [0, 0];
const EMPATE = "empate";
const GANA = "gana";
const PIERDE = "pierde";
const TIEMPO = 1000

function numeroRandom() {
  return Math.round(Math.random() * 2);
}

function selecionComputador() {
  return opciones[numeroRandom()];
}

const iniciarRonda = function(e) {
    let pc = selecionComputador();
    let resultado = resultadoPartida(e.target.alt, pc);
    retirarEventos()
    mostrarElementos(e,pc,resultado)
    esconderElementos()
    actualizarPuntaje(resultado)
    reAgregarEventos()
}

function mostrarElementos(e,pc,resultado){
    mostrarJugada(jugadaJugador,e.target.alt)
    mostrarJugada(jugadaComputadora,pc)
    mostrarElemento(linea)
    mostrarElemento(advertencia)
    mostrarMensaje(resultado)
}
function esconderElementos(){
    esconderElemento(advertencia)
    esconderElemento(linea,TIEMPO)
    esconderElemento(jugadaJugador,TIEMPO)
    esconderElemento(jugadaComputadora,TIEMPO)
}


function resultadoPartida(selecionJugador, pc) {
  if (selecionJugador == pc) {
    return EMPATE;
  }
  for (let partida of partidasPierde) {
    if (partida[0] == selecionJugador && partida[1] == pc) {
      return PIERDE;
    }
  }
  return GANA;
}

function mostrarJugada(jugada, eleccion){
    jugada.style.opacity = "1"
    jugada.children[0].src = `./imgs/${eleccion}.JPG`
    jugada.children[1].innerHTML = `${eleccion}`
}

function esconderElemento(elemento,tiempo){
    setTimeout(() => elemento.style.opacity = "0", tiempo||0);
}

function mostrarElemento(elemento){
    setTimeout(() => elemento.style.opacity = "1", TIEMPO*2);
}

function mostrarMensaje(resultado){
    mensaje.innerHTML = `${resultado}`
    setTimeout(() => mensaje.style.opacity = "1", TIEMPO);
    setTimeout(() => mensaje.style.opacity = "0", TIEMPO*2);
}

function actualizarPuntaje(resultado){
    setTimeout(() => {
        switch(resultado){
            case GANA :  puntos[0]++; break;
            case PIERDE :  puntos[1]++; break;
            default : break;
        }
        puntaje.innerHTML = `${puntos[0]}-${puntos[1]}`
    }, TIEMPO*2);
}

function reAgregarEventos(){
    setTimeout(() => agregarEventos(), TIEMPO*2)
}

function agregarEventos() {
    for (let seleccion of selecciones) {
        seleccion.addEventListener('click', iniciarRonda)
      }
}

function retirarEventos() {
    for (let seleccion of selecciones) {
        seleccion.removeEventListener('click',iniciarRonda)
      }
}

agregarEventos()

