import React from 'react';
import Parallax from 'react-css-parallax';
import { Segment } from 'semantic-ui-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Nav from '../../../../../components/Nav';
import Posts from '../../../../../components/Posts';
import blog from '../../../../../lib/api/blog';
import getLangFromQuery from '../../../../../lib/query/getLangFromQuery';

const Index = ({ lang, post, entries }) => {
  const { featuredImage, title, body } = post.fields;
  return (
    <>
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

Index.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const { lang, locale } = getLangFromQuery({ query });
  try {
    const [entries, post] = await Promise.all([
      blog.fetchAllBlogPosts(locale),
      blog.getBlogPostBySlug(locale, slug),
    ]);
    return { lang, post, entries };
  } catch (error) {
    console.error(error);
  }
};

export default Index;
