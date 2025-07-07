import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pod, PodsResponse, CreatePodRequest, PodResponse } from '../types/runpod';

async function runpodFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(`/api/runpod${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// List all pods
export function useListPods() {
  return useQuery<PodsResponse>({
    queryKey: ['pods'],
    queryFn: () => runpodFetch('/pods'),
    refetchInterval: 10000, // Refresh every 10 seconds
    refetchOnWindowFocus: true,
  });
}

// Get single pod
export function useGetPod(podId: string) {
  return useQuery<Pod>({
    queryKey: ['pod', podId],
    queryFn: () => runpodFetch(`/pods/${podId}`),
    enabled: !!podId,
    refetchInterval: 5000,
  });
}

// Start pod
export function useStartPod() {
  const queryClient = useQueryClient();
  
  return useMutation<PodResponse, Error, string>({
    mutationFn: (podId: string) => 
      runpodFetch(`/pods/${podId}/start`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pods'] });
    },
  });
}

// Stop pod
export function useStopPod() {
  const queryClient = useQueryClient();
  
  return useMutation<PodResponse, Error, string>({
    mutationFn: (podId: string) => 
      runpodFetch(`/pods/${podId}/stop`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pods'] });
    },
  });
}

// Create pod
export function useCreatePod() {
  const queryClient = useQueryClient();
  
  return useMutation<PodResponse, Error, CreatePodRequest>({
    mutationFn: (data: CreatePodRequest) => 
      runpodFetch('/pods', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pods'] });
    },
  });
}