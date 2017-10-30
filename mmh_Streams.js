var fs = require('fs');
var hapi = require('hapi');
var path = require('path');
var rot13 = require('rot13-transform');

var server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: (request, reply) => {
            var file = fs.createReadStream(path.join(__dirname, 'input.txt'));
            reply(file.pipe(rot13()));
        }
    }
});

server.start();
// createReadStream(pathToFile)

