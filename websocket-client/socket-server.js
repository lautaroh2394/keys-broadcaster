import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });
const clients = []

server.on("connection", (socket) => {
  socket.on("message", (data) => {
    const packet = JSON.parse(data);

    switch (packet.type) {
        case "execute":
            sendClients(packet)
            break;
        case "register-client":
            console.log('register-client')
            registerClient(socket)
            break;
        default:
            console.warn('Unrecognized packet', packet)
    }
  });
});

function sendClients(packet){
    console.log('send-clients')
    clients.forEach(socket=>{
        socket.send(JSON.stringify({
            type: "execute",
            content: packet.content
        }))
    })
}

function registerClient(socket){
    clients.push(socket)
    socket.send(JSON.stringify({
        type: "log",
        content: 'succesfully connected'
    }));
}