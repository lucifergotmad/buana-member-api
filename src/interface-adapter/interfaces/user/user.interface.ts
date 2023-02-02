import { IId } from "../id.interface";

export interface IUserResponse extends IId {
  user_id: string;
  user_name: string;
  level: string;
}
