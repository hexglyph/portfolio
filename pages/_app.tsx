import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../data/context/AppContext'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
      
    </AppProvider>
  )
}

export default MyApp
