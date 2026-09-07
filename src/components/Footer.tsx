import React from 'react';
import { Heart, ShieldCheck, Mail, FileText, HelpCircle, AlertTriangle } from 'lucide-react';
import { Logo } from './Logo';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
              <Logo size="md" showSubtitle={true} className="[&_span.text-slate-900]:text-slate-300" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Universal Academic Grade Point Average & Cumulative CGPA calculation platform. Supporting collegiate and university standards worldwide with white sheet transcript export.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => onOpenLegal?.('about')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                About Us
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('contact')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Contact Support
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('disclaimer')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Academic Disclaimer
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3.5">
              Grading Scales
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-semibold">
              <li className="hover:text-cyan-300 transition-colors">US 4.0 Standard Scale</li>
              <li className="hover:text-cyan-300 transition-colors">UK Honours Degree System</li>
              <li className="hover:text-cyan-300 transition-colors">UGC India & Sri Lanka Scale</li>
              <li className="hover:text-cyan-300 transition-colors">White Sheet Academic PDF Exporter</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3.5">
              Legal & AdSense Compliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-semibold">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('privacy')}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('terms')}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('about')}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-left"
                >
                  About GPAly Platform
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('contact')}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('disclaimer')}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-left"
                >
                  Institutional Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GPAly Universal Calculator. Fully compliant with Google AdSense Policies.</p>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for academic excellence worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
