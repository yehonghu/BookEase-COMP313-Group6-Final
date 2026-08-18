import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  HandCoins,
  HeartHandshake,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
  Wrench,
  Zap,
} from 'lucide-react';

const categories = [
  { icon: Wrench, label: 'Home repair', detail: 'Plumbing, electrical, and more', tone: 'from-blue-300 to-cyan-300' },
  { icon: Sparkles, label: 'Home care', detail: 'Cleaning and personal care', tone: 'from-violet-300 to-fuchsia-300' },
  { icon: HeartHandshake, label: 'Wellness', detail: 'Fitness, tutoring, and support', tone: 'from-emerald-300 to-teal-300' },
  { icon: Wand2, label: 'Creative work', detail: 'Photography and specialist help', tone: 'from-amber-200 to-orange-300' },
];

const signals = [
  { icon: ShieldCheck, title: 'Built for informed choices', copy: 'Profiles, reviews, and bid details stay visible before a booking decision.' },
  { icon: CalendarCheck2, title: 'Conflict-aware by design', copy: 'Availability is checked before an accepted bid becomes a confirmed booking.' },
  { icon: HandCoins, title: 'A fairer marketplace', copy: 'Customers can compare the value behind each proposal, not just a single price.' },
];

const steps = [
  { number: '01', icon: Search, title: 'Describe the need', copy: 'Create a clear service request with a preferred time, location, and budget range.' },
  { number: '02', icon: CircleDollarSign, title: 'Compare real proposals', copy: 'Providers respond with price, availability, and a message that makes their fit clear.' },
  { number: '03', icon: CheckCircle2, title: 'Confirm with confidence', copy: 'Choose the right bid. BookEase verifies the schedule and creates the booking automatically.' },
];

const revealEase = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = '' }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 34, rotateX: -7 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10% 0px -6%' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.72, delay, ease: revealEase }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const OrbitMarketplace = () => {
  const target = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });

  const handlePointerMove = (event) => {
    if (reduceMotion || !target.current) return;
    const bounds = target.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="relative mx-auto mt-14 w-full max-w-[680px] [perspective:1200px] lg:mt-0">
      <motion.div
        ref={target}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="orbit-card relative w-full min-h-[440px] overflow-hidden rounded-[2rem] p-4 sm:min-h-[500px] sm:p-5"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(112,141,255,0.38),transparent_27%),radial-gradient(circle_at_24%_85%,rgba(72,234,185,0.22),transparent_30%)]" />
        <div aria-hidden="true" className="orbit-grid absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-[45%] h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
        <div aria-hidden="true" className="absolute left-1/2 top-[43%] h-[110px] w-[110px] -translate-x-1/2 rounded-full border border-blue-200/25 bg-blue-300/5 blur-[1px]" />

        <motion.div
          className="relative z-10 rounded-2xl border border-white/15 bg-[#10162b]/85 p-4 shadow-[0_25px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:absolute sm:left-5 sm:top-7 sm:w-[58%]"
          style={{ translateZ: 72 }}
          animate={reduceMotion ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-blue-200/15 bg-blue-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-blue-100">New request</span>
            <span className="text-[10px] font-medium text-slate-400">Today · 2:30 PM</span>
          </div>
          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-300 to-indigo-400 text-slate-950"><Wrench className="h-5 w-5" /></span>
            <div>
              <p className="text-[15px] font-bold text-slate-100">Kitchen faucet repair</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-400">Leaking fixture near Queen West. Preferred appointment this Friday.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><MapPin className="h-3.5 w-3.5 text-emerald-300" /> Toronto, ON</span>
            <span className="text-[12px] font-bold text-emerald-200">$120–180</span>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 mt-5 ml-auto rounded-2xl border border-emerald-200/20 bg-[#0d2630]/90 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:absolute sm:right-5 sm:top-[42%] sm:mt-0 sm:w-[54%]"
          style={{ translateZ: 112 }}
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-200"><Zap className="h-3.5 w-3.5" /> Bid received</span>
            <span className="flex items-center gap-0.5 text-[11px] text-amber-200"><Star className="h-3 w-3 fill-current" /> 4.9</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 to-teal-400 text-[12px] font-extrabold text-slate-950">MN</span>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-slate-100">Maya Nguyen</p>
              <p className="text-[11px] text-slate-400">Licensed plumbing specialist</p>
            </div>
            <p className="text-[18px] font-extrabold text-emerald-200">$145</p>
          </div>
          <p className="mt-3 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-slate-300">Available Friday at 2:30 PM. I can bring the replacement cartridge.</p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-5 w-fit rounded-2xl border border-violet-200/20 bg-[#21173b]/90 px-4 py-3 shadow-[0_25px_45px_rgba(0,0,0,0.33)] backdrop-blur-xl sm:absolute sm:bottom-7 sm:left-[27%] sm:mt-0"
          style={{ translateZ: 142 }}
          animate={reduceMotion ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.65 }}
        >
          <span className="flex items-center gap-2 text-[11px] font-bold text-violet-100"><BadgeCheck className="h-4 w-4 text-violet-300" /> Availability confirmed · Booking created</span>
        </motion.div>

        <div aria-hidden="true" className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/45">Request → compare → confirm</div>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="orbit-noise pointer-events-none absolute inset-0" />

      <section className="relative isolate px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="orbit-grid pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-[-14rem] top-[8rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/15 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-[12rem] h-[30rem] w-[30rem] rounded-full bg-violet-500/15 blur-[105px]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-[610px]">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: revealEase }} className="inline-flex items-center gap-2 rounded-full border border-blue-200/15 bg-blue-300/[0.08] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-emerald-200" /> Local service marketplace
            </motion.div>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.76, delay: 0.08, ease: revealEase }} className="mt-7 max-w-[740px] text-[48px] font-black leading-[0.96] tracking-[-0.065em] text-slate-50 sm:text-[64px] lg:text-[76px]">
              The right help is already in your orbit.
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16, ease: revealEase }} className="mt-7 max-w-[560px] text-[17px] leading-relaxed text-slate-300 sm:text-[19px]">
              BookEase turns a local service request into a confident booking. Post what you need, compare real proposals, and choose the provider who fits the moment.
            </motion.p>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24, ease: revealEase }} className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className="orbit-button-primary">Explore service requests <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/register" className="orbit-button-secondary">Create a free account</Link>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-12 flex items-center gap-5 text-[12px] text-slate-400">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(81,231,185,0.9)]" /> Requests, bids, and bookings</span>
              <a href="#how-it-works" className="flex items-center gap-1.5 font-semibold text-blue-200 no-underline transition-colors hover:text-white">See the flow <ArrowDown className="h-3.5 w-3.5" /></a>
            </motion.div>
          </div>
          <OrbitMarketplace />
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1200px] border-y border-white/10 py-7 sm:py-9">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['One clear request', 'Set the context once, then let the right providers respond.'],
              ['Proposals you can compare', 'Price, message, availability, and provider details in one view.'],
              ['A booking with a real state', 'The accepted bid becomes an accountable next step.'],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={index * 0.08} className="border-white/10 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
                <p className="text-[13px] font-bold text-slate-100">{title}</p>
                <p className="mt-1.5 max-w-[290px] text-[12.5px] leading-relaxed text-slate-400">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-18rem] top-[4rem] h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal>
            <span className="orbit-section-label">Marketplace signals</span>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-[680px] text-[38px] font-bold leading-[1.02] tracking-[-0.05em] text-slate-50 sm:text-[54px]">Built to make the decision feel clear.</h2>
              <p className="max-w-[330px] text-[15px] leading-relaxed text-slate-400">A better booking flow gives both sides enough information to move forward without ambiguity.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {signals.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.09}>
                <motion.article className="orbit-card relative h-full overflow-hidden rounded-3xl p-7" whileHover={reduceMotion ? {} : { y: -10, rotateX: 3, rotateY: index === 1 ? 0 : index === 0 ? -3 : 3 }} transition={{ type: 'spring', stiffness: 250, damping: 21 }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-200 to-violet-300 text-slate-950 shadow-[0_12px_30px_rgba(85,122,255,0.24)]"><signal.icon className="h-5 w-5" /></span>
                  <h3 className="mt-7 text-[20px] font-bold tracking-[-0.03em] text-slate-100">{signal.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{signal.copy}</p>
                  <span aria-hidden="true" className="absolute bottom-5 right-6 text-[11px] font-bold tracking-[0.18em] text-blue-100/35">0{index + 1}</span>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:py-32" id="how-it-works">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_55%,rgba(63,93,224,0.13),transparent_58%)]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <span className="orbit-section-label">The booking loop</span>
            <h2 className="mx-auto mt-5 max-w-[760px] text-[39px] font-bold leading-[1.02] tracking-[-0.055em] text-slate-50 sm:text-[56px]">Three moves. One confident outcome.</h2>
            <p className="mx-auto mt-5 max-w-[570px] text-[16px] leading-relaxed text-slate-400">The interface follows the same logic as the platform: make the request legible, make the comparison fair, make the confirmation real.</p>
          </Reveal>
          <div className="relative mt-16 grid gap-5 lg:grid-cols-3 lg:gap-7">
            <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent lg:block" />
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.11}>
                <motion.article className="orbit-glass relative h-full rounded-3xl p-7 text-center" whileHover={reduceMotion ? {} : { y: -8, rotateX: 3 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-blue-100/20 bg-gradient-to-br from-[#18244b] to-[#21183a] shadow-[0_16px_36px_rgba(0,0,0,0.26)]">
                    <step.icon className="h-6 w-6 text-blue-200" />
                    <span className="absolute -right-2 -top-2 rounded-full border border-white/15 bg-[#11172a] px-2 py-1 text-[10px] font-bold text-emerald-200">{step.number}</span>
                  </div>
                  <h3 className="mt-7 text-[21px] font-bold tracking-[-0.035em] text-slate-100">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-[280px] text-[14px] leading-relaxed text-slate-400">{step.copy}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-12 sm:pb-40 sm:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-16rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-400/15 blur-[120px]" />
        <Reveal>
          <div className="orbit-card relative mx-auto max-w-[1000px] overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(151,177,255,0.22),transparent_40%)]" />
            <div className="relative">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-blue-300 text-slate-950"><CalendarCheck2 className="h-6 w-6" /></span>
              <h2 className="mx-auto mt-7 max-w-[660px] text-[39px] font-bold leading-[1.02] tracking-[-0.055em] text-slate-50 sm:text-[57px]">Your next booking can start with a better brief.</h2>
              <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-slate-300">Create an account to post a request, offer your services, or explore how BookEase connects a marketplace around the moment of choice.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/register" className="orbit-button-primary">Create free account <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/register?role=provider" className="orbit-button-secondary">Become a provider</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
