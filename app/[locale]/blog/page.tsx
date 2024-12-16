import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import { LocaleOptions } from "@/constants";

const POSTS_QUERY = `*[
  _type == "blogpost" && language == $language
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

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

  console.log(locale);

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen">
      <main className="flex flex-col flex-grow gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold font-accent mb-8">Posts</h1>

        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => (
            <li className="hover:underline" key={post._id}>
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
