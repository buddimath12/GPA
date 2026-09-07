import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Scale, GraduationCap, FileText, ShieldCheck } from 'lucide-react';

interface FaqItem {
  id: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
}

export const FaqAndSeo: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('gpa-vs-cgpa');

  const faqs: FaqItem[] = [
    {
      id: 'gpa-vs-cgpa',
      icon: <Scale className="w-4 h-4 text-indigo-600" />,
      question: 'What is the exact difference between GPA and CGPA?',
      answer:
        'GPA (Grade Point Average) evaluates your academic performance for an individual semester or term. CGPA (Cumulative Grade Point Average) calculates the weighted mean across all semesters completed throughout your entire degree.',
    },
    {
      id: 'scales-comparison',
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
      question: 'Which grading scales are supported?',
      answer:
        'EduGPA natively supports the standard US 4.0 scale (with +/- letter grades), the UK Honours system (First Class, 2:1, 2:2, 3rd), and the UGC 4.0 scale used across South Asian universities (including India and Sri Lanka).',
    },
    {
      id: 'export-report',
      icon: <FileText className="w-4 h-4 text-indigo-600" />,
      question: 'Can I download and share my transcript report?',
      answer:
        'Yes! You can export your academic transcript report at any time either as a clean white sheet PDF or as a high-resolution Image (PNG) with full semester breakdowns and honors standing.',
    },
    {
      id: 'privacy-cloud',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-600" />,
      question: 'How is my academic data saved and secured?',
      answer:
        'Calculations run privately in your browser. When you create an account or sign in with Google, your semesters and target goals sync securely to the cloud so you can access them on any device.',
    },
    {
      id: 'target-planner',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      question: 'How does the Target GPA Forecaster work?',
      answer:
        'The planner uses linear credit-weight balancing to determine the exact average GPA you must achieve in remaining credit hours to reach your desired graduation honors or scholarship cut-off.',
    },
  ];

  return (
    <section id="faq-section" className="py-14 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean & Modern */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200/60 mb-2.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Quick Reference & Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto font-normal">
            Everything you need to know about grade calculations, international scales, and report exports.
          </p>
        </div>

        {/* Modern Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      {faq.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    <p className="pl-11">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
