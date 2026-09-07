export type GradingSystemId = 'us' | 'uk' | 'ugc' | 'custom';

export interface GradeOption {
  label: string;
  points: number;
  description?: string;
}

export interface GradingSystem {
  id: GradingSystemId;
  name: string;
  country: string;
  maxGpa: number;
  grades: GradeOption[];
  creditDefault: number;
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string; // matches GradeOption label
}

export interface PredefinedSubject {
  name: string;
  credits: number;
  code?: string;
}

export interface Major {
  id: string;
  name: string;
  category: string;
  degreeType?: string;
  icon?: string;
  subjects: PredefinedSubject[];
}

export interface Semester {
  id: string;
  title: string;
  courses: Course[];
}

export interface SemesterResult {
  semesterId: string;
  title: string;
  totalCredits: number;
  totalQualityPoints: number;
  gpa: number;
}

export interface OverallResult {
  totalCredits: number;
  totalQualityPoints: number;
  cgpa: number;
  semesterCount: number;
  courseCount: number;
  gradeDistribution: Record<string, number>;
}
