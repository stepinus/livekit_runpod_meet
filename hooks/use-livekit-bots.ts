import { useListPods, useStartPod, useStopPod } from './runpod-hooks';
import { Pod } from '../types/runpod';

export interface LiveKitBot {
  id: string;
  name: string;
  status: 'RUNNING' | 'EXITED' | 'TERMINATED';
  podId: string;
  ready: boolean;
}

export function useLiveKitBots() {
  // Get all pods from RunPod
  const { data: podsData, isLoading, error, refetch } = useListPods();

  // Filter pods with 'livekit_' prefix
  const liveKitBots: LiveKitBot[] = (podsData || [])
    .filter((pod: Pod) => pod.name?.startsWith('livekit_'))
    .map((pod: Pod) => ({
      id: pod.id,
      name: pod.name || 'Unknown Bot',
      status: pod.desiredStatus || 'TERMINATED',
      podId: pod.id,
      ready: pod.desiredStatus === 'RUNNING' && pod.lastStartedAt != null,
    }));

  return {
    bots: liveKitBots,
    isLoading,
    error,
    refetch,
  };
}

export function useBotControl(podId: string) {
  const startPod = useStartPod();
  const stopPod = useStopPod();

  const wakeUp = () => {
    startPod.mutate(podId);
  };

  const shutdown = () => {
    stopPod.mutate(podId);
  };

  return {
    wakeUp,
    shutdown,
    isWaking: startPod.isPending,
    isStopping: stopPod.isPending,
  };
}