// File: lib/posts-utils.ts
// This file contains only client-safe utilities and types

// Define TypeScript interface for post metadata
export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  author: string;
}

// Define TypeScript interface for full post data
export interface PostData extends PostMetadata {
  content: string;
}

// Helper function to format date (YYYY-MM-DD -> Month Day, Year)
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
