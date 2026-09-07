import React, { useState, useMemo, useEffect } from 'react';
import { GradingSystemId, Semester, Course, SemesterResult, OverallResult } from './types';
import { GRADING_SYSTEMS } from './data/gradingSystems';
import { POPULAR_MAJORS } from './data/majors';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GpaCalculator } from './components/GpaCalculator';
import { TargetGpaPlanner } from './components/TargetGpaPlanner';
import { FaqAndSeo } from './components/FaqAndSeo';
import { Footer } from './components/Footer';
import { PrintReport } from './components/PrintReport';
import { CodeModal } from './components/CodeModal';
import { AuthModal } from './components/AuthModal';
import { FloatingExportBar } from './components/FloatingExportBar';
import { LegalModal, LegalTab } from './components/LegalModal';
import { exportReportAsImage, exportReportAsPdf, QuickCalcData } from './utils/exportReport';
import { useAuth } from './context/AuthContext';

const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 'sem-1',
    title: 'Semester 1',
    courses: [
      { id: 'c-101', name: 'Computer Science Fundamentals', credits: 4, grade: 'A' },
      { id: 'c-102', name: 'Calculus & Analytical Geometry', credits: 4, grade: 'A-' },
      { id: 'c-103', name: 'Engineering Physics & Lab', credits: 4, grade: 'B+' },
      { id: 'c-104', name: 'Technical Communication', credits: 3, grade: 'A' },
    ],
  },
  {
    id: 'sem-2',
    title: 'Semester 2',
    courses: [
      { id: 'c-201', name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
      { id: 'c-202', name: 'Discrete Mathematics', credits: 3, grade: 'B+' },
      { id: 'c-203', name: 'Digital Logic & Microprocessors', credits: 4, grade: 'A-' },
      { id: 'c-204', name: 'Environmental Science', credits: 2, grade: 'B' },
    ],
  },
];

export default function App() {
  const [systemId, setSystemId] = useState<GradingSystemId>('us');
  const [semesters, setSemesters] = useState<Semester[]>(INITIAL_SEMESTERS);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [hasLoadedCloudData, setHasLoadedCloudData] = useState(false);
  const [selectedMajorId, setSelectedMajorId] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');

  const { user, isSyncing, syncDataToCloud, loadDataFromCloud } = useAuth();

  const currentSystem = GRADING_SYSTEMS[systemId] || GRADING_SYSTEMS.us;

  // When user logs in with Google, restore their cloud records from Firestore
  useEffect(() => {
    let isMounted = true;
    if (user) {
      loadDataFromCloud().then((cloudData) => {
        if (!isMounted) return;
        if (cloudData && Array.isArray(cloudData.semesters) && cloudData.semesters.length > 0) {
          setSemesters(cloudData.semesters);
          if (cloudData.systemId && GRADING_SYSTEMS[cloudData.systemId]) {
            setSystemId(cloudData.systemId);
          }
        } else {
          // New cloud user: initialize their Firestore document with current calculator data
          syncDataToCloud({ semesters, systemId });
        }
        setHasLoadedCloudData(true);
      });
    } else {
      setHasLoadedCloudData(false);
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Debounced auto-save to Firestore whenever semesters or grading scale changes
  useEffect(() => {
    if (!user || !hasLoadedCloudData) return;
    const timer = setTimeout(() => {
      syncDataToCloud({ semesters, systemId });
    }, 1500);

    return () => clearTimeout(timer);
  }, [semesters, systemId, user, hasLoadedCloudData]);

  // Manual trigger for cloud synchronization
  const handleManualSync = () => {
    if (user) {
      syncDataToCloud({ semesters, systemId });
    }
  };

  // Handle Changing Grading System
  const handleSystemChange = (newSystemId: GradingSystemId) => {
    setSystemId(newSystemId);
    const newSystem = GRADING_SYSTEMS[newSystemId];
    const defaultGrade = newSystem.grades[0].label;

    // Harmonize existing course grades to ensure validity in new scale
    setSemesters((prev) =>
      prev.map((sem) => ({
        ...sem,
        courses: sem.courses.map((course) => {
          const exists = newSystem.grades.some((g) => g.label === course.grade);
          return exists ? course : { ...course, grade: defaultGrade };
        }),
      }))
    );
  };

  // Add Semester
  const handleAddSemester = () => {
    const newSemesterNum = semesters.length + 1;
    const defaultGrade = currentSystem.grades[0].label;
    const newSemester: Semester = {
      id: `sem-${Date.now()}`,
      title: `Semester ${newSemesterNum}`,
      courses: [
        {
          id: `c-${Date.now()}-1`,
          name: '',
          credits: currentSystem.creditDefault,
          grade: defaultGrade,
        },
        {
          id: `c-${Date.now()}-2`,
          name: '',
          credits: currentSystem.creditDefault,
          grade: defaultGrade,
        },
      ],
    };
    setSemesters((prev) => [...prev, newSemester]);
  };

  // Delete Semester
  const handleDeleteSemester = (semesterId: string) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((s) => s.id !== semesterId));
  };

  // Update Semester Title
  const handleUpdateSemesterTitle = (semesterId: string, title: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === semesterId ? { ...s, title } : s))
    );
  };

  // Add Course to Semester
  const handleAddCourse = (semesterId: string) => {
    const defaultGrade = currentSystem.grades[0].label;
    const newCourse: Course = {
      id: `c-${Date.now()}`,
      name: '',
      credits: currentSystem.creditDefault,
      grade: defaultGrade,
    };
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: [...sem.courses, newCourse] }
          : sem
      )
    );
  };

  // Update Course Field
  const handleUpdateCourse = (
    semesterId: string,
    courseId: string,
    field: keyof Course,
    value: string | number
  ) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.map((c) =>
            c.id === courseId ? { ...c, [field]: value } : c
          ),
        };
      })
    );
  };

  // Delete Course
  const handleDeleteCourse = (semesterId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        if (sem.courses.length <= 1) return sem;
        return {
          ...sem,
          courses: sem.courses.filter((c) => c.id !== courseId),
        };
      })
    );
  };

  // Auto-Fill Semester with standard subjects and credit weights from selected major
  const handleAutoFillSemester = (majorId: string, targetSemesterId?: string) => {
    const major = POPULAR_MAJORS.find((m) => m.id === majorId) || POPULAR_MAJORS[0];
    const defaultGrade = currentSystem.grades[0].label;

    // Standard 5 core subjects from this major
    const subjectsToUse = major.subjects.slice(0, 5);
    const newCourses: Course[] = subjectsToUse.map((sub, idx) => ({
      id: `c-auto-${Date.now()}-${idx}`,
      name: sub.name,
      credits: sub.credits,
      grade: defaultGrade,
    }));

    if (targetSemesterId === 'new') {
      const newSemester: Semester = {
        id: `sem-${Date.now()}`,
        title: `${major.name} - Sem ${semesters.length + 1}`,
        courses: newCourses,
      };
      setSemesters((prev) => [...prev, newSemester]);
    } else {
      const semIdToUpdate = targetSemesterId || semesters[0]?.id;
      if (semIdToUpdate) {
        setSemesters((prev) =>
          prev.map((sem) =>
            sem.id === semIdToUpdate
              ? { ...sem, courses: newCourses }
              : sem
          )
        );
      }
    }
  };

  // Auto-fill course name and credits when an autocomplete suggestion is selected
  const handleSelectCourseSubject = (
    semesterId: string,
    courseId: string,
    subject: { name: string; credits: number }
  ) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.map((c) =>
            c.id === courseId
              ? { ...c, name: subject.name, credits: subject.credits }
              : c
          ),
        };
      })
    );
  };

  // Reset All Data
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all courses and semesters?')) {
      const defaultGrade = currentSystem.grades[0].label;
      setSemesters([
        {
          id: `sem-${Date.now()}`,
          title: 'Semester 1',
          courses: [
            { id: `c-${Date.now()}-1`, name: '', credits: currentSystem.creditDefault, grade: defaultGrade },
            { id: `c-${Date.now()}-2`, name: '', credits: currentSystem.creditDefault, grade: defaultGrade },
          ],
        },
      ]);
    }
  };

  // Load Sample Data
  const handleLoadSample = () => {
    const defaultCredits = currentSystem.creditDefault;
    const sampleSemesters: Semester[] = [
      {
        id: `sem-sample-1`,
        title: 'Fall Semester 2024',
        courses: [
          { id: 'cs-1', name: 'Intro to Computer Science', credits: defaultCredits, grade: currentSystem.grades[0].label },
          { id: 'cs-2', name: 'Calculus for Engineers I', credits: defaultCredits + 1, grade: currentSystem.grades[1]?.label || currentSystem.grades[0].label },
          { id: 'cs-3', name: 'General Physics I', credits: defaultCredits, grade: currentSystem.grades[2]?.label || currentSystem.grades[0].label },
          { id: 'cs-4', name: 'Academic Composition', credits: defaultCredits > 4 ? defaultCredits : 3, grade: currentSystem.grades[0].label },
        ],
      },
      {
        id: `sem-sample-2`,
        title: 'Spring Semester 2025',
        courses: [
          { id: 'cs-5', name: 'Object-Oriented Programming', credits: defaultCredits, grade: currentSystem.grades[0].label },
          { id: 'cs-6', name: 'Linear Algebra & Matrices', credits: defaultCredits, grade: currentSystem.grades[1]?.label || currentSystem.grades[0].label },
          { id: 'cs-7', name: 'Computer Systems & Architecture', credits: defaultCredits + 1, grade: currentSystem.grades[3]?.label || currentSystem.grades[0].label },
          { id: 'cs-8', name: 'Professional Ethics & Law', credits: defaultCredits > 4 ? defaultCredits : 2, grade: currentSystem.grades[0].label },
        ],
      },
    ];
    setSemesters(sampleSemesters);
  };

  // Compute Semester SGPA & Quality Points
  const semesterResults = useMemo<SemesterResult[]>(() => {
    return semesters.map((sem) => {
      let totalCredits = 0;
      let totalQualityPoints = 0;

      sem.courses.forEach((course) => {
        const gradeObj =
          currentSystem.grades.find((g) => g.label === course.grade) ||
          currentSystem.grades[0];
        const credits = Number(course.credits) || 0;
        totalCredits += credits;
        totalQualityPoints += credits * gradeObj.points;
      });

      const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

      return {
        semesterId: sem.id,
        title: sem.title,
        totalCredits,
        totalQualityPoints,
        gpa,
      };
    });
  }, [semesters, currentSystem]);

  // Compute Overall Cumulative CGPA & Grade Distribution
  const overallResult = useMemo<OverallResult>(() => {
    let totalCredits = 0;
    let totalQualityPoints = 0;
    let courseCount = 0;
    const gradeDistribution: Record<string, number> = {};

    semesters.forEach((sem) => {
      sem.courses.forEach((course) => {
        const gradeObj =
          currentSystem.grades.find((g) => g.label === course.grade) ||
          currentSystem.grades[0];
        const credits = Number(course.credits) || 0;

        totalCredits += credits;
        totalQualityPoints += credits * gradeObj.points;
        courseCount += 1;

        gradeDistribution[course.grade] = (gradeDistribution[course.grade] || 0) + 1;
      });
    });

    const cgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    return {
      totalCredits,
      totalQualityPoints,
      cgpa,
      semesterCount: semesters.length,
      courseCount,
      gradeDistribution,
    };
  }, [semesters, currentSystem]);

  // Handle Print / PDF Download (Generates official GPAly transcript PDF)
  const handleExportPdf = (quickData?: QuickCalcData) => {
    const selectedMajor = POPULAR_MAJORS.find((m) => m.id === selectedMajorId);
    exportReportAsPdf({
      system: currentSystem,
      semesters,
      semesterResults,
      overallResult,
      studentName: user?.displayName || user?.email?.split('@')[0] || 'Academic Candidate',
      degreeName: selectedMajor ? `${selectedMajor.name} (${selectedMajor.degreeType || 'Degree'})` : undefined,
      user,
      quickCalcData: quickData,
    });
  };

  // Handle Image Download (Generates official GPAly transcript PNG)
  const handleExportImage = (quickData?: QuickCalcData) => {
    const selectedMajor = POPULAR_MAJORS.find((m) => m.id === selectedMajorId);
    exportReportAsImage({
      system: currentSystem,
      semesters,
      semesterResults,
      overallResult,
      studentName: user?.displayName || user?.email?.split('@')[0] || 'Academic Candidate',
      degreeName: selectedMajor ? `${selectedMajor.name} (${selectedMajor.degreeType || 'Degree'})` : undefined,
      user,
      quickCalcData: quickData,
    });
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeDegreeName = POPULAR_MAJORS.find((m) => m.id === selectedMajorId)?.name;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pt-16 sm:pt-20">
      {/* Printable A4 Report View (Hidden on Screen, Shown in Print) */}
      <PrintReport
        system={currentSystem}
        semesters={semesters}
        semesterResults={semesterResults}
        overallResult={overallResult}
        studentName={user?.displayName || user?.email?.split('@')[0] || 'Academic Candidate'}
        degreeName={activeDegreeName}
        user={user}
      />

      {/* Screen Interface */}
      <Navbar
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onManualSync={handleManualSync}
        onOpenLegal={handleOpenLegal}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onCtaClick={scrollToCalculator}
          onExportPdf={handleExportPdf}
          onExportImage={handleExportImage}
        />

        {/* Main Advanced Calculator Section */}
        <GpaCalculator
          systemId={systemId}
          onSystemChange={handleSystemChange}
          semesters={semesters}
          onAddSemester={handleAddSemester}
          onDeleteSemester={handleDeleteSemester}
          onUpdateSemesterTitle={handleUpdateSemesterTitle}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
          onResetAll={handleResetAll}
          onLoadSample={handleLoadSample}
          semesterResults={semesterResults}
          overallResult={overallResult}
          onPrint={handleExportPdf}
          onExportImage={handleExportImage}
          selectedMajorId={selectedMajorId}
          onSelectedMajorChange={setSelectedMajorId}
          onAutoFillSemester={handleAutoFillSemester}
          onSelectSubject={handleSelectCourseSubject}
        />

        {/* Target GPA Planner */}
        <TargetGpaPlanner
          system={currentSystem}
          currentCalculatedCgpa={overallResult.cgpa}
          currentCalculatedCredits={overallResult.totalCredits}
        />

        {/* SEO & Knowledge Base FAQ Section */}
        <FaqAndSeo />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Floating Always-Available Quick Export Bar */}
      <FloatingExportBar
        system={currentSystem}
        semesters={semesters}
        semesterResults={semesterResults}
        overallResult={overallResult}
        studentName={user?.displayName || user?.email?.split('@')[0] || null}
        degreeName={activeDegreeName}
        user={user}
      />

      {/* Creative Modern Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Legal & Compliance Modal (Privacy Policy, Terms, About, Contact, Disclaimer) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* Single-File Code Exporter Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
