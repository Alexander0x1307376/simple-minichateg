import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation, } from 'react-router-dom';
import Infobar from '../../shared/infobar/Infobar';
import Input from '../../shared/input/Input';
import MessagesContainer from '../../shared/messages/messagesContainer';
import ChannelData from '../../shared/channelData/ChannelData';
import { io } from 'socket.io-client';
import { Message, User } from '../../../types';
import './Chat.scss';


const ENDPOINT = 'localhost:5000';
let socket: any;


const Chat: React.FC = () => {

  const location = useLocation();

  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState <User[]>([]);
  const [message, handleSetMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    const { name, room } = queryString.parse(location.search) as { name: string, room: string };

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    
    socket.emit('join', { name, room }, ({error}: {error: string}) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      // socket.emit('disconnect');
      socket.off();
    }
  }, [location.search])

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }: {users: User[]}) => {
      setUsers(users);
    });
  }, []);

  const handleSendMessage = () => {
    if (message) {     
      socket.emit('sendMessage', message, () => handleSetMessage(''));
    }
  }

  return (
    <div className="chat_layout">
      <div className="chat_content">
        <div className="chat_main-section">
          <Infobar room={room} />
          <MessagesContainer messages={messages} name={name} />
          <Input 
            message={message} 
            setMessage={handleSetMessage} 
            sendMessage={handleSendMessage} 
          />
        </div>
        <div className="chat_sidebar ml-5">
          <ChannelData users={users} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
