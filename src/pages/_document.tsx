import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [...initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
        
          <link rel="icon" href="/imgify.png" />
      
          <link rel="icon" type="image/png" href="/imgify.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/imgify.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/imgify.png" sizes="96x96" />
          <link rel="apple-touch-icon" href="/imgify.png" />
          <meta name="msapplication-TileImage" content="/imgify.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;