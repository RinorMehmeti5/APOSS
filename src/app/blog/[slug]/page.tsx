// File: src/app/blog/[slug]/page.tsx (Server Component)
import { getPostBySlug, getAllPostSlugs } from "../../../../lib/posts-server";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

// Define params interface
interface Params {
  slug: string;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "This blog post could not be found.",
      };
    }

    return {
      title: `${post.title} | APOS Solutions Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "View this blog post on APOS Solutions",
    };
  }
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

// Blog post page component with proper Next.js App Router typing
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // Get the post data on the server
    const post = await getPostBySlug(params.slug);

    // Handle not found case
    if (!post) {
      notFound();
    }

    // Pass the post data to the client component
    return <BlogPostClient post={post} />;
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
