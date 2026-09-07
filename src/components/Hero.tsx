import React, { useState, useEffect } from 'react';
import {
  Calculator,
  ArrowDown,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Award,
  FileText,
  Image as ImageIcon,
  Plus,
  Minus,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export interface QuickCalcData {
  pastGpa: number;
  pastCredits: number;
  termGpa: number;
  termCredits: number;
  cumulativeGpa: number;
  totalCredits: number;
  totalPoints: number;
  gpaDelta: number;
}

interface HeroProps {
  onCtaClick: () => void;
  onExportPdf?: (quickData?: QuickCalcData) => void;
  onExportImage?: (quickData?: QuickCalcData) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExportPdf, onExportImage }) => {
  // Quick Calculator State
  const [currentGpa, setCurrentGpa] = useState<string>('3.50');
  const [currentCredits, setCurrentCredits] = useState<string>('60');
  const [semGpa, setSemGpa] = useState<string>('3.85');
  const [semCredits, setSemCredits] = useState<string>('15');

  // Calculation Result
  const [calculatedCgpa, setCalculatedCgpa] = useState<number>(3.57);
  const [totalCreditsEarned, setTotalCreditsEarned] = useState<number>(75);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(267.75);
  const [gpaDelta, setGpaDelta] = useState<number>(0.07);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Auto-calculate dynamically whenever values change
  useEffect(() => {
    const curGpaNum = parseFloat(currentGpa) || 0;
    const curCredNum = parseFloat(currentCredits) || 0;
    const sGpaNum = parseFloat(semGpa) || 0;
    const sCredNum = parseFloat(semCredits) || 0;

    const previousPoints = curGpaNum * curCredNum;
    const semesterPoints = sGpaNum * sCredNum;
    const totalCredits = curCredNum + sCredNum;
    const totalPoints = previousPoints + semesterPoints;

    const newCgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const delta = curCredNum > 0 ? newCgpa - curGpaNum : 0;

    setCalculatedCgpa(newCgpa);
    setTotalCreditsEarned(totalCredits);
    setTotalQualityPoints(totalPoints);
    setGpaDelta(delta);
    setHasCalculated(totalCredits > 0);
  }, [currentGpa, currentCredits, semGpa, semCredits]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
  };

  const handleQuickPdf = () => {
    if (onExportPdf) {
      onExportPdf({
        pastGpa: parseFloat(currentGpa) || 0,
        pastCredits: parseFloat(currentCredits) || 0,
        termGpa: parseFloat(semGpa) || 0,
        termCredits: parseFloat(semCredits) || 0,
        cumulativeGpa: calculatedCgpa,
        totalCredits: totalCreditsEarned,
        totalPoints: totalQualityPoints,
        gpaDelta,
      });
    }
  };

  const handleQuickImage = () => {
    if (onExportImage) {
      onExportImage({
        pastGpa: parseFloat(currentGpa) || 0,
        pastCredits: parseFloat(currentCredits) || 0,
        termGpa: parseFloat(semGpa) || 0,
        termCredits: parseFloat(semCredits) || 0,
        cumulativeGpa: calculatedCgpa,
        totalCredits: totalCreditsEarned,
        totalPoints: totalQualityPoints,
        gpaDelta,
      });
    }
  };

  // Helper steppers to increase / decrease values smoothly
  const adjustValue = (
    currentVal: string,
    setter: (val: string) => void,
    step: number,
    min: number,
    max: number,
    isFloat: boolean = true
  ) => {
    const parsed = parseFloat(currentVal) || 0;
    const nextVal = Math.min(max, Math.max(min, parsed + step));
    setter(isFloat ? nextVal.toFixed(2) : Math.round(nextVal).toString());
  };

  const handleReset = () => {
    setCurrentGpa('0.00');
    setCurrentCredits('0');
    setSemGpa('0.00');
    setSemCredits('0');
    setCalculatedCgpa(0);
    setTotalCreditsEarned(0);
    setTotalQualityPoints(0);
    setGpaDelta(0);
    setHasCalculated(false);
  };

  const handleSample = () => {
    setCurrentGpa('3.60');
    setCurrentCredits('60');
    setSemGpa('3.90');
    setSemCredits('15');
  };

  // Grade standing in clear English words
  const getAcademicHonour = (cgpa: number) => {
    if (cgpa >= 3.8) {
      return {
        label: 'First Class Honours / Grade A+ (Excellent)',
        color: 'text-indigo-900 bg-indigo-50 border-indigo-200',
      };
    }
    if (cgpa >= 3.5) {
      return {
        label: 'High Distinction / Grade A (Very Good)',
        color: 'text-purple-900 bg-purple-50 border-purple-200',
      };
    }
    if (cgpa >= 3.0) {
      return {
        label: 'Upper Second Class / Grade B+ (Good)',
        color: 'text-blue-900 bg-blue-50 border-blue-200',
      };
    }
    if (cgpa >= 2.5) {
      return {
        label: 'Second Class / Grade B (Average)',
        color: 'text-sky-900 bg-sky-50 border-sky-200',
      };
    }
    if (cgpa >= 2.0) {
      return {
        label: 'Pass / Grade C (Passing)',
        color: 'text-amber-900 bg-amber-50 border-amber-200',
      };
    }
    return {
      label: 'Grade D (Needs Improvement)',
      color: 'text-rose-900 bg-rose-50 border-rose-200',
    };
  };

  const honour = getAcademicHonour(calculatedCgpa);

  // Quick preset pills for easy 1-click selection
  const pastGpaPresets = ['2.50', '3.00', '3.30', '3.50', '3.75', '4.00'];
  const pastCreditPresets = ['15', '30', '45', '60', '75', '90', '120'];
  const semGpaPresets = ['2.50', '3.00', '3.30', '3.60', '3.85', '4.00'];
  const semCreditPresets = ['12', '15', '16', '18', '21'];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-slate-50/70 pt-8 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200/70 hero-section"
    >
      {/* Delicate Ambient Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Spacious, Elegant Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200/80 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Universal Academic Performance & CGPA Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight font-heading leading-[1.2]">
            Universal GPA & CGPA{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Calculate your cumulative GPA in seconds, auto-fill degree subjects across global programs,
            and download official transcript scorecard reports.
          </p>

          {/* Quick CTA and Feature Chips with Generous Margin */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onCtaClick}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full text-xs sm:text-sm shadow-md shadow-purple-600/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Course & Semester Calculator</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleSample}
              className="px-4 py-2.5 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-bold rounded-full text-xs sm:text-sm border border-slate-200 hover:border-purple-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Load Sample Values</span>
            </button>
          </div>
        </div>

        {/* Quick Overall CGPA Calculator Card - Spacious and Crisp */}
        <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl shadow-md shadow-purple-950/5 border border-slate-200/90 p-4 sm:p-6 lg:p-7 relative overflow-hidden">
          {/* Header row of Card with proportionate title & clear controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading tracking-tight">
                  Quick GPA & CGPA Calculator
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Type, slide, or tap presets to adjust values effortlessly. Results update live.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleSample}
                className="px-3.5 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors cursor-pointer"
              >
                Load Sample
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column (7 cols): The 4 Proportioned Interactive Input Boxes */}
            <form
              onSubmit={handleCalculate}
              className="lg:col-span-7 flex flex-col justify-between space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* BOX 1: Past Total GPA */}
                <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black text-slate-900 tracking-tight">
                      1. Past Total GPA
                    </label>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                      0.0 - 4.0
                    </span>
                  </div>

                  {/* Input with Dual Step Buttons */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <button
                      type="button"
                      onClick={() => adjustValue(currentGpa, setCurrentGpa, -0.1, 0, 4.0, true)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Decrease GPA by 0.10"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        placeholder="3.50"
                        value={currentGpa}
                        onChange={(e) => setCurrentGpa(e.target.value)}
                        className="w-full text-center py-1.5 px-2 bg-white border border-slate-300 focus:border-purple-600 rounded-lg text-slate-900 font-black text-base sm:text-lg focus:outline-hidden shadow-2xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustValue(currentGpa, setCurrentGpa, 0.1, 0, 4.0, true)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Increase GPA by 0.10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Glide Slider */}
                  <div className="mb-2 px-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5 text-purple-600" />
                        Slide:
                      </span>
                      <span className="text-purple-700 font-black">{currentGpa || '0.00'}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4.0"
                      step="0.05"
                      value={parseFloat(currentGpa) || 0}
                      onChange={(e) => setCurrentGpa(parseFloat(e.target.value).toFixed(2))}
                      className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Quick Preset Selection Pills */}
                  <div className="pt-1.5 border-t border-slate-200/80">
                    <div className="flex flex-wrap gap-1">
                      {pastGpaPresets.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCurrentGpa(val)}
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                            currentGpa === val
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOX 2: Past Total Credits */}
                <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black text-slate-900 tracking-tight">
                      2. Past Total Credits
                    </label>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                      Credits Earned
                    </span>
                  </div>

                  {/* Input with Dual Step Buttons */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <button
                      type="button"
                      onClick={() => adjustValue(currentCredits, setCurrentCredits, -5, 0, 200, false)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Decrease credits by 5"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="200"
                        placeholder="60"
                        value={currentCredits}
                        onChange={(e) => setCurrentCredits(e.target.value)}
                        className="w-full text-center py-1.5 px-2 bg-white border border-slate-300 focus:border-purple-600 rounded-lg text-slate-900 font-black text-base sm:text-lg focus:outline-hidden shadow-2xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustValue(currentCredits, setCurrentCredits, 5, 0, 200, false)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Increase credits by 5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Glide Slider */}
                  <div className="mb-2 px-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5 text-purple-600" />
                        Slide:
                      </span>
                      <span className="text-purple-700 font-black">{currentCredits || '0'} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="160"
                      step="3"
                      value={parseInt(currentCredits, 10) || 0}
                      onChange={(e) => setCurrentCredits(e.target.value)}
                      className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Quick Preset Selection Pills */}
                  <div className="pt-1.5 border-t border-slate-200/80">
                    <div className="flex flex-wrap gap-1">
                      {pastCreditPresets.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCurrentCredits(val)}
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                            currentCredits === val
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOX 3: This Semester GPA */}
                <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black text-slate-900 tracking-tight">
                      3. This Term GPA
                    </label>
                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                      Expected Term
                    </span>
                  </div>

                  {/* Input with Dual Step Buttons */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <button
                      type="button"
                      onClick={() => adjustValue(semGpa, setSemGpa, -0.1, 0, 4.0, true)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Decrease Semester GPA by 0.10"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        placeholder="3.85"
                        value={semGpa}
                        onChange={(e) => setSemGpa(e.target.value)}
                        className="w-full text-center py-1.5 px-2 bg-white border border-slate-300 focus:border-purple-600 rounded-lg text-slate-900 font-black text-base sm:text-lg focus:outline-hidden shadow-2xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustValue(semGpa, setSemGpa, 0.1, 0, 4.0, true)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Increase Semester GPA by 0.10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Glide Slider */}
                  <div className="mb-2 px-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5 text-purple-600" />
                        Slide:
                      </span>
                      <span className="text-cyan-700 font-black">{semGpa || '0.00'}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4.0"
                      step="0.05"
                      value={parseFloat(semGpa) || 0}
                      onChange={(e) => setSemGpa(parseFloat(e.target.value).toFixed(2))}
                      className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Quick Preset Selection Pills */}
                  <div className="pt-1.5 border-t border-slate-200/80">
                    <div className="flex flex-wrap gap-1">
                      {semGpaPresets.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSemGpa(val)}
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                            semGpa === val
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOX 4: This Semester Credits */}
                <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black text-slate-900 tracking-tight">
                      4. This Term Credits
                    </label>
                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                      Term Hours
                    </span>
                  </div>

                  {/* Input with Dual Step Buttons */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <button
                      type="button"
                      onClick={() => adjustValue(semCredits, setSemCredits, -1, 0, 30, false)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Decrease Semester Credits by 1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="30"
                        placeholder="15"
                        value={semCredits}
                        onChange={(e) => setSemCredits(e.target.value)}
                        className="w-full text-center py-1.5 px-2 bg-white border border-slate-300 focus:border-purple-600 rounded-lg text-slate-900 font-black text-base sm:text-lg focus:outline-hidden shadow-2xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustValue(semCredits, setSemCredits, 1, 0, 30, false)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Increase Semester Credits by 1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Glide Slider */}
                  <div className="mb-2 px-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5 text-purple-600" />
                        Slide:
                      </span>
                      <span className="text-cyan-700 font-black">{semCredits || '0'} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={parseInt(semCredits, 10) || 0}
                      onChange={(e) => setSemCredits(e.target.value)}
                      className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Quick Preset Selection Pills */}
                  <div className="pt-1.5 border-t border-slate-200/80">
                    <div className="flex flex-wrap gap-1">
                      {semCreditPresets.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSemCredits(val)}
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                            semCredits === val
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-100/80 flex items-center justify-between text-xs text-purple-950">
                <span className="font-medium">
                  <strong>Live Synchronization:</strong> Values recalculate instantly on every keystroke.
                </span>
                <span className="font-bold text-purple-700">4.0 Scale</span>
              </div>
            </form>

            {/* Right Column (5 cols): Pure White Sheet Normal Scorecard (Proportioned) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="h-full bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-xs border-2 border-purple-600/70 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                      Calculated Cumulative CGPA
                    </span>
                    {hasCalculated && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          gpaDelta >= 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        <TrendingUp className="w-3 h-3" />
                        {gpaDelta >= 0 ? `+${gpaDelta.toFixed(2)}` : gpaDelta.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Proportioned Score Display with Signature GPAly Gradient */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight font-heading bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                      {hasCalculated ? calculatedCgpa.toFixed(2) : '0.00'}
                    </span>
                    <span className="text-slate-400 font-bold text-sm">/ 4.0 Scale</span>
                  </div>

                  {hasCalculated && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold mb-3 ${honour.color}`}
                    >
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>{honour.label}</span>
                    </div>
                  )}

                  {/* Breakdown Metric Chips */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Total Credits
                      </span>
                      <span className="text-sm sm:text-base font-black text-purple-950">
                        {totalCreditsEarned} Credits
                      </span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Total Points
                      </span>
                      <span className="text-sm sm:text-base font-black text-purple-950">
                        {totalQualityPoints.toFixed(1)} Points
                      </span>
                    </div>
                  </div>
                </div>

                {/* White Sheet Report Export Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleQuickPdf}
                      className="py-2.5 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title="Download official Cumulative GPA scorecard PDF"
                    >
                      <FileText className="w-3.5 h-3.5 text-white" />
                      <span>Save PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickImage}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title="Download Cumulative GPA scorecard as crisp image"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Save Image</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="w-full py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-purple-200"
                  >
                    <span>Add Specific Courses & Subjects Below</span>
                    <ArrowDown className="w-3.5 h-3.5 text-purple-600 animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Striking Cyan/Sky Partner & Accreditation Strip (Matching User's Reference UI) */}
        <div className="mt-6 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white rounded-2xl py-3 px-4 sm:px-6 shadow-md shadow-sky-500/10 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span>🎓</span> US 4.0 Standard Scale
          </span>
          <span className="text-cyan-200/60 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span>🏛️</span> UK Honours Degree
          </span>
          <span className="text-cyan-200/60 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span>📜</span> UGC South Asian Scale
          </span>
          <span className="text-cyan-200/60 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span>🇪🇺</span> ECTS European System
          </span>
          <span className="text-cyan-200/60 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span>📄</span> White Sheet PDF Export
          </span>
          <span className="text-cyan-200/60 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span>🔒</span> 100% Free & Private
          </span>
        </div>
      </div>
    </section>
  );
};
