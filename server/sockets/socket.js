const { io } = require('../server');

//Importando la clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

//Creando una nueva instancia de TicketControl
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchando la funcion siguienteTicket proveniente del cliente
    client.on('siguienteTicket', (data, callback) => {
        //Ejecutando la funcion siguiente definida en ticketControl
        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);
    });

    //Emitiendo evento (estadoActual) hacia el cliente
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    //Escuchando evento (atenderTicket) proveniente del cliente
    client.on('atenderTicket', (data, callback) => {
        //Validando que en la data venga el escritorio
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar o notificar cambios en los ultimosCuatro
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })
    });
});