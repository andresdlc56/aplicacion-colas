//Importando al fs de node
const fs = require('fs');

//Clase para manejar los tickets pendientes
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

//Creadno una clase para el manejo de los tickets
class TicketControl {
    //Este constructor se ejecutara cada vez que llamemos a esta clase
    constructor() {
        //==================
        //  Propiedades
        //==================
        this.ultimo = 0; //ultimo ticket generado
        this.hoy = new Date().getDate(); //fecha actual
        this.tickets = [];
        this.ultimosCuatro = [];

        //leyendo el archivo data.json 
        let data = require('../data/data.json');

        //Comparando la fecha de la data con la fecha actual
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }

    //Declarando funcion para manejar el siguiente ticket
    siguiente() {
        this.ultimo += 1;

        //Creando instancia de un ticket
        let ticket = new Ticket(this.ultimo, null);

        //Empujando el "ticket" al inicion del arreglo "tickets"
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    //Delacaracion de funcion para obtener el ultimo ticket
    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    //Declaracion de funcion para obtener los ultimos cuatro tickets
    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    //Declarando funcion para atenderTicket
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay Tickets Pendientes'
        }

        //Obteniendo el numero del primer tikect en el arreglo "tickets"
        let numeroTicket = this.tickets[0].numero;

        //Eliminando el primer elemento del array "tickets"
        this.tickets.shift();

        //Declarando una instancia del nuevo ticket a atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Agregando el ticket que esta siendo atendido (atenderTicket) al principio del arreglo "ultimosCuatro"
        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            //Eliminar el quinto o ultimo elemento del array ultimosCuatro
            this.ultimosCuatro.splice(-1, 1);
        }

        console.log('Ultimos Cuatro');
        console.log(this.ultimosCuatro);

        this.grabarArchivo();
        return atenderTicket;
    }

    //Declarando Funcion para reiniciar conteo
    reiniciarConteo() {
        this.ultimo = 0;

        //Reiniciando el arreglo de tickets pendientes
        this.tickets = [];

        //Reiniciando el arreglo de tickets pendientes
        this.ultimosCuatro = [];

        console.log('Se ha Reiniciado el Conteo');

        this.grabarArchivo();
    }

    //Declarando funcion para grabar en el archivo data.json
    grabarArchivo() {
        //creando un objeto con los valores del data.json reiniciados
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        //Convirtiendo el objeto jsonData a un String
        let jsonDataString = JSON.stringify(jsonData);

        //Guardando el jsonDataString en un archivo
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

//Exportando lo siguiente
module.exports = {
    TicketControl
}