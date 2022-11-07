crearArticle();
crearTotal();


document.addEventListener("DOMContentLoaded", function(event) 
{
    localStorage.setItem("codi", 0);

})

function crearArticle() {
    const alonso = new Article('1414', 'Fernando Alonso', '1000');
    const sainz = new Article('5555', 'Carlos Saniz', '950');
    const max = new Article('1111', 'Max Verstappen', '1000');
    const checo = new Article('2390', 'Checo Perez', '750');
    const norris = new Article('4356', 'Lando Norris', '850');
    const ricciardo = new Article('7877', 'Daniel Ricciardo', '800');
    const stroll = new Article('1275', 'Lance Stroll', '500');
    const tsunoda = new Article('2197', 'Yuki Tsunoda', '650');
    const leclerc = new Article('4578', 'Charles Leclerc', '900');
    const latifi = new Article('2364', 'Nicolas Latifi', '850');
    array = [alonso, sainz, max, checo, norris, ricciardo, stroll, tsunoda, leclerc, latifi];
    localStorage.setItem("articles", JSON.stringify(array));
}
function crearFactura() {
    num =localStorage.getItem("numfactura");
    year =localStorage.getItem("year");
    varString = year+"/"+num;
    arry = [];
    localStorage.setItem(varString, arry);
}
function crearTotal(){
    localStorage.setItem("total", 0);
    localStorage.setItem("i", 0);
}

function numFactura(){
    valor =localStorage.getItem("numfactura");
    dt = new Date();
    year = dt.getFullYear();
    if ((valor == null) || (year !=  localStorage.getItem("year"))){
        localStorage.setItem("numfactura", 1);
    }else{
        numero = localStorage.getItem("numfactura");
        numero = parseInt(numero) + 1
        localStorage.setItem("numfactura", numero);
    }
    localStorage.setItem("year", year);
}

function cambiarNumFactura(){
    document.getElementById('codifactura').innerHTML = localStorage.getItem("year")+"/"+localStorage.getItem("numfactura");
}    





function getSelectValue(){
    let article = document.getElementsByTagName('select')[0].value;
    return article;
}
function getSelectPosition(){
    let article = document.getElementsByTagName('select')[0].selectedIndex;
    return article;
}



function getCodi(){
    articles = JSON.parse(localStorage.getItem("articles") || "[0]");
    return articles[getSelectPosition()].codi;
}

function getNom(){
    articles = JSON.parse(localStorage.getItem("articles") || "[0]");
    return articles[getSelectPosition()].nom;
}

function getPreu(){
    articles = JSON.parse(localStorage.getItem("articles") || "[0]");
    return articles[getSelectPosition()].preu;
}


function getQuantitat(){
    i = localStorage.getItem("i");
    if(localStorage.getItem("codi")==0){
        factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
        }else{
            factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
        }
    return Number(factura[i].quantitat);
}

function getTotal(){
    i = localStorage.getItem("i");
    if(localStorage.getItem("codi")==0){
        factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
        }else{
            factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
        }
    valor = factura[i].total;
    return valor;
}




/*
*
*
Objects
*
*/

function Article(codi, nom, preu) {
    this.codi = codi;
    this.nom = nom;
    this.preu = preu;
  }

function Articlefac(codi, nom, quantitat, preu, total) {
    this.codi = codi;
    this.nom = nom;
    this.quantitat = quantitat;
    this.preu = preu;
    this.total = total;
  }

function editarFactura(){
    i = localStorage.getItem("i");
    if(localStorage.getItem("codi")==0){
        factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
        }else{
            factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
        }
    valor1 = parseInt(factura[i].preu);
    valor2 = parseInt(factura[i].total);
    factura[i].total = Number(valor1 + valor2);
    factura[i].quantitat = factura[i].quantitat + 1;
    localStorage.setItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura"), JSON.stringify(factura));
}

function omplirFactura(){
    if(localStorage.getItem("codi")==0){
    factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
    }else{
        factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
    }
    codi = getCodi();
    nom = getNom();
    preu = getPreu();
    i = localStorage.getItem("i");
    if(factura == undefined){
        factura = (new Articlefac(codi, nom, 1, preu, preu));
    }else{
    factura.push(new Articlefac(codi, nom, 1, preu, preu));
    }

    if(localStorage.getItem("codi")==0){
            localStorage.setItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura"), JSON.stringify(factura));
        }else{
            localStorage.setItem(localStorage.getItem(document.getElementById("cfactura").value), JSON.stringify(factura));
        }

}

function comprobarDup(){
    if(localStorage.getItem("codi")==0){
        factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
        }else{
            factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
        }
    codi = getCodi();
    for (i = 0; i < factura.length; i++) {
    if (factura[i].codi == codi ){
        localStorage.setItem("i", i);
        editarFactura();
        calcularTotal(i);
        return true;
    }
    }
    localStorage.setItem("i", factura.length);
    omplirFactura();
    calcularTotal(i);
    return false;
}

function addRow(){
    if (localStorage.getItem("total") == 0){
    numFactura();
    crearFactura();
cambiarNumFactura();
    }
        var table = document.getElementById("taula");
        var index = getSelectValue(); 
            i = localStorage.getItem("i");             
    if(comprobarDup()){

        p = parseInt(i)+1;
        document.getElementById(index).value = getQuantitat();
        document.getElementById("taula").rows[p].cells[4].innerHTML = getTotal();
    }else{
        
        var input = '<button onclick=restar(this.id) id="'+index+'-">-</button><input type="number" id="'+index+'" value=1><button onclick=sumar(this.id) id="'+index+'+">+</button>';
      var row = document.createElement("tr");
      var cell0 = document.createElement("td");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      row.id = getNom();
      cell0.innerHTML = getCodi();
      cell1.innerHTML = getNom();
      cell2.innerHTML = input ;
      cell3.innerHTML = getPreu();
      cell4.innerHTML = getPreu();
      row.appendChild(cell0);
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      table.appendChild(row);
       getTotal(); 
    }
}




function calcularTotal(i){
    factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
    preu = factura[i].preu;
    total = localStorage.getItem("total");
    total = parseInt(total) + parseInt(preu);
    localStorage.setItem("total", total);
    document.getElementById("total").innerHTML = "Total " + total;
    calcularIVA(total);
    calcularTotalIVA(total);
}

function calcularIVA(total){
iva = total * 0.21;
document.getElementById("iva").innerHTML = "IVA " + iva;
}
function calcularTotalIVA(total){
    iva = total + (total * 0.21);
    document.getElementById("totaliva").innerHTML = "Total amb IVA " + iva;
}


function recuperar(){
    codi = document.getElementById("cfactura").value;
    localStorage.setItem('codi', codi)
    if(localStorage.getItem('codi') == undefined){
        window.alert("codi incorreecte");
    }else{
        updaterow();
    }

}

function updaterow(){
    codi = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
            var table = document.getElementById("taula");
    localStorage.setItem('i', codi.length);
    for (let pos = 0; pos < codi.length; pos++) {
        var input = '<input type="number" id="'+codi[pos].nom+'" value='+codi[pos].quantitat+'>';
      var row = document.createElement("tr");
      var cell0 = document.createElement("td");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      row.id = codi[pos].nom;
      cell0.innerHTML = codi[pos].codi;
      cell1.innerHTML = codi[pos].nom;
      cell2.innerHTML = input ;
      cell3.innerHTML = codi[pos].preu;
      cell4.innerHTML = codi[pos].quantitat;
      row.appendChild(cell0);
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      table.appendChild(row);


        
    }
}

function restar(id){
    if(localStorage.getItem("codi")==0){
        factura = JSON.parse(localStorage.getItem(localStorage.getItem("year")+"/"+localStorage.getItem("numfactura")) || "[]");
        }else{
            factura = JSON.parse(localStorage.getItem(document.getElementById("cfactura").value));
        } 
}