"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { formatDate } from "../../../../lib/posts-utils";
import ReactMarkdown from "react-markdown";
import type { PostData } from "../../../../lib/posts-utils";
import TextLineReveal from "@/components/ui/TextLineReveal";
import ImageClipReveal from "@/components/ui/ImageClipReveal";

// Define the props interface
interface BlogPostClientProps {
  post: PostData;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll(".gsap-section");

      gsap.set(sections, { opacity: 0, y: 30 });

      gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--color-bg-light)]"
    >
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-24">
        {/* Back to Blog Link */}
        <div className="gsap-section mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors duration-200"
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
        </div>

        <article className="max-w-3xl mx-auto">
          {/* Post Title */}
          <TextLineReveal
            tag="h1"
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-on-light)] font-[family-name:var(--font-display)]"
            delay={0.2}
          >
            {post.title}
          </TextLineReveal>

          {/* Post Metadata */}
          <div className="gsap-section flex items-center text-[var(--color-text-on-light-secondary)] mb-8">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center font-bold text-sm mr-3">
              {post.author.charAt(0)}
            </div>
            <span className="mr-4">{post.author}</span>
            <span className="text-sm">{formatDate(post.date)}</span>
          </div>

          {/* Featured Image */}
          <ImageClipReveal
            direction="bottom"
            className="relative w-full h-64 md:h-96 mb-10 rounded-lg"
            duration={1.2}
          >
            <div className="absolute inset-0 bg-[var(--color-bg-light-secondary)] rounded-lg flex items-center justify-center text-[var(--color-text-on-light-muted)]">
              <p className="text-center p-4">Featured Image Placeholder</p>
            </div>
          </ImageClipReveal>

          {/* Post Content */}
          <div className="gsap-section prose prose-lg max-w-none mb-10 text-[var(--color-text-on-light-secondary)]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Post Footer */}
          <div className="gsap-section pt-8 mt-8 border-t border-[var(--color-border-light)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-sm text-[var(--color-text-on-light-secondary)]">
                  Published on {formatDate(post.date)}
                </span>
              </div>
              <div>
                <Link
                  href="/blog"
                  className="bg-[var(--color-accent)] hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition-opacity duration-200"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
