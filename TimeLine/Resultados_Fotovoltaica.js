// Función para analizar el CSV y devolver un array de objetos
function parseCSV(text) {
    const lines = text.trim().split('\n'); // Divide el texto en líneas y elimina espacios
    const headers = lines[0].split(','); // Extrae las cabeceras
    const result = [];

    for (let i = 1; i < lines.length; i++) { // Empieza desde la segunda línea
        const obj = {};
        const currentline = lines[i].split(/,(?=(?:[^"]*\"[^"]*\")*[^"]*$)/); // Divide teniendo en cuenta comas dentro de comillas

        headers.forEach((header, index) => {
            let value = currentline[index].replace(/\"/g, '').trim(); // Elimina comillas y espacios
            value = value.replace(/\./g, '').replace(/,/g, '.'); // Convierte formato de número europeo a estándar
            obj[header.trim()] = isNaN(value) ? value : parseFloat(value); // Convierte a número si aplica
        });

        result.push(obj);
    }
    return result;
}

// Cargar y analizar el archivo CSV
fetch('Produccio Generica.csv')
    .then(response => response.text())
    .then(csvData => {
        const data = parseCSV(csvData);
        updateCharts(data);
        updateTable(data);
    })
    .catch(error => console.error('Error al cargar el CSV:', error));

// Actualiza las gráficas con los datos filtrados
function updateCharts(data) {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.Meses),
            datasets: [{
                label: 'Producción Mensual (kWh)',
                data: data.map(item => item.kWh),
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
}

// Actualiza la tabla con los datos
function updateTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    let total = 0;

    data.forEach(item => {
        total += item.kWh;
        const row = `<tr>
            <td>${item.Meses}</td>
            <td>${item.kWh.toFixed(2)} kWh</td>
            <td>${((item.kWh / 3000) * 100).toFixed(2)}%</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('annualTotal').innerText = total.toFixed(2);
}

// Función para descargar el contenido como PDF
function downloadPDF() {
    html2pdf().from(document.body).save('Produccion_Fotovoltaica.pdf');
}
