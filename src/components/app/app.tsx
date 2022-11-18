import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../header';
import Users from '../users';
import LoginForm from '../login-form';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import styles from './app.module.css';

export default function App() {
  const { name, loading } = useTypedSelector((state) => ({
    ...state.auth,
    loading: state.auth.loading || state.users.loading,
  }));
  const { register, logout } = useActions();

  return (
    <div className={styles.app}>
      <Header authName={name} loading={loading} logout={logout} />
      <div className={styles.content}>
        <Routes>
          <Route path='/users/*' element={name ? <Users /> : <Navigate to={'/login'} replace />} />
          <Route path='/error' element={<h2>Something went wrong</h2>} />
          <Route path='/login' element={<LoginForm onSubmit={register} />} />
          <Route path='/*' element={<Navigate to={'/users'} replace />} />
        </Routes>
      </div>
    </div>
  );
}
