import { supabase } from '@/utils/supabase/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId, productId, quantity } = await request.json();

  const { data, error } = await supabase
    .from('orders')
    .insert([
      { user_id: userId, product_id: productId, quantity, status: 'pending' },
    ]);

  if (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Error adding to cart' }, { status: 500 });
  }

  return NextResponse.json(data);
}