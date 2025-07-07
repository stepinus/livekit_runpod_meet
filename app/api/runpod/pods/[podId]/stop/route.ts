import { NextRequest, NextResponse } from 'next/server';

const RUNPOD_API_BASE = 'https://rest.runpod.io/v1';

async function runpodFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const apiKey = process.env.RUNPOD_API_KEY;
  
  if (!apiKey) {
    throw new Error('RunPod API key not configured');
  }

  const response = await fetch(`${RUNPOD_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`RunPod API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// POST /api/runpod/pods/[podId]/stop - Stop a pod
export async function POST(request: NextRequest, { params }: { params: Promise<{ podId: string }> }) {
  try {
    const { podId } = await params;

    const data = await runpodFetch(`/pods/${podId}/stop`, {
      method: 'POST',
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error stopping pod:', error);
    return NextResponse.json(
      { error: 'Failed to stop pod', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}