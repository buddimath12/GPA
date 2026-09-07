import React, { useState } from 'react';
import { FileText, Image as ImageIcon, Download, Check, Sparkles } from 'lucide-react';
import { GradingSystem, Semester, SemesterResult, OverallResult } from '../types';
import { exportReportAsPdf, exportReportAsImage } from '../utils/exportReport';

interface FloatingExportBarProps {
  system: GradingSystem;
  semesters: Semester[];
  semesterResults: SemesterResult[];
  overallResult: OverallResult;
  studentName?: string | null;
  degreeName?: string | null;
  user?: { displayName?: string | null; email?: string | null; uid?: string } | null;
}

export const FloatingExportBar: React.FC<FloatingExportBarProps> = ({
  system,
  semesters,
  semesterResults,
  overallResult,
  studentName,
  degreeName,
  user,
}) => {
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExportImage = () => {
    setDownloadingImage(true);
    try {
      exportReportAsImage({
        system,
        semesters,
        semesterResults,
        overallResult,
        studentName,
        degreeName,
        user,
      });
      setDownloadSuccess('Image saved!');
      setTimeout(() => setDownloadSuccess(null), 2500);
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setDownloadingImage(false);
    }
  };

  const handleExportPdf = () => {
    exportReportAsPdf({
      system,
      semesters,
      semesterResults,
      overallResult,
      studentName,
      degreeName,
      user,
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 no-print">
      <div className="bg-slate-950/90 text-white backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl border border-purple-500/30 flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:border-purple-500/60 hover:shadow-purple-950/40">
        {/* Score pill */}
        <div className="flex items-center gap-1.5 pr-2 sm:pr-3 border-r border-slate-800">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-[11px] font-bold text-slate-300 hidden xs:inline">CGPA:</span>
          <span className="text-xs sm:text-sm font-black text-cyan-400">
            {overallResult.cgpa.toFixed(2)}
          </span>
        </div>

        {/* Download Image Button */}
        <button
          onClick={handleExportImage}
          disabled={downloadingImage}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-100 hover:text-white rounded-full text-xs font-bold transition-all cursor-pointer border border-slate-700/80"
          title="Download Official GPA Transcript as high-res Image (PNG)"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Saved</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Image (PNG)</span>
            </>
          )}
        </button>

        {/* Download PDF Button */}
        <button
          onClick={handleExportPdf}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-md shadow-purple-600/25"
          title="Print or Save Official GPA Report as PDF"
        >
          <FileText className="w-3.5 h-3.5 text-white" />
          <span>PDF Report</span>
        </button>
      </div>
    </div>
  );
};
