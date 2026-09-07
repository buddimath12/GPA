import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { GradingSystem } from '../types';

interface TargetGpaPlannerProps {
  system: GradingSystem;
  currentCalculatedCgpa: number;
  currentCalculatedCredits: number;
}

export const TargetGpaPlanner: React.FC<TargetGpaPlannerProps> = ({
  system,
  currentCalculatedCgpa,
  currentCalculatedCredits,
}) => {
  const [currentCgpa, setCurrentCgpa] = useState<string>('3.20');
  const [targetCgpa, setTargetCgpa] = useState<string>('3.50');
  const [creditsEarned, setCreditsEarned] = useState<string>('45');
  const [nextCredits, setNextCredits] = useState<string>('15');

  // Auto-sync from current calculator data
  const handleSyncFromCalculator = () => {
    if (currentCalculatedCredits > 0) {
      setCurrentCgpa(currentCalculatedCgpa.toFixed(2));
      setCreditsEarned(currentCalculatedCredits.toString());
    }
  };

  const curr = parseFloat(currentCgpa) || 0;
  const target = parseFloat(targetCgpa) || 0;
  const earned = parseFloat(creditsEarned) || 0;
  const upcoming = parseFloat(nextCredits) || 0;

  let requiredGpa: number | null = null;
  let status: 'achievable' | 'challenging' | 'impossible' | 'invalid' = 'achievable';
  let message = '';

  if (upcoming <= 0 || earned < 0 || curr < 0 || target < 0) {
    status = 'invalid';
    message = 'Please enter valid positive numbers for all fields.';
  } else {
    // Formula: (Target * TotalNewCredits - Current * EarnedCredits) / NextCredits
    const totalFutureCredits = earned + upcoming;
    const currentPoints = curr * earned;
    const requiredTotalPoints = target * totalFutureCredits;
    const neededPoints = requiredTotalPoints - currentPoints;
    requiredGpa = neededPoints / upcoming;

    if (requiredGpa > system.maxGpa) {
      status = 'impossible';
      const maxPossibleGpa = (currentPoints + system.maxGpa * upcoming) / totalFutureCredits;
      message = `Target requires a ${requiredGpa.toFixed(2)} GPA next semester, which exceeds the maximum ${system.maxGpa.toFixed(1)} scale. Even with straight A's (${system.maxGpa.toFixed(1)}), your maximum achievable CGPA this semester is ${maxPossibleGpa.toFixed(2)}. Consider taking more credits or adjusting your target across multiple terms.`;
    } else if (requiredGpa > system.maxGpa * 0.9) {
      status = 'challenging';
      message = `Target is achievable, but you need high academic performance (${requiredGpa.toFixed(2)} SGPA). Aim for top marks in high-credit subjects.`;
    } else if (requiredGpa <= 0) {
      status = 'achievable';
      message = `You are comfortably on track! Even with a minimal passing grade, your target will be achieved or maintained.`;
    } else {
      status = 'achievable';
      message = `You need an average Semester GPA of ${requiredGpa.toFixed(2)} across your ${upcoming} upcoming credits to achieve your target CGPA of ${target.toFixed(2)}.`;
    }
  }

  return (
    <section id="target-planner-section" className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold mb-3">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Forecasting</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Target GPA Planner
          </h3>
          <p className="text-sm text-slate-500 mt-2 font-normal">
            Calculate exactly what GPA you need in your upcoming semester to hit your graduation honors or cumulative target.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl shadow-slate-100">
          {/* Autofill banner */}
          {currentCalculatedCredits > 0 && (
            <div className="mb-6 p-3.5 bg-indigo-50/80 border border-indigo-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-indigo-950">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  Detected <strong className="font-bold">{currentCalculatedCredits} credits</strong> and{' '}
                  <strong className="font-bold">{currentCalculatedCgpa.toFixed(2)} CGPA</strong> in your calculator.
                </span>
              </div>
              <button
                type="button"
                onClick={handleSyncFromCalculator}
                className="shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-colors shadow-2xs cursor-pointer"
              >
                Auto-fill from Calculator
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="current-cgpa" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Current CGPA
              </label>
              <input
                id="current-cgpa"
                type="number"
                step="0.01"
                min="0"
                max={system.maxGpa}
                value={currentCgpa}
                onChange={(e) => setCurrentCgpa(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                placeholder="3.20"
              />
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Max: {system.maxGpa.toFixed(1)}</span>
            </div>

            <div>
              <label htmlFor="target-cgpa" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Target CGPA
              </label>
              <input
                id="target-cgpa"
                type="number"
                step="0.01"
                min="0"
                max={system.maxGpa}
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                placeholder="3.50"
              />
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Goal CGPA</span>
            </div>

            <div>
              <label htmlFor="credits-earned" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Credits Earned
              </label>
              <input
                id="credits-earned"
                type="number"
                step="1"
                min="0"
                value={creditsEarned}
                onChange={(e) => setCreditsEarned(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                placeholder="45"
              />
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Completed credits</span>
            </div>

            <div>
              <label htmlFor="next-credits" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Next Term Credits
              </label>
              <input
                id="next-credits"
                type="number"
                step="1"
                min="1"
                value={nextCredits}
                onChange={(e) => setNextCredits(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                placeholder="15"
              />
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Planned upcoming</span>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div
              className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all ${
                status === 'impossible'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : status === 'challenging'
                  ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                  : status === 'achievable'
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                  {status === 'impossible' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  )}
                  <span>
                    {status === 'impossible'
                      ? 'Target Exceeds Next Term Scale'
                      : status === 'challenging'
                      ? 'Target Achievable with High Honors'
                      : 'Target Readily Achievable'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {message}
                </p>

                {requiredGpa !== null && (
                  <div className="pt-2 max-w-md">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-indigo-900 font-bold text-[11px]">
                        To reach CGPA {target.toFixed(2)}
                      </span>
                      <span className="font-extrabold text-indigo-950 text-[11px]">
                        Required: {requiredGpa > 0 ? requiredGpa.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-indigo-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, ((requiredGpa > 0 ? requiredGpa : 0) / system.maxGpa) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {requiredGpa !== null && (
                <div className="shrink-0 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-2xs text-center min-w-[140px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Required SGPA
                  </span>
                  <span
                    className={`text-2xl sm:text-3xl font-black font-heading leading-none ${
                      status === 'impossible' ? 'text-amber-600' : 'text-indigo-600'
                    }`}
                  >
                    {requiredGpa > 0 ? requiredGpa.toFixed(2) : '0.00'}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-bold mt-1">
                    Scale / {system.maxGpa.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
