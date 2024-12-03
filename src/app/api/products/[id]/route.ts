import { supabase } from '@/utils/supabase/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
}