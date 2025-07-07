// Simple RunPod API types
export interface Pod {
  id: string;
  name?: string;
  desiredStatus?: 'RUNNING' | 'EXITED' | 'TERMINATED';
  lastStartedAt?: string;
  lastStatusChange?: string;
  publicIp?: string;
  ports?: string[];
  consumerUserId?: string;
  containerDiskInGb?: number;
  costPerHr?: number;
  createdAt?: string;
  env?: Record<string, string>;
  gpuCount?: number;
  imageName?: string;
  machine?: Record<string, any>;
  machineId?: string;
  memoryInGb?: number;
  portMappings?: any;
  templateId?: string;
  vcpuCount?: number;
  volumeInGb?: number;
  volumeMountPath?: string;
}

export type PodsResponse = Pod[];

export interface CreatePodRequest {
  name: string;
  templateId: string;
  containerDiskInGb?: number;
  gpuCount?: number;
  gpuTypeId?: string;
}

export interface PodResponse {
  id: string;
  message?: string;
}