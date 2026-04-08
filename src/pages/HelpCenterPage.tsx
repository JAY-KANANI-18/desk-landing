import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  Search, ChevronRight, ChevronLeft, ArrowRight, Clock, Calendar,
  BookOpen, Star, Zap, Shield, HelpCircle, CheckCircle2, AlertTriangle,
  Info, Code2, Copy, Check, ExternalLink, Menu, X, Hash,
  ThumbsUp, ThumbsDown, MessageSquare, ArrowUpRight, ChevronDown, ChevronUp
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useInView } from "../hooks/useInView";
import {
  HELP_CATEGORIES, HELP_ARTICLES, POPULAR_ARTICLES,
  getCategoryBySlug, getArticleBySlug, getArticlesByCategory,
  getRelatedArticles, searchArticles, formatDocDate,
  type DocArticle, type DocCategory, type DocStep
} from "../data/helpCenter";

/* ═══════════════════════════════════════════════════════
   DIFFICULTY BADGE
═══════════════════════════════════════════════════════ */
function DifficultyBadge({ level }: { level: DocArticle["difficulty"] }) {
  const map = {
    beginner: { label: "Beginner", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    intermediate: { label: "Intermediate", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    advanced: { label: "Advanced", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  };
  const d = map[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${d.bg} ${d.border} ${d.color} uppercase tracking-wide`}>
      {level === "beginner" && <CheckCircle2 className="w-2.5 h-2.5" />}
      {level === "intermediate" && <Info className="w-2.5 h-2.5" />}
      {level === "advanced" && <Zap className="w-2.5 h-2.5" />}
      {d.label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   CODE BLOCK
═══════════════════════════════════════════════════════ */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#060a10]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8 bg-white/[0.02]">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Code2 className="w-3 h-3" />Code</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-white transition-colors">
          {copied ? <><Check className="w-3 h-3 text-emerald-400" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
        </button>
      </div>
      <pre className="p-4 text-xs text-slate-300 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   IMAGE PLACEHOLDER
═══════════════════════════════════════════════════════ */
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#0a0f1e]">
      <div className="aspect-[16/7] flex flex-col items-center justify-center gap-3 relative">
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
          <BookOpen className="w-5 h-5 text-slate-500" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="text-[10px] text-slate-700 mt-1">Replace with actual screenshot or diagram</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP CARD
═══════════════════════════════════════════════════════ */
function StepCard({ step, index, total }: { step: DocStep; index: number; total: number }) {
  return (
    <div className="flex gap-5 group">
      {/* Step number + connector line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-8 h-8 rounded-full bg-brand-600/20 border border-brand-600/40 flex items-center justify-center text-xs font-black text-brand-400 shrink-0 group-hover:bg-brand-600/30 transition-colors">
          {index + 1}
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-brand-600/20 to-transparent mt-1.5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="text-sm font-black text-white mb-2 leading-snug">{step.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>

        {step.tip && (
          <div className="mt-3 flex items-start gap-2.5 p-3.5 rounded-xl bg-brand-600/8 border border-brand-600/20">
            <Info className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-300 leading-relaxed"><span className="font-bold">Tip: </span>{step.tip}</p>
          </div>
        )}

        {step.warning && (
          <div className="mt-3 flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-600/8 border border-amber-600/20">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed"><span className="font-bold">Warning: </span>{step.warning}</p>
          </div>
        )}

        {step.code && <CodeBlock code={step.code} />}
        {step.imagePlaceholder && <ImagePlaceholder label={step.imagePlaceholder} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTICLE CARD (for lists)
═══════════════════════════════════════════════════════ */
function ArticleCard({ article, onNavigate, delay = 0, inView = true }: {
  article: DocArticle; onNavigate: (slug: string) => void; delay?: number; inView?: boolean;
}) {
  const cat = getCategoryBySlug(article.category);
  return (
    <button
      onClick={() => onNavigate(article.slug)}
      className="w-full text-left flex items-start gap-4 p-4 rounded-xl border border-white/8 hover:border-white/18 hover:bg-white/[0.025] transition-all duration-200 group"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms` }}
    >
      <div className={`w-9 h-9 rounded-lg ${cat?.bg ?? "bg-white/5"} border ${cat?.border ?? "border-white/10"} flex items-center justify-center text-lg shrink-0`}>
        {cat?.icon ?? "📄"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors leading-snug">{article.title}</p>
        <p className="text-xs text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-3 mt-2">
          <DifficultyBadge level={article.difficulty} />
          <span className="flex items-center gap-1 text-[10px] text-slate-600"><Clock className="w-2.5 h-2.5" />{article.readingTimeMin} min</span>
          {article.popular && (
            <span className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold"><Star className="w-2.5 h-2.5" />Popular</span>
          )}
        </div>
      </div>
      <ArrowRight className={`w-4 h-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${cat?.color ?? "text-brand-400"}`} />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   SEARCH OVERLAY
═══════════════════════════════════════════════════════ */
function SearchOverlay({ onClose, onNavigate }: { onClose: () => void; onNavigate: (slug: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => searchArticles(query), [query]);

  function handleSelect(slug: string) { onNavigate(slug); onClose(); }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-[#0f1424] rounded-2xl border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xs font-semibold border border-white/10 px-2 py-1 rounded-lg">ESC</button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Popular Articles</p>
              <div className="space-y-1.5">
                {POPULAR_ARTICLES.map((a) => {
                  const cat = getCategoryBySlug(a.category);
                  return (
                    <button key={a.id} onClick={() => handleSelect(a.slug)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
                      <span className="text-base">{cat?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-brand-300 transition-colors truncate">{a.title}</p>
                        <p className="text-[10px] text-slate-600">{cat?.label}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="py-12 text-center">
              <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400 font-semibold">No results for "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">Try different keywords or browse by category below</p>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-2">{results.length} result{results.length !== 1 ? "s" : ""}</p>
              {results.map((a) => {
                const cat = getCategoryBySlug(a.category);
                return (
                  <button key={a.id} onClick={() => handleSelect(a.slug)} className="w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-colors group">
                    <span className="text-base mt-0.5">{cat?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white group-hover:text-brand-300 transition-colors font-semibold">{a.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{a.excerpt}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-bold ${cat?.color}`}>{cat?.label}</span>
                        <span className="text-[9px] text-slate-600">{a.readingTimeMin} min read</span>
                        <DifficultyBadge level={a.difficulty} />
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 transition-colors mt-1 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LEFT SIDEBAR NAV
═══════════════════════════════════════════════════════ */
function SidebarNav({
  currentArticleSlug,
  currentCategorySlug,
  onNavigate,
  onCategorySelect,
}: {
  currentArticleSlug?: string;
  currentCategorySlug?: string;
  onNavigate: (slug: string) => void;
  onCategorySelect: (slug: string) => void;
}) {
  const [expandedCats, setExpandedCats] = useState<string[]>(currentCategorySlug ? [currentCategorySlug] : ["getting-started"]);

  function toggleCat(slug: string) {
    setExpandedCats((prev) => prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]);
  }

  return (
    <nav className="space-y-1">
      {HELP_CATEGORIES.map((cat) => {
        const isExpanded = expandedCats.includes(cat.slug);
        const articles = getArticlesByCategory(cat.slug);
        return (
          <div key={cat.slug}>
            <button
              onClick={() => { toggleCat(cat.slug); onCategorySelect(cat.slug); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group hover:bg-white/[0.04] ${currentCategorySlug === cat.slug && !currentArticleSlug ? "bg-white/[0.06]" : ""}`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className={`flex-1 text-xs font-semibold transition-colors ${isExpanded || currentCategorySlug === cat.slug ? cat.color : "text-slate-400 group-hover:text-white"}`}>
                {cat.label}
              </span>
              <span className="text-[10px] text-slate-600 font-medium">{articles.length}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {isExpanded && (
              <div className="ml-3 pl-3 border-l border-white/8 mt-1 mb-2 space-y-0.5">
                {cat.sections.map((section) => (
                  <div key={section.slug}>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 px-2 py-1.5 mt-1">{section.title}</p>
                    {section.articles.map((slug) => {
                      const a = getArticleBySlug(slug);
                      if (!a) return null;
                      const active = currentArticleSlug === slug;
                      return (
                        <button
                          key={slug}
                          onClick={() => onNavigate(slug)}
                          className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all group ${
                            active
                              ? `${cat.bg} ${cat.border} border ${cat.color} font-semibold`
                              : "text-slate-500 hover:text-white hover:bg-white/[0.03]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-current" : "bg-slate-700 group-hover:bg-slate-500"} transition-colors`} />
                          <span className="leading-snug">{a.title}</span>
                          {a.popular && <Star className="w-2.5 h-2.5 text-amber-500/60 ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HELP CENTER HOME
═══════════════════════════════════════════════════════ */
function HelpHome({ onNavigate, onCategorySelect }: { onNavigate: (slug: string) => void; onCategorySelect: (slug: string) => void }) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div className="flex-1 min-w-0">
      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/12 border border-emerald-600/20 text-emerald-400 text-[10px] font-bold mb-4 uppercase tracking-wide">
          <BookOpen className="w-3 h-3" /> Documentation
        </div>
        <h1 className="text-3xl font-black text-white mb-3 leading-tight">How can we help you?</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          Step-by-step guides, API references, and best practices to get the most out of OmniChat.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { icon: "🚀", label: "Quick Start", slug: "create-your-account", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8" },
          { icon: "💬", label: "Connect WhatsApp", slug: "connect-whatsapp", color: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/8" },
          { icon: "🤖", label: "AI Agent", slug: "ai-agent-setup", color: "text-brand-400", border: "border-brand-500/20", bg: "bg-brand-500/8" },
          { icon: "⌨️", label: "API Reference", slug: "rest-api-overview", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8" },
        ].map((q) => (
          <button
            key={q.slug}
            onClick={() => onNavigate(q.slug)}
            className={`flex flex-col items-start gap-2 p-4 rounded-xl border ${q.border} ${q.bg} hover:opacity-90 transition-all group text-left`}
          >
            <span className="text-xl">{q.icon}</span>
            <span className={`text-xs font-bold ${q.color} group-hover:opacity-80 transition-opacity`}>{q.label}</span>
            <ArrowRight className={`w-3 h-3 ${q.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </button>
        ))}
      </div>

      {/* Popular articles */}
      <div className="mb-10">
        <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" /> Popular Articles
        </h2>
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 gap-3">
          {POPULAR_ARTICLES.map((a, i) => (
            <ArticleCard key={a.id} article={a} onNavigate={onNavigate} delay={i * 50} inView={inView} />
          ))}
        </div>
      </div>

      {/* All categories */}
      <div>
        <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-400" /> Browse by Category
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HELP_CATEGORIES.map((cat, i) => {
            const articles = getArticlesByCategory(cat.slug);
            return (
              <AnimatedSection key={cat.slug} direction="up" delay={i * 40}>
                <button
                  onClick={() => onCategorySelect(cat.slug)}
                  className={`w-full text-left p-5 rounded-2xl border ${cat.border} ${cat.bg} hover:opacity-90 transition-all group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <ArrowRight className={`w-4 h-4 ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <h3 className={`text-sm font-black ${cat.color} mb-1`}>{cat.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{cat.description}</p>
                  <p className="text-[10px] font-semibold text-slate-600">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Support CTA */}
      <AnimatedSection direction="up" delay={200} className="mt-12">
        <div
          className="relative overflow-hidden rounded-2xl border border-brand-600/25 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          style={{ background: "radial-gradient(ellipse at left, rgba(79,70,229,0.12) 0%, transparent 60%), #0a0f1e" }}
        >
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)" }} />
          <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-brand-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-black text-base mb-1">Still need help?</p>
            <p className="text-slate-400 text-sm">Our support team is available 24/5 via live chat, and AI support runs 24/7.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2">
              Chat with Support <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CATEGORY VIEW
═══════════════════════════════════════════════════════ */
function CategoryView({ cat, onNavigate }: { cat: DocCategory; onNavigate: (slug: string) => void }) {
  const articles = getArticlesByCategory(cat.slug);
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cat.bg} border ${cat.border} ${cat.color} text-[10px] font-bold mb-4 uppercase tracking-wide`}>
          {cat.icon} {cat.label}
        </div>
        <h1 className="text-2xl font-black text-white mb-2">{cat.label}</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{cat.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-slate-500">{articles.length} articles in this category</span>
        </div>
      </div>

      {/* Sections */}
      {cat.sections.map((section) => {
        const sectionArticles = section.articles.map((s) => getArticleBySlug(s)).filter(Boolean) as DocArticle[];
        return (
          <div key={section.slug} className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-base">{section.icon}</span>
              <div>
                <h2 className="text-sm font-black text-white">{section.title}</h2>
                <p className="text-xs text-slate-500">{section.description}</p>
              </div>
            </div>
            <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-2">
              {sectionArticles.map((a, i) => (
                <ArticleCard key={a.id} article={a} onNavigate={onNavigate} delay={i * 60} inView={inView} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTICLE VIEW
═══════════════════════════════════════════════════════ */
function ArticleView({ article, onNavigate, onCategorySelect }: {
  article: DocArticle;
  onNavigate: (slug: string) => void;
  onCategorySelect: (slug: string) => void;
}) {
  const cat = getCategoryBySlug(article.category);
  const related = getRelatedArticles(article);
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null);
  const { ref, inView } = useInView({ threshold: 0.05 });

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [article.slug]);

  /* Inject OG meta */
  useEffect(() => {
    document.title = `${article.title} — OmniChat Help Center`;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", article.excerpt);
    setMeta("og:title", `${article.title} — OmniChat Help Center`, true);
    setMeta("og:description", article.excerpt, true);
    return () => { document.title = "OmniChat Help Center"; };
  }, [article]);

  return (
    <div className="flex-1 min-w-0 flex gap-8">
      {/* Main article */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-6">
          <button onClick={() => onCategorySelect("")} className="hover:text-white transition-colors">Help Center</button>
          <ChevronRight className="w-3 h-3" />
          {cat && (
            <>
              <button onClick={() => onCategorySelect(cat.slug)} className={`hover:text-white transition-colors ${cat.color}`}>{cat.label}</button>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-slate-400 line-clamp-1">{article.title}</span>
        </div>

        {/* Article header */}
        <AnimatedSection direction="fade">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {cat && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.bg} border ${cat.border} ${cat.color} uppercase tracking-wide`}>
                  {cat.icon} {cat.label}
                </span>
              )}
              <DifficultyBadge level={article.difficulty} />
              {article.popular && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wide">
                  <Star className="w-2.5 h-2.5" /> Popular
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">{article.title}</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-5 border-b border-white/8">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${article.author.avatarColor} flex items-center justify-center text-[9px] font-black text-white`}>
                  {article.author.avatarInitials}
                </div>
                <span className="font-medium text-slate-400">{article.author.name}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-500">{article.author.role}</span>
              </div>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Updated {formatDocDate(article.lastUpdated)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTimeMin} min read</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div className="mb-10">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <Hash className="w-3 h-3" /> Step-by-Step Guide
          </h2>
          <div>
            {article.steps.map((step, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 50}>
                <StepCard step={step} index={i} total={article.steps.length} />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <AnimatedSection direction="up" className="mb-8 pb-8 border-b border-white/8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Tags:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Feedback */}
        <AnimatedSection direction="up" className="mb-10">
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.015] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-white mb-0.5">Was this article helpful?</p>
              <p className="text-xs text-slate-500">Your feedback helps us improve our documentation.</p>
            </div>
            <div className="flex items-center gap-2">
              {feedback === null ? (
                <>
                  <button
                    onClick={() => setFeedback("helpful")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/12 border border-emerald-600/25 text-emerald-400 text-xs font-bold hover:bg-emerald-600/20 transition-all"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Yes
                  </button>
                  <button
                    onClick={() => setFeedback("not-helpful")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/8 transition-all"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> No
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  {feedback === "helpful" ? "Thanks for your feedback!" : "Thanks — we&#39;ll improve this article."}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Related articles */}
        {related.length > 0 && (
          <div ref={ref as React.RefObject<HTMLDivElement>} className="mb-10">
            <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" /> Related Articles
            </h2>
            <div className="space-y-2">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} onNavigate={onNavigate} delay={i * 60} inView={inView} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right sticky sidebar — ToC + next steps */}
      <aside className="hidden xl:block w-56 shrink-0 self-start sticky top-24 space-y-5">
        {/* On this page */}
        <div className="p-4 rounded-xl border border-white/8 bg-[#0a0f1e]">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">On this page</p>
          <ul className="space-y-1.5">
            {article.steps.map((step, i) => (
              <li key={i}>
                <button
                  className="flex items-start gap-2 text-left w-full"
                  onClick={() => {}}
                >
                  <span className="text-[9px] font-black text-brand-600/50 mt-0.5 shrink-0">{i + 1}</span>
                  <span className="text-[11px] text-slate-500 hover:text-white transition-colors leading-snug">{step.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Category nav */}
        {cat && (
          <div className="p-4 rounded-xl border border-white/8 bg-[#0a0f1e]">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">In {cat.label}</p>
            {cat.sections.map((section) =>
              section.articles.map((slug) => {
                const a = getArticleBySlug(slug);
                if (!a) return null;
                const isActive = slug === article.slug;
                return (
                  <button
                    key={slug}
                    onClick={() => onNavigate(slug)}
                    className={`w-full text-left flex items-start gap-1.5 text-[11px] py-1 transition-colors ${isActive ? cat.color + " font-semibold" : "text-slate-600 hover:text-white"}`}
                  >
                    <ChevronRight className={`w-3 h-3 mt-0.5 shrink-0 ${isActive ? "opacity-100" : "opacity-0"}`} />
                    <span className="leading-snug">{a.title}</span>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Support */}
        <div className="p-4 rounded-xl border border-brand-600/20 bg-brand-600/8">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-2">Need help?</p>
          <p className="text-[11px] text-slate-400 mb-3 leading-snug">Our support team is available 24/5 via live chat.</p>
          <a href="#" className="flex items-center gap-1.5 text-[11px] font-bold text-brand-400 hover:text-brand-300 transition-colors">
            <MessageSquare className="w-3 h-3" /> Open Live Chat
          </a>
        </div>
      </aside>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HELP CENTER ROOT
═══════════════════════════════════════════════════════ */
export const HelpCenterPage = () => {
  const { category: catSlugParam, article: articleSlugParam } = useParams<{ category?: string; article?: string }>();
  const navigate = useNavigate();

  const currentCatData = catSlugParam ? getCategoryBySlug(catSlugParam) : undefined;
  const currentArticleData = articleSlugParam ? getArticleBySlug(articleSlugParam) : undefined;

  useSEO(
    currentArticleData
      ? {
          title: `${currentArticleData.title} — OmniChat Help Center`,
          description: currentArticleData.excerpt,
          canonical: `https://omnichat.io/help/${currentArticleData.category}/${currentArticleData.slug}`,
          ogType: "article",
          keywords: currentArticleData.tags.join(", "),
          breadcrumb: [
            { name: "Home", url: "/" },
            { name: "Help Center", url: "/help" },
            { name: currentCatData?.label ?? "Category", url: `/help/${currentArticleData.category}` },
            { name: currentArticleData.title, url: `/help/${currentArticleData.category}/${currentArticleData.slug}` },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": currentArticleData.title,
            "description": currentArticleData.excerpt,
            "dateModified": currentArticleData.lastUpdated,
            "author": { "@type": "Person", "name": currentArticleData.author.name },
            "publisher": { "@type": "Organization", "name": "OmniChat", "logo": { "@type": "ImageObject", "url": "https://omnichat.io/logo.png" } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://omnichat.io/help/${currentArticleData.category}/${currentArticleData.slug}` }
          },
        }
      : currentCatData
      ? {
          title: `${currentCatData.label} — OmniChat Help Center`,
          description: currentCatData.description,
          canonical: `https://omnichat.io/help/${currentCatData.slug}`,
          breadcrumb: [
            { name: "Home", url: "/" },
            { name: "Help Center", url: "/help" },
            { name: currentCatData.label, url: `/help/${currentCatData.slug}` },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${currentCatData.label} — OmniChat Help Center`,
            "description": currentCatData.description,
            "url": `https://omnichat.io/help/${currentCatData.slug}`
          },
        }
      : {
          title: "OmniChat Help Center — Docs, Guides & FAQs for Omnichannel Messaging",
          description: "Find step-by-step guides, API documentation, troubleshooting articles, and tutorials to master OmniChat's omnichannel messaging platform. 100+ help articles available.",
          canonical: "https://omnichat.io/help",
          keywords: "OmniChat help center, omnichannel messaging documentation, WhatsApp API setup guide, OmniChat tutorials, customer support platform docs, OmniChat troubleshooting, omnichannel inbox help",
          breadcrumb: [
            { name: "Home", url: "/" },
            { name: "Help Center", url: "/help" },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "OmniChat Help Center",
            "description": "Complete documentation, step-by-step guides, and FAQ articles for OmniChat users.",
            "url": "https://omnichat.io/help"
          },
        }
  );

  const [showSearch, setShowSearch] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentCategory = catSlugParam ? getCategoryBySlug(catSlugParam) : undefined;
  const currentArticle = articleSlugParam ? getArticleBySlug(articleSlugParam) : undefined;

  /* Keyboard shortcut: Cmd/Ctrl+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); }
      if (e.key === "Escape") setShowSearch(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [catSlugParam, articleSlugParam]);

  function handleNavigateArticle(slug: string) {
    const a = getArticleBySlug(slug);
    if (!a) return;
    navigate(`/help/${a.category}/${slug}`);
    setMobileSidebarOpen(false);
  }

  function handleSelectCategory(slug: string) {
    if (!slug) { navigate("/help"); }
    else { navigate(`/help/${slug}`); }
    setMobileSidebarOpen(false);
  }

  return (
    <div className="min-h-screen pt-[64px] bg-[#080c14] text-white">

      {/* Search overlay */}
      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          onNavigate={(slug) => { handleNavigateArticle(slug); setShowSearch(false); }}
        />
      )}

      {/* ── TOP SEARCH BAR ── */}
      <div className="border-b border-white/8 bg-[#0a0f1a]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 py-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="text-xs font-semibold">Contents</span>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 flex-1">
              <button onClick={() => navigate("/help")} className="hover:text-white transition-colors font-semibold text-slate-400">Help Center</button>
              {currentCategory && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <button onClick={() => navigate(`/help/${currentCategory.slug}`)} className={`hover:text-white transition-colors font-semibold ${currentCategory.color}`}>
                    {currentCategory.icon} {currentCategory.label}
                  </button>
                </>
              )}
              {currentArticle && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-slate-400 truncate max-w-[200px] hidden sm:block">{currentArticle.title}</span>
                </>
              )}
            </div>

            {/* Search trigger */}
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-500 hover:bg-white/8 hover:text-slate-300 transition-all"
            >
              <Search className="w-3 h-3" />
              <span className="hidden sm:block">Search docs...</span>
              <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-white/8 border border-white/10 rounded text-[9px] font-mono text-slate-600">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar — desktop always visible, mobile overlay */}
          <aside className={`
            ${mobileSidebarOpen ? "fixed inset-0 z-40 flex items-start pt-[120px] px-4 bg-black/60 backdrop-blur-sm" : "hidden"}
            lg:relative lg:flex lg:items-start lg:pt-0 lg:px-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto
          `}>
            <div className={`
              ${mobileSidebarOpen ? "w-72 h-[calc(100vh-140px)] overflow-y-auto bg-[#0f1424] border border-white/12 rounded-2xl p-4 shadow-2xl" : ""}
              lg:w-56 xl:w-64 lg:shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto lg:bg-transparent lg:border-none lg:rounded-none lg:p-0 lg:shadow-none
              scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10
            `}>
              {/* Sidebar header */}
              <div className="mb-4 lg:mb-5">
                <button
                  onClick={() => { navigate("/help"); setMobileSidebarOpen(false); }}
                  className="flex items-center gap-2 text-white hover:text-brand-300 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-600/20 border border-brand-600/30 flex items-center justify-center group-hover:bg-brand-600/30 transition-colors">
                    <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <span className="text-sm font-black">Documentation</span>
                </button>
                <p className="text-[10px] text-slate-600 mt-1 ml-9">{HELP_ARTICLES.length} articles · {HELP_CATEGORIES.length} categories</p>
              </div>

              <SidebarNav
                currentArticleSlug={articleSlugParam}
                currentCategorySlug={catSlugParam}
                onNavigate={handleNavigateArticle}
                onCategorySelect={handleSelectCategory}
              />

              {/* Sidebar footer */}
              <div className="mt-6 pt-5 border-t border-white/8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Quick Links</p>
                <div className="space-y-1.5">
                  {[
                    { label: "API Status", icon: <Shield className="w-3 h-3" />, href: "#" },
                    { label: "Changelog", icon: <ExternalLink className="w-3 h-3" />, href: "#" },
                    { label: "Community Forum", icon: <MessageSquare className="w-3 h-3" />, href: "#" },
                  ].map((l) => (
                    <a key={l.label} href={l.href} className="flex items-center gap-2 text-xs text-slate-600 hover:text-white transition-colors">
                      {l.icon} {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── CONTENT AREA ── */}
          <main className="flex-1 min-w-0">
            {currentArticle ? (
              <ArticleView
                article={currentArticle}
                onNavigate={handleNavigateArticle}
                onCategorySelect={handleSelectCategory}
              />
            ) : currentCategory ? (
              <CategoryView cat={currentCategory} onNavigate={handleNavigateArticle} />
            ) : (
              <HelpHome onNavigate={handleNavigateArticle} onCategorySelect={handleSelectCategory} />
            )}
          </main>
        </div>
      </div>

      {/* ── FOOTER BAND ── */}
      <div className="border-t border-white/8 bg-[#060a10] mt-12">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OmniChat Documentation — {HELP_ARTICLES.length} articles, updated regularly</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/blog" className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" /> Blog
              </Link>
              <a href="#" className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" /> Contact Support
              </a>
              <a href="#" className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                <ExternalLink className="w-3 h-3" /> API Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
