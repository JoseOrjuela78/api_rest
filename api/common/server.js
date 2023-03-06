require('./lib/secure-config/global-config'); //inicia confirguaracion global
require('../common/dataBase').init(); //inicia base se datos
const express = require('express');
const cors = require('cors');
const UserRouters = require('../users/userRouters');
const https = require('https');



class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); //control de acceso paginas
        this.app.use(express.json()); // parse y lectura de body
        this.app.use(express.static('public')); // configuracion contenido html carpeta publica
    }

    routes() {
        this.app.use(UserRouters);
    }

    listen() {

        const privateKey = ''; //process.env.SSLKEY;
        const certificate = ''; //process.env.SSLCERT;

        const https_options = {
            key: privateKey,
            cert: certificate,
            passphrase: ''
        };



        if (!privateKey) {
            // http
            this.app.listen(this.port, () => {
                console.log('Servidor http corriendo en puerto : ', this.port);
            });

        } else {
            // https

            https.createServer(https_options, this.app).listen(this.port, () => {
                console.log('Servidor https corriendo en puerto : ', this.port);
            });

        };

    }

}

module.exports = Server;