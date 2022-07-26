import express from 'express';
import http from 'http';
import  { Server } from "socket.io";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app);
const io = new Server(server,{cors: {
  origin: "*",
  credentials: false
}});

let keyPressesResQueue = []

app.get('/queue-key-press', (req, res) => {
  keyPressesResQueue.push(res)
});

app.get('/admin', (req, res) => {
  res.sendFile(process.cwd() + '/admin.html')
})

app.get('/client', (req, res) => {
  res.sendFile(process.cwd() + '/client.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('key-press-to-execute', (...args) => {
    console.log('key-press-received');
    const index = keyPressesResQueue.length - 1
    const res = keyPressesResQueue[index]
    //keyPressesResQueue = keyPressesResQueue.slice(0)
    try{
      res.send(args)
      console.log('key-press-sent')
    }
    catch(error){
      console.log('key-press-sent ERROR', error)
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});