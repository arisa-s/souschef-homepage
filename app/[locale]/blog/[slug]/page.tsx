import { PortableText, SanityDocument } from "next-sanity";
import Link from "next/link";
import { LocaleOptions } from "@/constants";
import { getPost, getPostSlugs } from "@/repo/post";
import { getImageUrlFor } from "@/sanity/lib/image";

type BlogpostProps = {
  params: Promise<{ locale: LocaleOptions; slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPostSlugs();
  return posts.map((post: SanityDocument) => ({
    locale: post.language,
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: BlogpostProps) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  const postImageUrl = post.image
    ? getImageUrlFor(post.image)?.width(550).height(310).url()
    : null;

  return {
    title: post.title,
    description: post.description,
    image: postImageUrl,
  };
}

export default async function PostPage({ params }: BlogpostProps) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  const postImageUrl = post.image
    ? getImageUrlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
