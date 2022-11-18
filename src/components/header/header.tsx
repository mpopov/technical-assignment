import styles from './header.module.css';
import Loader from '../loader';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  authName?: string;
  loading: boolean;
  logout: () => void;
}

function Header({ authName, loading, logout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>
        <NavLink to='/'>Posts Reader</NavLink>
      </h1>
      <div className={styles.sideMenu}>
        <span>{authName && `Logged as ${authName}`}</span>
        {authName && <input type='button' value='Logout' onClick={logout} className={styles.sideMenuBtn} />}
      </div>
      {loading && <div className={styles.loader} data-testid='loader'><Loader /></div>}
    </header>
  );
}

export default Header;
