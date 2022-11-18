import { useMemo, useEffect } from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import UserList from '../user-list';
import Posts from '../posts';
import styles from './users.module.css';

function Users() {
  const { loading, loaded, entities: users } = useTypedSelector((state) => state.users);
  const { loadData } = useActions();

  useEffect(() => {
    if (!loading && !loaded) loadData();
  }, [loading, loaded, loadData]);

  const usersList = useMemo(() => Object.values(users), [users]);
  const match = useMatch('/users/:id');
  const userId = match?.params.id || '';
  const postIds = useMemo(() => users[userId]?.postIds || [], [users, userId]);

  if (!usersList.length) return <>Please wait for data loading</>;

  return (
    <div className={styles.users} data-testid='users'>
      <UserList users={usersList} />
      <Routes>
        <Route path='/:id' element={<Posts postIds={postIds} key={userId} />} />
        <Route path='' element={<Navigate to={`/users/${usersList[0].id}`} />} />
      </Routes>
    </div>
  );
}

export default Users;
