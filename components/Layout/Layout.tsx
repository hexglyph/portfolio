import Head from "next/head"
import Script from "next/script"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    children: any
}

const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <div id="app" className={`flex flex-col w-full h-full p-0 m-0`}>
            <Head>
                <title>Portfolio</title>
                <meta name="description" content="InspiraSAMPA - Cultura de Inovação" key="desc"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content="Portfolio" />
                <meta name="author" content="Daniel Niemietz Braz" />
                <meta name="robots" content="all" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        
                <meta property="og:title" content="Title" />
                <meta property="og:site_name" content="Title" />
                <meta property="og:url" content="https://" />
                <meta property="og:locale" content="en" />
                <meta property="og:description" content="Portfolio"/>
                <meta property="og:image" content="https://"/>
        
                <link rel="canonical" href="https://" key="canonical" />
                <link rel="icon" href="favicon.ico" />
            </Head>
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                `}
            </Script>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
                strategy="afterInteractive"
            />

            <Header />

            <main className={`flex flex-col w-full h-full`}>
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout