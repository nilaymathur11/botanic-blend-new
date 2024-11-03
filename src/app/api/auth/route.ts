import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function POST(request: Request) {
  const { action, email, password } = await request.json();

  switch (action) {
    case 'signIn':
      return handleSignIn(email, password);
    case 'signUp':
      return handleSignUp(email, password);
    case 'signOut':
      return handleSignOut();
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

async function handleSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error signing in:', error);
    return NextResponse.json({ error: 'Error signing in' }, { status: 500 });
  }

  return NextResponse.json({ user: data.user, session: data.session });
}

async function handleSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Error signing up:', error);
    return NextResponse.json({ error: 'Error signing up' }, { status: 500 });
  }

  return NextResponse.json({ user: data.user, session: data.session });
}

async function handleSignOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return NextResponse.json({ error: 'Error signing out' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Signed out successfully' });
}