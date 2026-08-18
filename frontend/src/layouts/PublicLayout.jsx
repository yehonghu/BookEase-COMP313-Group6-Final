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
      <footer className="relative overflow-hidden border-t px-6 py-10">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(24,42,69,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(24,42,69,0.55)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="font-serif text-[16px] font-bold tracking-[-0.03em] text-[#182a45]">BookEase</p>
            <p className="mt-1 text-[12px] text-[#637087]">A neighborhood marketplace for clear next steps.</p>
          </div>
          <p className="text-[12px] text-[#637087]">© 2026 BookEase · Contributor: Yehong Hu (James Hu)</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
