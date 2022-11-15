import { IAuthData2Store } from '../../types/auth';

const TOKEN = 'TOKEN';
const NAME = 'NAME';

const storage = {
  getAuth() {
    return {
      name: localStorage.getItem(NAME) || '',
      token: localStorage.getItem(TOKEN) || ''
    };
  },
  setAuth({name, token}: IAuthData2Store) {
    localStorage.setItem(NAME, name);
    localStorage.setItem(TOKEN, token);
  },
  clearAuth() {
    localStorage.clear();
  }
};

export default storage;

