window.onload=function start(){
bucle();
}


function bucle(){

  array = [];
  var estrella = new Estrella(Math.random() * 800,Math.random() * 400, 4);
  circle(estrella.x, estrella.y, estrella.radi);
  array.push(estrella);
    var estrella = new Estrella(Math.random() * 800,Math.random() * 400, 4);
  for ( i = 0; i < parseInt(localStorage.getItem('Estrelles')); i++){
    distancia = 0;
    for(j = 0; j < i; j++){
        if(((array[j].x -localStorage.getItem('Distancia')-array[j].radi > estrella.x+estrella.radi ) && (array[j].x+localStorage.getItem('Distancia')+array[j].radi < estrella.x-estrella.radi)) && ((array[j].y-localStorage.getItem('Distancia')-array[j].radi > estrella.y+estrella.radi) && (array[j].y+localStorage.getItem('Distancia')+array[j].radi < estrella.y-estrella.radi))){
          distancia = 1;        
        }else{
        }
    }
    circle(estrella.x, estrella.y, estrella.radi);
    var estrella = new Estrella(Math.random() * 800,Math.random() * 400, parseInt(localStorage.getItem('Radi')));
    array.push(estrella);

  }
}


function Estrella(x, y, radi) {
  this.x = x;
  this.y = y;
  this.radi = radi;
}

function circle(x, y, radi){

    var canvas = document.getElementById("nit"); 
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, radi, 0, Math.PI*2);
    context.stroke();
    context.globalAlpha = Math.random() * (1 - 0.1) + 0.1;;
    context.fillStyle = ColorCode();
    context.fill();    
  }

  function ColorCode() {
    var makingColorCode = '0123456789ABCDEF';
    var finalCode = '#';
    for (var counter = 0; counter < 6; counter++) {
      finalCode =finalCode+ makingColorCode[Math.floor(Math.random() * 16)];
    }
    if (finalCode == '#000000'){
      return ColorCode();
    }else{
      return finalCode;
    }
 }
