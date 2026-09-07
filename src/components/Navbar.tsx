import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Cloud,
  RefreshCw,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { LegalTab } from './LegalModal';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onManualSync?: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onManualSync, onOpenLegal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, loading, isSyncing, lastSynced, logout, error, clearError } = useAuth();

  // Smart hide-on-scroll-down, reveal-on-scroll-up behavior (Antigravity web standard)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 15);

      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling downwards -> hide top bar to reveal full screen web view
        if (!isMobileMenuOpen) {
          setIsVisible(false);
          setIsUserDropdownOpen(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling upwards -> pop up / reveal top bar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90'
          : 'bg-white/95 backdrop-blur-xs border-b border-slate-200/70'
      }`}
    >
      {/* Auth Error Banner if needed */}
      {error && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-1.5 text-xs text-rose-900 flex items-center justify-between">
          <span className="font-semibold">{error}</span>
          <button
            onClick={clearError}
            className="text-rose-700 hover:text-rose-900 font-bold ml-2 underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek, comfortable height with ample room for sharp logo & navigation */}
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo with GPAly SVG & typography */}
          <Logo
            size="md"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('calculator-section')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              GPA Calculator
            </button>
            <button
              onClick={() => scrollTo('target-planner-section')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Target Forecaster
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Grading Scales & FAQ
            </button>
            <button
              onClick={() => onOpenLegal?.('about')}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              About & Legal
            </button>
          </nav>

          {/* Right Corner: Login / Sign Up / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-10 w-28 bg-slate-100 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full border border-slate-200 hover:border-purple-300 bg-slate-50/90 hover:bg-white transition-all cursor-pointer shadow-2xs"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-black">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[130px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  {isSyncing ? (
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600 animate-spin shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 ring-4 ring-purple-100" title="Cloud Synced"></span>
                  )}
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-black text-slate-900 truncate">
                        {user.displayName || 'Signed In User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                        {isSyncing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                            <span>Syncing to Firestore...</span>
                          </>
                        ) : (
                          <>
                            <Cloud className="w-3.5 h-3.5 text-purple-600" />
                            <span>
                              {lastSynced
                                ? `Synced ${lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                : 'Cloud Backup Active'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      {onManualSync && (
                        <button
                          onClick={() => {
                            onManualSync();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-purple-600 ${isSyncing ? 'animate-spin' : ''}`} />
                          <span>Sync Data Now</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md shadow-purple-600/25 hover:shadow-purple-600/35 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  <span>Start Now</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Mobile Auth Icon */}
          <div className="flex lg:hidden items-center gap-2">
            {!loading && (
              user ? (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center p-1 rounded-full border border-slate-200 bg-slate-50"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-full shadow-xs"
                >
                  Start Now
                </button>
              )
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
            {user ? (
              <div className="p-3.5 bg-purple-50/80 border border-purple-100 rounded-2xl mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-black text-slate-900">{user.displayName || 'Signed In'}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-xl hover:bg-rose-50 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Start Now
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('calculator-section')}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              GPA Calculator
            </button>
            <button
              onClick={() => scrollTo('target-planner-section')}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              Target Forecaster
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              Grading Scales & FAQ
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLegal?.('privacy');
              }}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              Privacy Policy & Cookies
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLegal?.('about');
              }}
              className="block w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl"
            >
              About & Contact
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
