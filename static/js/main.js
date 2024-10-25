// Importa la función para obtener la IP
import { getClientIP } from './Get_IP_Client.js';  

// Variables globales
let ip_client = '';
let name = '';

// Obtener la IP al cargar la página
getClientIP().then(ip => {
    if (ip) {
        ip_client = ip;
    } else {
        console.error('No se pudo obtener la IP');
    }
});

// Función para generar un token en base al nombre usando jsSHA
function generateTokenFromName(name) {
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(name);
    const hash = shaObj.getHash("HEX");
    return hash;
}

// Función para enviar datos a la API
async function sendData(status) {
    // Obtener el nombre desde el input
    name = document.getElementById('name').value;

    if (name.trim() === '') {
        alert('Por favor, ingresa tu nombre antes de continuar.');
        return;
    }

    // Generar un token basado en el nombre del usuario
    const id_device = generateTokenFromName(name);

    const data = {
        id: '',  // Genera un ID aleatorio
        name: name,  // Nombre proporcionado por el usuario
        ip_client: ip_client,  // IP pública obtenida
        status: status,  // El estado que corresponde al botón
        date: new Date().toISOString(),  // Fecha actual en formato ISO
        id_device: id_device  // Token generado a partir del nombre
    };

    fetch('http://54.198.210.226:5000/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Datos enviados:', result);
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });
}

// Manejador de eventos para los botones
document.getElementById('up').addEventListener('click', () => sendData(1));         // Adelante
document.getElementById('down').addEventListener('click', () => sendData(2));       // Atrás
document.getElementById('left').addEventListener('click', () => sendData(3));       // Izquierda
document.getElementById('right').addEventListener('click', () => sendData(4));      // Derecha
document.getElementById('stop').addEventListener('click', () => sendData(5));       // Parar
document.getElementById('up-right').addEventListener('click', () => sendData(6));       // Parar
document.getElementById('up-left').addEventListener('click', () => sendData(7));       // Parar
document.getElementById('down-left').addEventListener('click', () => sendData(8));       // Parar
document.getElementById('down-right').addEventListener('click', () => sendData(9));       // Parar
