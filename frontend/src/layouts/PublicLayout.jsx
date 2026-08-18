import { Link, Outlet } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';

export default function PublicLayout() {
  return (
    <div className="bookease-public">
      <ScrollProgress />
      <Navbar />
      <main className="motion-main"><Outlet /></main>
      <footer className="motion-footer">
        <div className="motion-footer__inner">
          <div><div className="motion-footer__brand">BookEase</div><p>A clear way to coordinate work close to home.</p></div>
          <div className="motion-footer__links"><Link to="/about">About <ArrowUpRight size={12} /></Link><Link to="/contact">Contact <ArrowUpRight size={12} /></Link><Link to="/reviews">Community <ArrowUpRight size={12} /></Link></div>
          <p>© 2026 BookEase · Yehong Hu</p>
        </div>
      </footer>
    </div>
  );
}
