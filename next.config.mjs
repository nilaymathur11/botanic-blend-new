/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NEXT_PUBLIC_SUPABASE_URL: 'https://pmyypugnbterdozyngvs.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBteXlwdWduYnRlcmRvenluZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNDA5NjEsImV4cCI6MjA0MDkxNjk2MX0.KZVYntkxjeL3LiV-vPpsOERQ5tkBbNwaI8cvhtrput0'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'assets.unmarshal.io',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
