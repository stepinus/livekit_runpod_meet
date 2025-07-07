import { NextRequest, NextResponse } from 'next/server';

const HARDCODED_PASSWORD = process.env.AUTH_PASSWORD || 'your-secret-password';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === HARDCODED_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie for authentication
      response.cookies.set('auth-token', HARDCODED_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}