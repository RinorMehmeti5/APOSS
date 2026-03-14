"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import { formatDate } from "../../../lib/posts-utils";
import type { PostMetadata } from "../../../lib/posts-utils";
import ScatteredText from "@/components/ui/ScatteredText";
import TextLineReveal from "@/components/ui/TextLineReveal";
import ImageClipReveal from "@/components/ui/ImageClipReveal";

// Define the props for the client component
interface BlogClientProps {
  posts: PostMetadata[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Staggered card reveal on scroll
  useGSAP(
    () => {
      if (!gridRef.current) return;

      gsap.from(".blog-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: gridRef }
  );

  // Empty state animation
  useGSAP(
    () => {
      if (!sectionRef.current || posts.length > 0) return;

      gsap.from(".blog-empty", {
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="min-h-screen bg-[var(--color-bg-light)]">
      <div className="container mx-auto px-6 pt-28 md:pt-32 pb-16 md:pb-24">
        {/* Page Title */}
        <ScatteredText
          text="Latest Articles & Insights"
          tag="h1"
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-text-on-light)] font-[family-name:var(--font-display)]"
          scrub={false}
          delay={0.3}
        />

        {/* Introduction */}
        <TextLineReveal
          tag="p"
          className="text-lg text-[var(--color-text-on-light-secondary)] text-center mb-12 md:mb-16 max-w-2xl mx-auto"
          delay={0.5}
        >
          Discover the latest trends, tips, and industry insights from the APOS
          Solutions team to help your business thrive.
        </TextLineReveal>

        {/* Posts Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="blog-card card-light overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Featured Image */}
              <ImageClipReveal
                direction="bottom"
                className="relative h-48 w-full"
                delay={index * 0.1}
              >
                <div className="absolute inset-0 bg-[var(--color-bg-light-secondary)] flex items-center justify-center text-[var(--color-text-on-light-muted)]">
                  <p className="text-center p-4">Featured Image Placeholder</p>
                </div>
              </ImageClipReveal>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Date */}
                <p className="text-sm text-[var(--color-accent)] mb-2">
                  {formatDate(post.date)}
                </p>

                {/* Title */}
                <h2 className="text-xl font-bold mb-3 text-[var(--color-text-on-light)] hover:text-[var(--color-accent)] transition-colors duration-200">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-[var(--color-text-on-light-secondary)] mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center mt-auto">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center font-bold text-sm mr-3">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-sm text-[var(--color-text-on-light-secondary)]">
                    {post.author}
                  </span>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium transition-transform duration-200 hover:translate-x-1"
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
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Posts Message (shown if there are no posts) */}
        {posts.length === 0 && (
          <div className="blog-empty text-center py-12 card-light">
            <p className="text-lg text-[var(--color-text-on-light-secondary)]">
              No blog posts available yet. Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
