
window.addEventListener('load', (event) => {
    ordenar();
    crearselect();
document.getElementById("codi").addEventListener("blur", (event) => {
    validarcodi();
});
document.getElementById("amplada").addEventListener("blur", (event) => {
    mides();
});
document.getElementById("llargada").addEventListener("blur", (event) => {
    mides();
});
document.getElementById("altura").addEventListener("blur", (event) => {
    mides();
});
document.getElementById("passadis").addEventListener("blur", (event) => {
    passadis();
});
document.getElementById("estanteria").addEventListener("blur", (event) => {
    estenteria();
});
document.getElementById("forat").addEventListener("blur", (event) => {
    forat();
});
document.getElementById("codipob").addEventListener("blur", (event) => {
    console.log("si");
    validarcodipob();
});
});



function ordenar(){
    let jocs = ["gta","minecraft","valorant","csgo","lol","call of duty","ark"];
    jocs.sort();
    var dropdown = document.createElement("select");
    for(let i=0;i<jocs.length;i++){     
        let opt = document.createElement("option"); 
        opt.text = jocs[i];
        opt.value = jocs[i];
        dropdown.options.add(opt);      
    }
    var container=document.getElementById("desplegable");
    container.appendChild(dropdown);
}


function getinput(id){
    return document.getElementById(id).value;
}


function cutjocchar(){
    let joc = document.getElementsByTagName('select')[0].value;
    joc = (joc.substring(0, 3));
    return joc;
}


function getchardesplegable(){
    let stringinput = getinput("codi");
    chardesplegable = (stringinput.substring(0, 3));
    return chardesplegable;
}


function validarnum(){
    regexpresion = new RegExp("^[-][0-9]{7}[-]$");
    let stringinput = getinput('codi').substring(3,12);
    if(stringinput.match(regexpresion)) {
        return true;      
    }else {
        return false;
     }
}


function calcular(){
    let num = getinput('codi').substring(4,11);
    return num % 10;

}


function charmod(){
    switch (calcular()){
        case 0:
            return "A";
        case 1:
            return "X";
        case 2:
            return "M";
        case 3:
            return "T";
        case 4:
            return "B";
        case 5:
            return "C";
        case 6:
            return "S";
        case 7:
            return "O";
        case 8:
            return "P";
        case 9:
            return "Z";
    }
}



function validarcodi(){
    if (getinput('codi').length == 13){ 
        if (getchardesplegable()==cutjocchar()){
            if (validarnum() === true){
                if (charmod() == getinput('codi').substring(12)){
                    document.getElementById("codiimg").src = "img/tick.png";
                    return true;
                } else{
                    document.getElementById("codiimg").src = "img/cross.png";
                    return false;    
                }
            }
        }
    } 
}


function mides(){
    regexpresion = new RegExp("^[0-9]+$");
    if((getinput("amplada").match(regexpresion)) && (getinput("llargada").match(regexpresion)) && (getinput("altura").match(regexpresion))) {
        resultat=getinput("amplada") + "x" + getinput("llargada") + "x" + getinput("altura");
        para = document.createElement("p");
        node = document.createTextNode(resultat);
        para.appendChild(node);
        element = document.getElementById("resultat");
        element.appendChild(para);
        return true;
    }else{
        return false;
    }

}


function passadis(){
    regexpresiond = new RegExp("^[P][-][0-9]{2}[-][DE]{1}$");
    if((getinput("passadis").match(regexpresiond))){
        document.getElementById("passimg").src = "img/tick.png";
        return true;
    } else{
        document.getElementById("passimg").src = "img/cross.png";
        return false;    
    }
}


function estenteria(){
    regexpresion = new RegExp("^[E][S][T][\+][0-9]{2}[.][0-9]{2}$");
    if(getinput("estanteria").match(regexpresion)){
        document.getElementById("estimg").src = "img/tick.png";
        return true;
    } else{
        document.getElementById("estimg").src = "img/cross.png";
        return false;    
    }
}


function forat(){
    regexpresion = new RegExp(/^[0-9]{2}\*[a-zA-Z]{3}\*[0-9]{2}\\[0-9]{2}$/);;
    if(getinput("forat").match(regexpresion)){
        document.getElementById("foratimg").src = "img/tick.png";
        return true;
    } else{
        document.getElementById("foratimg").src = "img/cross.png";
        return false;    
    }
}


function completar(){
    if((forat() === true) && (estenteria() === true) && (passadis() === true) && (mides() === true) && (validarcodi() === true)){
        document.getElementById("pfamilia").innerHTML = "Familia: "+ document.getElementsByTagName('select')[0].value;   
        document.getElementById("pcodi").innerHTML = "Codi: "+ getinput("codi");
        document.getElementById("pnom").innerHTML = "Nom: "+ getinput("nom");
        document.getElementById("pmides").innerHTML = "Mides: "+ getinput("mides");
        document.getElementById("ppassadis").innerHTML = "Passadis: "+ getinput("passadis");
        document.getElementById("pestenteria").innerHTML = "Estenteria: "+ getinput("estenteria");
        document.getElementById("pforat").innerHTML = "Forat: "+ getinput("forat"); 
    }
}

function creararray(){
 return poblacions = ["madrid","barcelona","malaga", "galicia","asturias","girona","alicante"];
}

function crearselect(){
    poblacions = creararray();
    poblacions.sort();
    var dropdown = document.createElement("select");
    for(let i=0;i<poblacions.length;i++){     
        let opt = document.createElement("option"); 
        opt.text = poblacions[i];
        opt.value = poblacions[i];
        dropdown.options.add(opt);      
    }
    var container=document.getElementById("localitzacio");
    container.appendChild(dropdown);
}


function validarcodipob(){
    if (getinput('codipob').length == 12){ 
        if (getchardesplegablepob()==cutpobchar()){
            console.log("getchardesplegable"); 
            if (validarnum() === true){
                    document.getElementById("codipobimg").src = "img/tick.png";
                    console.log("true");
                    return true;
                } else{
                    document.getElementById("codipobimg").src = "img/cross.png";
                    console.log("false");
                    return false;    
                }

            }else{
                console.log("fail");     
            }
    console.log("length == 12");    
        }
        console.log("false len");
    } 


function cutpobchar(){
    let poblacio = document.getElementsByTagName('select')[1].value;
    poblacio = (poblacio.substring(0, 5));
    console.log("cutpobchar", poblacio);
    return poblacio;
}


function getchardesplegablepob(){
    let stringinput = getinput("codipob");
    chardesplegable = (stringinput.substring(0, 5));
    console.log("getchardesplegablepob", chardesplegable);
    return chardesplegable;
}


function validarnum(){
    regexpresion = new RegExp("^[+][0-9]{3}[.][a-z]{2}$");
    let stringinput = getinput('codipob').substring(5,12);
    if(stringinput.match(regexpresion)) {
        return true;      
    }else {
        return false;
     }
}