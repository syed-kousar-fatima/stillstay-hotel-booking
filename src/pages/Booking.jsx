import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { hotels } from '../data/hotels';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BOOKING_STORAGE_KEY, calculatePrice, formatCurrency, getDefaultDates, getNights, validateBookingForm } from '../utils/booking';
import StayImage from '../components/StayImage';

export default function Booking() {
  const { hotelId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useLocalStorage(BOOKING_STORAGE_KEY, []);
  const [values, setValues] = useState({ name: '', email: '', phone: '', requests: '' });
  const [errors, setErrors] = useState({});
  const [storageError, setStorageError] = useState('');
  const hotel = hotels.find((item) => item.id === hotelId);
  if (!hotel) return <main className="not-found section-shell"><h1>We couldn’t find <em>that stay.</em></h1><button className="button button-dark" onClick={() => navigate('/hotels')}>Find another stay <ArrowLeft size={15} /></button></main>;

  const defaults = getDefaultDates();
  const checkIn = params.get('checkIn') || defaults.checkIn;
  const checkOut = params.get('checkOut') || defaults.checkOut;
  const adults = Number(params.get('adults') || params.get('guests') || 2);
  const children = Number(params.get('children') || 0);
  const guests = adults + children;
  const room = hotel.rooms.find((item) => item.id === params.get('room')) || hotel.rooms[0];
  const nights = Number(params.get('nights') || getNights(checkIn, checkOut));
  const price = calculatePrice(room.price, nights);
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const confirm = (event) => {
    event.preventDefault();
    const nextErrors = validateBookingForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const booking = {
      id: `ST-${Date.now().toString(36).toUpperCase()}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      city: hotel.city,
      location: hotel.location,
      roomName: room.name,
      bedName: room.bed,
      checkIn,
      checkOut,
      nights,
      guests,
      adults,
      children,
      total: price.total,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      requests: values.requests.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    try {
      setBookings([booking, ...bookings]);
      navigate('/my-bookings?confirmed=1', { state: { bookingId: booking.id } });
    } catch {
      setStorageError('We couldn’t save your reservation on this device. Please check your browser storage and try again.');
    }
  };

  return (
    <main className="booking-page section-shell">
      <button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={15} /> Back to your stay</button>
      <div className="booking-page-heading"><span className="eyebrow">JUST A FEW DETAILS</span><h1>Make it <em>official.</em></h1><p>We’re almost there. Let’s get your stay just right.</p></div>
      <div className="booking-layout">
        <form className="booking-form" onSubmit={confirm} noValidate>
          <div className="form-section"><span className="form-step">01</span><div className="form-content"><span className="eyebrow">WHO’S CHECKING IN?</span><h2>About <em>you.</em></h2><label className="input-label">Full name<input name="name" value={values.name} onChange={update} placeholder="As it appears on your ID" autoComplete="name" />{errors.name && <span className="input-error">{errors.name}</span>}</label><div className="form-two-col"><label className="input-label">Email address<input name="email" type="email" value={values.email} onChange={update} placeholder="you@example.com" autoComplete="email" />{errors.email && <span className="input-error">{errors.email}</span>}</label><label className="input-label">Phone number<input name="phone" type="tel" value={values.phone} onChange={update} placeholder="+91 00000 00000" autoComplete="tel" />{errors.phone && <span className="input-error">{errors.phone}</span>}</label></div></div></div>
          <div className="form-section"><span className="form-step">02</span><div className="form-content"><span className="eyebrow">A NOTE FOR YOUR HOST</span><h2>Anything <em>else?</em></h2><label className="input-label">Special requests <span className="optional-label">OPTIONAL</span><textarea name="requests" value={values.requests} onChange={update} placeholder="A little something that would make your stay even better…" rows="4" /></label></div></div>
          {storageError && <p className="input-error storage-error" role="alert">{storageError}</p>}
          <button className="button button-dark confirm-button" type="submit">Confirm your stay <ArrowRight size={16} /></button>
          <p className="form-assurance"><ShieldCheck size={15} /> Your details stay private, always.</p>
        </form>
        <aside className="booking-summary"><div className="summary-image"><StayImage src={hotel.image} alt={hotel.name} loading="eager" /><span>YOUR STILLSTAY</span></div><div className="summary-content"><span className="eyebrow">{hotel.city} · {hotel.category}</span><h3>{hotel.name}</h3><p>{room.name} · {room.bed} · {adults} {adults === 1 ? 'adult' : 'adults'} · {children} {children === 1 ? 'child' : 'children'}</p><div className="summary-dates"><span><small>CHECK IN</small><strong>{new Date(`${checkIn}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span><span><small>CHECK OUT</small><strong>{new Date(`${checkOut}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span></div><div className="summary-price"><p><span>{formatCurrency(room.price)} × {nights} nights</span><strong>{formatCurrency(price.subtotal)}</strong></p><p><span>Taxes & fees (12%)</span><strong>{formatCurrency(price.taxes)}</strong></p><p><span>Service fee</span><strong>{formatCurrency(price.serviceFee)}</strong></p><p className="summary-total"><span>Total</span><strong>{formatCurrency(price.total)}</strong></p></div><div className="summary-cancellation"><Check size={14} /><span>Flexible plans? You can manage this booking later.</span></div></div></aside>
      </div>
    </main>
  );
}
