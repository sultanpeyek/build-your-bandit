import './globals.css'

import {DotGothic16} from 'next/font/google'

const dotGothic16 = DotGothic16({
  weight: ['400'],
  subsets: ['latin'],
  display: 'block',
})
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={dotGothic16.className}>{children}</body>
    </html>
  )
}
