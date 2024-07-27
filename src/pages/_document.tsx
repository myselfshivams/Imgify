
import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          /* Gradient background */
          body {
            background: linear-gradient(to right, #ff7e5f, #feb47b); /* Example gradient */
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}