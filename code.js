const spreadsheetId   = '1vPURY3HKE9GB9gOz5-_oCsrW89VW_aBR42BK3GzOYB0';
const ss = SpreadsheetApp.openById(spreadsheetId);

function doGet(e){  
  return HtmlService.createTemplateFromFile("main").evaluate()
  .setTitle("Gas Registro")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function loadPartialHTML_(partial) {
   const htmlServ =HtmlService.createTemplateFromFile(partial);  
   return htmlServ.evaluate().getContent();
}

function loadAddView(){
 return loadPartialHTML_("index");

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////                           Add Record Func                                            /////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCalendar(){
  /*
   //get disable days and full booked days
  const ws = ss.getSheetByName("data");
  const data = ws.getRange(2,1,ws.getLastRow()-1,7).getValues();
  let disableDays = []

  data.forEach(function(a){
    if(a[1] == "holiday"){
      let moddate = a[4].split("/")[2]+"/"+a[4].split("/")[1]+"/"+a[4].split("/")[0]
      disableDays.push(
        new Date(moddate).setHours(0,0,0,0)        
      )
    }
  })

  let countQ = []; 

  data.forEach(function(b){ 
    if(b[1] != "holiday"){ 
     countQ.push([
        b[4], //date        
        countIF(data,4,b[4])
     ])
    } 
  })

  countQ.forEach(function(c){    
    if(c[1] >= 4){ //max 4 person for 1 day, 9:00 = 2 person, 10:00 = 2 person
      let fullqdate = c[0].split("/")[2]+"/"+c[0].split("/")[1]+"/"+c[0].split("/")[0]
      disableDays.push(
        new Date(fullqdate).setHours(0,0,0,0)        
      )
    }
  })

  let uniqueDays = [];

  disableDays.forEach(function(d){
      if(uniqueDays.indexOf(d) === -1){         
         uniqueDays.push(d);      
      }
  });

  let curUniqueDays = [];
  let currentDate = new Date()
  let currentDate2 = new Date(currentDate).setHours(0,0,0,0)

  uniqueDays.forEach(function(e){
     if(new Date(e) >= currentDate2){
       curUniqueDays.push(e)
     }
  })

  //Logger.log(uniqueDays);
  return curUniqueDays;
  */
}

function getFullQ(userdate){ //get full Q time
  //userdate = "22/4/2022"
  const ws = ss.getSheetByName("data");
  const data = ws.getRange(2,1,ws.getLastRow()-1,7).getValues();
  let countQ = [];
  let fullQ = [];

  data.forEach(function(a){ 
    if(a[4] == userdate && a[1] != "holiday"){ 
     countQ.push([        
        a[5], //time         
        countIFS2(data,4,a[4],5,a[5]) 
     ])
    } 
  })

  countQ.forEach(function(b){
    if(b[1] >= 2){ //max 2 person per time, 9:00 = 2 person, 10:00 = 2 person
     fullQ.push(b[0])
    }

  })

  let uniqueFullQ = [];

  fullQ.forEach(function(d){
      if(uniqueFullQ.indexOf(d) === -1){         
         uniqueFullQ.push(d);      
      }
  });

  //Logger.log(uniqueFullQ);
  return uniqueFullQ;
}

function consultaMonto(litro,precio){
var pago = (litro*precio)/1.16;
pago = +pago.toFixed(2);
return pago;
}

function consultaIva(litro,precio){
let pago = ((litro*precio)/1.16).toFixed(2);
let sinIvan = (litro*precio).toFixed(2);
let ivaUno = (sinIvan-pago);
ivaUno = +ivaUno.toFixed(2);
return ivaUno;
}

function consultaNeto(litro,precio){
let neto = (litro*precio);
neto = +neto.toFixed(2);
return neto;
}

function consultaRend(kiloRecorridos,litro){
let rend = (kiloRecorridos/litro);
rend = +rend.toFixed(2);
return rend;
}

function consultaKmRec(km,kiloAnterior){
let kmreco = km-kiloAnterior;
return kmreco;
}

function ultimoRegistro(){
  const spreadsheetId   = '1dr-_j6O3kAuY3JZ_4DoQauEL8954SljDVlvabz1T_7A';
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const ws = ss.getSheetByName("Gasolina 464");
  var ultimoRegistro = ws.getLastRow();
  let kiloAnt = ws.getRange(ultimoRegistro-1,5).getValue();
  Logger.log(kiloAnt);
}

function addNewRow(rowData) {  
    
  /*
  *
  Gasolina 464
  */
  var placas ="";
  var camioneta ="";
  var hojaUnidad ="";
  switch (rowData.car){
    case "464":
      placas = "SN42975";
      camioneta = "27-H044";
      hojaUnidad = "Gasolina 464";
      break;
     case "430":
      placas = "SM74929";
      camioneta = "027-G020";
      hojaUnidad = "Gasolina 430";
      break;
    case "742":
      placas = "SN39588";
      camioneta = "27-H068";
      hojaUnidad = "Gasolina 742";
      break;
    case "767":
      placas = "SN39476";
      camioneta = "27-H077";
      hojaUnidad = "Gasolina 767";
      break;
    case "772":	
      placas = "SN52491";
      camioneta = "027-H079";
      hojaUnidad = "Gasolina 772";
      break;
    case "913":	
      placas = "TWU266A";
      camioneta = "027-PF034";
      hojaUnidad = "Gasolina 913";
      break;
    default :
      placas = "Error";
      camioneta = "Error";
      hojaUnidad = "ERRORES";
    break;
  }
 
  const ws = ss.getSheetByName(hojaUnidad);
  var ultimoRegistro  = ws.getLastRow();
  var kiloAnterior    = ws.getRange(ultimoRegistro,5).getValue();
  var monton          = consultaMonto(rowData.litro,rowData.precio);
  var iva             = consultaIva(rowData.litro,rowData.precio);
  var neto            = consultaNeto(rowData.litro,rowData.precio);
  var kiloRecorridos  = consultaKmRec (rowData.km,kiloAnterior);
  var rendimiento     = consultaRend  (kiloRecorridos,rowData.litro);
  /*
  *Logger.log(kiloAnterior);
  *const newID = uniqueId();
  */
  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

      ws.appendRow([/*newID(),*/
                    output,
                    placas,
                    rowData.user,
                    camioneta,
                    rowData.km,
                    rowData.litro = +rowData.litro *1,
                    rowData.precio = +rowData.precio *1,
                    monton,
                    iva,
                    neto,
                    kiloRecorridos,
                    rendimiento,
                    "",
                    "",
                    String(date.getMonth() + 1).padStart(2, '0'),
                    date.getFullYear()                    
                    ]);
      return "success";
     
}