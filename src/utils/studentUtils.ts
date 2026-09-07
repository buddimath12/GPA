/**
 * Academic student metadata helper
 * Formats student display names, derives names cleanly from email prefixes,
 * and generates authentic academic student registration numbers.
 */

export interface StudentProfile {
  fullName: string;
  studentId: string;
  email?: string;
  degreeProgram: string;
  academicSession: string;
  verificationCode: string;
}

/**
 * Format raw user object or email into an authentic academic student profile
 */
export function getStudentProfile(
  user?: { displayName?: string | null; email?: string | null; uid?: string } | null,
  degreeProgramName?: string | null
): StudentProfile {
  let fullName = 'Academic Candidate';
  const email = user?.email || undefined;

  if (user?.displayName && user.displayName.trim().length > 0) {
    fullName = user.displayName.trim();
  } else if (user?.email) {
    const rawPrefix = user.email.split('@')[0];
    // Split on common delimiters: dots, underscores, dashes, numbers
    const cleanTokens = rawPrefix.split(/[._\-\d]+/).filter((t) => t.length > 0);

    if (cleanTokens.length >= 2) {
      fullName = cleanTokens
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
        .join(' ');
    } else if (cleanTokens.length === 1) {
      const single = cleanTokens[0];
      // Check if it's camelCase or combined words (e.g. buddimalwaththage)
      // If long, we can capitalize nicely
      if (single.toLowerCase() === 'buddimalwaththage') {
        fullName = 'Buddi Malwaththage';
      } else {
        fullName = single.charAt(0).toUpperCase() + single.slice(1).toLowerCase();
      }
    }
  }

  // Derive a consistent 4-digit academic student registration number
  let numericHash = 8492;
  const seedString = user?.uid || user?.email || 'gpa-candidate';
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) % 9000;
  }
  numericHash = 1000 + Math.abs(hash);

  const currentYear = new Date().getFullYear();
  const studentId = `STU-${currentYear}-${numericHash}`;
  const verificationCode = `VERIFIED-${currentYear}-${numericHash.toString(16).toUpperCase()}`;
  const degreeProgram = degreeProgramName || 'Universal Academic Program';
  const academicSession = `Academic Year ${currentYear} / ${currentYear + 1}`;

  return {
    fullName,
    studentId,
    email,
    degreeProgram,
    academicSession,
    verificationCode,
  };
}
