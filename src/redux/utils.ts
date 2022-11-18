import { IUser } from '../types/user';
import { IPost, IApiResPost } from '../types/post';

export const normalizeApiData = (data: IApiResPost[]) => {
  const users: { [key: string]: IUser } = {};
  const posts: { [key: string]: IPost } = {};

  data.forEach((item: IApiResPost) => {
    const userId = item.from_id;
    posts[item.id] = {
      id: item.id,
      message: item.message,
      type: item.type,
      createdTime: item.created_time,
    };

    if (users[userId]) {
      users[userId].postIds.push(item.id);
    } else {
      users[userId] = {
        id: userId,
        name: item.from_name,
        postIds: [item.id],
      };
    }
  });

  return { users, posts };
};
