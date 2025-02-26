/******************* Funciones ******************/

/* Función para calcular la cuota del crédito estudiantil */
var calcular = function () {
    console.log("El usuario oprime el botón Calcular");

    var nombreEstudiante = document.getElementById("idNombre").value;
    var valorAFinanciar = document.getElementById("idValorAFinanciar").value;
    var tasaInteresMensualPorcentaje = document.getElementById("idTasaInteres").value;
    var numeroCuotas = document.getElementById("idNumeroCuotas").value;

    // Eliminar caracteres no numéricos del valor a financiar
    valorAFinanciar = valorAFinanciar.replace(/[^0-9.]/g, "");

    // Validaciones
    if (!nombreEstudiante.trim()) {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    if (!valorAFinanciar || isNaN(valorAFinanciar) || valorAFinanciar <= 0) {
        alert("Por favor, ingrese un valor válido a financiar.");
        return;
    }
    if (!tasaInteresMensualPorcentaje || isNaN(tasaInteresMensualPorcentaje) || tasaInteresMensualPorcentaje <= 0) {
        alert("Por favor, ingrese una tasa de interés válida.");
        return;
    }
    if (!numeroCuotas) {
        alert("Por favor, seleccione el número de cuotas.");
        return;
    }

    // Conversión de valores a número
    valorAFinanciar = parseFloat(valorAFinanciar);
    var tasaInteresMensual = parseFloat(tasaInteresMensualPorcentaje) / 100;
    numeroCuotas = parseInt(numeroCuotas);

    // Formato en moneda colombiana
    let valorAFinanciarFormato = valorAFinanciar.toLocaleString("es-CO", { style: "currency", currency: "COP" });
    document.getElementById("idValorAFinanciar").value = valorAFinanciarFormato;

    console.log("Nombre del estudiante: " + nombreEstudiante);
    console.log("Valor a financiar: " + valorAFinanciarFormato);
    console.log("Tasa de interés mensual: " + tasaInteresMensualPorcentaje + "%");
    console.log("Número de cuotas: " + numeroCuotas);

    // Cálculo de la cuota mensual (Método de amortización francés)
    var valorCuota = (valorAFinanciar * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -numeroCuotas));

    // Mostrar el valor de la cuota en pantalla
    document.getElementById("resultadoCuota").innerHTML = `El valor de la cuota mensual es: <strong>${valorCuota.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</strong>`;
    document.getElementById("resultadoCuota").classList.add("alert-success");

    // Generar la tabla de amortización
    generarTablaAmortizacion(valorAFinanciar, tasaInteresMensual, numeroCuotas, valorCuota);
};

/* Función para generar la tabla de amortización */
function generarTablaAmortizacion(valorAFinanciar, tasaInteresMensual, numeroCuotas, valorCuota) {
    var saldoRestante = valorAFinanciar;
    var tabla = document.getElementById("tablaAmortizacion").getElementsByTagName("tbody")[0];

    // Limpiar tabla antes de agregar nuevos datos
    tabla.innerHTML = "";

    for (var i = 1; i <= numeroCuotas; i++) {
        var interes = saldoRestante * tasaInteresMensual;
        var capital = valorCuota - interes;
        saldoRestante -= capital;

        // Asegurar que el saldo restante nunca sea negativo
        if (saldoRestante < 0) saldoRestante = 0;

        // Crear fila en la tabla
        var fila = tabla.insertRow();
        fila.insertCell(0).innerText = i; // Número de cuota
        fila.insertCell(1).innerText = interes.toLocaleString("es-CO", { style: "currency", currency: "COP" }); // Interés
        fila.insertCell(2).innerText = capital.toLocaleString("es-CO", { style: "currency", currency: "COP" }); // Capital
        fila.insertCell(3).innerText = valorCuota.toLocaleString("es-CO", { style: "currency", currency: "COP" }); // Cuota total
        fila.insertCell(4).innerText = saldoRestante.toLocaleString("es-CO", { style: "currency", currency: "COP" }); // Saldo restante
    }
}

/*Funcion Limpiar*/
var limpiar = function () {
    nombreEstudiante = "";
    valorAFinanciar = 0;
    tasaInteresMensualPorcentaje = 0;
    numeroCuotas = 0;

    document.getElementById("idNombre").value = nombreEstudiante;
    document.getElementById("idValorAFinanciar").value = valorAFinanciar;
    document.getElementById("idTasaInteres").value = tasaInteresMensualPorcentaje;
    document.getElementById("idNumeroCuotas").value = numeroCuotas;

    document.getElementById("resultadoCuota").innerHTML = "Aquí aparecerá el valor de la cuota";
    document.getElementById("tablaAmortizacion").innerHTML = " ";
    

}
