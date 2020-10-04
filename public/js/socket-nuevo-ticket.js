var socket = io();

//Creando una referencia a una etiqueta que sera usada muchas veces
var label = $('#lblNuevoTicket');

//Comando para establecer la conexion con el server
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Funcion que se ejecutara cuando perdemos conexion con el servidor
socket.on('disconnect', function() {
    console.log('Perdimos Conexion con el Servidor');
});

//Escuchando el evento "estadoActual" proveniente del server
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

//JQUERY  Ejecutando algo al hacer click en la etiqueta button
$('button').on('click', function() {
    //Emitiendo la funcion siguienteTicket
    //null porque desde aqui no se enviaran datos, function para un callback
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});