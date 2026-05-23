'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Share2, Calendar, User, Tag, ArrowRight, Clock, Eye, Mail, Facebook, Twitter, Linkedin, FileText } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'

interface SinglePressReleaseProps {
  post: SitePost
  relatedPosts: SitePost[]
}

export function SinglePressRelease({ post, relatedPosts }: SinglePressReleaseProps) {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false)

  const getPostImage = (post: SitePost) => {
    const media = Array.isArray(post?.media) ? post?.media : []
    const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
    const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
      ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
      : null
    return mediaUrl || contentImage || '/placeholder.svg?height=600&width=1200'
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getAuthorName = () => {
    if (typeof post?.content === 'object' && post?.content) {
      const content = post.content as any
      return content.author || content.company || 'PR News Prime Zone'
    }
    return 'PR News Prime Zone'
  }

  const getCategory = () => {
    if (post.tags && post.tags.length > 0) {
      return post.tags[0]
    }
    if (typeof post?.content === 'object' && post?.content) {
      const content = post.content as any
      return content.category || 'Press Release'
    }
    return 'Press Release'
  }

  const getContent = () => {
    if (typeof post?.content === 'object' && post?.content) {
      const content = post.content as any
      return content.body || content.content || post.summary || ''
    }
    return post.summary || ''
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    let url = ''
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this press release: ${shareUrl}`)}`
        break
    }
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#411530]">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-[#411530]">Press Releases</Link>
            <span>/</span>
            <span className="text-gray-900">{post.title.slice(0, 50)}...</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Article Header */}
        <article className="space-y-8">
          {/* Category and Author */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="rounded-full bg-[#D1512D] px-3 py-1 text-xs font-semibold text-white">
              {getCategory()}
            </span>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              {getAuthorName()}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="h-4 w-4" />
              {Math.floor(Math.random() * 5000) + 1000} views
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#411530] sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 lg:h-[500px] overflow-hidden rounded-2xl">
            <ContentImage
              src={getPostImage(post)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Social Share */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Share this press release:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare('twitter')}
                className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="rounded-full bg-blue-700 p-2 text-white hover:bg-blue-800 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare('email')}
                className="rounded-full bg-gray-600 p-2 text-white hover:bg-gray-700 transition-colors"
                aria-label="Share via Email"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="article-content text-gray-800 leading-relaxed space-y-6">
              {getContent().split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-base leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Tag className="h-4 w-4 text-gray-600" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#411530] to-[#D1512D] p-8 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Wish your news had this kind of reach?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Distribute your press releases through our extensive media network
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#411530] transition-all hover:bg-gray-100"
              >
                View Pricing Plans
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Submit Your Release
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#411530] mb-8">More News From PR News Prime Zone</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 6).map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#F5E8E4]">
                        <ContentImage
                          src={getPostImage(relatedPost)}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#411530] line-clamp-2 group-hover:text-[#D1512D] transition-colors">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.summary && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {relatedPost.summary}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(relatedPost.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {Math.floor(Math.random() * 1000) + 100}
                        </div>
                      </div>
                      <Link
                        href={`/articles/${relatedPost.slug}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#411530] hover:text-[#D1512D] transition-colors"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
