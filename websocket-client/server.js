/*
armar http server para 
    registrar clients, 
    registrar admin,
    recibir key presses para clients
    enviar key presses a clients
*/

import { createServer, } from 'http'
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!');
}

const server = createServer(requestListener);
server.listen(8080);