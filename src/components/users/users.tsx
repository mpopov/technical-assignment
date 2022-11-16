import { useMemo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Posts from '../posts';
import Filters from '../filters';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/user-typed-selector';
import { useActions } from '../../hooks/use-actions';
import styles from './users.module.css';
import navItemStyles from './nav-item.module.css';

function Users() {
  const { loading, loaded, entities: users } = useTypedSelector((state) => state.users);
  const { loadData } = useActions();

  useEffect(() => {
    if (!loading && !loaded) loadData();
  }, [loading, loaded, loadData]);

  const [search, setSearch] = useState('');
  const usersList = useMemo(() => Object.values(users), [users]);
  const displayed = useMemo(
    () => usersList.filter((user) => user.name.toLocaleLowerCase().indexOf(search) >= 0), // filter by search
    [usersList, search]
  );

  const match = useMatch('/users/:id');
  const userId = match?.params.id || '';
  const postIds = useMemo(() => users[userId]?.postIds || [], [users, userId]);

  if (!usersList.length) return <>Please wait for data loading</>;

  return (
    <div className={styles.users}>
      <div className={styles.navigation}>
        <Filters onSearchChange={setSearch} />
        <div className={styles.list}>
          {displayed.map(({ id, name, postIds }) => (
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
      </div>
      <Routes>
        <Route path='/:id' element={<Posts postIds={postIds} key={userId} />} />
        <Route path='' element={<Navigate to={`/users/${usersList[0].id}`} />} />
      </Routes>
    </div>
  );
}

export default Users;
