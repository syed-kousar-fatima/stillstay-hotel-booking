import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, CircleHelp, MapPin, X } from 'lucide-react';
import { hotels } from '../data/hotels';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BOOKING_STORAGE_KEY, formatCurrency } from '../utils/booking';
import StayImage from '../components/StayImage';

export default function MyBookings() {
  const [bookings, setBookings] = useLocalStorage(BOOKING_STORAGE_KEY, []);
  const [cancelId, setCancelId] = useState(null);
  const [storageError, setStorageError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const justConfirmed = new URLSearchParams(location.search).get('confirmed') === '1';

  const cancelBooking = () => {
    try {
      setBookings((current) => current.map((booking) => booking.id === cancelId ? { ...booking, status: 'Cancelled' } : booking));
      setCancelId(null);
    } catch {
      setStorageError('We couldn’t update this booking on your device. Please check your browser storage and try again.');
    }
  };

  return (
    <main className="my-bookings-page section-shell">
      {justConfirmed && <div className="confirmation-banner"><span><Check size={18} /></span><div><strong>It’s happening. You’re booked.</strong><p>Your next good story is just around the corner.</p></div><button onClick={() => navigate('/my-bookings', { replace: true })} aria-label="Dismiss confirmation"><X size={17} /></button></div>}
      <div className="bookings-page-heading"><div><span className="eyebrow">YOUR NEXT GOOD STORY</span><h1>Your <em>stays.</em></h1></div><button className="button button-outline" onClick={() => navigate('/hotels')}>Find another stay <ArrowRight size={15} /></button></div>
      {storageError && <p className="input-error" role="alert">{storageError}</p>}
      {bookings.length ? <div className="booking-list">{bookings.map((booking) => {
        const hotel = hotels.find((item) => item.id === booking.hotelId);
        const image = booking.hotelImage || hotel?.image;
        const adults = booking.adults ?? booking.guests;
        const children = booking.children ?? 0;
        return <article className={`booking-card ${booking.status === 'Cancelled' ? 'booking-cancelled' : ''}`} key={booking.id}><div className="booking-card-image"><StayImage src={image} alt={booking.hotelName} loading="lazy" /><span>{booking.status === 'Cancelled' ? 'CANCELLED' : 'YOUR STAY'}</span></div><div className="booking-card-info"><div className="booking-card-top"><div><span className="eyebrow">{booking.city} · {booking.location}</span><h2>{booking.hotelName}</h2></div><span className={booking.status === 'Cancelled' ? 'booking-status cancelled' : 'booking-status'}><span />{booking.status}</span></div><p className="booking-room-name">{booking.roomName}{booking.bedName ? ` · ${booking.bedName}` : ''}</p><div className="booking-meta"><span><CalendarDays size={15} />{new Date(`${booking.checkIn}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — {new Date(`${booking.checkOut}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span><span><MapPin size={15} />{booking.nights} {booking.nights === 1 ? 'night' : 'nights'} · {adults} {adults === 1 ? 'adult' : 'adults'} · {children} {children === 1 ? 'child' : 'children'}</span></div><div className="booking-card-footer"><span>Reservation <strong>{booking.id}</strong></span><strong className="booking-total">{formatCurrency(booking.total)}</strong></div></div>{booking.status !== 'Cancelled' && <button className="cancel-booking" onClick={() => setCancelId(booking.id)}>Cancel reservation</button>}</article>;
      })}</div> : <div className="empty-bookings"><div className="empty-bookings-mark">s.</div><span className="eyebrow">A LITTLE ROOM FOR SOMETHING GOOD</span><h2>Nothing on the <em>calendar.</em></h2><p>Your next favorite place is out there somewhere. Let’s go find it.</p><button className="button button-dark" onClick={() => navigate('/hotels')}>Explore the collection <ArrowRight size={15} /></button></div>}
      {cancelId && <div className="modal-backdrop" role="presentation" onClick={() => setCancelId(null)}><div className="cancel-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-title" onClick={(event) => event.stopPropagation()}><span className="modal-icon"><CircleHelp size={22} /></span><span className="eyebrow">PLANS CHANGE</span><h2 id="cancel-title">Are you sure you’d like to cancel?</h2><p>Your reservation will be marked as cancelled. We hope we can help you find another stay soon.</p><div className="modal-actions"><button className="button button-outline" onClick={() => setCancelId(null)}>Keep my stay</button><button className="button button-dark" onClick={cancelBooking}>Cancel reservation <X size={15} /></button></div></div></div>}
    </main>
  );
}
