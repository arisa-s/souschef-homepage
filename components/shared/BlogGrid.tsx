import { getI18n } from "@/serverContexts";
import { BlogPostCard, BlogType } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface BlogGridProps {
  posts: BlogPostCard[];
}

export const BlogGrid: FC<BlogGridProps> = ({ posts }) => {
  const totalPosts = posts.length;
  const lastRowIndexStart = totalPosts - (totalPosts % 3 || 3);
  const { t } = getI18n();

  return (
    <div className="px-40">
      <div className="grid grid-cols-3">
        {posts.map((post, index) => {
          const isFirstColumn = index % 3 === 0;
          const isLastRow = index >= lastRowIndexStart;
          const borderClass = `${isFirstColumn ? "border-l" : ""} border-r ${
            isLastRow ? "" : "border-b"
          } border-gray-300`;

          return (
            <Link href={`/blog/${post.slug}`}>
              <div
                key={index}
                className={`p-6 space-y-4 hover:bg-surface-hover cursor-pointer ${borderClass}`}
              >
                {post.tags?.map((tag: BlogType, index: number) => (
                  <p
                    className="font-accent text-secondary uppercase"
                    key={index}
                  >
                    {t(`${tag}Tag`)}
                  </p>
                ))}
                <Image
                  src={post.image || "/images/blog-fallback.png"}
                  alt={`${post.title} head image`}
                  width={500}
                  height={500}
                  layout="responsive"
                />
                <div>
                  <label className="font-medium capitalize">{post.title}</label>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogGrid;
