import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Sparkles,
  Printer,
  ChevronDown,
  GraduationCap,
  Wand2,
  Check,
  Lightbulb,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { Course, GradingSystemId, Semester, SemesterResult, OverallResult } from '../types';
import { GRADING_SYSTEMS } from '../data/gradingSystems';
import { POPULAR_MAJORS, GLOBAL_CATEGORIES } from '../data/majors';
import { SubjectAutocomplete } from './SubjectAutocomplete';
import { GradeChart } from './GradeChart';
import { ErrorBoundary } from './ErrorBoundary';

interface GpaCalculatorProps {
  systemId: GradingSystemId;
  onSystemChange: (id: GradingSystemId) => void;
  semesters: Semester[];
  onAddSemester: () => void;
  onDeleteSemester: (semesterId: string) => void;
  onUpdateSemesterTitle: (semesterId: string, title: string) => void;
  onAddCourse: (semesterId: string) => void;
  onUpdateCourse: (semesterId: string, courseId: string, field: keyof Course, value: string | number) => void;
  onSelectSubject: (semesterId: string, courseId: string, subject: { name: string; credits: number }) => void;
  onDeleteCourse: (semesterId: string, courseId: string) => void;
  onResetAll: () => void;
  onLoadSample: () => void;
  semesterResults: SemesterResult[];
  overallResult: OverallResult;
  onPrint: () => void;
  onExportImage?: () => void;
  selectedMajorId: string;
  onSelectedMajorChange: (majorId: string) => void;
  onAutoFillSemester: (majorId: string, targetSemesterId?: string) => void;
}

export const GpaCalculator: React.FC<GpaCalculatorProps> = ({
  systemId,
  onSystemChange,
  semesters,
  onAddSemester,
  onDeleteSemester,
  onUpdateSemesterTitle,
  onAddCourse,
  onUpdateCourse,
  onSelectSubject,
  onDeleteCourse,
  onResetAll,
  onLoadSample,
  semesterResults,
  overallResult,
  onPrint,
  onExportImage,
  selectedMajorId,
  onSelectedMajorChange,
  onAutoFillSemester,
}) => {
  const currentSystem = GRADING_SYSTEMS[systemId] || GRADING_SYSTEMS.us;
  const [targetSemesterForFill, setTargetSemesterForFill] = useState<string>('first');
  const [fillFeedback, setFillFeedback] = useState<string | null>(null);

  const selectedMajor = POPULAR_MAJORS.find((m) => m.id === selectedMajorId);

  const handleAutoFillClick = () => {
    let majorToUse = selectedMajorId;
    if (!majorToUse) {
      majorToUse = 'cs';
      onSelectedMajorChange('cs');
    }

    const majorObj = POPULAR_MAJORS.find((m) => m.id === majorToUse);
    const targetSem = targetSemesterForFill === 'first' ? semesters[0]?.id : targetSemesterForFill;

    onAutoFillSemester(majorToUse, targetSem);

    const targetLabel =
      targetSem === 'new'
        ? 'a new semester'
        : semesters.find((s) => s.id === targetSem)?.title || 'Semester 1';

    setFillFeedback(`Auto-filled ${majorObj?.name || 'Degree'} subjects into ${targetLabel}!`);
    setTimeout(() => {
      setFillFeedback(null);
    }, 4000);
  };

  return (
    <section id="calculator-section" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header - Reverted to normal proportioned scale */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Course & Semester Grade Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            GPA & CGPA Calculator
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Select grading system, pick your degree program, and manage your course credit weights.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all cursor-pointer"
            title="Populate with realistic sample courses"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Load Sample Data</span>
          </button>

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
            title="Clear all courses and start fresh"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer"
            title="Download white sheet report as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </button>

          {onExportImage && (
            <button
              type="button"
              onClick={onExportImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
              title="Download transcript as Image (PNG)"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Save Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left = Semester Manager, Right = Analytics & Cumulative CGPA Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Master Calculator (overflow-visible to prevent cutting off auto-fill) */}
        <div className="lg:col-span-8 space-y-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-visible">
            {/* Top Navy Blue Brand Header Bar */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-t-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-black text-indigo-200 text-sm">
                  Σ
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg tracking-tight font-heading">
                    Semester Assessment Table
                  </h3>
                  <span className="text-xs text-indigo-200 font-medium">
                    Grading Scale: {currentSystem.name} ({currentSystem.maxGpa.toFixed(1)} Max)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    id="country-selector"
                    value={systemId}
                    onChange={(e) => onSystemChange(e.target.value as GradingSystemId)}
                    className="appearance-none bg-indigo-900/70 hover:bg-indigo-900 text-white text-xs border border-indigo-700/60 rounded-lg pl-3 pr-7 py-1.5 font-bold focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-colors"
                  >
                    <option value="us" className="text-slate-800 bg-white">US (4.0 Scale)</option>
                    <option value="uk" className="text-slate-800 bg-white">UK (Honours)</option>
                    <option value="ugc" className="text-slate-800 bg-white">India / Sri Lanka (UGC)</option>
                    <option value="custom" className="text-slate-800 bg-white">Custom (10.0 Scale)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="button"
                  onClick={onPrint}
                  className="bg-white text-indigo-950 hover:bg-indigo-50 text-xs px-3 py-1.5 rounded-lg font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Print Sheet
                </button>
              </div>
            </div>

            {/* Scale Info Chips */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Grades:</span>
              {currentSystem.grades.map((g) => (
                <span
                  key={g.label}
                  className="px-2 py-0.5 rounded-md bg-white text-slate-700 font-bold text-[11px] border border-slate-200 shadow-2xs"
                  title={`${g.label}: ${g.points} points (${g.description || ''})`}
                >
                  {g.label} ({g.points})
                </span>
              ))}
            </div>

            {/* Smart Subject Autocomplete & Degree Toolbar */}
            <div className="p-4 bg-slate-50/70 border-b border-slate-200 overflow-visible">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Degree Dropdown at Top (Only selected once here!) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <label
                      htmlFor="major-select-top"
                      className="text-xs font-bold text-slate-800 tracking-tight whitespace-nowrap"
                    >
                      Degree Program:
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      id="major-select-top"
                      value={selectedMajorId}
                      onChange={(e) => onSelectedMajorChange(e.target.value)}
                      className="appearance-none bg-white border border-slate-300 hover:border-indigo-400 text-slate-800 text-xs rounded-xl pl-3 pr-8 py-1.5 font-bold shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer min-w-[210px] sm:min-w-[240px]"
                    >
                      <option value="">-- All Degrees & Subjects --</option>
                      {GLOBAL_CATEGORIES.map((category) => {
                        const inCat = POPULAR_MAJORS.filter((m) => m.category === category);
                        if (inCat.length === 0) return null;
                        return (
                          <optgroup key={category} label={category}>
                            {inCat.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.icon} {m.name} ({m.degreeType || 'Degree'})
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Auto-Fill Action Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {semesters.length > 1 && (
                    <div className="relative">
                      <select
                        value={targetSemesterForFill}
                        onChange={(e) => setTargetSemesterForFill(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs rounded-xl pl-2.5 pr-7 py-1.5 font-medium shadow-2xs cursor-pointer"
                        title="Choose which semester receives the auto-filled subjects"
                      >
                        <option value="first">Apply to {semesters[0]?.title || 'Semester 1'}</option>
                        {semesters.slice(1).map((s, idx) => (
                          <option key={s.id} value={s.id}>
                            Apply to {s.title || `Semester ${idx + 2}`}
                          </option>
                        ))}
                        <option value="new">+ Add as New Semester</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAutoFillClick}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                    title="Automatically pre-fill standard course names and credit weights from selected degree"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Auto-Fill Subjects</span>
                  </button>
                </div>
              </div>

              {/* Feedback toast banner when auto-filled */}
              {fillFeedback && (
                <div className="mt-2.5 p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 font-semibold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-indigo-700 shrink-0" />
                    <span>{fillFeedback}</span>
                  </div>
                  <span className="text-[10px] text-indigo-700 font-bold">Select grades below</span>
                </div>
              )}

              {/* Autocomplete helper pill notice */}
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  <strong>Tip:</strong> Click any course box to expand all subjects for your degree program with credits pre-set.
                </span>
              </div>
            </div>

            {/* Semesters List Container */}
            <div className="p-4 sm:p-5 space-y-5 overflow-visible">
              {semesters.map((semester, sIndex) => {
                const semResult = semesterResults.find((r) => r.semesterId === semester.id);
                const semGpa = semResult ? semResult.gpa : 0;
                const semCredits = semResult ? semResult.totalCredits : 0;

                return (
                  <div
                    key={semester.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-visible transition-all shadow-xs"
                  >
                    {/* Semester Header Row with SGPA and quick fill */}
                    <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 rounded-t-xl flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-xs font-black uppercase tracking-wider">
                          S{sIndex + 1}
                        </span>
                        <input
                          type="text"
                          value={semester.title}
                          onChange={(e) => onUpdateSemesterTitle(semester.id, e.target.value)}
                          className="bg-transparent text-slate-900 font-bold text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 rounded px-2 py-0.5 transition-all"
                          placeholder={`Semester ${sIndex + 1}`}
                        />

                        {selectedMajor && (
                          <button
                            type="button"
                            onClick={() => {
                              onAutoFillSemester(selectedMajor.id, semester.id);
                              setFillFeedback(
                                `Auto-filled ${selectedMajor.name} into ${semester.title || `Semester ${sIndex + 1}`}!`
                              );
                              setTimeout(() => setFillFeedback(null), 3500);
                            }}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                            title={`Replace courses in this semester with ${selectedMajor.name} core subjects`}
                          >
                            <Wand2 className="w-3 h-3 text-indigo-600" />
                            <span>Auto-fill {selectedMajor.name.split(' ')[0]}</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                            Term SGPA
                          </span>
                          <div className="flex items-baseline gap-1 justify-end">
                            <span className="text-xl font-black text-indigo-600 leading-none font-heading">
                              {semGpa.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              ({semCredits} cr)
                            </span>
                          </div>
                        </div>

                        {semesters.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onDeleteSemester(semester.id)}
                            className="p-1 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete semester"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Course Rows */}
                    <div className="p-3 sm:p-4 space-y-2.5 overflow-visible">
                      <div className="hidden sm:grid grid-cols-12 gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                        <div className="col-span-6 flex items-center justify-between">
                          <span>Subject / Course Name</span>
                          <span className="text-[9px] font-normal text-indigo-600 lowercase">
                            click to expand subjects
                          </span>
                        </div>
                        <div className="col-span-2">Credits</div>
                        <div className="col-span-3">Grade</div>
                        <div className="col-span-1 text-center">Delete</div>
                      </div>

                      {semester.courses.map((course, cIndex) => (
                        <div
                          key={course.id}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center relative"
                        >
                          {/* Course Name with Autocomplete */}
                          <div className="col-span-1 sm:col-span-6 relative z-30">
                            <label className="sm:hidden block text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                              Subject Name (click to see subjects)
                            </label>
                            <SubjectAutocomplete
                              value={course.name}
                              placeholder={`e.g. Subject ${cIndex + 1} (click to see subjects)`}
                              preferredMajorId={selectedMajorId}
                              onChange={(newName) =>
                                onUpdateCourse(semester.id, course.id, 'name', newName)
                              }
                              onSelectSubject={(subject) =>
                                onSelectSubject(semester.id, course.id, subject)
                              }
                            />
                          </div>

                          {/* Credits input */}
                          <div className="col-span-1 sm:col-span-2">
                            <label className="sm:hidden block text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                              Credits
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="60"
                              step="0.5"
                              value={course.credits}
                              onChange={(e) =>
                                onUpdateCourse(
                                  semester.id,
                                  course.id,
                                  'credits',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                            />
                          </div>

                          {/* Grade dropdown */}
                          <div className="col-span-1 sm:col-span-3">
                            <label className="sm:hidden block text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                              Grade
                            </label>
                            <div className="relative">
                              <select
                                value={course.grade}
                                onChange={(e) =>
                                  onUpdateCourse(semester.id, course.id, 'grade', e.target.value)
                                }
                                className="w-full appearance-none px-3 py-1.5 pr-7 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-bold focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white cursor-pointer"
                              >
                                {currentSystem.grades.map((g) => (
                                  <option key={g.label} value={g.label}>
                                    {g.label} ({g.points.toFixed(1)})
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Delete Course button */}
                          <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-center">
                            <button
                              type="button"
                              onClick={() => onDeleteCourse(semester.id, course.id)}
                              disabled={semester.courses.length <= 1}
                              className={`p-1.5 transition-colors font-bold ${
                                semester.courses.length <= 1
                                  ? 'text-slate-200 cursor-not-allowed'
                                  : 'text-slate-300 hover:text-red-500 cursor-pointer'
                              }`}
                              title="Remove course"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add Subject Row */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onAddCourse(semester.id)}
                          className="w-full py-2 px-3 bg-slate-50/70 hover:bg-indigo-50/50 border border-dashed border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-bold text-indigo-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Subject / Course</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add New Semester Block Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onAddSemester}
                  className="w-full py-3 border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-xl bg-indigo-50/40 hover:bg-indigo-50 text-indigo-900 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer font-heading"
                >
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>+ Add Another Semester</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): CGPA Summary Scorecard (Pure White Sheet Theme) & Analytics */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 z-10">
          {/* Main Cumulative CGPA Scorecard (Clean White Normal Sheet Card) */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-200/80 border-2 border-indigo-600 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                Cumulative CGPA
              </span>
              <span className="text-xs bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono text-indigo-700 border border-indigo-200 font-bold">
                Scale: {currentSystem.maxGpa.toFixed(1)} Max
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-black tracking-tight text-slate-900 font-heading">
                {overallResult.cgpa.toFixed(2)}
              </span>
              <span className="text-slate-500 font-medium text-sm">
                / {currentSystem.maxGpa.toFixed(1)}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Total Credits
                </span>
                <span className="text-xl font-black text-indigo-950">
                  {overallResult.totalCredits}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Quality Points
                </span>
                <span className="text-xl font-black text-indigo-950">
                  {overallResult.totalQualityPoints.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>
                {overallResult.semesterCount} Semester{overallResult.semesterCount !== 1 ? 's' : ''}
              </span>
              <span>•</span>
              <span>{overallResult.courseCount} Courses Total</span>
            </div>
          </div>

          {/* Real-time Grade Distribution Analytics Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-100 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
                  %
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Grade Distribution
                </h4>
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Live Chart
              </span>
            </div>

            {/* GradeChart with ErrorBoundary */}
            <ErrorBoundary>
              <GradeChart
                distribution={overallResult.gradeDistribution}
                totalCourses={overallResult.courseCount}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
};
