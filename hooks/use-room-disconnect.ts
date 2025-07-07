import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRoomContext } from '@livekit/components-react';

export function useRoomDisconnect(botName?: string) {
  const router = useRouter();
  const room = useRoomContext();

  const shutdownBot = async () => {
    if (!botName) return;
    
    try {
      await fetch('/api/shutdown-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botName }),
      });
      console.log('Bot shutdown initiated');
    } catch (error) {
      console.error('Failed to shutdown bot:', error);
    }
  };

  useEffect(() => {
    if (!room || !botName) return;

    const handleDisconnect = async () => {
      console.log('Room disconnected, shutting down bot...');
      await shutdownBot();
      // Navigate back to bot selection after short delay
      setTimeout(() => {
        router.push('/');
      }, 1000);
    };

    // Listen for room disconnect events
    room.on('disconnected', handleDisconnect);

    // Handle page unload as backup
    const handleBeforeUnload = () => {
      if (botName) {
        // Use navigator.sendBeacon for reliable delivery on page unload
        navigator.sendBeacon('/api/shutdown-bot', JSON.stringify({ botName }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      room.off('disconnected', handleDisconnect);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [room, botName, router]);

  const leaveRoom = async () => {
    console.log('Manual leave room triggered');
    await shutdownBot();
    router.push('/');
  };

  return { leaveRoom };
}