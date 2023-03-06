const operations = require('./userOperations');
const bcrypt = require('bcryptjs');


module.exports.getUsers = (request, response) => {

    const { q, nombre, apikey } = request.query; // ?q=hola&nombre=Lina&apikey=03903978
    const data = operations.getUsers();

    response.json({
        msg: 'GetUsers Hello Ricaurte',
        data,
        q,
        nombre,
        apikey
    });


};

module.exports.getIdUsers = (request, response) => {

    const id = request.params.id

    response.json({
        msg: `GetIdUsers Hello Ricaurte : ${id}`
    })


};

module.exports.postUser = (request, response) => {

    const body = request.body;

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    response.json({
        msg: `PostUser Hello Ricaurte`,
        email: body.email,
        password: body.password
    })


};

module.exports.updateUser = (request, response) => {

    const id = request.params.id

    response.json({
        msg: `UpdateUsers Hello Ricaurte : ${id}`
    })


};

module.exports.deleteUser = (request, response) => {

    const id = request.params.id

    response.json({
        msg: `DeleteUser Hello Ricaurte : ${id}`
    })


};