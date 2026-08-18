import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ChevronDown, LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const NAV_LINKS = [
  { label: 'Browse requests', path: '/services' },
  { label: 'The process', path: '/#how-it-works' },
  { label: 'Community notes', path: '/reviews' },
  { label: 'About BookEase', path: '/about' },
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

  const isActive = (path) => path === '/#how-it-works' ? location.pathname === '/' : location.pathname === path;

  return (
    <header className={`orbit-nav fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_0_rgba(24,42,69,0.08)]' : ''}`}>
      <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-7">
        <Link to="/" className="group flex items-center gap-2.5 no-underline">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#182a45]/20 bg-[#f6c65b] shadow-[3px_3px_0_rgba(24,42,69,0.18)]">
            <CalendarDays className="h-[18px] w-[18px] text-[#182a45]" />
            <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#fbf5e9] bg-[#bd4d3c]" />
          </span>
          <span className="font-serif text-[19px] font-bold tracking-[-0.045em] text-[#182a45]">BookEase</span>
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
              <button onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-2 rounded-lg border border-[#182a45]/15 bg-[#fff9ed] px-2.5 py-1.5 text-[#182a45] transition-colors hover:bg-[#f1e4cc]" aria-expanded={profileOpen}>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2463d4] text-[11px] font-bold text-[#fff9ed]">{user?.name?.charAt(0)?.toUpperCase()}</span>
                <span className="max-w-[100px] truncate text-[12.5px] font-semibold">{user?.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#637087]" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 8, rotate: -1 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full mt-3 w-60 border border-[#182a45]/20 bg-[#fff9ed] p-2 shadow-[6px_7px_0_rgba(24,42,69,0.16)]">
                    <div className="border-b border-[#182a45]/12 px-3 py-2.5">
                      <p className="text-[13px] font-semibold text-[#182a45]">{user?.name}</p>
                      <p className="mt-0.5 truncate text-[11px] text-[#637087]">{user?.email}</p>
                      <span className="mt-2 inline-block bg-[#f6c65b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#182a45]">{user?.role}</span>
                    </div>
                    <Link to={dashboardLink()} onClick={() => setProfileOpen(false)} className="mt-1 flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#30415d] no-underline transition-colors hover:bg-[#f1e4cc]">
                      <LayoutDashboard className="h-4 w-4 text-[#2463d4]" /> Dashboard
                    </Link>
                    <Link to={dashboardLink().replace('/dashboard', '/account')} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#30415d] no-underline transition-colors hover:bg-[#f1e4cc]">
                      <UserRound className="h-4 w-4 text-[#2463d4]" /> Account
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] font-medium text-[#bd4d3c] transition-colors hover:bg-[#f8e3dc]">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="orbit-nav-link px-3 py-2">Sign in</Link>
              <Link to="/register" className="border border-[#2463d4] bg-[#2463d4] px-4 py-2 text-[12.5px] font-bold text-[#fffaf1] no-underline shadow-[3px_3px_0_rgba(24,42,69,0.18)] transition-transform hover:-translate-y-0.5">Create account</Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen((open) => !open)} className="border border-[#182a45]/18 bg-[#fff9ed] p-2 text-[#182a45] md:hidden" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-[#182a45]/12 bg-[#fbf5e9] md:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} to={link.path} onClick={() => setMobileOpen(false)} className="px-3 py-3 text-[15px] font-semibold text-[#30415d] no-underline transition-colors hover:bg-[#f1e4cc] hover:text-[#182a45]">
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-[#182a45]/12 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardLink()} onClick={() => setMobileOpen(false)} className="orbit-button-secondary flex-1 px-3 py-2.5 text-[13px]">Dashboard</Link>
                    <button onClick={handleLogout} className="flex-1 border border-[#bd4d3c]/30 px-3 py-2.5 text-[13px] font-semibold text-[#bd4d3c]">Sign out</button>
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
