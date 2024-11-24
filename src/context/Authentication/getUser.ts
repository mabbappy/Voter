import { refresh_api } from "@/config/config";


export default async function getUser() {
    try {
        const res = await fetch(refresh_api, {
            method: "POST",
            body: JSON.stringify({}),
            cache: 'default'
        })
        const data = await res.json();

        if (data?.success) {
            return {
                user_info: data?.result?.[0],
                isLoggedIn: data?.isLoggedIn,
                role: data?.role
            }
        }
        else {
            return {
                user_info: null,
                isLoggedIn: false,
                role: null
            }
        }
    }
    catch {
        return {
            user_info: null,
            isLoggedIn: false,
            role: null
        }
    }
}