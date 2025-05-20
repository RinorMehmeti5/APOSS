// File: src/app/blog/page.tsx (Server Component)
import { getAllPosts } from "../../../lib/posts-server";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  // Get all posts on the server
  const posts = getAllPosts();

  // Pass them to client component
  return <BlogClient posts={posts} />;
}
