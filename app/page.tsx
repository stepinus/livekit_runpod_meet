'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { useLiveKitBots, useBotControl } from '@/hooks/use-livekit-bots';
import styles from '../styles/Home.module.css';

function BotCard({ bot }: { bot: any }) {
  const router = useRouter();
  const { wakeUp, shutdown, isWaking, isStopping } = useBotControl(bot.podId);

  const handleWakeUp = () => {
    wakeUp();
  };

  const handleEnterRoom = () => {
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://live.stepinus.ru';
    const token = process.env.NEXT_PUBLIC_LIVEKIT_API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODQyOTgwMDgsImlzcyI6IkFQSWlxNEpqRWNETkNRNiIsIm5hbWUiOiJUZXN0IFVzZXIiLCJuYmYiOjE3NDgyOTgwMDgsInN1YiI6InRlc3QtdXNlciIsInZpZGVvIjp7InJvb20iOiJteS1maXJzdC1yb29tIiwicm9vbUpvaW4iOnRydWV9fQ.kAKaDhg0v6PVtuDk3_zwY36dbvLqibpSwLMwHlWmGP4';
    
    const roomUrl = `/custom/?liveKitUrl=${encodeURIComponent(serverUrl)}&token=${encodeURIComponent(token)}&podId=${encodeURIComponent(bot.podId)}`;
    router.push(roomUrl);
  };

  const handleShutdown = () => {
    shutdown();
  };

  return (
    <div className={styles.tabContent} style={{ border: '1px solid #333', borderRadius: '8px', padding: '1rem', margin: '1rem 0' }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{bot.name.replace('livekit_', '')}</h3>
      <p style={{ margin: '0 0 1rem 0', color: '#888' }}>
        Статус: {bot.status === 'RUNNING' ? (bot.ready ? 'Готов' : 'Запускается...') : 'Остановлен'}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(bot.status === 'EXITED' || bot.status === 'TERMINATED') && (
          <button
            className="lk-button"
            onClick={handleWakeUp}
            disabled={isWaking}
            style={{ backgroundColor: '#007bff' }}
          >
            {isWaking ? 'Пробуждение...' : 'Разбудить'}
          </button>
        )}
        
        {bot.status === 'RUNNING' && bot.ready && (
          <button
            className="lk-button"
            onClick={handleEnterRoom}
            style={{ backgroundColor: '#28a745' }}
          >
            Войти в комнату
          </button>
        )}
        
        {bot.status === 'RUNNING' && (
          <button
            className="lk-button"
            onClick={handleShutdown}
            disabled={isStopping}
            style={{ backgroundColor: '#dc3545' }}
          >
            {isStopping ? 'Остановка...' : 'Остановить'}
          </button>
        )}
      </div>
    </div>
  );
}

function BotsPage() {
  const { bots, isLoading, error } = useLiveKitBots();

  if (isLoading) {
    return (
      <div className={styles.tabContent}>
        <p>Загрузка ботов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.tabContent}>
        <p style={{ color: '#dc3545' }}>Ошибка загрузки ботов: {error.message}</p>
      </div>
    );
  }

  if (bots.length === 0) {
    return (
      <div className={styles.tabContent}>
        <p>Нет доступных ботов</p>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          Создайте поды в RunPod с именами, начинающимися с &quot;livekit_&quot;
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <h2>Доступные боты</h2>
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
}

function DemoMeetingTab(props: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const [isWaking, setIsWaking] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isReady, setIsReady] = useState(false);

  const wakeUp = () => {
    setIsWaking(true);
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsWaking(false);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const enterRoom = () => {
    // Use environment variables for auto-login
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://live.stepinus.ru';
    const token = process.env.NEXT_PUBLIC_LIVEKIT_API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODQyOTgwMDgsImlzcyI6IkFQSWlxNEpqRWNETkNRNiIsIm5hbWUiOiJUZXN0IFVzZXIiLCJuYmYiOjE3NDgyOTgwMDgsInN1YiI6InRlc3QtdXNlciIsInZpZGVvIjp7InJvb20iOiJteS1maXJzdC1yb29tIiwicm9vbUpvaW4iOnRydWV9fQ.kAKaDhg0v6PVtuDk3_zwY36dbvLqibpSwLMwHlWmGP4';
    
    if (e2ee) {
      router.push(
        `/custom/?liveKitUrl=${encodeURIComponent(serverUrl)}&token=${encodeURIComponent(token)}#${encodePassphrase(sharedPassphrase)}`
      );
    } else {
      router.push(`/custom/?liveKitUrl=${encodeURIComponent(serverUrl)}&token=${encodeURIComponent(token)}`);
    }
  };

  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };

  return (
    <div className={styles.tabContent}>
      <p style={{ margin: 0 }}>Try LiveKit Meet for free with our live demo project.</p>
      
      {!isReady && !isWaking && (
        <button style={{ marginTop: '1rem' }} className="lk-button" onClick={wakeUp}>
          Разбудить
        </button>
      )}
      
      {isWaking && (
        <button style={{ marginTop: '1rem' }} className="lk-button" disabled>
          Пробуждение... {countdown}
        </button>
      )}
      
      {isReady && (
        <button style={{ marginTop: '1rem' }} className="lk-button" onClick={enterRoom}>
          Войти
        </button>
      )}

      <button style={{ marginTop: '0.5rem' }} className="lk-button" onClick={startMeeting}>
        Start Meeting (Demo)
      </button>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CustomConnectionTab(props: { label: string }) {
  const router = useRouter();

  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const serverUrl = formData.get('serverUrl');
    const token = formData.get('token');
    if (e2ee) {
      router.push(
        `/custom/?liveKitUrl=${serverUrl}&token=${token}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/custom/?liveKitUrl=${serverUrl}&token=${token}`);
    }
  };
  return (
    <form className={styles.tabContent} onSubmit={onSubmit}>
      <p style={{ marginTop: 0 }}>
        Connect LiveKit Meet with a custom server using LiveKit Cloud or LiveKit Server.
      </p>
      <input
        id="serverUrl"
        name="serverUrl"
        type="url"
        placeholder="LiveKit Server URL: wss://*.livekit.cloud"
        required
      />
      <textarea
        id="token"
        name="token"
        placeholder="Token"
        required
        rows={5}
        style={{ padding: '1px 2px', fontSize: 'inherit', lineHeight: 'inherit' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>

      <hr
        style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.15)', marginBlock: '1rem' }}
      />
      <button
        style={{ paddingInline: '1.25rem', width: '100%' }}
        className="lk-button"
        type="submit"
      >
        Connect
      </button>
    </form>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <h1>AI Боты LiveKit</h1>
          <p style={{ color: '#888' }}>
            Управление ботами через RunPod
          </p>
        </div>
        <Suspense fallback="Loading">
          <BotsPage />
        </Suspense>
      </main>
    </>
  );
}
