import Document, { Html, Head, Main, NextScript } from 'next/document'

class HomepageDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <script async defer data-domain="toggles.me" src="https://stats.toggles.me/js/plausible.js"></script>
                </Head>
                <body className='antialiased'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default HomepageDocument