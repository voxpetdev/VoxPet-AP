import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
    const user = await request.json()

    const API_BASE_URL = import.meta.env.API_BASE_URL
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies.get('access_token')?.value}` },
            body: JSON.stringify(user)
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), { status: data.code })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
    }
}