const http = require('http');  // module Node - позволяет создавать серверы , получать запросы отправлять ответы - под капотом
const url = require('url');  // module Node

const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');


const startServer = port => {

    const server = http.createServer((request, response) => {
        let routes = request.url.split('/');
        let route = "/" + routes[1];
        (routes[2])? route += "/id":'';
        const func = router[route] || router.default;
        func(request, response);

        // logger(request, response, () => func(request, response));
    });

    server.listen(port);
};


module.exports = startServer;