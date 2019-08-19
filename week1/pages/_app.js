import React from 'react';
import App, { Container } from 'next/app';
import Error from 'next/error';

import { VALID_LANGS } from '../lib/translations/validLangs';

import 'fomantic-ui-css/semantic.min.css';
import './colors.css';
import './styles.css';

class BlogApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    BlogApp.AddValidLangPropToPageProps(ctx, pageProps);
    if (pageProps && pageProps.invalidLang) ctx.res.statusCode = 404;
    return { pageProps };
  }

  static AddValidLangPropToPageProps(ctx, pageProps) {
    if (!pageProps) return;
    pageProps.invalidLang =
      ctx.query.lang && VALID_LANGS.indexOf(ctx.query.lang) === -1;
  }

  render() {
    const { Component, pageProps } = this.props;
    if (pageProps && pageProps.invalidLang)
      return (
        <Error
          statusCode={404}
          title="Sorry, but our blog is not available in that language yet"
        />
      );
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default BlogApp;
