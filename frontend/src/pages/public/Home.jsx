import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  HandCoins,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';

const categories = [
  { icon: Wrench, number: '01', label: 'Home repair', copy: 'Small fixes, essential upgrades, and reliable trades.', tone: '#2463d4' },
  { icon: Sparkles, number: '02', label: 'Care & comfort', copy: 'Cleaning, personal care, and the services that make home easier.', tone: '#bd4d3c' },
  { icon: HeartHandshake, number: '03', label: 'Learning & wellness', copy: 'Tutoring, movement, and supportive one-to-one help.', tone: '#28765f' },
  { icon: Star, number: '04', label: 'Creative specialists', copy: 'Photography, events, and distinct craft when the detail matters.', tone: '#a36900' },
];

const steps = [
  { number: '01', icon: ClipboardList, title: 'Write a useful request', copy: 'Share the location, preferred time, budget, and the detail a good provider needs to respond well.' },
  { number: '02', icon: MessageSquareText, title: 'Read the proposals', copy: 'Compare price, availability, reviews, and a provider’s explanation in one considered view.' },
  { number: '03', icon: CalendarCheck2, title: 'Make it official', copy: 'Accept the bid that fits. BookEase checks the schedule and turns the agreement into a booking.' },
];

const signals = [
  { icon: ShieldCheck, title: 'More context, better choice', copy: 'Provider details and review history remain part of the decision, not an afterthought.' },
  { icon: HandCoins, title: 'A fair response loop', copy: 'Providers make a case for the work. Customers make an informed choice about the value.' },
  { icon: BadgeCheck, title: 'A booking with a record', copy: 'Availability is verified before an accepted proposal becomes the next scheduled commitment.' },
];

const ease = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = '' }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, rotateX: -4 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-9% 0px -6%' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, delay, ease }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const AlmanacBoard = () => {
  const board = useRef(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });

  const moveBoard = (event) => {
    if (reduceMotion || !board.current) return;
    const rect = board.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetBoard = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="mx-auto mt-14 w-full max-w-[640px] [perspective:1200px] lg:mt-0">
      <motion.div
        ref={board}
        className="almanac-board w-full"
        onPointerMove={moveBoard}
        onPointerLeave={resetBoard}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <span className="almanac-pin one" />
        <span className="almanac-pin two" />
        <motion.article
          className="almanac-card request p-4 sm:p-5"
          style={{ translateZ: 45 }}
          animate={reduceMotion ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="almanac-tape" />
          <div className="flex items-start justify-between gap-3">
            <span className="almanac-tab">New request</span>
            <span className="font-serif text-[10px] font-semibold text-[#637087]">Friday · 2:30 PM</span>
          </div>
          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#dce7ff] text-[#2463d4]"><Wrench className="h-5 w-5" /></span>
            <div>
              <p className="font-serif text-[16px] font-bold leading-tight text-[#182a45]">Kitchen faucet repair</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#637087]">Leaking fixture near Queen West. Looking for a careful repair and a clear estimate.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#182a45]/12 pt-3">
            <span className="flex items-center gap-1 text-[10px] text-[#637087]"><MapPin className="h-3.5 w-3.5 text-[#bd4d3c]" /> Toronto, ON</span>
            <span className="font-serif text-[13px] font-bold text-[#28765f]">$120–180</span>
          </div>
        </motion.article>

        <motion.article
          className="almanac-card bid p-4 sm:p-5"
          style={{ translateZ: 75 }}
          animate={reduceMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 6.1, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
        >
          <div className="flex items-center justify-between">
            <span className="almanac-tab green">A proposal arrives</span>
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#a36900]"><Star className="h-3 w-3 fill-current" /> 4.9</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#28765f] text-[11px] font-extrabold text-[#fffaf0]">MN</span>
            <div className="flex-1">
              <p className="font-serif text-[14px] font-bold text-[#182a45]">Maya Nguyen</p>
              <p className="text-[10px] text-[#637087]">Licensed plumbing specialist</p>
            </div>
            <p className="font-serif text-[19px] font-bold text-[#28765f]">$145</p>
          </div>
          <p className="mt-3 border-t border-[#182a45]/12 pt-3 text-[10.5px] leading-relaxed text-[#53627a]">Available Friday at 2:30 PM. I can bring the replacement cartridge and confirm the fit on arrival.</p>
        </motion.article>

        <motion.article
          className="almanac-card confirm flex items-center gap-2.5 px-4 py-3"
          style={{ translateZ: 105 }}
          animate={reduceMotion ? {} : { rotate: [-0.8, 0.7, -0.8] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2463d4]" />
          <span className="font-serif text-[11px] font-bold leading-tight text-[#182a45]">The time works. The booking is now in the record.</span>
        </motion.article>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="almanac-home relative overflow-hidden">
      <div aria-hidden="true" className="orbit-noise pointer-events-none absolute inset-0" />

      <section className="almanac-hero px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="orbit-grid pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-[610px]">
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, ease }} className="almanac-kicker">The neighborhood service board</motion.p>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.74, delay: 0.08, ease }} className="almanac-display mt-5 text-[50px] font-bold leading-[0.9] sm:text-[65px] lg:text-[78px]">A better way to ask around.</motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.68, delay: 0.16, ease }} className="almanac-copy mt-7 max-w-[560px] text-[17px] leading-relaxed sm:text-[19px]">BookEase brings the familiar act of asking a neighbor for a recommendation into one dependable place. Write the request, read the replies, and book the person who makes sense.</motion.p>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.24, ease }} className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className="orbit-button-primary">Browse open requests <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/register" className="orbit-button-secondary">Post a request</Link>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65, delay: 0.42 }} className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#637087]">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#bd4d3c]" /> A considered request, not a noisy feed</span>
              <a href="#how-it-works" className="flex items-center gap-1.5 font-semibold text-[#2463d4] no-underline hover:text-[#182a45]">Read the process <ArrowDown className="h-3.5 w-3.5" /></a>
            </motion.div>
          </div>
          <AlmanacBoard />
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1200px] border-y border-[#182a45]/15 py-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['The request is readable', 'A provider can see the essential context before deciding whether they are the right fit.'],
              ['The reply has a point of view', 'Price, timing, reviews, and a useful note are visible in the same moment.'],
              ['The record carries forward', 'An accepted bid becomes a booking with an accountable state.'],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={index * 0.08} className="sm:border-l sm:border-[#182a45]/15 sm:px-6 first:sm:border-l-0 first:sm:pl-0">
                <p className="font-serif text-[14px] font-bold text-[#182a45]">{title}</p>
                <p className="mt-1.5 max-w-[290px] text-[12.5px] leading-relaxed text-[#637087]">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute left-0 top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#f6c65b]/25 blur-[110px]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal>
            <span className="orbit-section-label">Services, sorted by the real world</span>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="almanac-display max-w-[680px] text-[40px] font-bold leading-[0.96] sm:text-[56px]">Every small job has a story worth hearing.</h2>
              <p className="max-w-[330px] text-[15px] leading-relaxed text-[#637087]">A thoughtful marketplace makes room for both the practical request and the person doing the work.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.label} delay={index * 0.08}>
                <motion.article className="almanac-category h-full p-6" style={{ '--tone': category.tone }} whileHover={reduceMotion ? {} : { y: -7, rotateX: 2, rotateY: index % 2 ? 2 : -2 }} transition={{ type: 'spring', stiffness: 240, damping: 21 }}>
                  <p className="almanac-number">{category.number}</p>
                  <span className="mt-7 flex h-10 w-10 items-center justify-center bg-[#f1e4cc] text-[#182a45]"><category.icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-serif text-[21px] font-bold text-[#182a45]">{category.label}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#637087]">{category.copy}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative px-6 py-24 sm:py-32">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,transparent,rgba(36,99,212,0.06),transparent)]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <span className="orbit-section-label">A small, clear ritual</span>
            <h2 className="almanac-display mx-auto mt-5 max-w-[760px] text-[40px] font-bold leading-[0.97] sm:text-[57px]">From a note on the board to a time on the calendar.</h2>
            <p className="mx-auto mt-5 max-w-[570px] text-[16px] leading-relaxed text-[#637087]">The product is deliberately ordered around the handoff that matters: enough detail to make a good choice, then a booking everyone can rely on.</p>
          </Reveal>
          <div className="relative mt-16 grid gap-5 lg:grid-cols-3 lg:gap-7">
            <div aria-hidden="true" className="absolute left-[17%] right-[17%] top-14 hidden h-px bg-[#bd4d3c]/55 lg:block" />
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <motion.article className="almanac-note relative h-full p-7 text-center" whileHover={reduceMotion ? {} : { y: -7, rotateX: 2 }} transition={{ type: 'spring', stiffness: 240, damping: 21 }}>
                  <span className="almanac-tape" />
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center border border-[#182a45]/18 bg-[#f1e4cc] text-[#2463d4]">
                    <step.icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 bg-[#bd4d3c] px-2 py-1 text-[10px] font-bold text-[#fffaf0]">{step.number}</span>
                  </div>
                  <h3 className="mt-7 font-serif text-[22px] font-bold text-[#182a45]">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#637087]">{step.copy}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-12 sm:pb-40 sm:pt-20">
        <Reveal>
          <div className="almanac-note relative mx-auto max-w-[1000px] overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute right-[-7rem] top-[-8rem] h-[19rem] w-[19rem] rounded-full bg-[#f6c65b]/50" />
            <div aria-hidden="true" className="absolute bottom-[-9rem] left-[-5rem] h-[19rem] w-[19rem] rounded-full bg-[#8da9ea]/25" />
            <div className="relative">
              <span className="mx-auto flex h-12 w-12 items-center justify-center border border-[#182a45]/18 bg-[#f6c65b] text-[#182a45]"><CalendarCheck2 className="h-6 w-6" /></span>
              <h2 className="almanac-display mx-auto mt-7 max-w-[680px] text-[40px] font-bold leading-[0.97] sm:text-[57px]">Your next good recommendation could be a click away.</h2>
              <p className="mx-auto mt-5 max-w-[550px] text-[16px] leading-relaxed text-[#53627a]">Start with a useful request, or create a provider profile that tells your local community what you do best.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/register" className="orbit-button-primary">Create an account <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/register?role=provider" className="orbit-button-secondary">Offer a service</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
