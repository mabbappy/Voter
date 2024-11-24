import { refresh_api } from "@/config/config";
import { cookies } from "next/headers";

export async function getUserServerComponent() {
    try {
        const ref_tkn: any = cookies().get('ref_tkn')?.value
        const res = await fetch(refresh_api, {
            method: "POST",
            body: JSON.stringify({}),
            cache: 'force-cache',
            headers: {
                ref_tkn: ref_tkn
            }
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