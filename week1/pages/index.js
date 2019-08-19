import React from 'react';
import Parallax from 'react-css-parallax';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Posts from '../components/Posts';

import blog from '../lib/api/blog';
import local from '../lib/api/local';
import getLangFromQuery from '../lib/query/getLangFromQuery';

const Index = ({ lang, entries, t }) => {
  return (
    <>
      <Head
        title={t['blogTitle']}
        description={t['blogSubtitle']}
        ogImage="/static/darkSea.jpg"
      />
      <Parallax src="/static/darkSea.jpg" alt="Dark sea" height="400px">
        <Nav lang={lang} />
        <section className="grid-absolute-center">
          <h1>{t['blogTitle']}</h1>
          <p>{t['blogSubtitle']}</p>
          <p>Lang: {lang}</p>
        </section>
      </Parallax>
      <Posts lang={lang} posts={entries} />
      <style jsx>{`
        section h1,
        p {
          color: var(--flat-white-light);
          text-align: center;
        }
        .ma-1em {
          margin: 1em;
        }
      `}</style>
    </>
  );
};

Index.getInitialProps = async ({ query }) => {
  const { lang, locale } = getLangFromQuery({ query });
  try {
    const [entries, translation] = await Promise.all([
      blog.fetchAllBlogPosts(locale),
      local.fetchTranslation(lang, 'common'),
    ]);
    return { lang, entries, t: translation };
  } catch (error) {
    throw error;
  }
};

export default Index;
