// File: src/app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-primary-dark)]">
          Blog Post Not Found
        </h1>
        <p className="text-lg text-[var(--color-gray-600)] mb-8">
          The blog post you re looking for doesn t exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
}
