var socket = io();

//Comando para establecer la conexion con el server
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Funcion que se ejecutara cuando perdemos conexion con el servidor
socket.on('disconnect', function() {
    console.log('Perdimos Conexion con el Servidor');
});

//Obtener todos los parametros de la url
var searchParams = new URLSearchParams(window.location.search);

//Si no existe en la url un parametro llamado 'escritorio'
if (!searchParams.has('escritorio')) {
    //irme a la pantalla index.html
    window.location = 'index.html';
    throw new Error('El Escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

//Referencia a una etiqueta del html
var label = $('small');

console.log('Escritorio: ', escritorio);

//Capturando una etiqueta de la pagina web
$('h1').text('Escritorio ' + escritorio);

//Listener del boton que ejecutara la logica 
$('button').on('click', function() {
    //Emitiendo 
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay Tickets Pendientes') {
            label.text(resp);
            alert(resp);
            return;
        }

        //console.log(resp);
        label.text('Ticket ' + resp.numero);
    });
});