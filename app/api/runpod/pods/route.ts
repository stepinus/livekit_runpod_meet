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

// GET /api/runpod/pods - List all pods
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const computeType = searchParams.get('computeType');
    
    let endpoint = '/pods';
    const params = new URLSearchParams();
    
    if (computeType) {
      params.append('computeType', computeType);
    }
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    const data = await runpodFetch(endpoint);
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pods', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/runpod/pods - Create a new pod
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = await runpodFetch('/pods', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating pod:', error);
    return NextResponse.json(
      { error: 'Failed to create pod', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}