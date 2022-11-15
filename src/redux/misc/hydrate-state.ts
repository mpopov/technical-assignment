import { IStorage } from '../../types/auth';

const hydrateState = (storage: IStorage) => ({
  auth: {
    loading: false,
    error: null,
    ...storage.getAuth(),
  }
});

export default hydrateState;