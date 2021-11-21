import React, { useState, useEffect } from 'react';
import JoinForm from '../../shared/joinForm/joinForm';
import RoomsData from '../../shared/channelsData/channelsData';
import { io } from 'socket.io-client';
import './Join.scss';
import { useNavigate } from 'react-router-dom';
import { Rooms } from '../../../types';


const ENDPOINT = 'localhost:5000';
let socket: any;

const Join: React.FC = () => {

  const [rooms, setRooms] = useState<Rooms>({});

  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');


  useEffect(() => {

    console.log('Join!!')

    socket = io(ENDPOINT);

    socket.emit('rooms');
    socket.on('roomsList', (rooms: Rooms) => {
      setRooms(rooms);
      console.log('rooms!', rooms);
    });

    return () => {
      // socket.emit('disconnect');
      socket.off();
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="join_layout">
      <div className="join_layout-inner box">
        <div className="join_section">
          <JoinForm
            values={{ name, room }} 
            onChange={(values) => {
              if (name !== values.name) setName(values.name); 
              if (room !== values.room) setRoom(values.room);
            }}
            onSubmit={({name, room}) => {
              navigate(`/chat?name=${name}&room=${room}`)
            }
          }/>
        </div>
        <div className="join_section">
          <RoomsData data={rooms} selected={room} onSelect={value => {
            setRoom(value);
          }} />
        </div>
      </div>
    </div>
  );
}

export default Join;