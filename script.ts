'use strict';
const sons = {
    'A' : 'boom.wav',
    'S' : 'clap.wav',
    'D' : 'hihat.wav',
    'F' : 'kick.wav',
    'G' : 'openhat.wav',
    'H' : 'ride.wav',
    'J' : 'snare.wav',
    'K' : 'tink.wav',
    'L' : 'tom.wav'
    
}

type indexes  = 'A' | 'S' | 'D' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' // estamos criando um tipo que varia somente entre
// as strings de A até L em maiúsculo

function criarDiv(texto: string) {
    const div = document.createElement('div'); // criamos um elemento div, apenas
    div.classList.add('key'); // atribuimos ao elemento div uma classe chamada key
    div.textContent = texto; // atribuimos um texto a esse div.key
    div.id = texto; // atribuimos um id a essa div
    document.getElementById('container')!.appendChild(div); //o o ! serve para mostrar que o elemento existe, independente do que o programe ache
     // nesse código acima, fixamos a div criada como FILHA do elemento container na página html, como subproduto deste
}


const adicionarEfeito = (letra : indexes) => document.getElementById(letra)?.classList.add('active')
// esse code acima adiciona um efeito da classe active a div, veja no style.css esse .active.

const removerEfeito = (letra : indexes) => {
    const div = document.getElementById(letra);
    const removeActive = () => div!.classList.remove('active');
    div!.addEventListener('transitionend' , removeActive)
}

const exibir = (sons : Object) => Object.keys(sons).forEach(criarDiv);   // esse método pega apenas as CHAVES , ou seja, as primeiras letras, e retorna um array com as letras
  // em seguida, com o forEach, ele aplica a função criar div a cada objeto chave do array, criando uma div com cada letra


const tocarSom = (letra : indexes) => {
    const audio = new Audio(` ./sounds/${sons[letra]} ` );
    audio.play();
} 

const ativarDiv = (evento : any ) => {    // veja, lá em baixo temos um addEventListener, nele temos o evento
    // click que será adicionado, e temos a função div, que irá captar um evento, e veja, do click, temos uma
    // série de elementos que são disponíveis, quando clicamos qualquer coisa no html, o 'click' evento nos fornece
    // inúmeras informações, inclusive o TARGET, que pode nos dar o ID do item clicado, é muito poderoso


    const letra : indexes = evento.type == 'click' ? evento.target.id : evento.key.toUpperCase();

    const letraPermitida : boolean = sons.hasOwnProperty(letra)

    if( letraPermitida){
        adicionarEfeito(letra);
        tocarSom(letra);
        removerEfeito(letra);
    }
    
} 




exibir(sons)
document.getElementById('container')?.addEventListener('click' , ativarDiv)

window.addEventListener('keypress' , ativarDiv)
// perceba que a div, o body ou main nao tem poder para perceber keypress ( teclas ativadas), por isso usamos
//o window, que é o objeto pai-de-todos, e adicionamos um evento a ele, o clicar a tecla, perceba uma coisa
// ao adicionar esse elemento, ao clicar, mandamos uma série de informações para o callback logo em seguida
// é enviado o target, mas este não define nada, ao contrário do target enviado do click de divs e containers
// o target do windows sempre aponta para o BODY, por isso, é inútil, por isso usamos o valor 'key' , que é suficiente
// para usarmos para a tecla