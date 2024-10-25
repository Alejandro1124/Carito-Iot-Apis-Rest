// Asegúrate de que el script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('last-record'); // Cambia 'tableBody' por 'last-record'

    fetch('http://54.198.210.226:5000/last_status')
        .then(response => response.json())
        .then(data => {
            const lastRecord = data[0]; // Accedemos al primer (y único) objeto del array

            // Limpiar el contenido existente
            tableBody.innerHTML = '';

            // Crear una nueva fila con los datos obtenidos
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${lastRecord.id}</td>
                <td>${lastRecord.name}</td>
                <td>${lastRecord.ip_client}</td>
                <td>${lastRecord.status}</td>
                <td>${lastRecord.date}</td>
                <td>${lastRecord.id_device}</td>
            `;

            // Insertar la fila en el cuerpo de la tabla
            tableBody.appendChild(row);
        })
        .catch(error => {
            console.error('Error al obtener el último registro:', error);
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger">Error al cargar los datos</td>
                </tr>
            `;
        });
});
