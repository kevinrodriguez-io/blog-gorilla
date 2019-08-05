import React from 'react';
import Link from 'next/link';
import { Segment, Card } from 'semantic-ui-react';

const Posts = ({ lang, posts }) => {
  return (
    <Segment basic textAlign="center">
      <h2>Posts</h2>
      <Card.Group centered>
        {posts.map(({ fields, sys }) => (
          <Link
            key={sys.id}
            href="/[lang]/blog/posts/[slug]"
            as={`/${lang}/blog/posts/${fields.slug}`}
            passHref>
            <Card
              raised
              header={fields.title}
              meta={new Date(sys.createdAt).toLocaleDateString([
                'es-CR',
                'en-US',
              ])}
              description={fields.shortDescription}
            />
          </Link>
        ))}
      </Card.Group>
    </Segment>
  );
};

export default Posts;
