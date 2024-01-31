'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from '@/helpers/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <head>
            <title>FPT Attendance System</title>
         </head>
         <body className={inter.className}>
            <Provider store={store}>
               <div className='bg-white'>{children}</div>
               <ToastContainer />
            </Provider>
         </body>
      </html>
   )
}
