import getConfig from 'next/config';
import { createClient } from 'contentful';

const {
  CTF_SPACE_ID: space,
  CTF_CDA_ACCESS_TOKEN: accessToken,
} = getConfig().publicRuntimeConfig;

const blog = createClient({ space, accessToken });

blog.fetchAllBlogPosts = async (locale, light = true) => {
  const params = { content_type: 'blogPost', locale };
  if (light) params.select = 'fields.title,fields.slug,fields.shortDescription';
  const entries = await blog.getEntries(params);
  return entries.items;
};

blog.getBlogPostBySlug = async (locale, slug) => {
  const blogPost = await blog.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    locale,
  });
  if (blogPost.total === 0) throw new Error('There are no posts for that slug');
  return blogPost.items[0];
};

export default blog;
