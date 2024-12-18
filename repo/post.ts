import { LocaleOptions } from "@/constants";
import { sanityClient } from "@/sanity/lib/client";
import { defineQuery, SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[
    _type == "blogpost" && language == $language
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, tags}`;


export const getPosts = async (language: LocaleOptions) => {
    const posts = await sanityClient.fetch<SanityDocument[]>(
        POSTS_QUERY,
        {
          language
        },
      );
      return posts
};

const POST_QUERY = `*[_type == "blogpost" && slug.current == $slug && language == $locale][0]`;

export const getPost = async (language: LocaleOptions, slug: string) => {
    const post = await sanityClient.fetch<SanityDocument>(
        POST_QUERY,
        {
          slug,
          locale: language
        },
      );
      return post
};

const POST_SLUGS_QUERY = defineQuery(`*[
    _type == "blogpost" && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, slug, language}`);


export const getPostSlugs = async () => {
    const slugs = await sanityClient.fetch<SanityDocument>(
        POST_SLUGS_QUERY,
      );
      return slugs
};