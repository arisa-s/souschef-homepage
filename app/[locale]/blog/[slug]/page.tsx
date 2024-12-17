import { PortableText } from "next-sanity";
import Link from "next/link";
import { LocaleOptions } from "@/constants";
import { getPost } from "@/repo/post";
import { getImageUrlFor } from "@/sanity/lib/image";

type BlogpostParams = Promise<{ locale: LocaleOptions; slug: string }>;

export default async function PostPage({ params }: { params: BlogpostParams }) {
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

export async function generateMetadata({ params }: { params: BlogpostParams }) {
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
