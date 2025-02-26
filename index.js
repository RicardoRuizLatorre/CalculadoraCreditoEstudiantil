
/*******************Funciones******************/

/*Identifica si el boton oprimido es el de la suma*/
var calcular = function (){
    console.log("El usuario oprime el boton Calcular");
    var nombreEstudiante = document.getElementById("idNombre").value;
    var valorAFinanciar = document.getElementById("idValorAFinanciar").value;
    var tasaInteresMensualPorcentaje = document.getElementById("idTasaInteres").value;
    var numeroCuotas = document.getElementById("idNumeroCuotas").value;

    var valorTasaInteres = tasaInteresMensualPorcentaje / 100;
   
    /* Identificacion de datos ingresados*/
    console.log("Nombre del estudiante: " + nombreEstudiante);

    valorAFinanciar = parseFloat (valorAFinanciar);
    tasaInteresMensual = parseFloat (tasaInteresMensualPorcentaje);

    let valorAFinanciarFormato = Number(valorAFinanciar).toLocaleString("es-ES");
   document.getElementById("idValorAFinanciar").value = ('$'+ valorAFinanciarFormato);


    console.log("Valor a financiar: " + valorAFinanciarFormato);
    console.log("Tasa de interes: " + tasaInteresMensualPorcentaje);
    console.log("numeroCuotas: " + numeroCuotas);

    // Formula para el calculo de cuotas
    // cuota=(valor a financiar)/((1-(1 + tasa)^-cuotas))/(tasa))

    var valorCuota = (valorAFinanciar) / ((1 - (1 + (valorTasaInteres))**((-1)*(numeroCuotas)))/valorTasaInteres);
    console.log("Valor de la cuota: " + valorCuota);

    



}







