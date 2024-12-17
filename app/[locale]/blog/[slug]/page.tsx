import { PortableText, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { getImageUrlFor, sanityClient } from "@/lib/sanity";
import { LocaleOptions } from "@/constants";

const POST_QUERY = `*[_type == "blogpost" && slug.current == $slug && language == $locale][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string; locale: LocaleOptions };
}) {
  const post = await sanityClient.fetch<SanityDocument>(
    POST_QUERY,
    params,
    options
  );
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
