import { useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Posts from '../posts';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/user-typed-selector';
import { useActions } from '../../hooks/use-actions';
import styles from './users.module.css';
import navItemStyles from './nav-item.module.css';

function Users() {
  const { loading, loaded, entities: users } = useTypedSelector((state) => state.users);
  const { loadData } = useActions();

  const match = useMatch('/users/:id');
  const userId = match?.params.id || '';
  const usersList = useMemo(() => Object.values(users), [users]);
  const postIds = useMemo(() => users[userId]?.postIds || [], [users, userId]);

  useEffect(() => {
    if (!loading && !loaded) loadData();
  }, [loading, loaded, loadData]);

  if (!usersList.length) return <>Please wait for data loading</>;

  return (
    <div className={styles.users}>
      <div className={styles.navigation}>
        {usersList.map(({ id, name, postIds }) => (
          <NavLink
            to={`/users/${id}`}
            key={id}
            className={({ isActive }) => navItemStyles.item + (isActive ? ` ${navItemStyles.active}` : '')}
          >
            <span className={navItemStyles.name}>{name}</span>
            <span className={navItemStyles.counter}>{postIds.length}</span>
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route path='/:id' element={<Posts postIds={postIds} />} />
        <Route path='' element={<Navigate to={`/users/${usersList[0].id}`} />} />
      </Routes>
    </div>
  );
}

export default Users;
