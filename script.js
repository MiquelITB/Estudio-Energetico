// Función para analizar el CSV y devolver un array de objetos
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

        headers.forEach((header, index) => {
            let value = currentline[index].replace(/"/g, '').trim();
            value = value.replace(/\./g, '').replace(/,/g, '.');
            obj[header.trim()] = isNaN(value) ? value : parseFloat(value);
        });

        result.push(obj);
    }
    return result;
}

// Función para cargar el archivo CSV y procesarlo
function cargarDatosCSV() {
    fetch('Datos_Energeticos.csv')
        .then(response => response.text())
        .then(csvData => {
            const datos = parseCSV(csvData);
            console.log(datos);
            window.datosCSV = datos; // Almacenar los datos globalmente
            crearGraficas();
            actualizarEstudio();
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosCSV);

// Función para obtener el rango de meses seleccionados
function obtenerRangoMeses() {
    let mesInicio = parseInt(document.getElementById('mesInicio').value);
    let mesFin = parseInt(document.getElementById('mesFin').value);

    if (mesFin < mesInicio) {
        mesFin = mesInicio;
        document.getElementById('mesFin').value = mesFin + 1;
        alert("El mes final no puede ser menor que el mes inicial. Se ha ajustado automáticamente.");
    }

    return { mesInicio, mesFin };
}

// Crear las gráficas
function crearGraficas() {
    const ctxFotovoltaica = document.getElementById('graficaFotovoltaica').getContext('2d');
    const ctxElectrico = document.getElementById('graficaElectrico').getContext('2d');
    const ctxAgua = document.getElementById('graficaAgua').getContext('2d');
    const ctxGastos = document.getElementById('graficaGastos').getContext('2d');

    window.graficaFotovoltaica = new Chart(ctxFotovoltaica, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Producción Fotovoltaica',
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Segoe UI',
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Producción Fotovoltaica',
                    font: {
                        family: 'Segoe UI',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    window.graficaElectrico = new Chart(ctxElectrico, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Consumo Eléctrico',
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Segoe UI',
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Consumo Eléctrico',
                    font: {
                        family: 'Segoe UI',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    window.graficaAgua = new Chart(ctxAgua, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Consumo de Agua',
                backgroundColor: 'rgba(255, 159, 64, 0.4)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Segoe UI',
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Consumo de Agua',
                    font: {
                        family: 'Segoe UI',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    window.graficaGastos = new Chart(ctxGastos, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Gastos',
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Segoe UI',
                            size: 12,
                            weight: 'normal'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Segoe UI',
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Gastos',
                    font: {
                        family: 'Segoe UI',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Función para obtener el porcentaje de ajuste del desplegable Producción Fotovoltaica
function obtenerPorcentajeAjuste() {
    let porcentaje = parseInt(document.getElementById('ajusteProduccion').value);
    const botonAjuste = document.getElementById('botonAjuste');
    const accion = botonAjuste.dataset.accion;

    if (accion === '-' && porcentaje > 100) {
        porcentaje = 100;
        document.getElementById('ajusteProduccion').value = 100;
        alert("El porcentaje no puede ser mayor a 100% si el signo es '-'.");
    }
    return porcentaje;
}

function obtenerPorcentajeAjusteConsumo() {
    let porcentaje = parseInt(document.getElementById('ajusteConsumo').value);
    const botonAjusteConsumo = document.getElementById('botonAjusteConsumo');
    const accion = botonAjusteConsumo.dataset.accion;

    if (accion === '-' && porcentaje > 100) {
        porcentaje = 100;
        document.getElementById('ajusteConsumo').value = 100;
        alert("El porcentaje no puede ser mayor a 100% si el signo es '-'.");
    }
    return porcentaje;
}

// Función para obtener el porcentaje de ajuste del desplegable Consumo de Agua
function obtenerPorcentajeAjusteConsumoAgua() {
    let porcentaje = parseInt(document.getElementById('ajusteConsumoAgua').value);
    const botonAjusteConsumoAgua = document.getElementById('botonAjusteConsumoAgua');
    const accion = botonAjusteConsumoAgua.dataset.accion;

    if (accion === '-' && porcentaje > 100) {
        porcentaje = 100;
        document.getElementById('ajusteConsumoAgua').value = 100;
        alert("El porcentaje no puede ser mayor a 100% si el signo es '-'.");
    }
    return porcentaje;
}

// Función para obtener el porcentaje de ajuste del desplegable Consumo Eléctrico
function aplicarAjusteConsumo(datos, porcentaje) {
    const botonAjusteConsumo = document.getElementById('botonAjusteConsumo');
    const accion = botonAjusteConsumo.dataset.accion;

    return datos.map(item => {
        const nuevoItem = { ...item };
        let factor = 1;
        if (accion === '+') {
            factor = 1 + porcentaje / 100;
        } else {
            factor = 1 - porcentaje / 100;
            if (factor < 0) factor = 0; // Asegurar que no sea negativo
        }
        nuevoItem.Consumo_electrico = (parseFloat(item.Consumo_electrico) * factor).toFixed(2);
        return nuevoItem;
    });
}

// Función para aplicar el ajuste de producción fotovoltaica
function aplicarAjusteProduccion(datos, porcentaje) {
    const botonAjuste = document.getElementById('botonAjuste');
    const accion = botonAjuste.dataset.accion;

    return datos.map(item => {
        const nuevoItem = { ...item };
        let factor = 1;
        if (accion === '+') {
            factor = 1 + porcentaje / 100;
        } else {
            factor = 1 - porcentaje / 100;
            if (factor < 0) factor = 0; // Asegurar que no sea negativo
        }
        nuevoItem.Produccion_fotovoltaica = (parseFloat(item.Produccion_fotovoltaica) * factor).toFixed(2);
        return nuevoItem;
    });
}
function aplicarAjusteConsumoAgua(datos, porcentaje) {
    const botonAjusteConsumoAgua = document.getElementById('botonAjusteConsumoAgua');
    const accion = botonAjusteConsumoAgua.dataset.accion;

    return datos.map(item => {
        const nuevoItem = { ...item };
        let factor = 1;
        if (accion === '+') {
            factor = 1 + porcentaje / 100;
        } else {
            factor = 1 - porcentaje / 100;
            if (factor < 0) factor = 0; // Asegurar que no sea negativo
        }
        nuevoItem.Consumo_agua = (parseFloat(item.Consumo_agua) * factor).toFixed(2);
        return nuevoItem;
    });
}


// Función para realizar una copia profunda de un objeto
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Función para actualizar las gráficas y la tabla.
function actualizarEstudio() {
    if (!window.datosCSV) return;

    let datosAjustados = window.datosCSV.map(item => deepCopy(item));
    const porcentajeAjusteProduccion = obtenerPorcentajeAjuste();
    datosAjustados = aplicarAjusteProduccion(datosAjustados, porcentajeAjusteProduccion);

    const porcentajeAjusteConsumo = obtenerPorcentajeAjusteConsumo();
    datosAjustados = aplicarAjusteConsumo(datosAjustados, porcentajeAjusteConsumo);

    const porcentajeAjusteConsumoAgua = obtenerPorcentajeAjusteConsumoAgua();
    datosAjustados = aplicarAjusteConsumoAgua(datosAjustados, porcentajeAjusteConsumoAgua);


    const { mesInicio, mesFin } = obtenerRangoMeses();
    const mesesArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const datosFiltrados = datosAjustados.filter(item => {
        const mes = mesesArray.indexOf(item.Meses);
        return mes >= mesInicio && mes <= mesFin;
    });

    const meses = datosFiltrados.map(item => item.Meses);
    const produccion = datosFiltrados.map(item => item.Produccion_fotovoltaica);
    const consumoElectrico = datosFiltrados.map(item => item.Consumo_electrico);
    const consumoAgua = datosFiltrados.map(item => item.Consumo_agua);
    const gastos = datosFiltrados.map(item => item.Gastos_fijos);

    // Actualizar las gráficas
    window.graficaFotovoltaica.data.labels = meses;
    window.graficaFotovoltaica.data.datasets[0].data = produccion;
    window.graficaFotovoltaica.update();

    window.graficaElectrico.data.labels = meses;
    window.graficaElectrico.data.datasets[0].data = consumoElectrico;
    window.graficaElectrico.update();

    window.graficaAgua.data.labels = meses;
    window.graficaAgua.data.datasets[0].data = consumoAgua;
    window.graficaAgua.update();

    window.graficaGastos.data.labels = meses;
    window.graficaGastos.data.datasets[0].data = gastos;
    window.graficaGastos.update();

    // Actualizar la tabla
 const tablaBody = document.querySelector("#tablaDatos tbody");
    tablaBody.innerHTML = '';

    let totalProduccion = 0;
    let totalConsumoElectrico = 0;
    let totalConsumoAgua = 0;
    let totalGastos = 0;
    let totalAutoconsumo = 0;

    datosFiltrados.forEach(item => {
        let autoconsumo = 0;
        if (item.Produccion_fotovoltaica > 0) {
            autoconsumo = ((item.Produccion_fotovoltaica / item.Consumo_electrico) * 100).toFixed(2);
        }

        totalProduccion += parseFloat(item.Produccion_fotovoltaica);
        totalConsumoElectrico += parseFloat(item.Consumo_electrico);
        totalConsumoAgua += parseFloat(item.Consumo_agua);
        totalGastos += parseFloat(item.Gastos_fijos);
        totalAutoconsumo += parseFloat(autoconsumo);

        const fila = `<tr>
            <td>${item.Meses}</td>
            <td>${item.Produccion_fotovoltaica} kWh</td>
            <td>${item.Consumo_electrico} kWh</td>
            <td>${item.Consumo_agua} l</td>
            <td>${item.Gastos_fijos} &euro;</td>
            <td>${autoconsumo} %</td>
        </tr>`;

        tablaBody.innerHTML += fila;
    });

    // Añadir fila de totales
    const mediaAutoconsumo = (totalAutoconsumo / datosFiltrados.length).toFixed(2);
    const filaTotal = `<tr>
        <td>Total anual</td>
        <td>${totalProduccion.toFixed(2)} kWh</td>
        <td>${totalConsumoElectrico.toFixed(2)} kWh</td>
        <td>${totalConsumoAgua.toFixed(2)} L</td>
        <td>${totalGastos.toFixed(2)} &euro;</td>
        <td>${mediaAutoconsumo} %</td>
    </tr>`;

    tablaBody.innerHTML += filaTotal;
}

 // Función para imprimir el PDF
function imprimirPDF() {
    const element = document.getElementById('pdf-content'); // Seleccionar el contenedor
    const opt = {
        margin: 10,
        filename: 'Estudio_Energetico.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all', before: '.graficas' }, // Evitar cortes en las gráficas
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
            userUnit: 1
        },
        html2canvas: {
            scale: 2,
            logging: true,
            dpi: 192,
            letterRendering: true,
            allowTaint: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
            userUnit: 1
        },
        html2canvas: {
            scale: 2,
            logging: true,
            dpi: 192,
            letterRendering: true,
            allowTaint: true
        }
    };
    html2pdf().set(opt).from(element).save();
}
// Event listeners
document.querySelector('button').addEventListener('click', actualizarEstudio);
document.getElementById('botonAjuste').addEventListener('click', function() {
    this.dataset.accion = this.dataset.accion === '+' ? '-' : '+';
    this.textContent = this.dataset.accion;
});
document.getElementById('botonAjusteConsumo').addEventListener('click', function() {
    this.dataset.accion = this.dataset.accion === '+' ? '-' : '+';
    this.textContent = this.dataset.accion;
});
document.getElementById('botonAjusteConsumoAgua').addEventListener('click', function() {
    this.dataset.accion = this.dataset.accion === '+' ? '-' : '+';
    this.textContent = this.dataset.accion;
});
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    document.body.style.backgroundPositionY = `-${scrollY * 0.4}px`; // Ajuste inverso
});

// Actualizar al hacer clic en el botón
document.querySelector('button').addEventListener('click', actualizarEstudio);