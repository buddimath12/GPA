import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, ChevronDown, GraduationCap, X, Sparkles } from 'lucide-react';
import {
  POPULAR_MAJORS,
  searchPredefinedSubjects,
  getSubjectsByMajorId,
  AutocompleteSubjectItem,
} from '../data/majors';

interface SubjectAutocompleteProps {
  value: string;
  placeholder?: string;
  preferredMajorId?: string;
  onChange: (name: string) => void;
  onSelectSubject: (subject: { name: string; credits: number }) => void;
  className?: string;
}

export const SubjectAutocomplete: React.FC<SubjectAutocompleteProps> = ({
  value,
  placeholder = 'Click to select subject or type...',
  preferredMajorId,
  onChange,
  onSelectSubject,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine current active major details from the degree selected at the top
  const currentMajor = useMemo(() => {
    return POPULAR_MAJORS.find((m) => m.id === preferredMajorId);
  }, [preferredMajorId]);

  // Compute suggestions list based STRICTLY on the degree selected at the top:
  // 1. If value is empty: automatically display all 20-30 subjects for this degree!
  // 2. If value is typed: filter subjects of this degree by typed keyword
  const suggestions = useMemo<AutocompleteSubjectItem[]>(() => {
    const trimmed = value ? value.trim() : '';

    if (!trimmed) {
      if (preferredMajorId) {
        return getSubjectsByMajorId(preferredMajorId);
      }
      // If no major selected at top, return popular cross-discipline courses
      return searchPredefinedSubjects('', undefined, 20);
    }

    return searchPredefinedSubjects(trimmed, preferredMajorId, 35);
  }, [value, preferredMajorId]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: AutocompleteSubjectItem) => {
    onSelectSubject({ name: item.name, credits: item.credits });
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input container with toggle chevron */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            // Immediately expand subjects list on click or focus as requested
            setIsOpen(true);
          }}
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all cursor-text ${className}`}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Expand/Collapse Toggle Button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            setIsOpen((prev) => !prev);
            if (!isOpen) {
              inputRef.current?.focus();
            }
          }}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
          title="Show subjects for degree program"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </button>
      </div>

      {/* Expanded Subjects List Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-950/15 py-2 z-50 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Degree Context Header (NO redundant selector - just clear title & close button) */}
          <div className="px-3 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-900 truncate">
              <span className="p-1 rounded-md bg-indigo-50 text-indigo-600 shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </span>
              <span className="truncate">
                {currentMajor ? (
                  <>
                    <strong className="text-indigo-950 font-extrabold">{currentMajor.name}</strong>{' '}
                    <span className="text-slate-500 font-normal">({suggestions.length} Subjects)</span>
                  </>
                ) : (
                  <span className="text-slate-600 font-medium">Select a Degree at the top or pick below</span>
                )}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md text-xs cursor-pointer shrink-0 transition-colors"
              title="Close subject menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subject Items List */}
          {suggestions.length > 0 ? (
            <ul className="divide-y divide-slate-100/60">
              {suggestions.map((item, index) => {
                const isSelected = index === highlightedIndex;
                return (
                  <li
                    key={`${item.name}-${item.majorId}-${index}`}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input blur before selection
                      handleSelect(item);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between gap-2 transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/90 text-indigo-950'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                      </div>

                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {item.code ? (
                            <span className="font-bold text-indigo-700 mr-1.5 px-1 py-0.2 bg-indigo-50 rounded">
                              {item.code}
                            </span>
                          ) : null}
                          <span>{item.majorName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                        {item.credits} Credits
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-4 text-center text-xs text-slate-500">
              <p className="font-semibold text-slate-700">No subjects matching "{value}"</p>
              <p className="text-[11px] text-slate-400 mt-1">
                You can press Enter to keep your custom subject name.
              </p>
            </div>
          )}

          {/* Quick Footer Note */}
          <div className="px-3 py-1.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Click any subject to select</span>
            <span className="font-bold text-indigo-600 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Auto-fills credits
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
