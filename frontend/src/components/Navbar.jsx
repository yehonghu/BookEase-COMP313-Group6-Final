import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ChevronDown, LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const links = [
  { label: 'Browse', path: '/services' },
  { label: 'Community', path: '/reviews' },
  { label: 'Payment preview', path: '/payment-preview' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dashboardLink = user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard';
  const accountLink = dashboardLink.replace('/dashboard', '/account');
  const closeAll = () => { setMobileOpen(false); setProfileOpen(false); };
  const signOut = () => { logout(); closeAll(); navigate('/'); };

  return (
    <header className="motion-nav">
      <nav className="motion-nav__inner" aria-label="Main navigation">
        <Link to="/" className="motion-brand" onClick={closeAll}>
          <span className="motion-brand__mark"><CalendarDays size={17} /></span><span>BookEase</span>
        </Link>
        <div className="motion-nav__links">
          {links.map((link) => <NavLink key={link.path} to={link.path} className={({ isActive }) => `motion-nav__link ${isActive ? 'active' : ''}`}>{link.label}</NavLink>)}
        </div>
        <div className="motion-nav__actions">
          {isAuthenticated ? (
            <div className="motion-profile">
              <button type="button" className="motion-profile__button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
                <span className="motion-profile__avatar">
                  {user?.avatar ? <img src={user.avatar} alt="" /> : (user?.name?.charAt(0)?.toUpperCase() || 'U')}
                </span><b>{user?.name || 'Account'}</b><ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {profileOpen && <motion.div className="motion-profile__menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .16 }}>
                  <div className="motion-profile__identity"><b>{user?.name}</b><span>{user?.email}</span><i>{user?.role}</i></div>
                  <Link to={dashboardLink} onClick={closeAll}><LayoutDashboard size={15} /> Dashboard</Link>
                  <Link to={accountLink} onClick={closeAll}><UserRound size={15} /> Account</Link>
                  <button type="button" onClick={signOut}><LogOut size={15} /> Sign out</button>
                </motion.div>}
              </AnimatePresence>
            </div>
          ) : <><Link to="/login" className="motion-nav__login">Sign in</Link><Link to="/register" className="motion-nav__join">Create account</Link></>}
        </div>
        <button type="button" className="motion-nav__menu" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>{mobileOpen ? <X size={21} /> : <Menu size={22} />}</button>
      </nav>
      <AnimatePresence>
        {mobileOpen && <motion.div className="motion-nav__mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .17 }}>
          {links.map((link) => <NavLink key={link.path} to={link.path} onClick={closeAll}>{link.label}</NavLink>)}
          <div className="motion-nav__mobile-actions">
            {isAuthenticated ? <><Link to={dashboardLink} onClick={closeAll}>Dashboard</Link><button type="button" onClick={signOut}>Sign out</button></> : <><Link to="/login" onClick={closeAll}>Sign in</Link><Link to="/register" onClick={closeAll}>Create account</Link></>}
          </div>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}
