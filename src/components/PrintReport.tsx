import React from 'react';
import { GradingSystem, Semester, SemesterResult, OverallResult } from '../types';
import { getStudentProfile } from '../utils/studentUtils';
import { getAcademicClassification } from '../utils/exportReport';

interface PrintReportProps {
  system: GradingSystem;
  semesters: Semester[];
  semesterResults: SemesterResult[];
  overallResult: OverallResult;
  studentName?: string | null;
  degreeName?: string | null;
  user?: { displayName?: string | null; email?: string | null; uid?: string } | null;
}

export const PrintReport: React.FC<PrintReportProps> = ({
  system,
  semesters,
  semesterResults,
  overallResult,
  studentName,
  degreeName,
  user,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const profile = getStudentProfile(
    user || (studentName ? { displayName: studentName } : null),
    degreeName
  );

  const standing = getAcademicClassification(overallResult.cgpa, system.maxGpa);

  return (
    <div className="print-only print-page bg-white p-6 max-w-[210mm] mx-auto text-slate-900 font-sans">
      {/* Top Colorful Accent Line */}
      <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-4">
        <div className="w-2/3 bg-purple-600"></div>
        <div className="w-1/3 bg-cyan-500"></div>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-3 mb-4 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black font-heading text-slate-900 tracking-tight">
              GPA<span className="text-purple-600">ly</span>
            </span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              OFFICIAL ACADEMIC TRANSCRIPT
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Universal Cumulative Grade Point Average (CGPA) Transcript & Scorecard
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-500">
          <p>Date Issued: <strong className="text-slate-800">{currentDate}</strong></p>
          <p className="mt-0.5">Status: <strong className="text-emerald-700 font-bold">Verified Calculation</strong></p>
        </div>
      </div>

      {/* Student Profile Identity Box */}
      <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-slate-200 grid grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Student Candidate
          </span>
          <span className="font-bold text-slate-900 text-sm block truncate">
            {profile.fullName}
          </span>
          <span className="text-[11px] font-semibold text-purple-700">
            ID: {profile.studentId}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Degree / Program
          </span>
          <span className="font-medium text-slate-800 block truncate">
            {profile.degreeProgram}
          </span>
          {profile.email && (
            <span className="text-[10px] text-slate-500 block truncate">
              {profile.email}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Grading System
          </span>
          <span className="font-semibold text-slate-800 block">
            {system.name} (Max: {system.maxGpa.toFixed(1)})
          </span>
          <span className="text-[10px] font-mono text-cyan-600 block">
            {profile.verificationCode}
          </span>
        </div>
      </div>

      {/* Cumulative Scorecard Header */}
      <div className="bg-purple-50/70 p-4 rounded-xl mb-5 flex items-center justify-between border-2 border-purple-600">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-0.5">
            Overall Cumulative GPA (CGPA)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading">
              {overallResult.cgpa.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              / {system.maxGpa.toFixed(1)} Scale
            </span>
          </div>
          <span className="text-xs font-bold text-purple-800 mt-1 inline-block">
            Standing: {standing}
          </span>
        </div>
        <div className="text-right text-xs text-slate-700 space-y-1">
          <p>Total Credits Completed: <strong className="text-slate-900">{overallResult.totalCredits}</strong></p>
          <p>Total Quality Points: <strong className="text-slate-900">{overallResult.totalQualityPoints.toFixed(2)}</strong></p>
          <p>Total Semesters Evaluated: <strong className="text-slate-900">{semesters.length}</strong></p>
        </div>
      </div>

      {/* Semesters & Courses Breakdown */}
      <div className="space-y-4">
        {semesters.map((semester, sIdx) => {
          const semResult = semesterResults.find((r) => r.semesterId === semester.id);
          const sgpa = semResult ? semResult.gpa : 0;
          const sCredits = semResult ? semResult.totalCredits : 0;
          const sPoints = semResult ? semResult.totalQualityPoints : 0;

          return (
            <div key={semester.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-3 py-1.5 flex justify-between items-center border-b border-slate-200 font-bold text-xs">
                <span className="text-slate-900">{semester.title || `Semester ${sIdx + 1}`}</span>
                <span className="text-purple-700">
                  SGPA: {sgpa.toFixed(2)} | Credits: {sCredits} | Points: {sPoints.toFixed(2)}
                </span>
              </div>

              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-semibold">
                    <th className="py-1.5 px-3">#</th>
                    <th className="py-1.5 px-3">Course / Subject Name</th>
                    <th className="py-1.5 px-3 text-center">Credits</th>
                    <th className="py-1.5 px-3 text-center">Grade</th>
                    <th className="py-1.5 px-3 text-right">Grade Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {semester.courses.map((course, cIdx) => {
                    const gradeOption = system.grades.find((g) => g.label === course.grade);
                    const gradePoints = gradeOption ? gradeOption.points * course.credits : 0;
                    return (
                      <tr key={course.id} className={cIdx % 2 === 1 ? 'bg-slate-50/40' : ''}>
                        <td className="py-1 px-3 text-slate-400">{cIdx + 1}</td>
                        <td className="py-1 px-3 font-medium text-slate-800">
                          {course.name || `Course ${cIdx + 1}`}
                        </td>
                        <td className="py-1 px-3 text-center text-slate-600">{course.credits}</td>
                        <td className="py-1 px-3 text-center font-bold text-purple-700">
                          {course.grade}
                        </td>
                        <td className="py-1 px-3 text-right font-medium text-slate-700">
                          {gradePoints.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* Grading Reference Scale */}
      <div className="mt-5 pt-3 border-t border-slate-200">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Grading Scale Reference Table ({system.name}):
        </p>
        <div className="grid grid-cols-6 gap-1.5 text-[9px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
          {system.grades.map((g) => (
            <div key={g.label} className="flex justify-between border-b border-slate-200/60 pb-0.5">
              <span className="font-bold">{g.label}:</span>
              <span>{g.points.toFixed(1)} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signatures & Seal Block */}
      <div className="mt-6 pt-4 border-t border-slate-300 grid grid-cols-2 gap-10 text-xs text-slate-500">
        <div>
          <div className="border-b border-slate-400 pb-1 mb-1.5 w-44"></div>
          <p className="font-semibold text-slate-700">Academic Registrar / Institution Seal</p>
          <p className="text-[10px] text-slate-400">Official Evaluation Office</p>
        </div>
        <div className="text-right">
          <div className="border-b border-slate-400 pb-1 mb-1.5 w-44 ml-auto"></div>
          <p className="font-semibold text-slate-700">Student Verification Signature</p>
          <p className="text-[10px] text-slate-400">Candidate Ref: {profile.studentId}</p>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400">
        <span>Generated via GPAly Platform • Official Verified Digital Transcript</span>
        <span>Security Code: {profile.verificationCode}</span>
      </div>
    </div>
  );
};
