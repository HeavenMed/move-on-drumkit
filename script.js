'use strict';
var _a;
var sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
};
function criarDiv(texto) {
    var div = document.createElement('div');
    div.classList.add('key');
    div.textContent = texto;
    div.id = texto;
    document.getElementById('container').appendChild(div); //o o ! serve para mostrar que o elemento existe, independente do que o programe ache
}
var adicionarEfeito = function (letra) { var _a; return (_a = document.getElementById(letra)) === null || _a === void 0 ? void 0 : _a.classList.add('active'); };
var removerEfeito = function (letra) {
    var div = document.getElementById(letra);
    var removeActive = function () { return div.classList.remove('active'); };
    div.addEventListener('transitionend', removeActive);
};
var exibir = function (sons) { return Object.keys(sons).forEach(criarDiv); }; // esse método pega apenas as CHAVES , ou seja, as primeiras letras, e retorna um array com as letras
// em seguida, com o forEach, ele aplica a função criar div a cada objeto chave do array, criando uma div com cada letra
var tocarSom = function (letra) {
    var audio = new Audio(" ./sounds/".concat(sons[letra], " "));
    audio.play();
};
var ativarDiv = function (evento) {
    // click que será adicionado, e temos a função div, que irá captar um evento, e veja, do click, temos uma
    // série de elementos que são disponíveis, quando clicamos qualquer coisa no html, o 'click' evento nos fornece
    // inúmeras informações, inclusive o TARGET, que pode nos dar o ID do item clicado, é muito poderoso
    var letra = evento.type == 'click' ? evento.target.id : evento.key.toUpperCase();
    var letraPermitida = sons.hasOwnProperty(letra);
    if (letraPermitida) {
        adicionarEfeito(letra);
        tocarSom(letra);
        removerEfeito(letra);
    }
};
exibir(sons);
(_a = document.getElementById('container')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', ativarDiv);
window.addEventListener('keypress', ativarDiv);
