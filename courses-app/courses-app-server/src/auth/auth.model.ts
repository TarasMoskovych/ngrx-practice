export interface User {
  id: number;
  email: string;
}

export interface UserData extends User {
  password: string;
}
