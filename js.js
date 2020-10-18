// Atribui uma posição para a maçã
function getPosFruta(min, max) {
    'use strict';
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
// Variáveis de controle
var sp = document.querySelector("p");
var sc = document.querySelectorAll("p.titulo_topo_canvas")[1];
var escutaTecla = document.querySelector("body");
var colorSnake = document.getElementById("colorSnake").value;
var colorFruit = document.getElementById("colorFruit").value;
// a,b,c,d = pontos para desenhar snake
// e = evento é a tecla clicada
// teclaBkp = Controle que evita pressionar teclado e bugar código
// contador = quantidade de movimentos
// mover = controle dos movimentos repetitivos (setInterval)
// f1, f2 = posição aleatória da maçã
var teclaPressionada = 0;
var a = 10,
    b = 10,
    c = 10,
    d = 10,
    e = 0,
    tecla = "",
    teclaBkp = 0,
    movimentos = 10,
    contador = 0,
    mover = "",
    numeroFases = 10,
    fase = 1,
    tempo = 0,
    progressBar = 0,
    f1 = getPosFruta(0, 290),
    f2 = getPosFruta(0, 140),
    pontos = 0,
    totalPontos = 0,
    qntFrutasComidas = 0,
    pontosPorFase = 6,
    velocidade = 120, 
    snake = [],
    snakeTecla = [],
    larguraCanvas = 290,
    alturaCanvas = 140,
    aumentoDeVelocidade = 10,
    chaveBloqueio = false;
    snake[qntFrutasComidas] = {"a":10,"b":10};
    // Objeto Snake
    snakeTecla[37] = {defineRota: function(){
        snake[0].a -= ((snake[0].a > 0) ? movimentos : larguraCanvas);
        snake[0].a=Math.abs(snake[0].a)}};
    snakeTecla[38] = {defineRota: function(){
        snake[0].b -= ((snake[0].b > 0) ? movimentos : alturaCanvas);
        snake[0].b = Math.abs(snake[0].b);}};
    snakeTecla[39] = {defineRota: function(){
        snake[0].a += ((snake[0].a < larguraCanvas) ? movimentos : -larguraCanvas);}};
    snakeTecla[40] = {defineRota: function(){
        snake[0].b += (snake[0].b < alturaCanvas) ? movimentos : -alturaCanvas;}};

// cria snake e maçã 
var ca = document.querySelector("canvas").getContext("2d");
var fruta = document.querySelector("canvas").getContext("2d");
function pontoInicial() {
    'use strict';
    clearInterval(mover);
    snake.splice(1,snake.length);
    snake[0].a = 10;
    snake[0].b = 10;
    desenhaSnake();
    desenhaFruta();
}
function desenhaFruta() {
    fruta.fillStyle = colorFruit;
    fruta.fillRect(f1, f2, c, d);
}
function desenhaSnake() {
    ca.fillStyle = colorSnake;
    for(let i = 0; i <= qntFrutasComidas; i++){
        ca.fillRect(snake[i].a, snake[i].b, c, d);
    }
}

function mensagem(msg) {
    'use strict';
    if(msg !== undefined)
    sp.innerHTML = msg;
    sc.innerHTML = "Score: " + (totalPontos * 100);
}

// limpa toda tela e desenha snake e maçã
function limpa() {
    'use strict';
    ca.clearRect(0, 0, 300, 150);
}
function montaCorpo(e){
    if(!qntFrutasComidas) return;
    let i = 0;
    do {
        var tempx = snake[i+1].a;
        var tempy = snake[i+1].b;
        snake[i+1].a = a;
        snake[i+1].b = b;
        a = tempx;
        b = tempy;
        i += 1;
    } while (i < qntFrutasComidas);    
}
function verificaSeCobraComeuFruta(e) {
    if (snake[0].a + 10 >= f1 && snake[0].a <= f1 + 9 
        && snake[0].b <= f2 + 9 && snake[0].b + 9 >= f2) {
        f1 = getPosFruta(0, 290);
        f2 = getPosFruta(0, 140);
        pontos += 1;
        totalPontos += 1;
        qntFrutasComidas += 1;   
        snake[qntFrutasComidas] = {a,b};
        sc.textContent = "Score: " + (totalPontos * 100);
        mensagem("&#x1F40D; &#x1F34E;");
    }
}
// Movimenta de acordo com tecla digitada
function movimenta(teclaPressionada) {
    'use strict';
    a = snake[0].a;
    b = snake[0].b;
    snakeTecla[teclaPressionada].defineRota();
    limpa();
    verificaSeCobraComeuFruta(teclaPressionada);
    montaCorpo(teclaPressionada);
    desenhaSnake();
    desenhaFruta();
    chaveBloqueio = false;
}

// Responsável pelo movimento
function intervalo(teclaPressionada) {
    'use strict';
    mover = setInterval(function () {
        movimenta(teclaPressionada);
    }, velocidade);
}

// Controle
function acao(event) {
    'use strict';
    teclaPressionada = event.keyCode;
    if (teclaBkp !== teclaPressionada) {
        if((teclaBkp === 37 && teclaPressionada === 39) || (teclaBkp === 39 && teclaPressionada === 37)) return;
        if((teclaBkp === 38 && teclaPressionada === 40) || (teclaBkp === 40 && teclaPressionada === 38)) return;
        if(chaveBloqueio === false){
            teclaBkp = teclaPressionada;
            clearInterval(mover);
            if (teclaPressionada >= 37 && teclaPressionada <= 40) {
                chaveBloqueio = true;
                intervalo(teclaPressionada);
            }    
        }
        
    }
}

function getPosEmoji(max) {
    'use strict';
    var min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getEmojiVencedor() {
    'use strict';
    var rostos = ['&#x1F607;', '&#x1F60D;', '&#x1F60E;',
                  '&#x1F618;', '&#x1F61C;', '&#x1F942;',
                  '&#x1F947;', '&#x1F948;', '&#x1F949;'];
    var pos = getPosEmoji(rostos.length);
    return rostos[pos];
}
function getEmojiPontos() {
    'use strict';
    var rostos = ['&#x1F600;', '&#x1F601;', '&#x1F603;', '&#x1F604;',
                  '&#x1F609;', '&#x1F60A;', '&#x1F60B;', '&#x1F60F;',
                  '&#x1F617;', '&#x1F61B;', '&#x1F61D;', '&#x1F502;',
                  '&#x1F504;', '&#x1F51D;', '&#x1F525;', '&#x1F64C;'];
    var pos = getPosEmoji(rostos.length);
    return rostos[pos];
}

function escutarTeclado() {
    escutaTecla.addEventListener("keydown", acao);
}
function pararDeEscutarTeclado() {
    escutaTecla.removeEventListener("keydown", acao);
}

// Evento que escuta teclas pressionadas
// Ao clicar chama função acao passando o código da tecla como parâmetro
function iniciarJogo() {
    'use strict';
    mensagem("&#x1F449; &#x1F3AE; Move arrow!");
    escutarTeclado();
    colorSnake = document.getElementById("colorSnake").value;
    colorFruit = document.getElementById("colorFruit").value;
    sc.textContent = "Score: ";
    fase = 0;
    pontos = 0;
    velocidade = 120;
    qntFrutasComidas = 0;
    totalPontos = 0;
    teclaBkp = 0;
    limpa();
    pontoInicial();
}
// Inicia programa desenhando snake e fruta
pontoInicial();
function trocaCor(e) {
    'use strict';
    e.preventDefault();
    colorSnake = document.getElementById("colorSnake").value;
    colorFruit = document.getElementById("colorFruit").value;
}
// testes em:
//https://jsfiddle.net/renan_chaparro/xg3r6qjw/
function getEmojiSad() {
    'use strict';
    var rostos = ['&#x1F926;', '&#x1F937;', '&#x1F637;', '&#x1F648;',
                  '&#x1F649;', '&#x1F602;', '&#x1F605;', '&#x1F606;',
                  '&#x1F608;', '&#x1F60C;', '&#x1F610;', '&#x1F611;',
                  '&#x1F612;', '&#x1F613;', '&#x1F614;', '&#x1F615;',
                  '&#x1F616;', '&#x1F61E;', '&#x1F61F;', '&#x1F620;',
                  '&#x1F621;'];
    var pos = getPosEmoji(rostos.length);
    return rostos[pos];
}