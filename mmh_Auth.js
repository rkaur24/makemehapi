const hapi = require('hapi');
    const auth = require('hapi-auth-basic');
    
    var user = { name: 'hapi', password: 'auth' };
    var server = new hapi.Server();
    
    server.connection({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });
    
    var validate = (request, username, password, callback) => {
        var isValid = username === user.name && password === user.password;
    
        return callback(null, isValid, { name: user.name });
    };
    
    server.register(auth, (err) => {
        server.auth.strategy('simple', 'basic', { validateFunc: validate });
        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: 'simple',
                handler: (request, reply) => {
                    reply();
                }
            }
        });
    
        server.start((err) => {
            if (err) throw err;
        });
    });