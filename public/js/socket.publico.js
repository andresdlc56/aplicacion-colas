var socket = io();

//Comando para establecer la conexion con el server
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Funcion que se ejecutara cuando perdemos conexion con el servidor
socket.on('disconnect', function() {
    console.log('Perdimos Conexion con el Servidor');
});

//Obteniendo referencias de la etiquetas del html
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimosCuatro);
});

socket.on('ultimosCuatro', function(data) {
    //Audio
    var audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;

    actualizaHTML(data.ultimos4);
});

//Funcion para actualizar el html
function actualizaHTML(ultimosCuatro) {
    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimosCuatro[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
    }
}