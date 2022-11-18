import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Filters from '../filters';
import styles from './user-list.module.css';
import { IUser } from '../../types/user';

interface UserListProps {
  users: IUser[];
}

function UserList({ users }: UserListProps) {
  const [search, setSearch] = useState('');
  const displayed = useMemo(
    () => users.filter((user) => user.name.toLocaleLowerCase().indexOf(search) >= 0), // filter by search
    [users, search]
  );

  if (!users.length) return <>Please wait for data loading</>;

  return (
    <div className={styles.navigation}>
      <Filters onSearchChange={setSearch} />
      <div className={styles.list} data-testid='user-list'>
        {displayed.map(({ id, name, postIds }) => (
          <NavLink
            to={`/users/${id}`}
            key={id}
            className={({ isActive }) => styles.item + (isActive ? ` ${styles.active}` : '')}
            data-testid='user'
          >
            <span className={styles.name}>{name}</span>
            <span className={styles.counter}>{postIds.length}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default UserList;
