import React from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import '../css/main.css'
import Script from 'next/script'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    const title = `Bitcoin Node Service Provider`

    const description =
        'Sathub provides four types of services, namely: Jsonrpc, Restful, Zmq, Wss; Contain bitcoin mainnet/testnet and lightning node service'

    const url = 'http://sathub.io/'

    const image = `https://static.justboil.me/templates/one/repo-tailwind-react.png`

    const imageWidth = '1920'

    const imageHeight = '960'

    return (
        <Provider store={store}>
            {getLayout(
                <>
                    <Head>
                        <meta name="description" content={description} />

                        <meta property="og:url" content={url} />
                        <meta property="og:site_name" content="sathub.io" />
                        <meta property="og:title" content={title} />
                        <meta property="og:description" content={description} />
                        <meta property="og:image" content={image} />
                        <meta property="og:image:type" content="image/png" />
                        <meta property="og:image:width" content={imageWidth} />
                        <meta property="og:image:height" content={imageHeight} />

                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:title" content={title} />
                        <meta property="twitter:description" content={description} />
                        <meta property="twitter:image:src" content={image} />
                        <meta property="twitter:image:width" content={imageWidth} />
                        <meta property="twitter:image:height" content={imageHeight} />

                        <link rel="icon" href="/sathub/favicon.png" />
                    </Head>

                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-HDJNKKEGWD"
                    />

                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-HDJNKKEGWD');
                        `}
                    </Script>

                   <Component {...pageProps} />
                </>
            )}
        </Provider>
    )
}

export default MyApp
