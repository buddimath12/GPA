import { jsPDF } from 'jspdf';
import { Semester, SemesterResult, OverallResult, GradingSystem } from '../types';
import { getStudentProfile, StudentProfile } from './studentUtils';

export interface QuickCalcData {
  pastGpa: number;
  pastCredits: number;
  termGpa: number;
  termCredits: number;
  cumulativeGpa: number;
  totalCredits: number;
  totalPoints: number;
  gpaDelta?: number;
}

export interface ExportParams {
  system: GradingSystem;
  semesters: Semester[];
  semesterResults: SemesterResult[];
  overallResult: OverallResult;
  studentName?: string | null;
  degreeName?: string | null;
  user?: { displayName?: string | null; email?: string | null; uid?: string } | null;
  quickCalcData?: QuickCalcData;
}

/**
 * Academic honours classification in English
 */
export function getAcademicClassification(cgpa: number, maxGpa: number = 4.0): string {
  const ratio = cgpa / (maxGpa || 4.0);
  if (ratio >= 0.95) return 'First Class Honours / Grade A+ (Excellent)';
  if (ratio >= 0.875) return 'High Distinction / Grade A (Very Good)';
  if (ratio >= 0.75) return 'Upper Second Class / Grade B+ (Good)';
  if (ratio >= 0.625) return 'Second Class / Grade B (Average)';
  if (ratio >= 0.5) return 'Pass / Grade C (Passing)';
  return 'Grade D (Needs Improvement)';
}

/**
 * Helper to get color code for letter grades
 */
function getGradeColor(grade: string): { bg: [number, number, number]; text: [number, number, number]; hex: string } {
  const upper = grade.trim().toUpperCase();
  if (upper.startsWith('A')) {
    return { bg: [236, 253, 245], text: [4, 120, 87], hex: '#047857' }; // emerald
  }
  if (upper.startsWith('B')) {
    return { bg: [239, 246, 255], text: [29, 78, 216], hex: '#1d4ed8' }; // blue
  }
  if (upper.startsWith('C')) {
    return { bg: [255, 251, 235], text: [180, 83, 9], hex: '#b45309' }; // amber
  }
  if (upper.startsWith('D')) {
    return { bg: [255, 241, 242], text: [190, 18, 60], hex: '#be123c' }; // rose
  }
  return { bg: [241, 245, 249], text: [51, 65, 85], hex: '#334155' };
}

/**
 * Generate and download an Official GPAly Academic Transcript PDF
 * Formatted strictly inside standard A4 boundaries (210mm x 297mm)
 * with generous breathing room, clean typography, and proportional layouts.
 */
export function exportReportAsPdf({
  system,
  semesters,
  semesterResults,
  overallResult,
  studentName,
  degreeName,
  user,
  quickCalcData,
}: ExportParams) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const studentProfile: StudentProfile = getStudentProfile(
      user || (studentName ? { displayName: studentName } : null),
      degreeName
    );

    const isQuickMode = !!quickCalcData || semesters.length === 0;
    const effectiveCgpa = quickCalcData ? quickCalcData.cumulativeGpa : overallResult.cgpa;
    const effectiveCredits = quickCalcData ? quickCalcData.totalCredits : overallResult.totalCredits;
    const effectivePoints = quickCalcData ? quickCalcData.totalPoints : overallResult.totalQualityPoints;

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin - 14) {
        doc.addPage();
        y = margin + 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(79, 70, 229);
        doc.text('GPAly Universal Academic Transcript - Continued', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text(`Student: ${studentProfile.fullName} (${studentProfile.studentId})`, pageWidth - margin, y, { align: 'right' });
        y += 7;
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 7;
      }
    };

    // 1. Top Decorative Brand Strip
    doc.setFillColor(79, 70, 229); // Indigo
    doc.rect(margin, y, contentWidth * 0.7, 3.5, 'F');
    doc.setFillColor(6, 182, 212); // Cyan
    doc.rect(margin + contentWidth * 0.7, y, contentWidth * 0.3, 3.5, 'F');
    y += 9;

    // 2. GPAly Header with Title & Date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 27, 75);
    doc.text('GPAly', margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text('ACADEMIC TRANSCRIPT & CGPA SCORECARD', margin + 27, y - 1);

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Date Issued: ${currentDate}`, pageWidth - margin, y - 4, { align: 'right' });
    doc.setTextColor(16, 185, 129);
    doc.setFont('helvetica', 'bold');
    doc.text('Official Verified Calculation', pageWidth - margin, y + 1.5, { align: 'right' });
    y += 6.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Universal Collegiate & University Grade Evaluation System', margin, y);
    y += 6;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // 3. Student Identity & Academic Profile Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 22, 2.5, 2.5, 'FD');

    // Left column: Student Name & ID
    const infoY = y + 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('STUDENT CANDIDATE', margin + 6, infoY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(studentProfile.fullName, margin + 6, infoY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text(`Student ID: ${studentProfile.studentId}`, margin + 6, infoY + 12);

    // Middle column: Degree Program & Email
    const midX = margin + 68;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('DEGREE / ACADEMIC PROGRAM', midX, infoY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(studentProfile.degreeProgram, midX, infoY + 6);
    if (studentProfile.email) {
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Email: ${studentProfile.email}`, midX, infoY + 12);
    }

    // Right column: Grading Scale & Standing
    const rightX = margin + 128;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('GRADING SCALE', rightX, infoY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${system.name} (Max: ${system.maxGpa.toFixed(1)})`, rightX, infoY + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(6, 182, 212);
    doc.text(studentProfile.verificationCode, rightX, infoY + 12);

    y += 26;

    // 4. Cumulative Performance Scorecard Box
    checkPageBreak(30);
    doc.setFillColor(250, 245, 255);
    doc.setDrawColor(126, 34, 206);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'FD');

    // Left side: CGPA Badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(126, 34, 206);
    doc.text('CUMULATIVE GRADE POINT AVERAGE (CGPA)', margin + 7, y + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text(effectiveCgpa.toFixed(2), margin + 7, y + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`/ ${system.maxGpa.toFixed(1)} Scale`, margin + 38, y + 17.5);

    const standingText = getAcademicClassification(effectiveCgpa, system.maxGpa);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(67, 56, 202);
    doc.text(`Standing: ${standingText}`, margin + 7, y + 23);

    // Right side: Metrics
    const s1X = margin + 92;
    const s2X = margin + 126;
    const s3X = margin + 158;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('TOTAL CREDITS', s1X, y + 7.5);
    doc.text('QUALITY PTS', s2X, y + 7.5);
    doc.text(isQuickMode ? 'EVALUATION' : 'SEMESTERS', s3X, y + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(`${effectiveCredits}`, s1X, y + 16);
    doc.text(effectivePoints.toFixed(1), s2X, y + 16);
    doc.text(isQuickMode ? 'Verified' : `${semesters.length}`, s3X, y + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Earned', s1X, y + 21.5);
    doc.text('Score', s2X, y + 21.5);
    doc.text(isQuickMode ? 'Direct Mode' : 'Evaluated', s3X, y + 21.5);

    y += 31;

    // 5. If Quick Mode (Hero Quick GPA calculation or no semesters)
    if (isQuickMode && quickCalcData) {
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('Cumulative Academic Assessment & Term Impact Analysis', margin, y);
      y += 6;

      // Table of Prior vs Current Term
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

      // Table headers
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y + 7, pageWidth - margin, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('EVALUATION PERIOD', margin + 6, y + 4.8);
      doc.text('GPA / SGPA', margin + 65, y + 4.8);
      doc.text('CREDITS', margin + 105, y + 4.8);
      doc.text('QUALITY POINTS', margin + 140, y + 4.8);
      doc.text('STATUS', pageWidth - margin - 6, y + 4.8, { align: 'right' });
      y += 7;

      // Row 1: Prior Cumulative
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text('Prior Cumulative Academic Record', margin + 6, y + 5.5);
      doc.setFont('helvetica', 'bold');
      doc.text(quickCalcData.pastGpa.toFixed(2), margin + 65, y + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`${quickCalcData.pastCredits}`, margin + 105, y + 5.5);
      doc.text((quickCalcData.pastGpa * quickCalcData.pastCredits).toFixed(1), margin + 140, y + 5.5);
      doc.setTextColor(79, 70, 229);
      doc.text('Historical Baseline', pageWidth - margin - 6, y + 5.5, { align: 'right' });
      y += 8.5;

      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y, pageWidth - margin, y);

      // Row 2: Current Term
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text('Current Semester / Term Evaluation', margin + 6, y + 5.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(126, 34, 206);
      doc.text(quickCalcData.termGpa.toFixed(2), margin + 65, y + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.text(`${quickCalcData.termCredits}`, margin + 105, y + 5.5);
      doc.text((quickCalcData.termGpa * quickCalcData.termCredits).toFixed(1), margin + 140, y + 5.5);
      doc.setTextColor(16, 185, 129);
      doc.text('Active Term', pageWidth - margin - 6, y + 5.5, { align: 'right' });
      y += 8.5;

      doc.setDrawColor(241, 245, 249);
      doc.line(margin, y, pageWidth - margin, y);

      // Row 3: Resulting Cumulative
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text('New Combined Cumulative CGPA', margin + 6, y + 5.5);
      doc.setTextColor(79, 70, 229);
      doc.text(quickCalcData.cumulativeGpa.toFixed(2), margin + 65, y + 5.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${quickCalcData.totalCredits}`, margin + 105, y + 5.5);
      doc.text(quickCalcData.totalPoints.toFixed(1), margin + 140, y + 5.5);
      const deltaSign = (quickCalcData.gpaDelta || 0) >= 0 ? '+' : '';
      doc.setTextColor((quickCalcData.gpaDelta || 0) >= 0 ? 16 : 225, (quickCalcData.gpaDelta || 0) >= 0 ? 185 : 29, (quickCalcData.gpaDelta || 0) >= 0 ? 129 : 72);
      doc.text(`Delta: ${deltaSign}${(quickCalcData.gpaDelta || 0).toFixed(2)}`, pageWidth - margin - 6, y + 5.5, { align: 'right' });
      y += 14;

      // Grading System Scale Reference
      checkPageBreak(38);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Grading Scale Reference Matrix (${system.name})`, margin, y);
      y += 5.5;

      // 4-column compact scale grid
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');
      const colW = contentWidth / 4;
      const gradesChunk = system.grades.slice(0, 8);

      gradesChunk.forEach((g, idx) => {
        const cX = margin + (idx % 4) * colW + 4;
        const cY = y + Math.floor(idx / 4) * 9 + 5.5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(79, 70, 229);
        doc.text(g.label, cX, cY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 41, 59);
        doc.text(`: ${g.points.toFixed(2)} pts${g.description ? ` (${g.description})` : ''}`, cX + 8, cY);
      });
      y += 28;
    } else {
      // 5. Semesters Breakdown Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('Detailed Course Breakdown by Semester', margin, y);
      y += 6;

      semesters.forEach((sem, sIdx) => {
        const semResult = semesterResults.find((r) => r.semesterId === sem.id);
        const sgpa = semResult ? semResult.gpa : 0;
        const sCredits = semResult ? semResult.totalCredits : 0;
        const sPoints = semResult ? semResult.totalQualityPoints : 0;

        const semNeededHeight = 8 + 6 + sem.courses.length * 6 + 4;
        checkPageBreak(semNeededHeight > 40 ? 28 : semNeededHeight);

        // Semester Header Banner
        doc.setFillColor(243, 244, 246);
        doc.setDrawColor(209, 213, 219);
        doc.setLineWidth(0.3);
        doc.rect(margin, y, contentWidth, 7, 'FD');

        doc.setFillColor(79, 70, 229);
        doc.rect(margin, y, 2.5, 7, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(17, 24, 39);
        doc.text(sem.title || `Semester ${sIdx + 1}`, margin + 5, y + 4.8);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(79, 70, 229);
        const semSummary = `SGPA: ${sgpa.toFixed(2)}   |   Credits: ${sCredits}   |   Quality Points: ${sPoints.toFixed(2)}`;
        doc.text(semSummary, pageWidth - margin - 4, y + 4.8, { align: 'right' });
        y += 7;

        // Table Column Header
        doc.setFillColor(249, 250, 251);
        doc.rect(margin, y, contentWidth, 6, 'F');
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, y + 6, pageWidth - margin, y + 6);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(107, 114, 128);
        doc.text('#', margin + 4, y + 4.2);
        doc.text('Course / Subject Title', margin + 14, y + 4.2);
        doc.text('Credits', margin + 115, y + 4.2, { align: 'center' });
        doc.text('Grade', margin + 145, y + 4.2, { align: 'center' });
        doc.text('Grade Points', pageWidth - margin - 5, y + 4.2, { align: 'right' });
        y += 6;

        // Course Rows
        sem.courses.forEach((c, cIdx) => {
          checkPageBreak(6.5);

          const gradeObj = system.grades.find((g) => g.label === c.grade);
          const points = gradeObj ? gradeObj.points * c.credits : 0;
          const color = getGradeColor(c.grade);

          if (cIdx % 2 === 1) {
            doc.setFillColor(252, 252, 253);
            doc.rect(margin, y, contentWidth, 6, 'F');
          }

          doc.setDrawColor(243, 244, 246);
          doc.line(margin, y + 6, pageWidth - margin, y + 6);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(156, 163, 175);
          doc.text(`${cIdx + 1}`, margin + 4, y + 4.2);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(31, 41, 55);
          const cName = c.name.trim() || `Course ${cIdx + 1}`;
          doc.text(doc.splitTextToSize(cName, 95)[0], margin + 14, y + 4.2);

          doc.text(`${c.credits}`, margin + 115, y + 4.2, { align: 'center' });

          doc.setFillColor(color.bg[0], color.bg[1], color.bg[2]);
          doc.roundedRect(margin + 138, y + 1, 14, 4.2, 1, 1, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(color.text[0], color.text[1], color.text[2]);
          doc.text(c.grade, margin + 145, y + 4.1, { align: 'center' });

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(55, 65, 81);
          doc.text(points.toFixed(2), pageWidth - margin - 5, y + 4.2, { align: 'right' });

          y += 6;
        });

        y += 3.5;
      });
    }

    // Signatures & Official Validation Block
    checkPageBreak(28);
    y += 5;
    const sigLineY = y + 14;

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);

    // Left Signature: Academic Registrar
    doc.line(margin + 5, sigLineY, margin + 65, sigLineY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('ACADEMIC REGISTRAR / EVALUATOR', margin + 5, sigLineY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Institutional Examination Division', margin + 5, sigLineY + 7.5);

    // Right Signature: Candidate Signature
    doc.line(pageWidth - margin - 65, sigLineY, pageWidth - margin - 5, sigLineY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('CANDIDATE SIGNATURE & DATE', pageWidth - margin - 65, sigLineY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Candidate Ref: ${studentProfile.studentId}`, pageWidth - margin - 65, sigLineY + 7.5);

    // Official Digital Validation Seal
    const sealX = margin + (contentWidth / 2) - 22;
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.6);
    doc.circle(sealX + 22, sigLineY + 4, 11, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(79, 70, 229);
    doc.text('OFFICIAL VERIFIED', sealX + 22, sigLineY + 2.5, { align: 'center' });
    doc.text('GPAly SCORECARD', sealX + 22, sigLineY + 5.5, { align: 'center' });

    // Footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Generated via GPAly Platform • Academic Integrity Assured • Security Ref: ${studentProfile.verificationCode}`,
        margin,
        pageHeight - 8
      );
      doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    const cleanDate = new Date().toISOString().slice(0, 10);
    const safeStudentName = studentProfile.fullName.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`GPAly_Academic_Transcript_${safeStudentName}_${cleanDate}.pdf`);
  } catch (error) {
    console.error('Failed to export PDF:', error);
  }
}

/**
 * Draw rounded rectangle helper for canvas
 */
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generate and download a High-Quality GPAly Academic Report Image (PNG)
 * DYNAMIC HEIGHT: Fits content snugly without huge empty bottom spaces.
 */
export function exportReportAsImage({
  system,
  semesters,
  semesterResults,
  overallResult,
  studentName,
  degreeName,
  user,
  quickCalcData,
}: ExportParams) {
  try {
    const studentProfile: StudentProfile = getStudentProfile(
      user || (studentName ? { displayName: studentName } : null),
      degreeName
    );

    const isQuickMode = !!quickCalcData || semesters.length === 0;
    const effectiveCgpa = quickCalcData ? quickCalcData.cumulativeGpa : overallResult.cgpa;
    const effectiveCredits = quickCalcData ? quickCalcData.totalCredits : overallResult.totalCredits;
    const effectivePoints = quickCalcData ? quickCalcData.totalPoints : overallResult.totalQualityPoints;

    const canvas = document.createElement('canvas');
    const width = 1240; // High resolution 150 DPI width

    // DYNAMIC HEIGHT CALCULATION:
    // Snug, proportional height calculated to avoid huge empty blank spaces at the bottom
    let height: number;
    if (isQuickMode) {
      // Compact scorecard certificate card (~820px)
      height = 840;
    } else {
      const totalCourses = semesters.reduce((acc, sem) => acc + sem.courses.length, 0);
      const baseHeaderAndCards = 620;
      const semHeadersHeight = semesters.length * 56;
      const courseRowsHeight = totalCourses * 34;
      const signaturesAndFooter = 160;
      height = baseHeaderAndCards + semHeadersHeight + courseRowsHeight + signaturesAndFooter;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Clean White Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Outer Page Border with Snug Padding
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // 3. Top Gradient Accent Bar
    const barGradient = ctx.createLinearGradient(36, 36, width - 72, 36);
    barGradient.addColorStop(0, '#4f46e5');
    barGradient.addColorStop(0.6, '#7c3aed');
    barGradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = barGradient;
    ctx.fillRect(36, 36, width - 72, 10);

    // 4. Header Branding & Document Title
    let curY = 85;
    ctx.fillStyle = '#1e1b4b';
    ctx.font = '900 34px Montserrat, system-ui, sans-serif';
    ctx.fillText('GPAly', 70, curY);

    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 15px Montserrat, system-ui, sans-serif';
    ctx.fillText('ACADEMIC TRANSCRIPT & CGPA SCORECARD', 185, curY - 5);

    ctx.fillStyle = '#64748b';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText('Universal Academic Performance & Grade Point Average Engine', 185, curY + 16);

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748b';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(`Date: ${currentDate}`, width - 70, curY - 5);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Verified Official Calculation', width - 70, curY + 16);
    ctx.textAlign = 'left';

    curY += 38;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, curY);
    ctx.lineTo(width - 70, curY);
    ctx.stroke();

    // 5. Student Identity Box
    curY += 20;
    const idBoxX = 70;
    const idBoxY = curY;
    const idBoxW = width - 140;
    const idBoxH = 86;

    ctx.fillStyle = '#f8fafc';
    drawRoundRect(ctx, idBoxX, idBoxY, idBoxW, idBoxH, 10);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Candidate Name
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('STUDENT CANDIDATE', idBoxX + 20, idBoxY + 28);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(studentProfile.fullName, idBoxX + 20, idBoxY + 54);
    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`ID: ${studentProfile.studentId}`, idBoxX + 20, idBoxY + 74);

    // Degree & Email
    const midX = idBoxX + 380;
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('PROGRAM / MAJOR', midX, idBoxY + 28);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText(studentProfile.degreeProgram, midX, idBoxY + 52);
    if (studentProfile.email) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(studentProfile.email, midX, idBoxY + 72);
    }

    // System & Verification
    const rightInfoX = idBoxX + 780;
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('GRADING SYSTEM', rightInfoX, idBoxY + 28);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText(`${system.name} (Max: ${system.maxGpa.toFixed(1)})`, rightInfoX, idBoxY + 52);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(studentProfile.verificationCode, rightInfoX, idBoxY + 72);

    curY = idBoxY + idBoxH + 20;

    // 6. Cumulative Scorecard Box (Purple Glowing Card)
    const cardX = 70;
    const cardY = curY;
    const cardW = width - 140;
    const cardH = 130;

    ctx.fillStyle = '#faf5ff';
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.strokeStyle = '#7e22ce';
    ctx.lineWidth = 2;
    ctx.stroke();

    // CGPA Label & Value
    ctx.fillStyle = '#7e22ce';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('CUMULATIVE GRADE POINT AVERAGE (CGPA)', cardX + 28, cardY + 34);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 52px Montserrat, system-ui, sans-serif';
    ctx.fillText(effectiveCgpa.toFixed(2), cardX + 28, cardY + 90);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(`/ ${system.maxGpa.toFixed(1)} Scale`, cardX + 160, cardY + 84);

    const standing = getAcademicClassification(effectiveCgpa, system.maxGpa);
    ctx.fillStyle = '#4338ca';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(`Standing: ${standing}`, cardX + 28, cardY + 114);

    // Metric Columns on Right
    const stat1X = cardX + 540;
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('TOTAL CREDITS', stat1X, cardY + 45);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText(`${effectiveCredits} Earned`, stat1X, cardY + 80);

    const stat2X = cardX + 760;
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('QUALITY POINTS', stat2X, cardY + 45);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText(effectivePoints.toFixed(1), stat2X, cardY + 80);

    const stat3X = cardX + 960;
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(isQuickMode ? 'STATUS' : 'SEMESTERS', stat3X, cardY + 45);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText(isQuickMode ? 'Verified' : `${semesters.length}`, stat3X, cardY + 80);

    curY = cardY + cardH + 24;

    if (isQuickMode && quickCalcData) {
      // 7. Quick Evaluation Highlights Grid
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 18px Montserrat, system-ui, sans-serif';
      ctx.fillText('Academic Assessment & Cumulative Record', 70, curY);
      curY += 16;

      const evalBoxH = 100;
      ctx.fillStyle = '#f8fafc';
      drawRoundRect(ctx, 70, curY, width - 140, evalBoxH, 10);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      const col1 = 100;
      const col2 = 360;
      const col3 = 620;
      const col4 = 880;

      // Row 1: Labels
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('PRIOR CGPA', col1, curY + 34);
      ctx.fillText('PRIOR CREDITS', col2, curY + 34);
      ctx.fillText('THIS TERM GPA', col3, curY + 34);
      ctx.fillText('TERM CREDITS', col4, curY + 34);

      // Row 2: Values
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(quickCalcData.pastGpa.toFixed(2), col1, curY + 68);
      ctx.fillText(`${quickCalcData.pastCredits}`, col2, curY + 68);
      ctx.fillStyle = '#7e22ce';
      ctx.fillText(quickCalcData.termGpa.toFixed(2), col3, curY + 68);
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`${quickCalcData.termCredits}`, col4, curY + 68);

      curY += evalBoxH + 30;
    } else {
      // 7. Semesters & Courses Breakdown
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 20px Montserrat, system-ui, sans-serif';
      ctx.fillText('Detailed Course Breakdown by Semester', 70, curY);
      curY += 16;

      semesters.forEach((sem, sIdx) => {
        const semResult = semesterResults.find((r) => r.semesterId === sem.id);
        const sgpa = semResult ? semResult.gpa : 0;
        const sCredits = semResult ? semResult.totalCredits : 0;
        const sPoints = semResult ? semResult.totalQualityPoints : 0;

        // Semester Header Banner
        ctx.fillStyle = '#f1f5f9';
        drawRoundRect(ctx, 70, curY, width - 140, 36, 6);
        ctx.fill();

        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(70, curY, 6, 36);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText(sem.title || `Semester ${sIdx + 1}`, 86, curY + 23);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 13px system-ui, sans-serif';
        ctx.fillText(
          `SGPA: ${sgpa.toFixed(2)}  |  Credits: ${sCredits}  |  Quality Points: ${sPoints.toFixed(2)}`,
          width - 86,
          curY + 23
        );
        ctx.textAlign = 'left';

        curY += 42;

        // Table Column Header
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(70, curY, width - 140, 28);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(70, curY, width - 140, 28);

        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText('#', 85, curY + 18);
        ctx.fillText('Course / Subject Title', 130, curY + 18);
        ctx.fillText('Credits', 720, curY + 18);
        ctx.fillText('Grade', 880, curY + 18);
        ctx.textAlign = 'right';
        ctx.fillText('Grade Points', width - 85, curY + 18);
        ctx.textAlign = 'left';

        curY += 28;

        // Courses
        sem.courses.forEach((c, cIdx) => {
          const gradeObj = system.grades.find((g) => g.label === c.grade);
          const points = gradeObj ? gradeObj.points * c.credits : 0;
          const color = getGradeColor(c.grade);

          if (cIdx % 2 === 1) {
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(70, curY, width - 140, 32);
          }

          ctx.strokeStyle = '#f1f5f9';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(70, curY + 32);
          ctx.lineTo(width - 70, curY + 32);
          ctx.stroke();

          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px system-ui, sans-serif';
          ctx.fillText(`${cIdx + 1}`, 85, curY + 20);

          ctx.fillStyle = '#1e293b';
          ctx.font = '13px system-ui, sans-serif';
          const cName = c.name.trim() || `Course ${cIdx + 1}`;
          ctx.fillText(cName, 130, curY + 20);

          ctx.fillStyle = '#475569';
          ctx.fillText(`${c.credits}`, 740, curY + 20);

          // Grade Pill
          ctx.fillStyle = color.hex;
          ctx.font = 'bold 13px system-ui, sans-serif';
          ctx.fillText(c.grade, 895, curY + 20);

          ctx.textAlign = 'right';
          ctx.fillStyle = '#1e293b';
          ctx.font = '13px system-ui, sans-serif';
          ctx.fillText(points.toFixed(2), width - 85, curY + 20);
          ctx.textAlign = 'left';

          curY += 32;
        });

        curY += 15;
      });
    }

    // 8. Signatures Block - Placed seamlessly right after content
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;

    // Left Signature: Academic Registrar
    ctx.beginPath();
    ctx.moveTo(70, curY + 20);
    ctx.lineTo(320, curY + 20);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('Academic Registrar / Institution Seal', 70, curY + 40);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('Official Examination Division', 70, curY + 56);

    // Right Signature: Candidate
    ctx.beginPath();
    ctx.moveTo(width - 320, curY + 20);
    ctx.lineTo(width - 70, curY + 20);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('Student Verification Signature', width - 320, curY + 40);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`Candidate Ref: ${studentProfile.studentId}`, width - 320, curY + 56);

    // 9. Footer Watermark at exactly the bottom of the snugly sized image
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(
      `Generated via GPAly Platform • Verified Digital Transcript • Ref: ${studentProfile.verificationCode}`,
      70,
      height - 42
    );

    // Trigger image download
    const cleanDate = new Date().toISOString().slice(0, 10);
    const safeStudentName = studentProfile.fullName.replace(/[^a-zA-Z0-9]/g, '_');
    const link = document.createElement('a');
    link.download = `GPAly_Academic_Transcript_${safeStudentName}_${cleanDate}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('Failed to export image:', error);
  }
}
