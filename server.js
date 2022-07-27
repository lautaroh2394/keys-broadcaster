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
let admin;

app.get('/next-key-press', (req, res) => {
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
  socket.on('set-admin', ()=>{
    console.log('set admin')
    admin = socket
  })

  socket.on('key-press-to-execute', keyPressArgs => {
    const res = keyPressesResQueue[0]
    keyPressesResQueue = keyPressesResQueue.splice(1)
    try{
      res.send(keyPressArgs)
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