export type Message = {
  text: string,
  user: string
}

export type User = {
  id: string,
  name: string,
  room?: string
}

export type Rooms = {
  [key: string]: number
}