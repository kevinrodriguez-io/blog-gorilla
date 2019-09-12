import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import getLangFromQuery from '../lib/query/getLangFromQuery';

class BlogDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...getLangFromQuery(ctx) };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default BlogDocument;
