

export type PlayerType = {
  id: number| null,
  name: string;
  img: string;
  score: number;
  ingame: boolean
}

export type BackPlayerType = {
  name:string
}

export type LoginForm = {
  name: string;
  password: string;
}

export type ChangeData = {
  newname: string;
}