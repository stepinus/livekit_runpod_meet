import { QueryClient } from '@tanstack/react-query';

// Configure the default axios client for RunPod API
export const runpodConfig = {
  baseURL: 'https://api.runpod.ai/v2',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

// Create a QueryClient instance with proper configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
    mutations: {
      retry: 1,
    },
  },
});