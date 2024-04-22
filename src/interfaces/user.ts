export interface IUser extends Document {
  name: string;
  email: string;
}

export interface IProjection {
  [key: string]: number;
}