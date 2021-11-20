export type JoinData = {
  name: string,
  room: string
}

export type UserData = {
  id: string
  name: string,
  room: string
}

export type Message = {
  user: string,
  text: string
}

export type RoomData = {
  room: string,
  users: UserData[]
}