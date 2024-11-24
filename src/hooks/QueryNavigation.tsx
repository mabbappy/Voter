'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function QueryNavigation() {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const navigate = (props: { name: string, value: string }[]) => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        props.map((r) => {
            current.set(r.name, r.value)
        })
        router.push(`${pathname}?${current.toString()}`);
    }
    return navigate
}