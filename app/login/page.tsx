'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Home.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        setError('Неверный пароль');
      }
    } catch (err) {
      setError('Ошибка подключения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main} data-lk-theme="default">
      <div className="header">
        <h1>Вход в систему</h1>
      </div>
      <form onSubmit={handleLogin} className={styles.tabContent}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="lk-button"
            style={{ padding: '0.5rem 1rem' }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </div>
      </form>
    </main>
  );
}