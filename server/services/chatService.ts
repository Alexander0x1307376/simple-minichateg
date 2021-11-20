import ChatError from "../exeptions/ChatError";
import { UserData } from "../types";

export class ChatService {
  
  users: UserData[] = [];

  constructor() {
    this.addUser.bind(this);
    this.removeUser.bind(this);
    this.getUser.bind(this);
    this.getUsersInRoom.bind(this);
  };

  // данные валидируем и санитизируем здесь же
  addUser(userData: UserData): UserData {

    let { id, name, room } = userData;

    if (!name || !room) 
      throw ChatError.RequiredNicknameAndRoomError();

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = this.users.find((user) => user.room === room && user.name === name);
    if (existingUser) 
      throw ChatError.NameAlreadyInUse();

    this.users.push({ id, name, room });

    return { id, name, room };
  };

  
  removeUser (id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) 
      return this.users.splice(index, 1)[0];
  };


  getUser (id: string) {
    return this.users.find((user) => user.id === id)
  };


  getUsersInRoom (room: string) {
    return this.users.filter((user) => user.room === room);
  };


  getRoomData () {
    return this.users.reduce((acc, {room}) => {
      acc[room] = room in acc ? acc[room] + 1 : 1;
      return acc;
    }, {} as Record<string, number>);
  };

}