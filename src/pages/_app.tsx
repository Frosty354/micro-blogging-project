import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Header from '@/Components/Header'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { NextPage } from 'next'
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import Script from 'next/script';
import createEmotionCache from '@/utils/CreateEmotionCache'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

export default function App(props: MyAppProps) {
  const { Component, pageProps,emotionCache = clientSideEmotionCache} = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return <CacheProvider value={emotionCache}>
  <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Header/>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  </SessionProvider>
  </CacheProvider>
}
