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
var fast = document.getElementById("fast");
var medium = document.getElementById("medium");
var slowly = document.getElementById("slowly");
var colorSnake = document.getElementById("colorSnake").value;
var colorFruit = document.getElementById("colorFruit").value;
// a,b,c,d = pontos para desenhar snake
// e = evento é a tecla clicada
// teclaBkp = Controle que evita pressionar teclado e bugar código
// contador = quantidade de movimentos
// mover = controle dos movimentos repetitivos (setInterval)
// f1, f2 = posição aleatória da maçã
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
    contInicioDeFase = 4,
    f1 = getPosFruta(0, 290),
    f2 = getPosFruta(0, 140),
    pontos = 0,
    totalPontos = 0,
    pontosPorFase = 6,
    velocidade = 120;

// cria snake e maçã 
var ca = document.querySelector("canvas").getContext("2d");
var fruta = document.querySelector("canvas").getContext("2d");
function pontoInicial() {
    'use strict';
    clearInterval(mover);
    a = 10;
    b = 10;
    c = 10;
    d = 10;
    ca.fillStyle = colorSnake;
    ca.fillRect(a, b, c, d);
    fruta.fillStyle = colorFruit;
    fruta.fillRect(f1, f2, c, d);
}

function mensagem(msg = null) {
    if(msg == null) {
        sp.innerHTML = "Level " + fase + " wait: " + contInicioDeFase;    
    } else {
        sp.innerHTML = msg;
    }
    sc.textContent = "Score: " + (totalPontos * 100);
}

// limpa toda tela e desenha snake e maçã
function limpa() {
    'use strict';
    ca.clearRect(0, 0, 300, 150);
    if (a + 10 >= f1 && a <= f1 + 9 && b <= f2 + 9 && b + 9 >= f2) {
        teclaBkp = 0;
        f1 = getPosFruta(0, 290);
        f2 = getPosFruta(0, 140);
        pontos += 1;
        if (pontos === pontosPorFase) {
            proximaFase();
        }
    } else {
        fruta.fillStyle = colorFruit;
        fruta.fillRect(f1, f2, c, d);
    }
}


// Compara teclas e incrementa posição para fazer o movimento
// linha 91 tem a descrição das teclas
function movimenta(e) {
    'use strict';
    if (e === 37 && a > 0) {
        a -= movimentos;
    }
    if (e === 38 && b > -1) {
        b -= movimentos;
        if (b < -1) {
            b = 0;
        }
    }
    if (e === 39 && a < 291) {
        a += movimentos;
        if (a > 290) {
            a = 290;
        }
    }
    if (e === 40 && b < 141) {
        b += movimentos;
        if (b > 140) {
            b = 140;
        }
    }
    if ((a <= 0 && e === 37) ||
            (a >= 290 && e === 39) ||
            (b <= 0 && e === 38) ||
            (b >= 140 && e === 40)) {
        clearInterval(mover);
    }
    limpa();
    ca.fillStyle = colorSnake;
    ca.fillRect(a, b, c, d);
}

// Responsável pelo movimento
function intervalo(n) {
    'use strict';
    mover = setInterval(function () {
        movimenta(n);
    }, velocidade);
}

// Controle
function acao(event) {
    'use strict';
    e = event.keyCode;
    if (teclaBkp !== e) {
        teclaBkp = e;
        clearInterval(mover);
        if (e >= 37 && e <= 40) {
            intervalo(e);
        }
    }
}

// Início Fase
function inicioFase() {
    'use strict';
    mensagem();
    contInicioDeFase -= 1;
    if (contInicioDeFase === -1) {
        mensagem("Go!!!!");
        clearInterval(tempo);
        contInicioDeFase = 4;
        iniciarJogo();
    }
}

// Função próxima fase
function proximaFase() {
    'use strict';
    clearInterval(mover);
    if(fase === numeroFases) {
        mensagem("YOU WIN");
        sp.style.color="green";
        resetarJogo();
    } else {
        escutaTecla.removeEventListener("keydown", acao);
        totalPontos += pontos;
        pontos = 0;
        fase += 1;
        // Reiniciar do ponto inicial
        pontoInicial();
        // Aumentar velocidade
        velocidade -= 10;
        // Decrementar contador para início da próxima fase
        tempo = setInterval(inicioFase, 600);    
    }
}

function getVelocidade() {
    if(fast.hasAttribute("data-velocidade")) {
       return 50;
    } else if(medium.hasAttribute("data-velocidade")) {
        return 100;
    } else if(slowly.hasAttribute("data-velocidade")) {
        return 400;
    }
}

// Evento que escuta teclas pressionadas
// Ao clicar chama função acao passando o código da tecla como parâmetro
function iniciarJogo() {
    'use strict';
    mensagem("Go!!!");
    velocidade = getVelocidade();
    pontosPorFase = parseInt(document.getElementById("pontos").value);
    numeroFases = parseInt(document.getElementById("fases").value);
    escutaTecla.addEventListener("keydown", acao);    
    colorSnake = document.getElementById("colorSnake").value;
    colorFruit = document.getElementById("colorFruit").value;
}
function resetarJogo() {
    clearInterval(mover);
    escutaTecla.removeEventListener("keydown", acao);
    fase = 0;
    pontos = 0;
    limpa();
    pontoInicial();    
}
pontoInicial();
function selecionaBadge(event) {
    fast.removeAttribute("class, data-velocidade");
    medium.removeAttribute("class, data-velocidade");
    slowly.removeAttribute("class, data-velocidade");
    fast.removeAttribute("data-velocidade");
    medium.removeAttribute("data-velocidade");
    slowly.removeAttribute("data-velocidade");
    fast.setAttribute("class", "badge badge-pill badge-secondary");
    medium.setAttribute("class", "badge badge-pill badge-secondary");
    slowly.setAttribute("class", "badge badge-pill badge-secondary");
    event.target.removeAttribute("class");
    event.target.setAttribute("class", "badge badge-pill badge-success");
    event.target.setAttribute("data-velocidade", "1");
}
function trocaCor() {
    colorSnake = document.getElementById("colorSnake").value;
    colorFruit = document.getElementById("colorFruit").value;
    limpa();
    pontoInicial();
}
fast.addEventListener("click",selecionaBadge);
medium.addEventListener("click",selecionaBadge);
slowly.addEventListener("click",selecionaBadge);
// testes em:
//https://jsfiddle.net/renan_chaparro/xg3r6qjw/
