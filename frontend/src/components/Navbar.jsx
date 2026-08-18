import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ChevronDown, LayoutDashboard, LogOut, Menu, Sparkles, UserRound, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const NAV_LINKS = [
  { label: 'Explore', path: '/services' },
  { label: 'How it works', path: '/#how-it-works' },
  { label: 'Trust', path: '/reviews' },
  { label: 'About', path: '/about' },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const dashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'provider') return '/provider/dashboard';
    return '/customer/dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const isActive = (path) => path === '/#how-it-works'
    ? location.pathname === '/'
    : location.pathname === path;

  return (
    <header className={`orbit-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_12px_45px_rgba(0,0,0,0.22)]' : ''}`}>
      <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-7">
        <Link to="/" className="group flex items-center gap-2.5 no-underline">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200/25 bg-gradient-to-br from-blue-300 via-indigo-400 to-violet-500 shadow-[0_8px_22px_rgba(80,113,255,0.32)]">
            <CalendarDays className="h-[18px] w-[18px] text-slate-950" />
            <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#080a12] bg-emerald-300" />
          </span>
          <span className="font-sans text-[18px] font-bold tracking-[-0.045em] text-slate-100">BookEase</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.path} className={`orbit-nav-link ${isActive(link.path) ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1.5 text-slate-100 transition-colors hover:bg-white/[0.08]" aria-expanded={profileOpen}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 to-violet-400 text-[11px] font-bold text-slate-950">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate text-[12.5px] font-semibold">{user?.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/10 bg-[#11172a]/95 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="border-b border-white/10 px-3 py-2.5">
                      <p className="text-[13px] font-semibold text-slate-100">{user?.name}</p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">{user?.email}</p>
                      <span className="mt-2 inline-block rounded-full bg-blue-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-200">{user?.role}</span>
                    </div>
                    <Link to={dashboardLink()} onClick={() => setProfileOpen(false)} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-300 no-underline transition-colors hover:bg-white/[0.07] hover:text-white">
                      <LayoutDashboard className="h-4 w-4 text-blue-200" /> Dashboard
                    </Link>
                    <Link to={dashboardLink().replace('/dashboard', '/account')} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-300 no-underline transition-colors hover:bg-white/[0.07] hover:text-white">
                      <UserRound className="h-4 w-4 text-blue-200" /> Account
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-rose-300 transition-colors hover:bg-rose-400/10">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="orbit-nav-link rounded-full px-3 py-2">Sign in</Link>
              <Link to="/register" className="rounded-full border border-blue-100/30 bg-gradient-to-r from-blue-300 to-indigo-300 px-4 py-2 text-[12.5px] font-bold text-slate-950 no-underline shadow-[0_10px_30px_rgba(92,122,255,0.25)] transition-transform hover:-translate-y-0.5">Create account</Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen((open) => !open)} className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-100 md:hidden" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-white/10 bg-[#080a12]/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} to={link.path} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-[15px] font-semibold text-slate-300 no-underline transition-colors hover:bg-white/[0.06] hover:text-white">
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardLink()} onClick={() => setMobileOpen(false)} className="orbit-button-secondary flex-1 px-3 py-2.5 text-[13px]">Dashboard</Link>
                    <button onClick={handleLogout} className="flex-1 rounded-full border border-rose-300/25 px-3 py-2.5 text-[13px] font-semibold text-rose-200">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="orbit-button-secondary flex-1 px-3 py-2.5 text-[13px]">Sign in</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="orbit-button-primary flex-1 px-3 py-2.5 text-[13px]">Create account</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
