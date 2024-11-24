import '@/app/dashboard/DashboardComponent/dashboard.css';
import { getUserServerComponent } from '@/hooks/getUserServerComponent';

import { redirect } from 'next/navigation';
// import { getUserServerComponent } from '../(authentication)/account/[role]/layout'


export default async function RootLayout(props: {
  children: React.ReactNode,
}) {
  const data = await getUserServerComponent()
  let isLoggedIn = await (data?.isLoggedIn && Boolean(data.role))

  if (isLoggedIn) {
    return redirect('/dashboard')
  }

  return (
    <>
      {
        props?.children
      }
    </>
  )
}
