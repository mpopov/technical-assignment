import { useState } from 'react';
import { IAuthData } from '../../types/auth';
import styles from './login-form.module.css';

interface LoginFormProps {
  onSubmit: (authData: IAuthData) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Bad Input');
    } else {
      setError('');
      onSubmit({ name, email });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.loginFormItem}>
            <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.loginFormItem}>
            <input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <button type='submit'>GO</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
