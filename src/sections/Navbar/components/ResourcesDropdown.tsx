import { Link } from "react-router-dom";
import {
  Clock, RefreshCw, Code2, Video, Rss, Calculator, Link2, QrCode, Award, ArrowRight
} from "lucide-react";

type Props = { onClose: () => void; fullWidth?: boolean };

export const ResourcesDropdown = ({ onClose }: Props) => {
  return (
    <div className="w-full bg-[#0f1220]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-4 gap-0 py-7">

          {/* Col 1 — Support */}
          <div className="pr-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Support</p>
            <div className="space-y-5">
              <a href="#" className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-500/40 transition-colors">
                  <Clock className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors leading-tight">Contact Us</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">With 24/5 live support and 24/7 AI support, we&#39;re here to help</p>
                </div>
              </a>
              <a href="#" className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-500/40 transition-colors">
                  <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors leading-tight">Help Center</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Handy step-by-step guides to configure and use OmniChat</p>
                </div>
              </a>
            </div>
          </div>

          {/* Col 2 — Learn */}
          <div className="pr-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Learn</p>
            <div className="space-y-5">
              <a href="#" className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-500/40 transition-colors">
                  <Video className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors leading-tight">Video Guides</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Master business messaging from industry experts to build customer connections</p>
                </div>
              </a>
              <Link to="/blog" onClick={onClose} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-orange-500/40 transition-colors">
                  <Rss className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors leading-tight">Blog</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Growth playbooks, AI deep-dives, case studies and product updates</p>
                </div>
              </Link>
              <a href="#" className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-500/40 transition-colors">
                  <Code2 className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors leading-tight">Developer Hub</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Guides and documentation to help you start working with OmniChat</p>
                </div>
              </a>
            </div>
          </div>

          {/* Col 3 — Tools */}
          <div className="pr-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Tools</p>
            <div className="space-y-5">
              <Link to="/tools/whatsapp-pricing" onClick={onClose} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-green-500/40 transition-colors">
                  <Calculator className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors leading-tight">WhatsApp Pricing Calculator</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Calculate your WhatsApp Business Messaging and Calling costs</p>
                </div>
              </Link>
              <Link to="/tools/whatsapp-link-generator" onClick={onClose} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-green-500/40 transition-colors">
                  <Link2 className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors leading-tight">WhatsApp Link Generator</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">Create a WhatsApp link &amp; QR code instantly</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Col 4 — Partners */}
          <div className="pl-8 border-l border-white/[0.06]">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-sm font-bold text-white leading-tight mb-1">Partners</p>
              <p className="text-[12px] text-slate-500 leading-snug mb-4">Join a growing network of partners with commissions for referrals</p>
              <Link
                to="/resources"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-300 transition-colors group"
              >
                Explore Our Partner Program
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
