// File: src/app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text-on-light)] font-[family-name:var(--font-display)]">
            Blog Post Not Found
          </h1>
          <p className="text-lg text-[var(--color-text-on-light-muted)] mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
