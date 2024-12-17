import { type SanityDocument } from "next-sanity";
import { getImageUrlFor, sanityClient } from "@/lib/sanity";
import { LocaleOptions } from "@/constants";
import BlogGrid from "@/components/shared/BlogGrid";
import initTranslations from "@/lib/i18n";
import { setI18n } from "@/serverContexts";

const POSTS_QUERY = `*[
  _type == "blogpost" && language == $language
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, tags}`;

const options = { next: { revalidate: 30 } };

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: LocaleOptions }>;
}) {
  const { locale } = await params;
  const posts = await sanityClient.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {
      language: locale,
    },
    options
  );

  const { i18n, t } = await initTranslations(locale, ["blog"]);
  setI18n(i18n);

  const stripBlogpostData = (post: SanityDocument) => ({
    title: post.title,
    slug: post.slug.current,
    image:
      getImageUrlFor(post.image)?.width(500).height(500).url() ||
      "/images/blog-fallback.png",
    tags: post.tags,
  });

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen">
      <main className="w-full items-center sm:items-start divide-y">
        <div className="flex items-center p-6">
          <h1 className="font-accent font-medium text-3xl">{t("pageTitle")}</h1>
        </div>
        <BlogGrid posts={posts.map((p) => stripBlogpostData(p))} />
      </main>
    </div>
  );
}
