"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "../../../lib/posts-utils";
import type { PostMetadata } from "../../../lib/posts-utils";

// Define the props for the client component
interface BlogClientProps {
  posts: PostMetadata[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 bg-white">
      {/* Page Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-primary-dark)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Latest Articles & Insights
      </motion.h1>

      {/* Introduction */}
      <motion.p
        className="text-lg text-[var(--color-gray-600)] text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Discover the latest trends, tips, and industry insights from the APOS
        Restaurant team to help your business thrive.
      </motion.p>

      {/* Posts Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.article
            key={post.slug}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-[var(--color-primary-light)]"
          >
            {/* Featured Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)]">
                {/* This is a placeholder. In a real implementation, you would use the Image component with the actual image */}
                <p className="text-center p-4">Featured Image Placeholder</p>
                {/* Uncomment when you have actual images:
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 6}
                />
                */}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
              {/* Date */}
              <p className="text-sm text-[var(--color-primary)] mb-2">
                {formatDate(post.date)}
              </p>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors duration-200">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-[var(--color-gray-600)] mb-4 flex-grow">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center mt-auto">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold text-sm mr-3">
                  {post.author.charAt(0)}
                </div>
                <span className="text-sm text-[var(--color-gray-600)]">
                  {post.author}
                </span>
              </div>

              {/* Read More Link */}
              <div className="mt-4 pt-4 border-t border-[var(--color-primary-light)]">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* No Posts Message (shown if there are no posts) */}
      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center py-12 bg-[var(--color-primary-light)] rounded-lg"
        >
          <p className="text-lg text-[var(--color-gray-600)]">
            No blog posts available yet. Check back soon for new content!
          </p>
        </motion.div>
      )}
    </div>
  );
}
