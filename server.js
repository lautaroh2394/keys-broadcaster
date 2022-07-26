import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import  { Server } from "socket.io";
const io = new Server(server,{cors: {
  origin: "*",
  credentials: false
}});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (...args) => {
    console.log('a message');
    console.log(args)
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});