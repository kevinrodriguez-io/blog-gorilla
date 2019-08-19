import React from 'react';
import Error from 'next/error';
import Parallax from 'react-css-parallax';
import { Segment } from 'semantic-ui-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Head from '../../../../../components/Head';
import Nav from '../../../../../components/Nav';
import Posts from '../../../../../components/Posts';
import blog from '../../../../../lib/api/blog';
import getLangFromQuery from '../../../../../lib/query/getLangFromQuery';

const Index = ({ lang, post, entries, statusCode }) => {
  if (statusCode === 404) return <Error statusCode={404} />;
  const { featuredImage, title, body, shortDescription } = post.fields;
  return (
    <>
      <Head
        title={title}
        description={shortDescription}
        ogImage={featuredImage.fields.file.url}
      />
      <Parallax
        src={featuredImage.fields.file.url}
        alt={featuredImage.fields.description}
        height="400px">
        <Nav lang={lang} />
        <section className="grid-absolute-center">
          <h1>{title}</h1>
        </section>
      </Parallax>
      <Segment basic>{documentToReactComponents(body)}</Segment>
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

Index.getInitialProps = async ({ res, query }) => {
  const { slug } = query;
  const { lang, locale } = getLangFromQuery({ query });
  try {
    const [entries, post] = await Promise.all([
      blog.fetchAllBlogPosts(locale),
      blog.getBlogPostBySlug(locale, slug),
    ]);
    return { lang, post, entries };
  } catch (error) {
    if (error.message === 'There are no posts for that slug') {
      res.statusCode = 404;
      return { statusCode: 404 };
    }
  }
};

export default Index;
