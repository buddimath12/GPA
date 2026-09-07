import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal GPA & CGPA Calculator | Fast, Accurate Academic Engine</title>
  <meta name="description" content="Calculate GPA and CGPA across US 4.0, UK Honours, UGC Sri Lanka/India, and Custom scales with quick overall calculations, smart major autofill, and course autocomplete.">

  <!-- Google Fonts: Poppins (Headings) & Inter (Body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Poppins', 'sans-serif'],
          },
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              500: '#10b981',
              600: '#059669', // Emerald/Forest green
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            }
          }
        }
      }
    }
  </script>

  <!-- Chart.js CDN for Analytics -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; }
    h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Poppins', sans-serif; }
    
    /* Autocomplete dropdown positioning */
    .autocomplete-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
      z-index: 50;
      max-height: 14rem;
      overflow-y: auto;
      margin-top: 0.25rem;
    }

    @media print {
      body { background: #fff !important; color: #000 !important; }
      .no-print, nav, header, footer, .ad-container, button, .hero-section { display: none !important; }
      .print-only { display: block !important; }
    }
    @media screen {
      .print-only { display: none !important; }
    }
  </style>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col">

  <!-- ========================================== -->
  <!-- Navigation Bar                             -->
  <!-- ========================================== -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-green-600/20">
          Σ
        </div>
        <div>
          <span class="text-lg font-black font-heading text-slate-900 leading-none">Edu<span class="text-green-600">GPA</span></span>
          <span class="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Universal Academic Engine</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
        <a href="#quick-calculator" class="hover:text-green-600 transition">Quick CGPA</a>
        <a href="#detailed-calculator" class="hover:text-green-600 transition">Detailed Breakdown</a>
        <a href="#faq" class="hover:text-green-600 transition">FAQ & Grading Scales</a>
      </nav>

      <div class="flex items-center gap-3">
        <button onclick="window.print()" class="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer">
          <span>Save / Print PDF</span>
        </button>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <!-- ========================================================= -->
    <!-- COMPONENT 1: The Quick Overall CGPA Calculator (Hero View)-->
    <!-- ========================================================= -->
    <section id="quick-calculator" class="hero-section py-8 lg:py-12 bg-slate-50 border-b border-slate-200/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Hero Header -->
        <div class="text-center max-w-3xl mx-auto mb-8">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200 mb-3">
            <span>⚡ Two-Tier Calculation Structure</span>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Universal GPA & CGPA <span class="text-green-600">Calculator</span>
          </h1>
          <p class="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Compute your overall cumulative GPA immediately in our Hero calculator, or scroll down to manage detailed semesters with intelligent course autocompletion.
          </p>
        </div>

        <!-- Quick Calculator Card (First View) -->
        <div class="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 sm:p-7 lg:p-8 relative overflow-hidden">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
            <div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span class="w-8 h-8 rounded-xl bg-green-600 text-white flex items-center justify-center text-sm shadow-xs">1</span>
                <span>Quick Overall CGPA Calculator</span>
              </h2>
              <p class="text-xs text-slate-500 mt-0.5">Fast two-step combination: previous cumulative record + current term</p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="loadQuickSample()" class="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition cursor-pointer">
                Load Sample
              </button>
              <button type="button" onclick="resetQuickGpa()" class="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer">
                Reset
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <!-- Inputs Panel -->
            <form id="quickGpaForm" onsubmit="event.preventDefault(); calculateQuickGpa();" class="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Current Cumulative GPA
                  </label>
                  <input id="quickCurrentGpa" type="number" step="0.01" min="0" max="10" value="3.50" required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-green-600"
                    placeholder="e.g. 3.50" />
                  <span class="text-[11px] text-slate-400">Previous cumulative CGPA</span>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Total Credits Earned
                  </label>
                  <input id="quickCurrentCredits" type="number" step="0.5" min="0" value="60" required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-green-600"
                    placeholder="e.g. 60" />
                  <span class="text-[11px] text-slate-400">Total earned graded credits</span>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Current Semester GPA
                  </label>
                  <input id="quickSemGpa" type="number" step="0.01" min="0" max="10" value="3.85" required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-green-600"
                    placeholder="e.g. 3.85" />
                  <span class="text-[11px] text-slate-400">SGPA for current semester</span>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Current Semester Credits
                  </label>
                  <input id="quickSemCredits" type="number" step="0.5" min="0" value="15" required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-green-600"
                    placeholder="e.g. 15" />
                  <span class="text-[11px] text-slate-400">Credits taken this semester</span>
                </div>
              </div>

              <!-- Large Prominent Action Button -->
              <div class="pt-2">
                <button type="submit"
                  class="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-green-600/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-heading">
                  <span>⚡ Calculate Overall GPA</span>
                </button>
              </div>
            </form>

            <!-- Result Box Output -->
            <div class="lg:col-span-5 flex flex-col">
              <div class="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-slate-900/10 flex flex-col justify-between border border-slate-800">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] font-black uppercase tracking-widest text-emerald-400">Quick Result</span>
                    <span id="quickDeltaBadge" class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      +0.07 GPA Boost ▲
                    </span>
                  </div>

                  <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">New Overall CGPA</span>
                  <div class="flex items-baseline gap-2 mb-3">
                    <span id="quickResultDisplay" class="text-5xl sm:text-6xl font-black text-white tracking-tight font-heading">
                      3.57
                    </span>
                    <span class="text-slate-400 font-bold text-sm">/ 4.00 Max</span>
                  </div>

                  <div id="quickHonourBadge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold mb-4 text-green-300 bg-green-950/60 border-green-800">
                    🏆 Magna Cum Laude / High Distinction
                  </div>

                  <div class="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-700">
                    <div class="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                      <span class="block text-[10px] uppercase font-bold text-slate-400">Total Combined Credits</span>
                      <span id="quickTotalCredits" class="text-lg font-black text-emerald-400">75 Credits</span>
                    </div>
                    <div class="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                      <span class="block text-[10px] uppercase font-bold text-slate-400">Quality Points</span>
                      <span id="quickTotalPoints" class="text-lg font-black text-emerald-400">267.75</span>
                    </div>
                  </div>
                </div>

                <div class="mt-5 pt-3 border-t border-slate-700">
                  <a href="#detailed-calculator" class="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2">
                    <span>Need Subject-by-Subject Breakdown? Scroll Down ↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- COMPONENT 2: Detailed Semester-by-Semester Calculator (Below Fold)  -->
    <!-- =================================================================== -->
    <section id="detailed-calculator" class="py-8 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200 mb-2">
              <span>📚 Comprehensive Academic Planner</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Detailed Semester & Course Calculator
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              Add multiple semesters, select your grading system, autofill common major courses, or type to use smart autocomplete.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="resetAllSemesters()" class="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition cursor-pointer">
              Reset Semesters
            </button>
            <button onclick="loadSampleSemesters()" class="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer">
              Load Sample Data
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Detailed Semesters List (8 Cols) -->
          <div class="lg:col-span-8 space-y-6">
            
            <!-- Master Container -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden">
              
              <!-- Toolbar Top Bar -->
              <div class="p-5 bg-green-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-white text-base">
                    🎓
                  </div>
                  <div>
                    <h3 class="text-white font-black text-lg font-heading">Grading System & Scale</h3>
                    <p class="text-xs text-green-100 font-medium" id="systemDescriptionLabel">Select Country/Scale to alter row grades</p>
                  </div>
                </div>

                <!-- Country / Scale Selector -->
                <div class="flex items-center gap-2">
                  <label for="countryScaleSelector" class="sr-only">Country / Scale</label>
                  <select id="countryScaleSelector" onchange="changeGradingSystem(this.value)"
                    class="appearance-none bg-emerald-500 hover:bg-emerald-400 text-white text-xs border-none rounded-xl px-3 py-2 font-bold cursor-pointer transition focus:ring-2 focus:ring-white">
                    <option value="us" class="text-slate-800 bg-white">US (4.0 Scale)</option>
                    <option value="uk" class="text-slate-800 bg-white">UK Honours (1st, 2:1, 2:2)</option>
                    <option value="ugc" class="text-slate-800 bg-white">Sri Lanka / India (UGC)</option>
                    <option value="custom" class="text-slate-800 bg-white">Custom (10.0 Scale)</option>
                  </select>
                </div>
              </div>

              <!-- Smart Major Pre-fill Toolbar -->
              <div class="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/80 via-green-50/40 to-white border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label for="majorSelect" class="text-xs font-bold text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
                    <span>📖 Select your Major:</span>
                  </label>
                  <select id="majorSelect" class="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer focus:ring-2 focus:ring-green-600 min-w-[210px]">
                    <option value="">-- Choose a Major --</option>
                  </select>
                </div>
                <div class="flex items-center gap-2">
                  <button id="autoFillBtn" type="button" onclick="autoFillMajorSubjects()"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                    <span>✨ Auto-Fill Subjects</span>
                  </button>
                </div>
              </div>

              <!-- Feedback message -->
              <div id="autofillNotice" class="hidden p-3 bg-emerald-100 border-b border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
                <span id="autofillNoticeText">Courses auto-filled successfully!</span>
                <span class="text-[10px] text-emerald-700">Adjust grades below ↓</span>
              </div>

              <!-- Semesters Container -->
              <div id="semestersContainer" class="p-5 sm:p-6 space-y-6">
                <!-- Injected via JavaScript -->
              </div>

              <!-- Add Another Semester Button -->
              <div class="p-5 pt-0">
                <button type="button" onclick="addSemester()"
                  class="w-full py-3.5 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer font-heading">
                  <span>+ Add Another Semester</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- Right Column: Grand Total CGPA & Sticky Desktop Sidebar   -->
          <!-- ========================================================= -->
          <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            <!-- Grand Total CGPA Card -->
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl shadow-slate-900/10 border border-slate-800">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-black uppercase tracking-widest text-emerald-400">Grand Total CGPA</span>
                <span id="grandScaleLabel" class="text-xs bg-white/10 px-2 py-0.5 rounded-full font-mono text-emerald-300">Scale: 4.0 Max</span>
              </div>

              <div class="flex items-baseline gap-2 mb-4">
                <span id="grandCgpaDisplay" class="text-5xl sm:text-6xl font-black font-heading text-white">0.00</span>
                <span class="text-slate-400 font-medium text-sm">Overall</span>
              </div>

              <div class="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/80">
                <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <span class="block text-[10px] uppercase font-bold text-slate-400">Total Credits</span>
                  <span id="grandTotalCredits" class="text-xl font-black text-emerald-400">0</span>
                </div>
                <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <span class="block text-[10px] uppercase font-bold text-slate-400">Quality Points</span>
                  <span id="grandTotalPoints" class="text-xl font-black text-emerald-400">0.0</span>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span id="grandSemCount">2 Semesters</span>
                <span>•</span>
                <span id="grandCourseCount">8 Courses Total</span>
              </div>
            </div>

            <!-- Grade Distribution Chart -->
            <div class="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-slate-900 font-heading">Grade Analytics</h3>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Chart</span>
              </div>
              <div class="relative h-48 w-full flex items-center justify-center">
                <canvas id="gradeDoughnutChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ & Educational SEO Section -->
    <section id="faq" class="py-12 bg-white border-t border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Grading Systems & FAQ</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Everything you need to understand how GPA, SGPA, and cumulative CGPA are mathematically computed.</p>
        </div>

        <div class="space-y-4 text-sm text-slate-600">
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="font-bold text-slate-900 text-base mb-1 font-heading">What is the difference between GPA, SGPA, and CGPA?</h3>
            <p>GPA (Grade Point Average) measures academic achievement. SGPA (Semester Grade Point Average) evaluates your performance in a single term, while CGPA (Cumulative Grade Point Average) combines all quality points across all completed semesters divided by total completed credit hours.</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="font-bold text-slate-900 text-base mb-1 font-heading">How does the Two-Tier calculation work?</h3>
            <p>The Quick Overall CGPA Calculator allows you to input your existing historical cumulative metrics and your current semester GPA to see your new cumulative standing instantly. Below it, the Detailed Calculator lets you build custom semester records from course level up.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="font-bold text-white mb-1">Universal GPA & CGPA Academic Engine</p>
      <p>Modern Educational Suite supporting US, UK, UGC Sri Lanka & India, and Custom 10-Point Scales.</p>
    </div>
  </footer>

  <!-- ========================================================= -->
  <!-- Clean, Commented Vanilla JavaScript & Predefined JSON Data -->
  <!-- ========================================================= -->
  <script>
    /* -------------------------------------------------------------
     * 1. PREDEFINED JSON DATA: GRADING SYSTEMS & POPULAR MAJORS
     * ------------------------------------------------------------- */
    const GRADING_SYSTEMS = {
      us: {
        id: 'us',
        name: 'US (4.0 Standard Scale)',
        maxGpa: 4.0,
        grades: [
          { label: 'A+', points: 4.0 },
          { label: 'A', points: 4.0 },
          { label: 'A-', points: 3.7 },
          { label: 'B+', points: 3.3 },
          { label: 'B', points: 3.0 },
          { label: 'B-', points: 2.7 },
          { label: 'C+', points: 2.3 },
          { label: 'C', points: 2.0 },
          { label: 'C-', points: 1.7 },
          { label: 'D+', points: 1.3 },
          { label: 'D', points: 1.0 },
          { label: 'F', points: 0.0 }
        ]
      },
      uk: {
        id: 'uk',
        name: 'UK Honours Classification',
        maxGpa: 4.0,
        grades: [
          { label: '1st (First Class)', points: 4.0 },
          { label: '2:1 (Upper Second)', points: 3.33 },
          { label: '2:2 (Lower Second)', points: 2.67 },
          { label: '3rd (Third Class)', points: 2.0 },
          { label: 'Pass', points: 1.0 },
          { label: 'Fail', points: 0.0 }
        ]
      },
      ugc: {
        id: 'ugc',
        name: 'Sri Lanka / India (UGC Scale)',
        maxGpa: 4.0,
        grades: [
          { label: 'A+', points: 4.0 },
          { label: 'A', points: 4.0 },
          { label: 'A-', points: 3.7 },
          { label: 'B+', points: 3.3 },
          { label: 'B', points: 3.0 },
          { label: 'B-', points: 2.7 },
          { label: 'C+', points: 2.3 },
          { label: 'C', points: 2.0 },
          { label: 'C-', points: 1.7 },
          { label: 'D+', points: 1.3 },
          { label: 'D', points: 1.0 },
          { label: 'E/F', points: 0.0 }
        ]
      },
      custom: {
        id: 'custom',
        name: 'Custom (10.0 Scale / Percentage)',
        maxGpa: 10.0,
        grades: [
          { label: 'O (Outstanding)', points: 10.0 },
          { label: 'A+ (Excellent)', points: 9.0 },
          { label: 'A (Very Good)', points: 8.0 },
          { label: 'B+ (Good)', points: 7.0 },
          { label: 'B (Above Average)', points: 6.0 },
          { label: 'C (Average)', points: 5.0 },
          { label: 'P (Pass)', points: 4.0 },
          { label: 'F (Fail)', points: 0.0 }
        ]
      }
    };

    const POPULAR_MAJORS = [
      {
        id: 'cs',
        name: 'Computer Science & Software Eng.',
        subjects: [
          { name: 'Introduction to Computer Science', credits: 4 },
          { name: 'Data Structures & Algorithms', credits: 4 },
          { name: 'Calculus & Analytical Geometry', credits: 4 },
          { name: 'Discrete Mathematics', credits: 3 },
          { name: 'Computer Architecture & Microprocessors', credits: 4 }
        ]
      },
      {
        id: 'eng',
        name: 'Mechanical & Civil Engineering',
        subjects: [
          { name: 'Engineering Physics & Laboratory', credits: 4 },
          { name: 'Applied Mathematics & Differential Equations', credits: 4 },
          { name: 'Thermodynamics & Heat Transfer', credits: 3 },
          { name: 'Statics & Mechanics of Materials', credits: 4 },
          { name: 'Engineering Graphics & CAD', credits: 3 }
        ]
      },
      {
        id: 'bus',
        name: 'Business Administration & Finance',
        subjects: [
          { name: 'Financial Accounting Principles', credits: 3 },
          { name: 'Microeconomics Theory', credits: 3 },
          { name: 'Principles of Marketing', credits: 3 },
          { name: 'Business Statistics & Data Analysis', credits: 4 },
          { name: 'Corporate Finance & Management', credits: 3 }
        ]
      },
      {
        id: 'med',
        name: 'Pre-Med & Biomedical Sciences',
        subjects: [
          { name: 'General Chemistry with Lab', credits: 4 },
          { name: 'Cellular & Molecular Biology', credits: 4 },
          { name: 'Organic Chemistry I & Lab', credits: 4 },
          { name: 'Human Anatomy & Physiology', credits: 4 },
          { name: 'Biochemistry Fundamentals', credits: 3 }
        ]
      }
    ];

    /* -------------------------------------------------------------
     * 2. STATE MANAGEMENT
     * ------------------------------------------------------------- */
    let currentSystemKey = 'us';
    let chartInstance = null;
    let semesterCounter = 2;
    let semesters = [
      {
        id: 1,
        title: 'Semester 1',
        courses: [
          { id: 101, name: 'Introduction to Computer Science', credits: 4, grade: 'A' },
          { id: 102, name: 'Calculus & Analytical Geometry', credits: 4, grade: 'A-' },
          { id: 103, name: 'Engineering Physics & Laboratory', credits: 4, grade: 'B+' },
          { id: 104, name: 'Technical Writing & Communication', credits: 3, grade: 'A' }
        ]
      },
      {
        id: 2,
        title: 'Semester 2',
        courses: [
          { id: 201, name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
          { id: 202, name: 'Discrete Mathematics', credits: 3, grade: 'B+' },
          { id: 203, name: 'Computer Architecture & Microprocessors', credits: 4, grade: 'A-' },
          { id: 204, name: 'Environmental Science', credits: 2, grade: 'B' }
        ]
      }
    ];

    /* -------------------------------------------------------------
     * 3. COMPONENT 1: QUICK OVERALL CGPA CALCULATOR LOGIC
     * ------------------------------------------------------------- */
    function calculateQuickGpa() {
      const curGpa = parseFloat(document.getElementById('quickCurrentGpa').value) || 0;
      const curCred = parseFloat(document.getElementById('quickCurrentCredits').value) || 0;
      const semGpa = parseFloat(document.getElementById('quickSemGpa').value) || 0;
      const semCred = parseFloat(document.getElementById('quickSemCredits').value) || 0;

      const prevPoints = curGpa * curCred;
      const semPoints = semGpa * semCred;
      const totalCred = curCred + semCred;
      const totalPts = prevPoints + semPoints;

      const newCgpa = totalCred > 0 ? (totalPts / totalCred) : 0;
      const delta = curCred > 0 ? (newCgpa - curGpa) : 0;

      document.getElementById('quickResultDisplay').innerText = newCgpa.toFixed(2);
      document.getElementById('quickTotalCredits').innerText = totalCred + ' Credits';
      document.getElementById('quickTotalPoints').innerText = totalPts.toFixed(2);

      const deltaBadge = document.getElementById('quickDeltaBadge');
      if (delta >= 0) {
        deltaBadge.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300';
        deltaBadge.innerText = '+' + delta.toFixed(2) + ' GPA Boost ▲';
      } else {
        deltaBadge.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300';
        deltaBadge.innerText = delta.toFixed(2) + ' GPA Delta ▼';
      }

      // Academic Honour Badge
      const honourBadge = document.getElementById('quickHonourBadge');
      if (newCgpa >= 3.8) {
        honourBadge.innerText = '🏆 Summa Cum Laude / First Class Honours';
      } else if (newCgpa >= 3.5) {
        honourBadge.innerText = '🎖️ Magna Cum Laude / High Distinction';
      } else if (newCgpa >= 3.0) {
        honourBadge.innerText = '🎓 Cum Laude / Upper Second (2:1)';
      } else {
        honourBadge.innerText = '📘 Good Academic Standing';
      }
    }

    function resetQuickGpa() {
      document.getElementById('quickCurrentGpa').value = '';
      document.getElementById('quickCurrentCredits').value = '';
      document.getElementById('quickSemGpa').value = '';
      document.getElementById('quickSemCredits').value = '';
      document.getElementById('quickResultDisplay').innerText = '0.00';
      document.getElementById('quickTotalCredits').innerText = '0 Credits';
      document.getElementById('quickTotalPoints').innerText = '0.0';
      document.getElementById('quickDeltaBadge').innerText = '0.00 Delta';
    }

    function loadQuickSample() {
      document.getElementById('quickCurrentGpa').value = '3.65';
      document.getElementById('quickCurrentCredits').value = '64';
      document.getElementById('quickSemGpa').value = '3.90';
      document.getElementById('quickSemCredits').value = '16';
      calculateQuickGpa();
    }

    /* -------------------------------------------------------------
     * 4. COMPONENT 2: DETAILED CALCULATOR LOGIC
     * ------------------------------------------------------------- */
    function initMajorSelector() {
      const select = document.getElementById('majorSelect');
      select.innerHTML = '<option value="">-- Choose a Major --</option>';
      POPULAR_MAJORS.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.innerText = m.name;
        select.appendChild(opt);
      });
      select.value = 'cs';
    }

    function changeGradingSystem(newKey) {
      if (!GRADING_SYSTEMS[newKey]) return;
      currentSystemKey = newKey;
      const sys = GRADING_SYSTEMS[newKey];
      document.getElementById('systemDescriptionLabel').innerText = sys.name + ' active (' + sys.maxGpa.toFixed(1) + ' Max)';
      document.getElementById('grandScaleLabel').innerText = 'Scale: ' + sys.maxGpa.toFixed(1) + ' Max';

      // Harmonize course grades to default if current does not exist
      semesters.forEach(s => {
        s.courses.forEach(c => {
          const exists = sys.grades.some(g => g.label === c.grade);
          if (!exists) c.grade = sys.grades[0].label;
        });
      });

      renderSemesters();
    }

    function autoFillMajorSubjects() {
      const select = document.getElementById('majorSelect');
      const majorId = select.value || 'cs';
      const major = POPULAR_MAJORS.find(m => m.id === majorId) || POPULAR_MAJORS[0];
      const sys = GRADING_SYSTEMS[currentSystemKey];

      if (semesters.length > 0) {
        semesters[0].courses = major.subjects.map((sub, idx) => ({
          id: Date.now() + idx,
          name: sub.name,
          credits: sub.credits,
          grade: sys.grades[0].label
        }));
      }

      const notice = document.getElementById('autofillNotice');
      const text = document.getElementById('autofillNoticeText');
      text.innerText = 'Auto-filled standard ' + major.name + ' subjects into Semester 1!';
      notice.classList.remove('hidden');
      setTimeout(() => notice.classList.add('hidden'), 4000);

      renderSemesters();
    }

    function addSemester() {
      semesterCounter++;
      const sys = GRADING_SYSTEMS[currentSystemKey];
      semesters.push({
        id: Date.now(),
        title: 'Semester ' + semesterCounter,
        courses: [
          { id: Date.now() + 1, name: '', credits: 3, grade: sys.grades[0].label },
          { id: Date.now() + 2, name: '', credits: 3, grade: sys.grades[0].label }
        ]
      });
      renderSemesters();
    }

    function removeSemester(semId) {
      if (semesters.length <= 1) return;
      semesters = semesters.filter(s => s.id !== semId);
      renderSemesters();
    }

    function addCourse(semId) {
      const sem = semesters.find(s => s.id === semId);
      if (!sem) return;
      const sys = GRADING_SYSTEMS[currentSystemKey];
      sem.courses.push({
        id: Date.now(),
        name: '',
        credits: 3,
        grade: sys.grades[0].label
      });
      renderSemesters();
    }

    function removeCourse(semId, courseId) {
      const sem = semesters.find(s => s.id === semId);
      if (!sem || sem.courses.length <= 1) return;
      sem.courses = sem.courses.filter(c => c.id !== courseId);
      renderSemesters();
    }

    function updateCourseField(semId, courseId, field, value) {
      const sem = semesters.find(s => s.id === semId);
      if (!sem) return;
      const course = sem.courses.find(c => c.id === courseId);
      if (!course) return;
      if (field === 'credits') {
        course.credits = parseFloat(value) || 0;
      } else {
        course[field] = value;
      }
      calculateGrandTotals();
    }

    /* -------------------------------------------------------------
     * 5. SMART AUTOCOMPLETE SEARCH
     * ------------------------------------------------------------- */
    function getAllPredefinedSubjects() {
      const list = [];
      POPULAR_MAJORS.forEach(m => {
        m.subjects.forEach(s => {
          list.push({ name: s.name, credits: s.credits, major: m.name });
        });
      });
      return list;
    }

    function handleAutocompleteInput(semId, courseId, query) {
      const dropdown = document.getElementById('dropdown-' + semId + '-' + courseId);
      if (!dropdown) return;
      
      const clean = query.trim().toLowerCase();
      if (clean.length < 2) {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
      }

      const allSubs = getAllPredefinedSubjects();
      const matches = allSubs.filter(s => s.name.toLowerCase().includes(clean)).slice(0, 5);

      if (matches.length === 0) {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
      }

      dropdown.innerHTML = matches.map(m => \`
        <div onmousedown="selectAutocompleteSubject(\${semId}, \${courseId}, '\${m.name.replace(/'/g, "\\\\'")}', \${m.credits})"
          class="px-3 py-2 hover:bg-emerald-50 cursor-pointer flex justify-between items-center text-xs border-b border-slate-100 last:border-none">
          <div>
            <p class="font-bold text-slate-800">\${m.name}</p>
            <span class="text-[10px] text-slate-400">\${m.major}</span>
          </div>
          <span class="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">\${m.credits} Cr</span>
        </div>
      \`).join('');
      dropdown.classList.remove('hidden');
    }

    function hideAutocompleteDropdown(semId, courseId) {
      setTimeout(() => {
        const dropdown = document.getElementById('dropdown-' + semId + '-' + courseId);
        if (dropdown) dropdown.classList.add('hidden');
      }, 250);
    }

    function selectAutocompleteSubject(semId, courseId, name, credits) {
      const sem = semesters.find(s => s.id === semId);
      if (sem) {
        const course = sem.courses.find(c => c.id === courseId);
        if (course) {
          course.name = name;
          course.credits = credits;
        }
      }
      renderSemesters();
    }

    /* -------------------------------------------------------------
     * 6. RENDERING & GRAND TOTALS
     * ------------------------------------------------------------- */
    function renderSemesters() {
      const container = document.getElementById('semestersContainer');
      container.innerHTML = '';

      const sys = GRADING_SYSTEMS[currentSystemKey];

      semesters.forEach((sem, sIdx) => {
        let semCredits = 0;
        let semPoints = 0;

        sem.courses.forEach(c => {
          const gObj = sys.grades.find(g => g.label === c.grade) || sys.grades[0];
          const cr = Number(c.credits) || 0;
          semCredits += cr;
          semPoints += cr * gObj.points;
        });

        const sgpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : '0.00';

        const semCard = document.createElement('div');
        semCard.className = 'bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible';
        semCard.innerHTML = \`
          <div class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center rounded-t-2xl gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-green-600 text-white rounded-lg text-xs font-black">S\${sIdx + 1}</span>
              <input type="text" value="\${sem.title}" onchange="semesters[\${sIdx}].title = this.value"
                class="bg-transparent font-bold text-slate-800 text-sm focus:outline-hidden focus:ring-1 focus:ring-green-600 rounded px-1" />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-xl border border-green-200 font-heading">
                SGPA: \${sgpa} (\${semCredits} Cr)
              </span>
              \${semesters.length > 1 ? \`
                <button type="button" onclick="removeSemester(\${sem.id})" class="text-slate-300 hover:text-red-500 font-bold text-xs p-1" title="Remove Semester">
                  ✕
                </button>
              \` : ''}
            </div>
          </div>

          <div class="p-4 space-y-3">
            <div class="hidden sm:grid grid-cols-12 gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              <div class="col-span-6">Course Name (Autocomplete Enabled)</div>
              <div class="col-span-2">Credits</div>
              <div class="col-span-3">Grade</div>
              <div class="col-span-1 text-center">Remove</div>
            </div>

            \${sem.courses.map(c => \`
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
                <!-- Course Name & Autocomplete -->
                <div class="col-span-1 sm:col-span-6 relative">
                  <input type="text" value="\${c.name}" placeholder="Type e.g. 'Intro', 'Data', 'Physics'..."
                    oninput="updateCourseField(\${sem.id}, \${c.id}, 'name', this.value); handleAutocompleteInput(\${sem.id}, \${c.id}, this.value)"
                    onblur="hideAutocompleteDropdown(\${sem.id}, \${c.id})"
                    class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-green-600" />
                  <div id="dropdown-\${sem.id}-\${c.id}" class="autocomplete-dropdown hidden"></div>
                </div>

                <!-- Credits -->
                <div class="col-span-1 sm:col-span-2">
                  <input type="number" step="0.5" min="0" value="\${c.credits}"
                    onchange="updateCourseField(\${sem.id}, \${c.id}, 'credits', this.value)"
                    class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-green-600" />
                </div>

                <!-- Grade Dropdown -->
                <div class="col-span-1 sm:col-span-3">
                  <select onchange="updateCourseField(\${sem.id}, \${c.id}, 'grade', this.value)"
                    class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-green-600 cursor-pointer">
                    \${sys.grades.map(g => \`
                      <option value="\${g.label}" \${g.label === c.grade ? 'selected' : ''}>
                        \${g.label} (\${g.points.toFixed(1)})
                      </option>
                    \`).join('')}
                  </select>
                </div>

                <!-- Remove Button -->
                <div class="col-span-1 sm:col-span-1 flex justify-end sm:justify-center">
                  <button type="button" onclick="removeCourse(\${sem.id}, \${c.id})"
                    class="px-2 py-1 text-slate-400 hover:text-red-500 font-bold text-xs rounded transition" title="Remove Subject">
                    Remove
                  </button>
                </div>
              </div>
            \`).join('')}

            <div class="pt-2">
              <button type="button" onclick="addCourse(\${sem.id})"
                class="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-green-700 border border-dashed border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer">
                <span>+ Add Subject Row</span>
              </button>
            </div>
          </div>
        \`;
        container.appendChild(semCard);
      });

      calculateGrandTotals();
    }

    function calculateGrandTotals() {
      const sys = GRADING_SYSTEMS[currentSystemKey];
      let grandCredits = 0;
      let grandPoints = 0;
      let totalCourses = 0;
      const gradeCounts = {};

      semesters.forEach(s => {
        s.courses.forEach(c => {
          totalCourses++;
          const cr = Number(c.credits) || 0;
          const gObj = sys.grades.find(g => g.label === c.grade) || sys.grades[0];
          grandCredits += cr;
          grandPoints += cr * gObj.points;
          gradeCounts[c.grade] = (gradeCounts[c.grade] || 0) + 1;
        });
      });

      const grandCgpa = grandCredits > 0 ? (grandPoints / grandCredits) : 0;

      document.getElementById('grandCgpaDisplay').innerText = grandCgpa.toFixed(2);
      document.getElementById('grandTotalCredits').innerText = grandCredits;
      document.getElementById('grandTotalPoints').innerText = grandPoints.toFixed(1);
      document.getElementById('grandSemCount').innerText = semesters.length + (semesters.length === 1 ? ' Semester' : ' Semesters');
      document.getElementById('grandCourseCount').innerText = totalCourses + ' Courses Total';

      updateChart(gradeCounts);
    }

    function initChart() {
      const ctx = document.getElementById('gradeDoughnutChart').getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['#059669', '#10B981', '#14B8A6', '#0284C7', '#F59E0B', '#EF4444'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
          }
        }
      });
    }

    function updateChart(gradeCounts) {
      if (!chartInstance) return;
      const labels = Object.keys(gradeCounts);
      const data = Object.values(gradeCounts);
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    }

    function resetAllSemesters() {
      const sys = GRADING_SYSTEMS[currentSystemKey];
      semesters = [{
        id: Date.now(),
        title: 'Semester 1',
        courses: [
          { id: Date.now() + 1, name: '', credits: 3, grade: sys.grades[0].label },
          { id: Date.now() + 2, name: '', credits: 3, grade: sys.grades[0].label }
        ]
      }];
      renderSemesters();
    }

    function loadSampleSemesters() {
      const sys = GRADING_SYSTEMS[currentSystemKey];
      semesters = [
        {
          id: 1,
          title: 'Fall Semester 2024',
          courses: [
            { id: 101, name: 'Computer Science Fundamentals', credits: 4, grade: sys.grades[0].label },
            { id: 102, name: 'Calculus & Analytical Geometry', credits: 4, grade: sys.grades[1]?.label || sys.grades[0].label },
            { id: 103, name: 'Engineering Physics & Lab', credits: 4, grade: sys.grades[2]?.label || sys.grades[0].label },
            { id: 104, name: 'Technical Writing & Communication', credits: 3, grade: sys.grades[0].label }
          ]
        },
        {
          id: 2,
          title: 'Spring Semester 2025',
          courses: [
            { id: 201, name: 'Data Structures & Algorithms', credits: 4, grade: sys.grades[0].label },
            { id: 202, name: 'Discrete Mathematics', credits: 3, grade: sys.grades[1]?.label || sys.grades[0].label },
            { id: 203, name: 'Digital Logic & Architecture', credits: 4, grade: sys.grades[2]?.label || sys.grades[0].label },
            { id: 204, name: 'Professional Ethics & Law', credits: 2, grade: sys.grades[0].label }
          ]
        }
      ];
      renderSemesters();
    }

    // Initialize application on load
    window.addEventListener('DOMContentLoaded', () => {
      calculateQuickGpa();
      initMajorSelector();
      initChart();
      renderSemesters();
    });
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'universal-gpa-calculator.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 no-print">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-bold text-slate-900 font-heading text-base sm:text-lg">
                Standalone Single-File HTML Code
              </h3>
              <p className="text-xs text-slate-500">
                Complete HTML, Tailwind CSS (CDN), and clean Vanilla JavaScript with Two-Tier CGPA calculations and Chart.js analytics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-600 font-medium">
            Contains entire Two-Tier calculation structure, major auto-fills, and Chart.js analytics in a single file.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Entire Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download index.html</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed select-all">
          <pre className="whitespace-pre">
            <code>{standaloneHtmlCode}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
