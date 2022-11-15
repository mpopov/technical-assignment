import { UserActionTypes } from './user';

export interface PostsState {
  entities: { [key: string]: IPost };
}

export const PostActionTypes = UserActionTypes;

export interface PostAction {
  type: string;
  data?: {
    posts: { [key: string]: IPost };
  };
}

export interface IPost {
  id: string;
  message: string;
  type: string;
  createdTime: Date;
}

export interface IApiResPost {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: Date;
}
