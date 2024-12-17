import { type SanityDocument } from "next-sanity";
import { LocaleOptions } from "@/constants";
import BlogGrid from "@/components/shared/BlogGrid";
import initTranslations from "@/lib/i18n";
import { setI18n } from "@/serverContexts";
import { getPosts } from "@/repo/post";
import { getImageUrlFor } from "@/sanity/lib/image";

type BlogParams = Promise<{ locale: LocaleOptions }>;

export default async function Blog({ params }: { params: BlogParams }) {
  const { locale } = await params;
  const posts = await getPosts(locale);

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

export async function generateMetadata({ params }: { params: BlogParams }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["blog", "layout"]);
  return {
    title: t("blog:pageTitle"),
    description: t("blog:pageDescription"),
  };
}
