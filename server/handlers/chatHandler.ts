import { Server, Socket } from "socket.io";
import { ChatService } from "../services/chatService";
import { JoinData } from "../types";


const SYSTEM_NICKNAME = 'chat_system';
const ROOMS_DATA_CHANNEL = 'rooms_data';


const errorResponse = (error = 'Что-то пошло не так!') => ({ error });
const chatService = new ChatService();

const chatHandler = (io: Server, socket: Socket) => {

  socket.on('join', ({name, room}: JoinData, callback) => {

    console.log(`user ${socket.id} has connected!!!`);

    try {
      const user = chatService.addUser({ id: socket.id, name, room });
      socket.join(user.room);

      // сообщение подключившемуся пользователю
      socket.emit('message', {
        user: SYSTEM_NICKNAME,
        text: `${user.name}, приветствуем тебя в беседе ${user.room}.`
      });

      // сообщение всем
      socket.broadcast.to(user.room).emit('message', {
        user: SYSTEM_NICKNAME,
        text: `${user.name} подключился`
      });

      // обновление данных о комате
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: chatService.getUsersInRoom(user.room)
      });

      // обновление общей информации
      io.to(ROOMS_DATA_CHANNEL).emit('roomsList', chatService.getRoomData());
    }
    catch(e: any) {
      callback({error: e.message});
    }
  });



  socket.on('sendMessage', (message: string, callback) => {
    try {
      const user = chatService.getUser(socket.id);
      if(!user)
        return callback(errorResponse('Неизвестный отправитель'));

      io.to(user.room).emit('message', {
        user: user.name,
        text: message
      })
      callback();
    } 
    catch (e) {
      callback(errorResponse());
    }
  });



  socket.on('rooms', (_, callback) => {
    
    const rooms = chatService.getRoomData();
    socket.join(ROOMS_DATA_CHANNEL);
    
    socket.emit('roomsList', rooms);
  });



  socket.on('disconnect', () => {

    console.log(`user ${socket.id} has disconnected`);

    const user = chatService.removeUser(socket.id);
    if (!user) return;

    io.to(user.room).emit('message', { 
      user: SYSTEM_NICKNAME, 
      text: `${user.name} вышел.` 
    });

    io.to(user.room).emit('roomData', { 
      room: user.room, 
      users: chatService.getUsersInRoom(user.room) 
    });

    io.to(ROOMS_DATA_CHANNEL).emit('roomsList', chatService.getRoomData());
  });
}


export default chatHandler;