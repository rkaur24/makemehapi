var hapi = require('hapi');
var vision = require('vision');
var path = require('path');

var server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(vision, (err) => {
    if (err) throw err;
});

server.views({
    path: path.join(__dirname, 'templates'),
    engines: {
        html: require('handlebars')
    },
    helpersPath:  path.join(__dirname, 'helpers')
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'template.html'
    }
});

server.start((err) => {
    if (err) throw err;
});