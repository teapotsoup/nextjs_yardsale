import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="ko">
                <Head>
                    <link rel="icon" type="image/x-icon" href="../public/favicon.ico"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className={'bg-gray-900'}>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;