import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  onClick,
}) => {
  // Dimensions based on size - beautifully scaled for clarity
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] sm:text-[11px] tracking-[0.22em]',
    lg: 'text-xs tracking-[0.25em]',
    xl: 'text-sm tracking-[0.3em]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* SVG Icon matching the uploaded logo - Crisp Vector */}
      <div className={`relative shrink-0 ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Purple to Blue Cap Gradient */}
            <linearGradient id="capGradient" x1="10" y1="20" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Cyan Orbital Swirl Gradient */}
            <linearGradient id="orbitGradient" x1="10" y1="80" x2="90" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="35%" stopColor="#6366F1" />
              <stop offset="70%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#00F2FE" />
            </linearGradient>

            {/* Calculator Body Gradient */}
            <linearGradient id="calcGradient" x1="25" y1="45" x2="75" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* A+ Badge Gradient */}
            <linearGradient id="badgeGradient" x1="60" y1="58" x2="78" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Cyan Orbital Loop Behind/Around */}
          <path
            d="M 16 76 C 8 68 8 52 24 40 C 44 26 78 26 88 44 C 94 56 86 70 70 80 C 52 90 28 88 18 78"
            stroke="url(#orbitGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Calculator Body (Isometric angled rectangle) */}
          <g transform="rotate(6 50 65)">
            <rect
              x="30"
              y="44"
              width="38"
              height="38"
              rx="8"
              fill="white"
              stroke="#06B6D4"
              strokeWidth="2.5"
            />
            <rect
              x="33"
              y="47"
              width="32"
              height="32"
              rx="6"
              fill="url(#calcGradient)"
            />

            {/* Display Line */}
            <rect x="37" y="51" width="24" height="6" rx="2" fill="white" fillOpacity="0.95" />

            {/* Keypad Buttons */}
            <rect x="37" y="60" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="44" y="60" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="37" y="67" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="44" y="67" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9" />

            {/* A+ Badge on Calculator */}
            <rect x="52" y="60" width="10" height="12" rx="3" fill="url(#badgeGradient)" />
            <text
              x="57"
              y="69"
              fill="white"
              fontSize="7.5"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              A+
            </text>
          </g>

          {/* Mortarboard Graduation Cap (Top) - Crisp Sharp Geometry */}
          {/* Diamond Cap Top */}
          <polygon
            points="48,15 84,27 48,39 12,27"
            fill="url(#capGradient)"
            stroke="#4338CA"
            strokeWidth="1.2"
          />
          {/* Cap Skull Under-band */}
          <path
            d="M 28 32 L 28 42 C 28 48 68 48 68 42 L 68 32 Z"
            fill="#3730A3"
          />
          {/* Hanging Tassel */}
          <circle cx="48" cy="27" r="2.8" fill="#F0ABFC" stroke="#C084FC" strokeWidth="0.8" />
          <path
            d="M 48 27 Q 30 31 22 40 L 21 54"
            stroke="#A855F7"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 19 53 L 23 53 L 22 60 L 20 60 Z"
            fill="#C084FC"
          />
        </svg>
      </div>

      {/* Typography: "GPAly" + "GPA Calculator" */}
      <div className="flex flex-col justify-center">
        <div className={`font-black font-heading tracking-tight leading-none ${textSizes[size]}`}>
          {/* "GPA" gradient in Purple to Indigo */}
          <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent drop-shadow-xs">
            GPA
          </span>
          {/* "ly" gradient in Blue to Vibrant Cyan */}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent drop-shadow-xs">
            ly
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-black uppercase text-slate-800 mt-1 block select-none ${subSizes[size]}`}
          >
            GPA Calculator
          </span>
        )}
      </div>
    </div>
  );
};
