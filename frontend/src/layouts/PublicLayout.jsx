import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';

const PublicLayout = () => {
  return (
    <div className="bookease-public min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main className="pt-[68px]">
        <Outlet />
      </main>
      <footer className="relative overflow-hidden border-t border-white/10 px-6 py-10">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(84,112,255,0.14),transparent_62%)]" />
        <div className="relative mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-[14px] font-semibold tracking-tight text-slate-100">BookEase</p>
            <p className="mt-1 text-[12px] text-slate-400">A local-service marketplace built around clear handoffs.</p>
          </div>
          <p className="text-[12px] text-slate-500">© 2026 BookEase · Contributor: Yehong Hu (James Hu)</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
