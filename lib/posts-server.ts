// File: lib/posts-server.ts
// This file contains server-side functions that use fs/path

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata, PostData } from "./posts-utils";

// Define the posts directory
const postsDirectory = path.join(process.cwd(), "posts");

// Function to get all post slugs
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

// Function to get post metadata by slug (without full content)
export function getPostMetadataBySlug(slug: string): PostMetadata {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data } = matter(fileContents);

  // Ensure the data matches our PostMetadata interface
  return {
    title: data.title || "",
    date: data.date || "",
    excerpt: data.excerpt || "",
    slug: slug,
    featuredImage: data.featuredImage || "",
    author: data.author || "",
  };
}

// Function to get all posts metadata
export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostMetadataBySlug(slug))
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

// Function to get a complete post by slug (including content)
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata and content
    const { data, content } = matter(fileContents);

    // Return the post data with content
    return {
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      slug,
      featuredImage: data.featuredImage || "",
      author: data.author || "",
      content, // This is the raw markdown content
    };
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    return null;
  }
}

// Function to get all static paths for SSG
export function getAllPostSlugs() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
