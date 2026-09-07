import React from 'react';

interface AdBannerProps {
  format: 'leaderboard' | 'rectangle' | 'in-feed';
  label?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ format, label = 'Advertisement', className = '' }) => {
  return (
    <aside
      className={`ad-container my-6 mx-auto flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-100/70 p-4 text-center text-slate-400 transition-colors select-none ${className}`}
      aria-label={label}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
        <span>{label}</span>
      </div>

      {format === 'leaderboard' && (
        <div className="w-full max-w-[728px] h-[90px] flex flex-col items-center justify-center rounded-xl bg-slate-200/70 text-xs text-slate-500 font-bold">
          <p className="font-extrabold text-slate-600 uppercase tracking-wider text-[11px]">Google AdSense Responsive Banner</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">728x90 Desktop / 320x50 Mobile auto-fit</p>
        </div>
      )}

      {format === 'rectangle' && (
        <div className="w-full max-w-[300px] h-[250px] flex flex-col items-center justify-center rounded-xl bg-slate-200/70 text-xs text-slate-500 font-bold p-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
            Advertisement<br/>(AdSense Placeholder)
          </span>
          <span className="mt-3 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-slate-300/80 text-slate-600">
            300x250 Medium Rect
          </span>
        </div>
      )}

      {format === 'in-feed' && (
        <div className="w-full py-4 px-6 flex items-center justify-between rounded-xl bg-slate-200/70 text-xs text-slate-500">
          <div>
            <p className="font-extrabold text-slate-600 text-xs">Sponsored Educational Resources</p>
            <p className="text-[10px] text-slate-400 font-medium">Scholarships & University Study Tools</p>
          </div>
          <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-700 uppercase">Ad</span>
        </div>
      )}
    </aside>
  );
};
