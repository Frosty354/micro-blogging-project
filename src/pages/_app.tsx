import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Header from '@/Components/Header'


export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <Header/>
    <Component {...pageProps} />
  </SessionProvider>
}
