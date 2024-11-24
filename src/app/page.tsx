import { getUserServerComponent } from "@/hooks/getUserServerComponent";
import { redirect } from "next/navigation";


export default async function Home() {
  const data = await getUserServerComponent()
  let isLoggedIn = await (data?.isLoggedIn && Boolean(data.role))

  if (isLoggedIn) {
    return redirect('/dashboard')
  }
  else {
    return redirect('/account/login')
  }
}
