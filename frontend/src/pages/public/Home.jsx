import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CalendarDays, Compass, MapPin, ShieldCheck, Sparkles, Stars, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceOrbit from '../../three/ServiceOrbit';

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;

const categories = [
  { number: '01', title: 'Care at home', copy: 'Cleaning, errands, small routines, and practical support with clear expectations.', image: 'service-home-care.jpg', accent: 'coral' },
  { number: '02', title: 'Repair & craft', copy: 'Bring a specific issue to a nearby provider and compare considered responses.', image: 'service-repair.jpg', accent: 'cobalt' },
  { number: '03', title: 'Garden & outdoors', copy: 'Coordinate seasonal work and shared-space tasks at a human pace.', image: 'service-garden.jpg', accent: 'moss' },
];

const steps = [
  { number: '01', title: 'Frame the request', copy: 'Describe what needs doing, where it is, when it matters, and the budget range you have in mind.', icon: Compass },
  { number: '02', title: 'Read real responses', copy: 'Providers can respond with considered offers. You stay in control of the comparison.', icon: UsersRound },
  { number: '03', title: 'Book the right fit', copy: 'Select an offer, schedule the work, and follow the job through completion and review.', icon: CalendarDays },
];

const heroStats = [
  ['Role-aware', 'customer · provider · admin'],
  ['Clear states', 'request · offer · booking'],
  ['Built to connect', 'real API-ready workflows'],
];

export default function Home() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } };

  return (
    <div className="motion-home">
      <section className="motion-hero">
        <div className="motion-hero__photo" style={{ backgroundImage: `url(${asset('neighbourhood-hero.jpg')})` }} aria-hidden="true" />
        <div className="motion-hero__veil" aria-hidden="true" />
        <div className="motion-shell motion-hero__grid">
          <motion.div className="motion-hero__copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
            <p className="motion-kicker"><Sparkles size={14} /> Neighbourhood in motion</p>
            <h1>Help has a<br /><em>clearer way</em><br />to arrive.</h1>
            <p className="motion-lede">BookEase turns a local need into a considered next step: post a request, compare provider responses, and keep the booking journey visible from beginning to close.</p>
            <div className="motion-hero__actions">
              <Link to="/services" className="motion-button motion-button--primary">Explore requests <ArrowRight size={17} /></Link>
              <Link to="/register" className="motion-button motion-button--quiet">Create an account</Link>
            </div>
            <div className="motion-hero__meta"><MapPin size={15} /> Designed for the practical work close to home.</div>
          </motion.div>
          <motion.div className="motion-hero__stage" initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.05, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}>
            <div className="motion-stage__caption"><span>Local service map</span><b>Inspect the handoff</b></div>
            <ServiceOrbit onSelect={() => navigate('/services')} />
          </motion.div>
        </div>
        <div className="motion-shell motion-hero__stats" aria-label="BookEase product capabilities">
          {heroStats.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
        </div>
      </section>

      <section className="motion-intro motion-shell">
        <motion.div {...fadeUp} className="motion-intro__statement">
          <p className="motion-kicker">A service marketplace with context</p>
          <h2>Less chasing.<br /><em>More certainty.</em></h2>
        </motion.div>
        <motion.div {...fadeUp} className="motion-intro__copy">
          <p>Whether you need a repair, a reliable pair of hands, or a seasonal task finished, the experience should make the next move feel obvious. BookEase is designed around the handoff between a request and a trusted response.</p>
          <Link to="/about" className="motion-text-link">How the platform works <ArrowRight size={16} /></Link>
        </motion.div>
      </section>

      <section className="motion-categories motion-shell">
        <div className="motion-section-heading">
          <div><p className="motion-kicker">The service field</p><h2>Start with the work<br />in front of you.</h2></div>
          <button type="button" onClick={() => navigate('/services')} className="motion-text-link">Browse all requests <ArrowRight size={16} /></button>
        </div>
        <div className="motion-category-grid">
          {categories.map((category, index) => <motion.article key={category.title} className={`motion-category motion-category--${category.accent}`} {...fadeUp} transition={{ duration: 0.7, delay: index * 0.08 }}>
            <button type="button" onClick={() => navigate('/services')} aria-label={`Browse ${category.title} requests`}>
              <img src={asset(category.image)} alt="" loading="lazy" />
              <span className="motion-category__shade" />
              <span className="motion-category__number">{category.number}</span>
              <div className="motion-category__content"><h3>{category.title}</h3><p>{category.copy}</p><span className="motion-category__link">Browse category <ArrowRight size={16} /></span></div>
            </button>
          </motion.article>)}
        </div>
      </section>

      <section id="how-it-works" className="motion-flow">
        <div className="motion-shell">
          <motion.div {...fadeUp} className="motion-flow__lead"><p className="motion-kicker">A visible handoff</p><h2>From a small signal<br />to a settled plan.</h2><p>Every state in BookEase has a purpose. The flow stays explicit for customers, providers, and the people responsible for keeping the platform dependable.</p></motion.div>
          <div className="motion-flow__steps">
            {steps.map((step, index) => { const Icon = step.icon; return <motion.article key={step.number} {...fadeUp} transition={{ duration: 0.65, delay: index * 0.1 }}><span>{step.number}</span><Icon size={24} strokeWidth={1.6} /><h3>{step.title}</h3><p>{step.copy}</p></motion.article>; })}
          </div>
        </div>
      </section>

      <section className="motion-assurance motion-shell">
        <motion.div {...fadeUp} className="motion-assurance__panel">
          <div className="motion-assurance__mark"><ShieldCheck size={30} /></div>
          <p className="motion-kicker">Built for real coordination</p>
          <h2>Designed around<br /><em>the complete loop.</em></h2>
          <p>BookEase retains request creation, provider offers, accepted-booking workflows, availability, favorites, reviews, account controls, contact messages, and administrative management.</p>
          <div className="motion-assurance__signals"><span><BadgeCheck size={15} /> role-aware access</span><span><Stars size={15} /> review workflow</span><span><CalendarDays size={15} /> booking states</span></div>
        </motion.div>
        <motion.div {...fadeUp} className="motion-assurance__image" style={{ backgroundImage: `url(${asset('service-home-care.jpg')})` }}>
          <div><span>Service signal</span><b>Clear from the first request.</b></div>
        </motion.div>
      </section>

      <section className="motion-cta motion-shell">
        <motion.div {...fadeUp} className="motion-cta__card">
          <p className="motion-kicker">Make the next move</p>
          <h2>Put a local need<br />into <em>motion.</em></h2>
          <p>Browse the active board or create an account to start a request, respond to one, and keep the work moving.</p>
          <div><Link to="/services" className="motion-button motion-button--primary">Browse services <ArrowRight size={17} /></Link><Link to="/register" className="motion-button motion-button--quiet">Join BookEase</Link></div>
        </motion.div>
      </section>
    </div>
  );
}
