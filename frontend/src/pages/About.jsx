import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Quote, ShieldCheck, Sparkles, Star } from 'lucide-react';
import {
  FaBolt,
  FaCheckCircle,
  FaHandshake,
  FaSearch,
  FaShieldAlt,
  FaStar,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <FaHandshake size={20} />,
    title: 'Trusted Providers',
    desc: 'Work with reliable providers backed by profiles, reviews, and service history.',
  },
  {
    icon: <FaSearch size={20} />,
    title: 'Compare Multiple Bids',
    desc: 'Receive competitive offers and choose the best match for your needs and budget.',
  },
  {
    icon: <FaStar size={20} />,
    title: 'Reviews & Ratings',
    desc: 'Make informed decisions using real feedback from verified customers.',
  },
  {
    icon: <FaBolt size={20} />,
    title: 'Fast & Simple Booking',
    desc: 'Create a request in minutes, confirm a bid, and track status effortlessly.',
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: 'Transparent Experience',
    desc: 'Clear pricing, service details, and booking updates—no hidden surprises.',
  },
  {
    icon: <FaCheckCircle size={20} />,
    title: 'Quality First',
    desc: 'A smoother workflow for both customers and providers from request to completion.',
  },
];

const lifecycle = ['Request', 'Bids', 'Selection', 'Booking', 'Completion', 'Review'];

const testimonials = [
  {
    name: 'Alice Johnson',
    role: 'Bride & Event Client',
    text: 'Excellent job! The provider was professional, friendly, and made the whole booking experience stress-free.',
  },
  {
    name: 'Michael Smith',
    role: 'Home Service Customer',
    text: 'BookEase made it easy to compare offers and find the right provider quickly. I would definitely use it again.',
  },
  {
    name: 'Sophia Lee',
    role: 'Beauty Service Client',
    text: 'I loved how simple and transparent everything was. Great communication, fair pricing, and excellent final results.',
  },
];

const assurances = ['Simple booking flow', 'Bid comparison', 'Ratings & reviews'];

export default function About() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
      };
  const entrance = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <div className="motion-home about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="motion-shell about-hero__grid">
          <motion.div {...entrance(0)}>
            <p className="motion-kicker"><Sparkles size={14} /> Local service marketplace</p>
            <h1>About <em>BookEase</em></h1>
            <p className="motion-lede">
              BookEase is a modern platform that connects customers with trusted local providers.
              Request a service, receive bids, compare options, and book confidently—backed by
              transparent details and user reviews.
            </p>
            <div className="about-hero__assurances">
              {assurances.map((item) => (
                <span key={item}><BadgeCheck size={15} /> {item}</span>
              ))}
            </div>
          </motion.div>
          <motion.div {...entrance(0.12)} className="about-mission">
            <div className="about-mission__card">
              <h2>Our Mission</h2>
              <p>
                To make booking local services simple, transparent, and reliable for everyone—while
                helping providers grow through fair opportunities.
              </p>
              <div className="about-mission__focus">
                <span>What we focus on</span>
                <b>Trust · Speed · Clarity · Great user experience</b>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="motion-shell about-section">
        <motion.div {...fadeUp}>
          <p className="motion-kicker">Why BookEase</p>
          <h2>Why choose <em>BookEase?</em></h2>
          <p className="motion-lede">
            Designed for a smooth end-to-end experience: customers can find the right provider faster,
            and providers can bid on real opportunities that match their skills and availability.
          </p>
        </motion.div>
        <div className="about-feature-grid">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="about-feature"
              {...fadeUp}
              transition={{ duration: 0.65, delay: reduceMotion ? 0 : (index % 3) * 0.08 }}
            >
              <span className="about-feature__icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.article>
          ))}
        </div>
        <motion.div {...fadeUp} className="about-lifecycle">
          <div>
            <span className="about-lifecycle__label"><ShieldCheck size={15} /> Built for your workflow</span>
            <p>BookEase supports the full lifecycle, so it is easier to track progress and maintain trust on both sides.</p>
          </div>
          <div className="about-lifecycle__rail" aria-label="Service lifecycle: request, bids, selection, booking, completion, review">
            {lifecycle.map((step, index) => (
              <span key={step}>
                {index > 0 && <i aria-hidden="true">→</i>}
                <b>{step}</b>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="about-quotes">
        <div className="motion-shell">
          <motion.div {...fadeUp} className="about-quotes__head">
            <p className="motion-kicker">Featured client testimonials</p>
            <h2>Hear from <em>satisfied clients.</em></h2>
            <p className="motion-lede">Discover how our clients have transformed their booking experience and achieved outstanding results with BookEase.</p>
          </motion.div>
          <div className="about-quotes__grid">
            {testimonials.map((item, index) => (
              <motion.figure
                key={item.name}
                className="about-quote"
                {...fadeUp}
                transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <span className="about-quote__stars" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, star) => <Star key={star} size={16} fill="currentColor" strokeWidth={0} />)}
                </span>
                <Quote size={22} className="about-quote__mark" aria-hidden="true" />
                <blockquote>{item.text}</blockquote>
                <figcaption><b>{item.name}</b><span>{item.role}</span></figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="motion-shell about-cta">
        <motion.div {...fadeUp} className="motion-cta__card">
          <p className="motion-kicker">Make the next move</p>
          <h2>Ready to see it <em>in action?</em></h2>
          <p>Contact us today and discover how BookEase can simplify your service booking experience.</p>
          <div>
            <Link to="/contact" className="motion-button motion-button--primary">Contact Us <ArrowRight size={17} /></Link>
            <Link to="/services" className="motion-button motion-button--quiet">Browse services</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
