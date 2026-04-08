import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Zap, Shield, Building2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const plans = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    monthly: 29,
    annual: 23,
    description: "Perfect for small teams getting started with omnichannel support.",
    color: "border-white/10",
    ctaColor: "bg-white/8 hover:bg-white/12 text-white border border-white/10",
    icon: <Zap className="w-5 h-5" />,
    iconColor: "bg-brand-600/20 text-brand-400",
    agents: "3 agents included",
    channels: "3 channels",
    features: [
      { text: "3 Agent seats", included: true },
      { text: "3 Channels (WhatsApp, IG, Email)", included: true },
      { text: "Unified Inbox", included: true },
      { text: "Basic Automation (5 workflows)", included: true },
      { text: "5,000 conversations/month", included: true },
      { text: "Contact Management", included: true },
      { text: "Saved Replies (snippets)", included: true },
      { text: "7-day conversation history", included: true },
      { text: "Email support", included: true },
      { text: "Team Collaboration", included: false },
      { text: "Advanced Analytics", included: false },
      { text: "AI Assistant", included: false },
      { text: "API Access", included: false },
      { text: "Custom Integrations", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    monthly: 79,
    annual: 63,
    description: "For growing teams that need full omnichannel power and automation.",
    color: "border-brand-600/50 shadow-xl shadow-brand-600/10",
    ctaColor: "bg-brand-600 hover:bg-brand-500 text-white",
    icon: <Shield className="w-5 h-5" />,
    iconColor: "bg-brand-600 text-white",
    agents: "10 agents included",
    channels: "All 5 channels",
    features: [
      { text: "10 Agent seats", included: true },
      { text: "All 5 Channels (incl. Live Chat)", included: true },
      { text: "Unified Inbox", included: true },
      { text: "Unlimited Automation Workflows", included: true },
      { text: "25,000 conversations/month", included: true },
      { text: "Full Contact & CRM features", included: true },
      { text: "Saved Replies & Templates", included: true },
      { text: "Unlimited conversation history", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Team Collaboration & Mentions", included: true },
      { text: "Advanced Analytics & Reports", included: true },
      { text: "AI Assistant (beta)", included: true },
      { text: "API Access & Webhooks", included: false },
      { text: "Custom Integrations", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "Best Value",
    monthly: 149,
    annual: 119,
    description: "For established businesses with complex workflows and large teams.",
    color: "border-purple-600/30",
    ctaColor: "bg-white/8 hover:bg-white/12 text-white border border-white/10",
    icon: <Building2 className="w-5 h-5" />,
    iconColor: "bg-purple-600/20 text-purple-400",
    agents: "25 agents included",
    channels: "All channels + API",
    features: [
      { text: "25 Agent seats", included: true },
      { text: "All Channels + custom via API", included: true },
      { text: "Unified Inbox", included: true },
      { text: "Unlimited Automation Workflows", included: true },
      { text: "100,000 conversations/month", included: true },
      { text: "Full Contact & CRM features", included: true },
      { text: "Saved Replies & Templates", included: true },
      { text: "Unlimited conversation history", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Team Collaboration & Mentions", included: true },
      { text: "Advanced Analytics & White-label Reports", included: true },
      { text: "AI Assistant + Knowledge Base", included: true },
      { text: "Full API Access & Webhooks", included: true },
      { text: "Custom Integrations (Shopify, HubSpot, etc.)", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes, you can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately, downgrades at the next billing cycle.",
  },
  {
    q: "What happens when I exceed my conversation limit?",
    a: "We&#39;ll notify you at 80% usage. You can upgrade your plan or purchase additional conversation packs without interruption.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — all plans include a 14-day free trial with full access. No credit card required to start.",
  },
  {
    q: "Do you offer discounts for nonprofits or startups?",
    a: "Yes! We offer 30% off for verified nonprofits and early-stage startups. Contact our sales team for details.",
  },
  {
    q: "What counts as a conversation?",
    a: "A conversation is an uninterrupted exchange between one contact and your team within a 24-hour window across any channel.",
  },
  {
    q: "Can I add more agents beyond the plan limit?",
    a: "Yes. Additional agent seats can be added for $9/agent/month on Starter, $12 on Growth, and $10 on Business.",
  },
];

export const PricingPage = () => {
  useSEO({
    title: "OmniChat Pricing — Transparent Plans Starting at $29/mo | No Hidden Fees",
    description: "OmniChat pricing: Starter $29/mo, Growth $79/mo, Business $149/mo. All include unified inbox, WhatsApp API, automation and AI. 14-day free trial, no credit card. Beats respond.io & Sleekflow on price and features.",
    canonical: "https://omnichat.io/pricing",
    ogImage: "https://omnichat.io/og-pricing.png",
    keywords: "omnichannel software pricing, WhatsApp business platform cost, OmniChat plans, customer messaging software price, respond.io pricing alternative, sleekflow pricing alternative, omnichannel inbox pricing, WhatsApp API pricing, affordable customer support platform",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "OmniChat — Omnichannel Messaging Platform",
        "description": "All-in-one omnichannel inbox for growing teams — WhatsApp, Instagram, Messenger, Email, Live Chat, AI and automation.",
        "brand": {"@type": "Brand", "name": "OmniChat"},
        "offers": [
          {"@type":"Offer","name":"Starter","price":"29","priceCurrency":"USD","priceValidUntil":"2027-12-31"},
          {"@type":"Offer","name":"Growth","price":"79","priceCurrency":"USD","priceValidUntil":"2027-12-31"},
          {"@type":"Offer","name":"Business","price":"149","priceCurrency":"USD","priceValidUntil":"2027-12-31"}
        ],
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"342","bestRating":"5"}
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Is there a free trial for OmniChat?","acceptedAnswer":{"@type":"Answer","text":"Yes, all OmniChat plans include a full 14-day free trial with no credit card required."}},
          {"@type":"Question","name":"How does OmniChat pricing compare to respond.io?","acceptedAnswer":{"@type":"Answer","text":"OmniChat offers superior features at a significantly lower price. Our Growth plan at $79/mo includes AI, unlimited automations and all 5 channels — comparable respond.io tiers cost 2-3x more."}},
          {"@type":"Question","name":"Can I cancel my OmniChat subscription anytime?","acceptedAnswer":{"@type":"Answer","text":"Yes, you can upgrade, downgrade or cancel at any time with no cancellation fees."}},
          {"@type":"Question","name":"What counts as a conversation in OmniChat?","acceptedAnswer":{"@type":"Answer","text":"A conversation is an uninterrupted exchange between one contact and your team within a 24-hour window."}},
          {"@type":"Question","name":"Does OmniChat charge per agent seat?","acceptedAnswer":{"@type":"Answer","text":"Yes, additional seats are available at $9-$12/agent/month beyond the included seats in each plan."}}
        ]
      }
    ],
  });

  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-32">
      {/* Hero */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/20 text-brand-400 text-xs font-semibold mb-6 uppercase tracking-wide">
          Simple, Transparent Pricing
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
          Scale your support.<br />
          <span className="text-gradient">Not your costs.</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-xl mx-auto mb-8">
          Start free for 14 days. No credit card, no contracts. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1 bg-white/5 border border-white/8 rounded-xl">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Annual
            <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className={`relative rounded-2xl border ${plan.color} bg-[#0d1220] overflow-hidden flex flex-col`}>
              {plan.badge && (
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-4 py-1 ${plan.id === "growth" ? "bg-brand-600 text-white" : "bg-amber-600/80 text-white"} rounded-b-lg`}>
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`p-7 ${plan.badge ? "pt-9" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.iconColor}`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500">{plan.agents} · {plan.channels}</p>
                  </div>
                </div>

                <div className="mb-1">
                  <span className="text-5xl font-bold text-white">${annual ? plan.annual : plan.monthly}</span>
                  <span className="text-slate-400 text-sm ml-1">/mo</span>
                </div>
                {annual && (
                  <p className="text-xs text-green-400 mb-4">Billed annually (${plan.annual * 12}/yr) · Save ${(plan.monthly - plan.annual) * 12}/yr</p>
                )}

                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>

                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mb-6 flex items-center justify-center gap-2 ${plan.ctaColor}`}>
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </button>

                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included
                        ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        : <XCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />}
                      <span className={`text-sm ${f.included ? "text-slate-300" : "text-slate-600"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-6 p-7 rounded-2xl border border-white/8 bg-gradient-to-r from-brand-600/10 to-purple-600/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Enterprise</h3>
            <p className="text-slate-400 text-sm max-w-lg">Unlimited agents, custom SLA, dedicated infrastructure, SSO, custom contracts, and a dedicated success manager. Built for large organizations with complex needs.</p>
          </div>
          <div className="shrink-0 flex flex-col gap-2 items-center md:items-end">
            <span className="text-2xl font-bold text-white">Custom Pricing</span>
            <button className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-all glow-brand-sm">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Compare Plans</h2>
        <div className="rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400 w-1/2">Feature</th>
                {plans.map(p => (
                  <th key={p.id} className="text-center px-6 py-4 text-sm font-semibold text-white">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Agent Seats", values: ["3", "10", "25"] },
                { label: "Channels", values: ["3", "5", "All + API"] },
                { label: "Conversations/mo", values: ["5,000", "25,000", "100,000"] },
                { label: "Automation Workflows", values: ["5", "Unlimited", "Unlimited"] },
                { label: "Conversation History", values: ["7 days", "Unlimited", "Unlimited"] },
                { label: "Team Collaboration", values: [false, true, true] },
                { label: "Advanced Analytics", values: [false, true, true] },
                { label: "AI Assistant", values: [false, "Beta", true] },
                { label: "API & Webhooks", values: [false, false, true] },
                { label: "Custom Integrations", values: [false, false, true] },
                { label: "White-label Reports", values: [false, false, true] },
                { label: "SLA Support", values: ["Email", "Chat + Email", "Dedicated"] },
              ].map((row, ri) => (
                <tr key={row.label} className={`border-b border-white/5 ${ri % 2 === 0 ? "" : "bg-white/2"}`}>
                  <td className="px-6 py-3.5 text-sm text-slate-300">{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td key={vi} className="text-center px-6 py-3.5">
                      {typeof v === "boolean" ? (
                        v
                          ? <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                          : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        <span className="text-sm text-slate-300 font-medium">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/8 rounded-xl bg-white/3 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-400 shrink-0" />
                  {faq.q}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 border-t border-white/5">
                  <p className="text-sm text-slate-400 pt-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
        <div className="p-14 rounded-3xl bg-gradient-to-br from-brand-600/20 to-purple-600/10 border border-brand-600/20">
          <h2 className="text-4xl font-bold text-white mb-4">Start your free 14-day trial</h2>
          <p className="text-slate-400 text-lg mb-8">No credit card required. Full access. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all glow-brand-sm text-base">
              Try for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-xl transition-all text-base">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
