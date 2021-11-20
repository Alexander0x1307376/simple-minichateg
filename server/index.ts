import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import router from './router';
import { ChatService } from './services/chatService'; 
import chatHandler from './handlers/chatHandler';


const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
});

app.use(cors());
app.use(router);

server.listen(port, () => {
  console.log(`Server has started on port ${port}`);
})

io.on('connect', (socket) => {

  console.log('new connection');
  chatHandler(io, socket);

});
