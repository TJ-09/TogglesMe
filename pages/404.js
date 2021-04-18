import Head from 'next/head';
import Link from "next/link";

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>Toggles Me</title>
                <meta name="description" content='Create and share funny toggles with your friends'></meta>
                <meta property="og:title" content='Toggles Me' />
                <meta property="og:type" content='website' />
                <meta property="og:url" content='toggles.me' />
                <meta property="og:image" content="/apple-touch-icon.png" />
                <meta property="og:description" content='Create funny toggles and share with your friends' />
                <meta property="og:site_name" content="Toggles Me" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta charSet="UTF-8"></meta>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <main className="bg-gradient-to-b from-indigo-300 to-purple-400 relative min-h-screen">

                <div className="container mx-auto px-4 py-16 max-w-6xl">

                    <div className="flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-700 shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
                        <h1 className="px-4 py-4 text-2xl sm:text-7xl font-sniglet font-extrabold text-center text-purple-900">
                            Toggles Me 404</h1>
                        <h3 className="px-4 pb-4 text-lg font-sniglet hover:text-indigo-700 focus:text-indigo-700 font-normal text-center text-purple-500">
                            <Link href='/'>
                                <a> Sorry just the one page! Go Home? Click here!</a>
                            </Link>
                        </h3>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Custom404;