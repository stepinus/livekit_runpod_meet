import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and form data (from sendBeacon)
    let botName: string;
    
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const body = await request.json();
      botName = body.botName;
    } else {
      // Handle sendBeacon data
      const text = await request.text();
      try {
        const body = JSON.parse(text);
        botName = body.botName;
      } catch {
        // Fallback - assume text is botName directly
        botName = text;
      }
    }

    if (!botName) {
      return NextResponse.json({ error: 'Bot name is required' }, { status: 400 });
    }

    // Find the pod by name (assuming botName is the pod name without prefix)
    const fullPodName = botName.startsWith('livekit_') ? botName : `livekit_${botName}`;
    
    // First, get the list of pods to find the one with the matching name
    const podsResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/runpod/pods`);

    if (!podsResponse.ok) {
      throw new Error('Failed to fetch pods');
    }

    const pods = await podsResponse.json();
    
    const targetPod = pods.find((pod: any) => pod.name === fullPodName);
    
    if (!targetPod) {
      return NextResponse.json({ error: 'Pod not found' }, { status: 404 });
    }

    // Stop the pod using our internal API
    const stopResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/runpod/pods/${targetPod.id}/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!stopResponse.ok) {
      throw new Error('Failed to stop pod');
    }

    return NextResponse.json({ success: true, message: 'Bot shutdown initiated' });
  } catch (error) {
    console.error('Error shutting down bot:', error);
    return NextResponse.json({ error: 'Failed to shutdown bot' }, { status: 500 });
  }
}