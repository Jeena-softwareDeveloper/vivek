import { NextResponse } from 'next/server';

export async function POST() {
  // Client-side will just discard the token, but we can provide a success response here.
  // If we were using cookies, we would clear the cookie here.
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
