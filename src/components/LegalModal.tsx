import React, { useState } from 'react';
import {
  X,
  Shield,
  FileText,
  HelpCircle,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Send,
  Building,
  Lock,
} from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Academic Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initial tab when opening
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSubmitted(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs no-print">
      <div
        className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-cyan-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-xs">
              {activeTab === 'privacy' && <Shield className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              {activeTab === 'about' && <Building className="w-5 h-5" />}
              {activeTab === 'contact' && <Mail className="w-5 h-5" />}
              {activeTab === 'disclaimer' && <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'about' && 'About GPAly'}
                {activeTab === 'contact' && 'Contact Support & Inquiries'}
                {activeTab === 'disclaimer' && 'Academic Disclaimer'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Google AdSense & Academic Transparency Standards • Updated for {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto scrollbar-none gap-2 py-2">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'about', label: 'About Us', icon: Building },
            { id: 'contact', label: 'Contact Us', icon: Mail },
            { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as LegalTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-900 font-medium">
                  <strong>Privacy First:</strong> GPAly calculations are executed client-side in your browser. We do not sell, rent, or monetize your course names, grades, or transcripts.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">1. Information We Collect</h4>
                <p>
                  We collect minimal data necessary to deliver and improve our academic calculators. When you use GPAly, coursework data (course names, credits, grades) is stored locally in your browser's <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">localStorage</code> or synced to your private account if you choose to sign in.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">2. Google AdSense & Third-Party Cookies</h4>
                <p>
                  GPAly utilizes Google AdSense and third-party advertising partners to serve relevant educational and academic advertisements. Google, as a third-party vendor, uses cookies (including the DoubleClick / DART cookie) to serve ads based on prior visits to this and other websites on the Internet.
                </p>
                <p className="mt-2 text-xs">
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 font-bold underline"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or by visiting the{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 font-bold underline"
                  >
                    Network Advertising Initiative
                  </a>.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">3. Analytics & Performance</h4>
                <p>
                  We may collect anonymous aggregate telemetry (such as browser type, page views, and performance metrics) to optimize site speed and calculation reliability. No personally identifiable academic records are tied to analytics.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">4. GDPR & CCPA Rights</h4>
                <p>
                  Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to access, export, or delete your saved calculation history at any time using the in-app Reset and Clear tools.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">1. Acceptance of Terms</h4>
                <p>
                  By accessing or using GPAly (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">2. Permitted Use</h4>
                <p>
                  GPAly is provided as a free educational productivity tool for students, faculty, and academic advisors. You are granted a personal, non-exclusive license to calculate, track, forecast, and generate printable PDF and image transcripts for personal and non-commercial educational purposes.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">3. Calculation Accuracy & Institutional Independence</h4>
                <p>
                  While GPAly implements standard global mathematical algorithms for US 4.0, UK Honours, UGC 10-Point, and ECTS grading systems, institutional policies vary. Grading curves, pass/fail rules, repeated course forgiveness, and degree honors criteria vary by college or university. Always verify official standing with your institution's Registrar.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">4. Intellectual Property</h4>
                <p>
                  The GPAly platform, logo, branding, graphics, algorithms, and interface design are protected by copyright and intellectual property laws. You retain full ownership of any academic course content you enter.
                </p>
              </div>
            </div>
          )}

          {/* ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Our Mission</h4>
                <p>
                  GPAly was founded with a straightforward mission: to provide collegiate and university students worldwide with the most intuitive, accurate, and beautifully crafted academic performance platform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Global Grading Support</span>
                  <p className="text-xs text-slate-600">
                    Engineered to support US 4.0 scale with +/- modifiers, UK Honours degree classifications, UGC South Asian scale, and European ECTS credits.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Official White Sheet Reports</span>
                  <p className="text-xs text-slate-600">
                    Instant PDF transcripts and high-resolution scorecard graphics tailored for scholarship applications, graduate school submissions, and resume attachments.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Transparency & Community</h4>
                <p>
                  We believe essential academic planning tools should be free, accessible, and respectful of student privacy. We continuously update our curriculum databases and grading matrices to support universities across North America, the United Kingdom, Europe, South Asia, and worldwide.
                </p>
              </div>
            </div>
          )}

          {/* CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Thank you for reaching out to the GPAly Academic Support Team. We respond to all student and institutional inquiries within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Have questions about specific university grading scales, feedback on our transcript exports, or advertising inquiries? Let us know:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="alex@university.edu"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                    >
                      <option value="General Academic Inquiry">General Academic Inquiry</option>
                      <option value="Grading Scale Request / Fix">Grading Scale Request / New University</option>
                      <option value="Transcript Export Feedback">Transcript Export Feedback</option>
                      <option value="Advertising & Sponsorship">Advertising & Sponsorship (AdSense / Partners)</option>
                      <option value="Bug Report">Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Please describe your question or suggestion in detail..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Official email: <a href="mailto:support@gpaly.com" className="text-purple-600 font-semibold underline">support@gpaly.com</a>
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Educational Advisory Notice
                  </h4>
                  <p className="text-xs text-amber-800 mt-1">
                    GPAly is an independent calculation tool designed for planning, forecasting, and academic tracking. It is not affiliated with, endorsed by, or accredited by any university, college, or examination board.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Unofficial Transcripts</h4>
                <p>
                  Any PDF reports or graphics exported via GPAly represent unofficial candidate-generated transcripts. They reflect only the course codes, titles, credits, and grade entries input by the user. Official transcripts must always be requested through your university's Registrar or Student Records Division.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Grading Scale Variations</h4>
                <p>
                  Colleges and universities frequently update syllabus policies, rounding conventions, grade replacement regulations, and GPA cutoffs for Latin honors (Summa Cum Laude, Magna Cum Laude, Cum Laude). Users should consult their academic advisors for final graduation audits.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>© {new Date().getFullYear()} GPAly. All rights reserved.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
