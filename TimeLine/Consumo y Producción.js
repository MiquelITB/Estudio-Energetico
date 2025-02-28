// Función para analizar el CSV y devolver un array de objetos
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); // Divide teniendo en cuenta comas dentro de comillas

        headers.forEach((header, index) => {
            let value = currentline[index].replace(/"/g, '').trim(); // Elimina comillas y espacios
            value = value.replace(/\./g, '').replace(/,/g, '.'); // Convierte formato de número europeo a estándar
            obj[header.trim()] = isNaN(value) ? value : parseFloat(value); // Convierte a número si aplica
        });

        result.push(obj);
    }
    return result;
}

// Cargar y analizar los archivos CSV
Promise.all([
    fetch('Produccio Generica.csv').then(response => response.text()),
    fetch('Consum Generic.csv').then(response => response.text())
])
    .then(([productionCsvData, consumptionCsvData]) => {

        console.log("CSV Producción cargado:", productionCsvData);
        console.log("CSV Consumo cargado:", consumptionCsvData);

        const productionData = parseCSV(productionCsvData);
        const consumptionData = parseCSV(consumptionCsvData);

        console.log("Datos producción:", productionData);
        console.log("Datos consumo:", consumptionData);

        updateCharts(productionData, consumptionData);
        updateTable(productionData, consumptionData);
    })
    .catch(error => console.error('Error al cargar los CSVs:', error));

// Función para filtrar los datos por fecha
function filterDataByDate(data, startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    return data.filter(item => {
        let itemDate = new Date(`2024-${getMonthNumber(item.Meses)}-01`);
        return itemDate >= start && itemDate <= end;
    });
}

// Convertir nombre de mes a número (ajustado para que enero sea 1, no 0)
function getMonthNumber(monthName) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months.indexOf(monthName) + 1;  // Esto ajusta el mes a un formato numérico correcto
}

// Actualiza las gráficas con los datos filtrados
function updateCharts(productionData, consumptionData) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Por favor, selecciona un rango de fechas válido.');
        return;
    }

    const filteredProductionData = filterDataByDate(productionData, startDate, endDate);
    const filteredConsumptionData = filterDataByDate(consumptionData, startDate, endDate);

    // Gráfica de Producción
    const ctxProduction = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctxProduction, {
        type: 'bar',
        data: {
            labels: filteredProductionData.map(item => item.Meses),
            datasets: [{
                label: 'Producción Mensual (kWh)',
                data: filteredProductionData.map(item => item.kWh),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfica de Consumo
    const ctxConsumption = document.getElementById('dailyChart').getContext('2d');
    new Chart(ctxConsumption, {
        type: 'bar',
        data: {
            labels: filteredConsumptionData.map(item => item.Meses),
            datasets: [{
                label: 'Consumo Mensual (kWh)',
                data: filteredConsumptionData.map(item => item.kWh),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Actualiza la tabla con los datos filtrados
function updateTable(productionData, consumptionData) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Por favor, selecciona un rango de fechas válido.');
        return;
    }

    const filteredProductionData = filterDataByDate(productionData, startDate, endDate);
    const filteredConsumptionData = filterDataByDate(consumptionData, startDate, endDate);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    let totalProduction = 0;
    let totalConsumption = 0;

    filteredProductionData.forEach((item, index) => {
        totalProduction += item.kWh;
        const consumptionItem = filteredConsumptionData[index] || { kWh: 0 };  // Si no hay dato de consumo, poner 0
        totalConsumption += consumptionItem.kWh;

        const row = `<tr>
            <td>${item.Meses}</td>
            <td>${item.kWh.toFixed(2)} kWh</td>
            <td>${((item.kWh / 3000) * 100).toFixed(2)}%</td>
            <td>${consumptionItem.kWh.toFixed(2)} kWh</td> <!-- Nueva columna para Consumo -->
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('annualTotal').innerText = totalProduction.toFixed(2);
}

// Función para descargar el contenido como PDF
function downloadPDF() {
    html2pdf().from(document.body).save('Consumo_y_Producción.pdf');
}
