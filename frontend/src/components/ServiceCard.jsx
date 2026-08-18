import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, MapPin, UsersRound } from 'lucide-react';

const visuals = {
  cleaning: 'service-home-care.jpg', haircut: 'service-home-care.jpg', massage: 'service-home-care.jpg', beauty: 'service-home-care.jpg',
  plumbing: 'service-repair.jpg', electrical: 'service-repair.jpg', repair: 'service-repair.jpg', moving: 'service-repair.jpg',
  gardening: 'service-garden.jpg', tutoring: 'service-garden.jpg', photography: 'service-garden.jpg', fitness: 'service-garden.jpg', other: 'neighbourhood-hero.jpg',
};
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function ServiceCard({ service, index = 0 }) {
  const lowestBid = service.bids?.length ? Math.min(...service.bids.map((bid) => bid.price)) : null;
  return (
    <motion.article className="request-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: index * .05 }}>
      <Link to={`/services/${service._id}`} className="request-card__link" aria-label={`Open ${service.title}`}>
        <div className="request-card__visual"><img src={asset(visuals[service.serviceType] || visuals.other)} alt="" loading="lazy" /><span className="request-card__veil" /><span className={`request-card__status request-card__status--${service.status}`}>{service.status.replace('_', ' ')}</span><span className="request-card__type">{service.serviceType}</span></div>
        <div className="request-card__body">
          <div className="request-card__topline"><span>{service.customer?.name || 'Neighbour request'}</span><ArrowUpRight size={16} /></div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="request-card__meta"><span><MapPin size={14} /> {service.location}</span><span><CalendarDays size={14} /> {formatDate(service.preferredDate)} · {service.preferredTime}</span></div>
          <div className="request-card__footer"><span>{service.bids?.length ? <><UsersRound size={14} /> {service.bids.length} response{service.bids.length === 1 ? '' : 's'}</> : 'Awaiting responses'}</span><b>{lowestBid ? `from $${lowestBid}` : `$${service.budget?.min || 0}–${service.budget?.max || 0}`}</b></div>
        </div>
      </Link>
    </motion.article>
  );
}
