import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  Search, Tag, Clock, ArrowRight, ChevronRight,
  BookOpen, Rss, X, TrendingUp, Star, Users,
  Calendar, ChevronLeft, Share2, Copy, Check,
  ExternalLink, Filter, LayoutGrid, List, ArrowUpRight
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";
import {
  BLOG_POSTS, PUBLISHED_POSTS, CATEGORIES, ALL_TAGS,
  getCategoryMeta, getPostBySlug, getRelatedPosts,
  formatDate, type BlogPost
} from "../data/blog";

/* ═══════════════════════════════════════════
   COVER PLACEHOLDER — gradient card with icon
═══════════════════════════════════════════ */
function CoverPlaceholder({
  post, className = "", aspectRatio = "aspect-[16/9]"
}: { post: BlogPost; className?: string; aspectRatio?: string }) {
  const cat = getCategoryMeta(post.category);
  return (
    <div
      className={`${aspectRatio} ${className} rounded-xl overflow-hidden relative flex items-center justify-center`}
      style={{ background: `linear-gradient(135deg, ${post.coverColor}22 0%, ${post.coverColor2}33 100%)` }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      }} />
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
        backgroundSize: "32px 32px"
      }} />
      {/* Glow */}
      <div className="absolute inset-0 rounded-xl" style={{
        background: `radial-gradient(ellipse at 30% 30%, ${post.coverColor}30 0%, transparent 60%)`
      }} />
      {/* Category pill */}
      <div className="absolute top-3 left-3">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.bg} ${cat.color} border ${cat.border} uppercase tracking-wider`}>
          {post.categoryLabel}
        </span>
      </div>
      {/* Centre logo mark */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl opacity-60"
        style={{ background: `linear-gradient(135deg, ${post.coverColor}, ${post.coverColor2})` }}
      >
        {post.title.charAt(0)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURED HERO CARD
═══════════════════════════════════════════ */
function FeaturedCard({ post }: { post: BlogPost }) {
  const cat = getCategoryMeta(post.category);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 flex flex-col md:flex-row hover:border-white/20 transition-all duration-300"
      style={{ background: `linear-gradient(135deg, ${post.coverColor}12 0%, ${post.coverColor2}0a 100%), #0a0f1e` }}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer-bg transition-opacity duration-500 pointer-events-none rounded-2xl" />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${post.coverColor}60, transparent)` }} />

      {/* Cover */}
      <div className="md:w-[44%] shrink-0">
        <CoverPlaceholder post={post} className="h-52 md:h-full" aspectRatio="h-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-7 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.bg} ${cat.color} border ${cat.border} uppercase tracking-wider`}>
              {post.categoryLabel}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600/15 text-amber-400 border border-amber-600/20 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-2.5 h-2.5" /> Featured
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight mb-3 group-hover:text-brand-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[10px] font-black text-white`}>
              {post.author.avatarInitials}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{post.author.name}</p>
              <p className="text-[10px] text-slate-500">{formatDate(post.publishedAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTimeMin} min read</span>
            <span className={`flex items-center gap-1 font-semibold ${cat.color} group-hover:gap-2 transition-all`}>
              Read more <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   STANDARD POST CARD (grid + list variants)
═══════════════════════════════════════════ */
function PostCard({ post, view, delay, inView }: { post: BlogPost; view: "grid" | "list"; delay: number; inView: boolean }) {
  const cat = getCategoryMeta(post.category);

  if (view === "list") {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group flex items-start gap-5 p-4 rounded-xl border border-white/8 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}
      >
        <div className="w-28 h-20 shrink-0 rounded-lg overflow-hidden">
          <CoverPlaceholder post={post} className="w-full h-full" aspectRatio="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cat.bg} ${cat.color} uppercase tracking-wider`}>{post.categoryLabel}</span>
            <span className="text-slate-600 text-[10px] flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{post.readingTimeMin} min</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors leading-snug line-clamp-2 mb-1">{post.title}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        </div>
        <div className="shrink-0 flex items-center">
          <span className={`${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}><ArrowRight className="w-4 h-4" /></span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-white/8 overflow-hidden hover:border-white/18 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `radial-gradient(ellipse at top, ${post.coverColor}08 0%, transparent 60%), #0a0f1e`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <CoverPlaceholder post={post} aspectRatio="aspect-[16/9]" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.bg} ${cat.color} border ${cat.border} uppercase tracking-wider`}>{post.categoryLabel}</span>
          {post.featured && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-600/15 text-amber-400 border border-amber-600/20 flex items-center gap-1">
              <Star className="w-2 h-2" /> Featured
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors leading-snug mb-2 flex-1">{post.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[8px] font-black text-white`}>
              {post.author.avatarInitials}
            </div>
            <span className="text-[10px] text-slate-500">{post.author.name}</span>
          </div>
          <span className="text-[10px] text-slate-600 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {post.readingTimeMin} min</span>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   TAG PILL
═══════════════════════════════════════════ */
function TagPill({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        active
          ? "bg-brand-600/25 border-brand-600/40 text-brand-300"
          : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {tag}
    </button>
  );
}

/* ═══════════════════════════════════════════
   BLOG LIST PAGE
═══════════════════════════════════════════ */
function BlogListPage() {
  useSEO({
    title: "AxoDesk Blog — WhatsApp Marketing, AI Automation & Omnichannel Growth Guides",
    description: "Expert guides, case studies, AI automation playbooks, and product updates from AxoDesk. Learn how to 3× leads, cut support costs, and master omnichannel messaging at scale.",
    canonical: "https://axodesk.in/blog",
    ogImage: "https://axodesk.in/og-blog.png",
    keywords: "omnichannel messaging blog, WhatsApp marketing strategy, AI customer support tips, WhatsApp automation guide, customer communication insights, messaging platform updates, omnichannel growth, WhatsApp business tips 2025",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "AxoDesk Blog",
      "description": "Expert guides on omnichannel messaging, WhatsApp marketing, AI automation and customer communication.",
      "url": "https://axodesk.in/blog",
      "publisher": {
        "@type": "Organization",
        "name": "AxoDesk",
        "logo": { "@type": "ImageObject", "url": "https://axodesk.in/img/logo/axodesk-new-logo-dark.png" }
      }
    },
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.03 });

  const featured = PUBLISHED_POSTS.filter((p) => p.featured);
  const mainFeatured = featured[0];

  const filtered = useMemo(() => {
    let posts = PUBLISHED_POSTS;
    if (activeCategory !== "all") posts = posts.filter((p) => p.category === activeCategory);
    if (activeTags.length > 0) posts = posts.filter((p) => activeTags.some((t) => p.tags.includes(t)));
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [search, activeCategory, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const hasActiveFilters = activeCategory !== "all" || activeTags.length > 0 || search.trim();

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center mb-14 pt-10">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-600/8 rounded-full blur-[120px] pointer-events-none" />
        <AnimatedSection direction="fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/12 border border-orange-600/20 text-orange-400 text-xs font-bold mb-6 uppercase tracking-wide">
            <Rss className="w-3 h-3" /> AxoDesk Blog
          </div>
        </AnimatedSection>
        <AnimatedSection delay={80} direction="up">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-[1.05]">
            Insights for<br />
            <span className="text-shimmer">conversation-led growth</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={160} direction="up">
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Product updates, growth playbooks, AI deep-dives, and real case studies from teams using AxoDesk to scale.
          </p>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={240} direction="up">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, topics, authors..."
              className="w-full pl-11 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 placeholder-slate-600 text-sm focus:outline-none focus:border-brand-600/50 focus:bg-white/8 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </AnimatedSection>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6">

        {/* ── FEATURED POST ── */}
        {mainFeatured && !hasActiveFilters && (
          <AnimatedSection direction="up" className="mb-10">
            <FeaturedCard post={mainFeatured} />
          </AnimatedSection>
        )}

        {/* ── CATEGORY TABS + VIEW TOGGLE ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Category scroll rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                activeCategory === "all"
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-transparent text-slate-500 hover:text-white"
              }`}
            >
              All Posts
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? "all" : cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                  activeCategory === cat.slug
                    ? `${cat.bg} ${cat.border} ${cat.color}`
                    : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                showFilters || activeTags.length > 0
                  ? "bg-brand-600/20 border-brand-600/30 text-brand-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Tags {activeTags.length > 0 && <span className="bg-brand-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">{activeTags.length}</span>}
            </button>
            <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${view === "list" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── TAG FILTER PANEL ── */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-white flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> Filter by tag</p>
              {activeTags.length > 0 && (
                <button onClick={() => setActiveTags([])} className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <TagPill key={tag} tag={tag} active={activeTags.includes(tag)} onClick={() => toggleTag(tag)} />
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS META ── */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-slate-400">
              <span className="font-bold text-white">{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""} found
              {search && <span className="ml-1">for "<span className="text-brand-400">{search}</span>"</span>}
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); setActiveTags([]); }}
              className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          </div>
        )}

        {/* ── POSTS GRID / LIST ── */}
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-white font-bold mb-2">No articles found</p>
              <p className="text-slate-500 text-sm">Try adjusting your search or clearing filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} view="grid" delay={i * 60} inView={inView} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} view="list" delay={i * 40} inView={inView} />
              ))}
            </div>
          )}
        </div>

        {/* ── SIDEBAR TOPICS + TRENDING ── */}
        {!hasActiveFilters && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {/* Browse by topic */}
            <AnimatedSection direction="left" className="md:col-span-2">
              <div className="p-6 rounded-2xl border border-white/8 bg-[#0a0f1e]">
                <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-400" /> Browse by Topic
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const count = PUBLISHED_POSTS.filter((p) => p.category === cat.slug).length;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`flex items-center justify-between p-3 rounded-xl border ${cat.border} ${cat.bg} hover:opacity-90 transition-all group`}
                      >
                        <span className={`text-xs font-bold ${cat.color}`}>{cat.label}</span>
                        <span className="text-[10px] text-slate-500 group-hover:text-white transition-colors">{count} articles</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Trending */}
            <AnimatedSection direction="right">
              <div className="p-6 rounded-2xl border border-white/8 bg-[#0a0f1e]">
                <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" /> Trending Now
                </h3>
                <div className="space-y-4">
                  {PUBLISHED_POSTS.filter((p) => p.featured).map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="flex items-start gap-3 group">
                      <span className="text-2xl font-black text-white/10 w-6 shrink-0 leading-none mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors leading-snug line-clamp-2">{post.title}</p>
                        <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{post.readingTimeMin} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* ── NEWSLETTER CTA ── */}
        <AnimatedSection direction="up" delay={200} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-brand-600/25 p-10 text-center"
            style={{ background: "radial-gradient(ellipse at center top, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.06) 60%, transparent 80%), #0a0f1e" }}
          >
            <div className="absolute inset-0 shimmer-bg pointer-events-none opacity-40" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center mx-auto mb-4">
                <Rss className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Never miss an article</h2>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">Get the best AxoDesk insights, case studies, and playbooks delivered to your inbox every other week.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 placeholder-slate-600 text-sm focus:outline-none focus:border-brand-600/50 transition-all w-full"
                />
                <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all text-sm shrink-0 glow-brand-sm">
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   POST DETAIL PAGE
═══════════════════════════════════════════ */
function PostDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.03 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!post) {
    return (
      <div className="pt-32 pb-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-7 h-7 text-slate-500" />
        </div>
        <h1 className="text-2xl font-black text-white mb-3">Article not found</h1>
        <p className="text-slate-400 mb-8">This article may have moved or been unpublished.</p>
        <Link to="/blog" className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-all">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const cat = getCategoryMeta(post.category);
  const related = getRelatedPosts(post, 3);

  /* OG meta — inject dynamically. In production, do this server-side or in an SSR/meta framework */
  useEffect(() => {
    document.title = post.og.title;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", post.og.description);
    setMeta("og:title", post.og.title, true);
    setMeta("og:description", post.og.description, true);
    setMeta("og:image", post.og.image, true);
    setMeta("og:type", post.og.type, true);
    setMeta("og:url", window.location.href, true);
    setMeta("twitter:card", post.og.twitterCard);
    setMeta("twitter:title", post.og.title);
    setMeta("twitter:description", post.og.description);
    setMeta("twitter:image", post.og.image);
    return () => { document.title = "AxoDesk — Omnichannel Customer Communication Platform"; };
  }, [post]);

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">
      {/* ── BREADCRUMB + BACK ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 pt-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate(`/blog?category=${post.category}`)} className={`${cat.color} hover:opacity-80 transition-opacity`}>{post.categoryLabel}</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400 line-clamp-1 max-w-[300px]">{post.title}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <header className="max-w-screen-xl mx-auto px-4 md:px-6 mb-10">
        <div className="max-w-3xl">
          <AnimatedSection direction="fade">
            <div className="flex items-center gap-2 mb-5">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.bg} ${cat.color} border ${cat.border} uppercase tracking-wider`}>
                {post.categoryLabel}
              </span>
              {post.featured && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-600/15 text-amber-400 border border-amber-600/20 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={60}>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6">{post.title}</h1>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={120}>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">{post.excerpt}</p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={180}>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${post.author.avatarColor} flex items-center justify-center text-xs font-black text-white`}>
                  {post.author.avatarInitials}
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">{post.author.name}</p>
                  <p className="text-[10px] text-slate-500">{post.author.role}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readingTimeMin} min read</span>
              {/* Share */}
              <button
                onClick={handleCopyLink}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-all text-xs font-semibold text-slate-300"
              >
                {copied ? <><Check className="w-3 h-3 text-green-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy link</>}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </header>

      {/* ── COVER ── */}
      <AnimatedSection direction="up" delay={200} className="max-w-screen-xl mx-auto px-4 md:px-6 mb-12">
        <CoverPlaceholder post={post} aspectRatio="aspect-[21/9] md:aspect-[21/7]" className="w-full" />
      </AnimatedSection>

      {/* ── CONTENT + SIDEBAR ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex gap-12">

          {/* Article body */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Full placeholder body — swap with real CMS content */}
            <div className="prose-custom">
              <AnimatedSection direction="up">
                <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] mb-8 text-slate-400 text-sm leading-relaxed">
                  <p className="text-white font-semibold mb-2">📌 Article Preview</p>
                  <p>This is a static demonstration. In production, replace <code className="text-brand-400 bg-brand-600/10 px-1.5 py-0.5 rounded text-xs">post.body</code> with rich HTML/MDX content from your CMS (Contentful, Sanity, Strapi, Ghost, etc.). The data schema in <code className="text-brand-400 bg-brand-600/10 px-1.5 py-0.5 rounded text-xs">src/data/blog.tsx</code> is CMS-ready — every field maps directly to a CMS content type.</p>
                </div>
              </AnimatedSection>

              {/* Mocked rich article blocks */}
              {[
                { heading: "The Problem Worth Solving", body: `Most teams handle customer conversations across 5+ disconnected tools. Leads fall through the cracks, response times spike, and agents burn out switching context. ${post.title.split(":")[0]} addresses exactly this bottleneck.` },
                { heading: "Key Insight #1: Start With Intent", body: "Not all conversations are equal. High-intent signals — product page visits, ad clicks, cart additions — should trigger instant automated qualification that routes to the right agent before the prospect cools." },
                { heading: "Key Insight #2: Automate the Repetitive 80%", body: "80% of incoming conversations are repeat variations of the same 20 questions. AI and rules-based automation should handle these entirely, freeing your team to focus exclusively on high-value exchanges." },
                { heading: "Implementation: Step-by-Step", body: "Step 1: Map your top 20 incoming query types. Step 2: Build automation for each. Step 3: Set clear handoff thresholds. Step 4: Define KPIs (FRT, CSAT, conversion rate). Step 5: Iterate weekly based on drop-off data." },
                { heading: "Results You Can Expect", body: "Teams that follow this playbook consistently see: 40%+ reduction in first-response time, 3× increase in qualified pipeline from existing traffic, and 25% CSAT improvement within 60 days." },
              ].map((section, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 60} className="mb-8">
                  <h2 className="text-xl font-black text-white mb-3">{section.heading}</h2>
                  <p className="text-slate-400 leading-relaxed">{section.body}</p>
                </AnimatedSection>
              ))}

              {/* Tags */}
              <AnimatedSection direction="up" className="mt-10 pt-8 border-t border-white/8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all">
                      {tag}
                    </Link>
                  ))}
                </div>
              </AnimatedSection>

              {/* Author card */}
              <AnimatedSection direction="up" className="mt-8">
                <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${post.author.avatarColor} flex items-center justify-center text-sm font-black text-white shrink-0`}>
                    {post.author.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{post.author.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{post.author.role} at AxoDesk</p>
                    <p className="text-xs text-slate-400 leading-relaxed">Writes about conversational commerce, AI automation, and customer communication strategy.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-28 space-y-5">
            {/* Table of contents */}
            <div className="p-5 rounded-xl border border-white/8 bg-[#0a0f1e]">
              <p className="text-xs font-black text-white uppercase tracking-wider mb-3">In this article</p>
              <ul className="space-y-2">
                {["The Problem Worth Solving", "Key Insight #1: Start With Intent", "Key Insight #2: Automate the 80%", "Implementation: Step-by-Step", "Results You Can Expect"].map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-600/60 text-[10px] mt-1">▪</span>
                    <span className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share */}
            <div className="p-5 rounded-xl border border-white/8 bg-[#0a0f1e]">
              <p className="text-xs font-black text-white uppercase tracking-wider mb-3">Share</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Copy link", icon: <Copy className="w-3.5 h-3.5" />, action: handleCopyLink, color: "text-slate-400" },
                  { label: "Share on X / Twitter", icon: <ExternalLink className="w-3.5 h-3.5" />, action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.og.title)}&url=${encodeURIComponent(window.location.href)}`), color: "text-slate-400" },
                  { label: "Share on LinkedIn", icon: <ExternalLink className="w-3.5 h-3.5" />, action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`), color: "text-blue-400" },
                ].map((s, i) => (
                  <button key={i} onClick={s.action} className={`flex items-center gap-2 text-xs ${s.color} hover:text-white transition-colors py-1`}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* OG preview */}
            <div className="p-5 rounded-xl border border-white/8 bg-[#0a0f1e]">
              <p className="text-xs font-black text-white uppercase tracking-wider mb-3">OG Preview</p>
              <div className="rounded-lg overflow-hidden border border-white/10 text-[10px]">
                <img src={post.og.image} alt="OG preview" className="w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="p-2.5 bg-white/5">
                  <p className="text-[9px] text-slate-500 uppercase">axodesk.in</p>
                  <p className="font-semibold text-white line-clamp-2 leading-snug mt-0.5">{post.og.title}</p>
                  <p className="text-slate-500 line-clamp-2 mt-0.5 leading-snug">{post.og.description}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED POSTS ── */}
        {related.length > 0 && (
          <div ref={ref as React.RefObject<HTMLDivElement>} className="mt-16">
            <AnimatedSection direction="up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white">Related Articles</h2>
                <Link to="/blog" className="text-xs font-semibold text-brand-400 flex items-center gap-1 hover:gap-2 transition-all">
                  All articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </AnimatedSection>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} view="grid" delay={i * 80} inView={inView} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA banner ── */}
        <AnimatedSection direction="up" delay={200} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-brand-600/25 p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{ background: "radial-gradient(ellipse at left, rgba(79,70,229,0.15) 0%, transparent 60%), #0a0f1e" }}
          >
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)" }} />
            <div className="flex-1">
              <p className="text-lg font-black text-white mb-1">Ready to put this into practice?</p>
              <p className="text-slate-400 text-sm">Start a free 14-day trial and connect your first channel in minutes.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all text-sm flex items-center gap-2 glow-brand-sm">
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/blog" className="px-5 py-2.5 border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-sm flex items-center gap-1.5">
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Blog
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT EXPORT — router decides list vs detail
═══════════════════════════════════════════ */
export const BlogPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  if (slug) return <PostDetailPage slug={slug} />;
  return <BlogListPage />;
};
