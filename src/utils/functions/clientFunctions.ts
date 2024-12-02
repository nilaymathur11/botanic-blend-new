import Cookies from 'js-cookie'
import { supabase } from '../supabase/supabaseClient';

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Ensure this exists
    formData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Cloudinary upload failed: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.secure_url; // Return the uploaded file's URL
}

export const setCookie = (name: string, value: string, expires?: number) => {
    Cookies.set(name, value, { expires: expires ? new Date(expires * 1000) : undefined, secure: true, sameSite: 'strict' })
}

export const getCookie = (name: string) => {
    return Cookies.get(name)
}

export const removeCookie = (name: string) => {
    Cookies.remove(name)
}

export const setSessionCookies = (session: any) => {
    setCookie('sb-access-token', session.access_token, session.expires_at)
    setCookie('sb-refresh-token', session.refresh_token)
    setCookie('sb-user-id', session.user.id)
}

export const clearSessionCookies = () => {
    removeCookie('sb-access-token')
    removeCookie('sb-refresh-token')
    removeCookie('sb-user-id')
}

export const refreshAccessToken = async () => {
    const refreshToken = getCookie('sb-refresh-token')
    if (!refreshToken) {
        throw new Error('No refresh token available')
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
    if (error) {
        clearSessionCookies()
        throw error
    }

    setSessionCookies(data.session)
    return data.session
}

export const checkAuth = async () => {
    const accessToken = getCookie('sb-access-token')
    if (!accessToken) {
        return null
    }

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user) {
        try {
            const session = await refreshAccessToken()
            return session
        } catch (error) {
            clearSessionCookies()
            return null
        }
    }

    return { user, access_token: accessToken }
}

export const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error

    setSessionCookies(data.session)
    return data.session
}