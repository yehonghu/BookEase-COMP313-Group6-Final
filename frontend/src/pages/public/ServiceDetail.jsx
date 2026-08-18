import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Check, Clock3, DollarSign, MapPin, Send, Trash2, UserRound, UsersRound, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { servicesAPI } from '../../api/services.api';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const dateLabel = (date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidForm, setBidForm] = useState({ price: '', message: '', estimatedDuration: 60 });
  const [submitting, setSubmitting] = useState(false);

  const fetchService = async () => {
    try { const res = await servicesAPI.getById(id); setService(res.data.data); }
    catch (error) { toast.error('Service not found'); navigate('/services'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchService(); }, [id]);

  const submitBid = async (event) => {
    event.preventDefault(); setSubmitting(true);
    try { await servicesAPI.submitBid(id, { price: Number(bidForm.price), message: bidForm.message, estimatedDuration: Number(bidForm.estimatedDuration) }); toast.success('Bid submitted successfully.'); fetchService(); setBidForm({ price: '', message: '', estimatedDuration: 60 }); }
    catch (error) { toast.error(error.response?.data?.message || 'Failed to submit bid'); }
    finally { setSubmitting(false); }
  };
  const acceptBid = async (bidId) => {
    try { const res = await servicesAPI.selectBid(id, bidId); setService(res.data.data); toast.success('Bid accepted and booking created.'); }
    catch (error) { toast.error(error.response?.data?.message || 'Failed to select bid'); }
  };
  const deleteRequest = async () => {
    if (!window.confirm('Delete this service request? This cannot be undone.')) return;
    try { await servicesAPI.delete(id); toast.success('Service request deleted.'); navigate('/customer/dashboard'); }
    catch (error) { toast.error(error.response?.data?.message || 'Failed to delete service request'); }
  };
  const cancelRequest = async () => {
    if (!window.confirm('Cancel this service request?')) return;
    try { await servicesAPI.update(id, { status: 'cancelled' }); toast.success('Service request cancelled.'); fetchService(); }
    catch (error) { toast.error(error.response?.data?.message || 'Failed to cancel service request'); }
  };

  if (loading) return <Loading />;
  if (!service) return null;
  const isOwner = user && (String(service.customer?._id) === String(user._id) || String(service.customer?._id) === String(user.id));
  const isProvider = user?.role === 'provider';
  const hasMyBid = service.bids?.some((bid) => bid.provider?._id === user?.id || bid.provider?._id === user?._id);

  return (
    <div className="request-detail-shell">
      <div className="request-detail">
        <button type="button" className="request-detail__back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to requests</button>
        <motion.section className="request-detail__hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="request-detail__eyebrow"><span className={`request-card__status request-card__status--${service.status}`}>{service.status.replace('_', ' ')}</span><span>{service.serviceType}</span></div>
          <h1>{service.title}</h1><p>{service.description}</p>
          <div className="request-detail__facts"><span><MapPin size={16} /> {service.location}</span><span><CalendarDays size={16} /> {dateLabel(service.preferredDate)} · {service.preferredTime}</span><span><DollarSign size={16} /> ${service.budget?.min || 0}–${service.budget?.max || 0}</span><span><UserRound size={16} /> Posted by {service.customer?.name}</span></div>
          {isOwner && <div className="request-detail__owner-actions">{service.status === 'open' && <button type="button" onClick={deleteRequest}><Trash2 size={15} /> Delete request</button>}{(service.status === 'open' || service.status === 'in_progress') && <button type="button" onClick={cancelRequest}><XCircle size={15} /> Cancel request</button>}</div>}
        </motion.section>

        <div className="request-detail__grid">
          <section className="request-detail__responses">
            <div className="request-detail__section-title"><div><span>Provider responses</span><h2>{service.bids?.length || 0} considered offer{service.bids?.length === 1 ? '' : 's'}</h2></div><UsersRound size={22} /></div>
            {service.bids?.length ? <div className="offer-list">{service.bids.map((bid, index) => <motion.article key={bid._id} className="offer-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }}>
              <div className="offer-card__head"><div className="offer-card__avatar">{bid.provider?.name?.charAt(0)?.toUpperCase() || 'P'}</div><div><b>{bid.provider?.name || 'Provider'}</b><span>{bid.provider?.specialties?.join(', ') || 'Local service provider'}</span></div><div className="offer-card__price"><b>${bid.price}</b><span>{bid.estimatedDuration} min</span></div></div>
              {bid.message && <p>{bid.message}</p>}
              {bid.status && <i className={`offer-card__state offer-card__state--${bid.status}`}>{bid.status}</i>}
              {isOwner && service.status === 'open' && <button type="button" className="motion-button motion-button--primary" onClick={() => acceptBid(bid._id)}><Check size={15} /> Accept this offer</button>}
            </motion.article>)}</div> : <div className="request-detail__empty">No provider response yet. The request remains visible to the right local professionals.</div>}
          </section>

          <aside className="request-detail__side">
            {isProvider && service.status === 'open' && !hasMyBid ? <section className="bid-composer"><span>Provider action</span><h2>Make a considered offer.</h2><p>Share your price, timing, and the context that helps this customer choose.</p><form onSubmit={submitBid}><label>Your price <input type="number" min="1" required value={bidForm.price} onChange={(event) => setBidForm({ ...bidForm, price: event.target.value })} placeholder="0" /></label><label>Estimated duration <input type="number" min="15" value={bidForm.estimatedDuration} onChange={(event) => setBidForm({ ...bidForm, estimatedDuration: event.target.value })} /></label><label>Short note <textarea rows="4" value={bidForm.message} onChange={(event) => setBidForm({ ...bidForm, message: event.target.value })} placeholder="How will you approach this work?" /></label><button type="submit" disabled={submitting} className="motion-button motion-button--primary"><Send size={15} /> {submitting ? 'Submitting…' : 'Submit offer'}</button></form></section> : !user ? <section className="bid-composer"><span>Ready when you are</span><h2>Join the conversation.</h2><p>Sign in to respond to a request or create a service need of your own.</p><Link to="/login" className="motion-button motion-button--primary">Sign in</Link></section> : <section className="bid-composer bid-composer--quiet"><Clock3 size={22} /><h2>Request status is visible.</h2><p>This service is currently {service.status.replace('_', ' ')}. Your account workspace keeps all relevant next steps in one place.</p><Link to={user.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard'} className="motion-text-link">Open workspace <ArrowLeft size={15} style={{ transform: 'rotate(180deg)' }} /></Link></section>}
          </aside>
        </div>
      </div>
    </div>
  );
}
