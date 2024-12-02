import { createClient } from "@supabase/supabase-js";
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

export async function getAuthenticatedClient() {
    const cookieStore = cookies();
    const supabaseToken = cookieStore.get('sb-access-token')?.value;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    const { data, error } = await supabase.auth.getUser(supabaseToken);

    if (!data.user) {
        // Try to refresh the session
        const { data: { session: refreshedSession }, error } = await supabase.auth.refreshSession();

        if (error || !refreshedSession) {
            throw new Error('Authentication failed');
        }
    }

    return supabase;
}