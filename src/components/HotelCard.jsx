import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/booking';
import StayImage from './StayImage';

export default function HotelCard({ hotel, index = 0, checkIn, checkOut, guests }) {
  const params = new URLSearchParams();
  if (checkIn) params.set('checkIn', checkIn);
  if (checkOut) params.set('checkOut', checkOut);
  if (guests) params.set('guests', guests);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return (
    <motion.article className="hotel-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: Math.min(index % 3, 2) * 0.08, duration: 0.45 }} whileHover={{ y: -6 }}>
      <div className="hotel-card-image-wrap">
        <Link to={`/hotels/${hotel.id}${suffix}`} aria-label={`View ${hotel.name}`}>
          <StayImage className="hotel-card-image" src={hotel.image} alt={`${hotel.name} in ${hotel.city}`} loading={index < 4 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
        </Link>
        <span className="image-label">{hotel.category}</span>
        <button className="heart-button" aria-label={`Save ${hotel.name}`} onClick={(event) => { event.currentTarget.classList.toggle('saved'); }}><Heart size={17} /></button>
      </div>
      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <div><span className="hotel-location">{hotel.city}<span className="location-dot"> · </span>{hotel.location}</span><h3><Link to={`/hotels/${hotel.id}${suffix}`}>{hotel.name}</Link></h3></div>
          <span className="rating"><Star size={13} fill="currentColor" /> {hotel.rating}</span>
        </div>
        <p className="hotel-tagline">{hotel.tagline}</p>
        <div className="hotel-card-bottom"><div><strong>{formatCurrency(hotel.price)}</strong><span> / night</span></div><Link className="circle-arrow" to={`/hotels/${hotel.id}${suffix}`} aria-label={`Explore ${hotel.name}`}><ArrowUpRight size={17} /></Link></div>
      </div>
    </motion.article>
  );
}
