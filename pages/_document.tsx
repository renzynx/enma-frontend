import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://backend.renzynx.space" />
        <link rel="preconnect" href="https://ws.renzynx.space" />
        <link rel="preconnect" href="https://cdn.discordapp.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
