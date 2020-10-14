// Atribui uma posição para a maçã
function getPosFruta(min, max) {
    'use strict';
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
// Variáveis de controle
var p = document.querySelector("p");
var frutaP = document.getElementsByTagName("p")[1];

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
    teclaBkp = 0,
    movimentos = 10,
    contador = 0,
    mover = "",
    f1 = getPosFruta(0, 290),
    f2 = getPosFruta(0, 140);

// cria snake e maçã 
var ca = document.querySelector("canvas").getContext("2d");
var fruta = document.querySelector("canvas").getContext("2d");
ca.fillStyle = "blue";
ca.fillRect(a, b, c, d);
fruta.fillStyle = "red";
fruta.fillRect(f1, f2, c, d);

// Evento que escuta teclas pressionadas
// Ao clicar chama função acao passando o código da tecla como parâmetro
document.querySelector("body").addEventListener("keydown", (e) => acao(e.keyCode));

// Responsável pelo movimento
function intervalo(n) {
  mover = setInterval(function() {
    movimenta(n)
  }, 120);
}

// Controle
function acao(e) {
  if (teclaBkp != e) {
    teclaBkp = e;
    clearInterval(mover);
    if (e >= 37 && e <= 40) {
      intervalo(e);
    }
  }
}

// Compara teclas e incrementa posição para fazer o movimento
// linha 91 tem a descrição das teclas
function movimenta(e) {

  if (e == 37 && a > 0) {
    a -= movimentos;
  }
  if (e == 38 && b > -1) {
    b -= movimentos;
    if (b < -1)
      b = 0;
  }
  if (e == 39 && a < 291) {
    a += movimentos;
    if (a > 290)
      a = 290;
  }
  if (e == 40 && b < 141) {
    b += movimentos;
    if (b > 140)
      b = 140;
  }
  if ((a <= 0 && e == 37) ||
    (a >= 290 && e == 39) ||
    (b <= 0 && e == 38) ||
    (b >= 140 && e == 40)) {
    clearInterval(mover);
  }
    if(e==37){
        tecla = "esquerda";    
    }else if(e==38){
        tecla = "pra cima";    
    }else if(e==39){
        tecla = "direita";    
    }else if(e==40){
        tecla = "pra baixo";    
    }
  p.innerHTML = "<br>Blocos percorridos: " + (contador += 1);
  p.innerHTML += "<br>azul x: " + a;
  p.innerHTML += "<br>azul y: " + b;
  p.innerHTML += "<br>tecla: " + tecla;
  limpa();
  ca.fillStyle = "blue";
  ca.fillRect(a, b, c, d);
}

// limpa toda tela e desenha snake e maçã
function limpa() {
  ca.clearRect(0, 0, 300, 150);
  if (a+10 >= f1 && a <= f1 + 9 && b <= f2+9 && b+9 >= f2) 
  {
    f1 = getPosFruta(0, 290);
    f2 = getPosFruta(0, 140);
  } else {
    fruta.fillStyle = "red";
    fruta.fillRect(f1, f2, c, d);
  }
frutaP.innerHTML = "maçã x: " + f1;
frutaP.innerHTML += "<br>maçã y: " + f2;

}
// testes em:
//https://jsfiddle.net/renan_chaparro/xg3r6qjw/
