"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "../../../../lib/posts-utils";
import ReactMarkdown from "react-markdown";
import type { PostData } from "../../../../lib/posts-utils";

// Define the props interface
interface BlogPostClientProps {
  post: PostData;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 bg-white">
      {/* Back to Blog Link */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          whileHover={{ x: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Articles
          </Link>
        </motion.div>
      </motion.div>

      <motion.article
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Post Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary-dark)]"
          variants={fadeIn}
        >
          {post.title}
        </motion.h1>

        {/* Post Metadata */}
        <motion.div
          className="flex items-center text-[var(--color-gray-600)] mb-8"
          variants={fadeIn}
        >
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold text-sm mr-3">
            {post.author.charAt(0)}
          </div>
          <span className="mr-4">{post.author}</span>
          <span className="text-sm">{formatDate(post.date)}</span>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative w-full h-64 md:h-96 mb-10 bg-[var(--color-primary-light)] rounded-lg overflow-hidden"
          variants={fadeIn}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary)]">
            {/* This is a placeholder. In a real implementation, you would use the Image component with the actual image */}
            <p className="text-center p-4">Featured Image Placeholder</p>
            {/* Uncomment when you have actual images:
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                className="object-cover"
                priority
              />
              */}
          </div>
        </motion.div>

        {/* Post Content - with Tailwind CSS v4 typography classes */}
        <motion.div
          className="prose prose-lg prose-blue max-w-none mb-10 text-gray-800"
          variants={fadeIn}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>

        {/* Post Footer */}
        <motion.div
          className="pt-8 mt-8 border-t border-[var(--color-primary-light)]"
          variants={fadeIn}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-sm text-[var(--color-gray-600)]">
                Published on {formatDate(post.date)}
              </span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Read More Articles
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}
