import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/agencyData';
import { IMAGES } from '../data/images';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { SmartImage } from '../components/ui/SmartImage';
import { CircleCTA } from '../components/ui/CircleCTA';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const imageAsset = IMAGES[post.imageKey] || IMAGES.blog1;
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <article className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Back button */}
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Insights</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono uppercase tracking-widest text-[#6b6b6b] mb-4">
          <span className="px-3 py-1 rounded-full bg-white border border-black/5 text-[#0a0a0a]">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishedDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="headline-editorial font-light tracking-tight text-[#0a0a0a] mb-6">
          {post.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center justify-center sm:justify-start gap-3 pt-4 border-t border-black/5">
          <div className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-xs">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold text-[#0a0a0a]">{post.author.name}</div>
            <div className="text-xs text-[#6b6b6b]">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Featured Photo */}
      <div className="max-w-4xl mx-auto mb-16 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-black/5 shadow-md">
        <SmartImage
          src={imageAsset.src}
          alt={imageAsset.alt}
          className="w-full max-h-[560px] object-cover"
          priority={true}
        />
      </div>

      {/* Editorial Content */}
      <div className="max-w-3xl mx-auto space-y-8 text-base sm:text-lg text-[#0a0a0a] leading-relaxed font-light mb-20">
        <p className="text-xl sm:text-2xl font-light text-[#0a0a0a] leading-relaxed italic border-l-2 border-[#0a0a0a] pl-6 my-8">
          {post.excerpt}
        </p>

        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        <div className="bg-white rounded-[24px] p-8 border border-black/5 my-12">
          <h3 className="text-xl font-light text-[#0a0a0a] mb-2">Key Architectural Takeaway</h3>
          <p className="text-sm text-[#6b6b6b] leading-relaxed">
            Prioritizing edge-rendered architectures, rigorous component typing, and minimal client execution overhead compounds into substantial ranking improvements and higher conversion velocity.
          </p>
        </div>
      </div>

      {/* Author Bio Box */}
      <div className="max-w-3xl mx-auto bg-white rounded-[24px] p-8 sm:p-10 border border-black/5 shadow-sm mb-20 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-lg shrink-0">
          {post.author.name.charAt(0)}
        </div>
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b] block mb-1">
            ABOUT THE AUTHOR
          </span>
          <h4 className="text-xl font-light text-[#0a0a0a]">{post.author.name}</h4>
          <p className="text-xs sm:text-sm text-[#6b6b6b] mt-1">
            {post.author.role} at Himnora IT Solution, specializing in scalable web systems, headless infrastructure, and Core Web Vitals optimization.
          </p>
        </div>
      </div>

      {/* More Articles */}
      {otherPosts.length > 0 && (
        <div className="pt-16 border-t border-black/10 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-light text-[#0a0a0a]">More from the journal</h3>
            <Link to="/blog" className="text-xs font-semibold uppercase tracking-wider hover:underline">
              View all dispatches &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.slice(0, 2).map((other) => (
              <div
                key={other.id}
                className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm flex flex-col justify-between editorial-card"
              >
                <div>
                  <span className="text-xs font-mono uppercase text-[#6b6b6b] block mb-3">
                    {other.category}
                  </span>
                  <h4 className="text-xl font-light text-[#0a0a0a] mb-3">
                    <Link to={`/blog/${other.slug}`} className="hover:underline">
                      {other.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-[#6b6b6b] line-clamp-2">{other.excerpt}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs text-[#6b6b6b]">
                  <span>{other.publishedDate}</span>
                  <span className="font-semibold text-[#0a0a0a]">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-[#0a0a0a] text-white rounded-[24px] p-8 sm:p-12 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-light text-white">Have a technical challenge?</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Consult with our engineering leads on your next web initiative.
          </p>
        </div>
        <CircleCTA label="LET'S TALK" to="/contact" variant="light" />
      </div>
    </article>
  );
};
