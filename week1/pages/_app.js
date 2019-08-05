import React from 'react';
import App, { Container } from 'next/app';

import 'fomantic-ui-css/semantic.min.css';
import './colors.css';
import './styles.css';

class BlogApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default BlogApp;
