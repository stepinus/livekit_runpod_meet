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

// GET /api/runpod/pods/[podId] - Get specific pod
export async function GET(request: NextRequest, { params }: { params: Promise<{ podId: string }> }) {
  try {
    const { podId } = await params;
    const { searchParams } = new URL(request.url);
    
    let endpoint = `/pods/${podId}`;
    const queryParams = new URLSearchParams();
    
    // Add optional query parameters
    if (searchParams.get('includeMachine')) {
      queryParams.append('includeMachine', searchParams.get('includeMachine')!);
    }
    if (searchParams.get('includeNetworkVolume')) {
      queryParams.append('includeNetworkVolume', searchParams.get('includeNetworkVolume')!);
    }
    if (searchParams.get('includeSavingsPlans')) {
      queryParams.append('includeSavingsPlans', searchParams.get('includeSavingsPlans')!);
    }
    
    if (queryParams.toString()) {
      endpoint += `?${queryParams.toString()}`;
    }

    const data = await runpodFetch(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pod:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pod', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}