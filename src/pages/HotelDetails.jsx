import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AirVent, ArrowLeft, ArrowRight, Bath, BedDouble, Check, Fan, Heart, Lightbulb, MapPin, Refrigerator, ShieldCheck, Star, Tv, Waves, Wifi, CookingPot, Droplets, Users } from 'lucide-react';
import { hotels } from '../data/hotels';
import { calculatePrice, formatCurrency, getCheckoutDate, getDateOffset, getNights } from '../utils/booking';
import StayImage from '../components/StayImage';

const amenityIcons = [
  { match: /pool|swimming/i, icon: Waves },
  { match: /air conditioning/i, icon: AirVent },
  { match: /tv/i, icon: Tv },
  { match: /kitchen/i, icon: CookingPot },
  { match: /wi-fi|wifi/i, icon: Wifi },
  { match: /refrigerator/i, icon: Refrigerator },
  { match: /fan/i, icon: Fan },
  { match: /light/i, icon: Lightbulb },
  { match: /hot water/i, icon: Droplets },
  { match: /bed/i, icon: BedDouble },
  { match: /bath/i, icon: Bath },
];

function getAmenityIcon(amenity) {
  return amenityIcons.find(({ match }) => match.test(amenity))?.icon || Check;
}

export default function HotelDetails() {
  const { hotelId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const hotel = hotels.find((item) => item.id === hotelId);
  const [roomId, setRoomId] = useState('double');
  const [imageIndex, setImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(params.get('checkIn') || '');
  const [nightsSelection, setNightsSelection] = useState(() => {
    const requestedNights = params.get('nights');
    if (requestedNights && Number(requestedNights) > 0) return requestedNights;
    const checkOut = params.get('checkOut');
    const requestedCheckIn = params.get('checkIn');
    return checkOut && requestedCheckIn ? String(getNights(requestedCheckIn, checkOut)) : '';
  });
  const [adultsSelection, setAdultsSelection] = useState(params.get('adults') || params.get('guests') || '');
  const [childrenSelection, setChildrenSelection] = useState(params.get('children') ?? '');
  const [detailsError, setDetailsError] = useState('');
  if (!hotel) return <main className="not-found section-shell"><span className="eyebrow">A WRONG TURN</span><h1>This stay is <em>somewhere else.</em></h1><button className="button button-dark" onClick={() => navigate('/hotels')}>Back to all stays <ArrowLeft size={15} /></button></main>;
  const room = hotel.rooms.find((item) => item.id === roomId) || hotel.rooms[0];
  const activePhoto = hotel.gallery[imageIndex];
  const nights = Number(nightsSelection);
  const checkOut = getCheckoutDate(checkIn, nights);
  const adults = Number(adultsSelection);
  const children = Number(childrenSelection);
  const guests = adults + children;
  const selectionsReady = Boolean(checkIn && nights && adults && childrenSelection !== '');
  const roomFitsGuests = guests <= room.guests;
  const canBook = selectionsReady && roomFitsGuests;
  const price = checkIn && nights ? calculatePrice(room.price, nights) : null;
  const book = () => {
    if (!canBook) {
      setDetailsError(roomFitsGuests ? 'Choose your check-in date, number of nights, adults, and children first.' : `This room sleeps up to ${room.guests} ${room.guests === 1 ? 'guest' : 'guests'}. Choose fewer guests or select a larger room.`);
      return;
    }
    const bookingParams = new URLSearchParams({
      room: room.id,
      checkIn,
      checkOut,
      nights: String(nights),
      adults: String(adults),
      children: String(children),
      guests: String(guests),
    });
    navigate(`/booking/${hotel.id}?${bookingParams.toString()}`);
  };

  return (
    <main className="detail-page section-shell">
      <div className="detail-back-row"><button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={15} /> Back to stays</button><span className="eyebrow">A STILLSTAY ORIGINAL</span><button className="save-detail" onClick={(event) => event.currentTarget.classList.toggle('saved')} aria-label="Save stay"><Heart size={17} /> Save</button></div>
      <div className="detail-heading"><div><span className="eyebrow">{hotel.category} · {hotel.country}</span><h1>{hotel.name}<span>.</span></h1><p><MapPin size={14} /> {hotel.city}, {hotel.location} <span>·</span> <Star size={14} fill="currentColor" /> {hotel.rating} ({hotel.reviewCount} thoughtful reviews)</p></div><p className="detail-tagline">{hotel.tagline}</p></div>
      <div className="detail-gallery">
        <button className="gallery-main" onClick={() => setImageIndex((imageIndex + 1) % hotel.gallery.length)} aria-label="Show next hotel photo"><StayImage src={activePhoto.url} alt={`${hotel.name}: ${activePhoto.title}`} loading="eager" /><span className="gallery-count">{String(imageIndex + 1).padStart(2, '0')} / {String(hotel.gallery.length).padStart(2, '0')} <ArrowRight size={14} /></span></button>
        <div className="gallery-side">{hotel.gallery.slice(1).map((image, index) => <button key={image.id} onClick={() => setImageIndex(index + 1)} aria-label={`Show ${hotel.name} photo ${index + 2}`}><StayImage src={image.url} alt={`${hotel.name}: ${image.title}`} loading="eager" /></button>)}</div>
      </div>
      <div className="detail-content-grid">
        <div className="detail-main-column">
          <section className="detail-intro"><span className="eyebrow">A PLACE TO LAND</span><h2>Make yourself <em>at home.</em></h2><p>{hotel.description}</p><div className="detail-pills"><span><ShieldCheck size={15} /> Thoughtfully vetted</span><span><Wifi size={15} /> A few nice extras</span></div></section>
          <section className="detail-amenities"><div className="subsection-title"><span className="eyebrow">HERE FOR THE DETAILS</span><h2>The little <em>luxuries.</em></h2></div><div className="amenity-grid">{hotel.amenities.map((amenity) => { const Icon = getAmenityIcon(amenity); return <span key={amenity}><Icon size={16} /> {amenity}</span>; })}</div></section>
          <section className="room-selection"><div className="subsection-title"><span className="eyebrow">FIND YOUR ROOM</span><h2>Pick your <em>kind of stay.</em></h2></div>{hotel.rooms.map((item, index) => <button key={item.id} className={roomId === item.id ? 'room-option selected' : 'room-option'} onClick={() => setRoomId(item.id)}><span className="room-radio">{roomId === item.id && <span />}</span><span className="room-number">0{index + 1}</span><span className="room-copy"><strong>{item.name}</strong><small>{item.bed}</small><small>{item.detail}</small><small>Up to {item.guests} {item.guests === 1 ? 'guest' : 'guests'}</small></span><strong className="room-price">{formatCurrency(item.price)}<small> / night</small></strong></button>)}</section>
        </div>
        <aside className="booking-widget">
          <span className="eyebrow">YOUR STAY, YOUR WAY</span>
          <h3>Stay a little <em>longer.</em></h3>
          <div className="booking-selection-fields">
            <label className="booking-select-label">Check-in date<input type="date" min={getDateOffset(0)} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); setDetailsError(''); }} /></label>
            <label className="booking-select-label">Nights<select value={nightsSelection} onChange={(event) => { setNightsSelection(event.target.value); setDetailsError(''); }}><option value="">Select nights</option>{Array.from({ length: 30 }, (_, index) => index + 1).map((count) => <option value={count} key={count}>{count} {count === 1 ? 'night' : 'nights'}</option>)}</select></label>
            <label className="booking-select-label">Adults<select value={adultsSelection} onChange={(event) => { setAdultsSelection(event.target.value); setDetailsError(''); }}><option value="">Select adults</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((count) => <option value={count} key={count}>{count} {count === 1 ? 'adult' : 'adults'}</option>)}</select></label>
            <label className="booking-select-label">Children<select value={childrenSelection} onChange={(event) => { setChildrenSelection(event.target.value); setDetailsError(''); }}><option value="">Select children</option>{Array.from({ length: 7 }, (_, count) => <option value={count} key={count}>{count === 0 ? 'No children' : `${count} ${count === 1 ? 'child' : 'children'}`}</option>)}</select></label>
          </div>
          {nights > 0 && checkIn && <div className="widget-stay-dates"><span>Check out</span><strong>{new Date(`${checkOut}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong><span className="stay-night-count">{nights} {nights === 1 ? 'night' : 'nights'}</span></div>}
          {selectionsReady && <div className="widget-guest-total"><Users size={14} /><span>{adults} {adults === 1 ? 'adult' : 'adults'} · {children} {children === 1 ? 'child' : 'children'}</span></div>}
          {detailsError && <p className="booking-widget-error" role="alert">{detailsError}</p>}
          {price ? <div className="price-breakdown"><p><span>{formatCurrency(room.price)} × {nights} {nights === 1 ? 'night' : 'nights'}</span><strong>{formatCurrency(price.subtotal)}</strong></p><p><span>Taxes & fees</span><strong>{formatCurrency(price.taxes)}</strong></p><p><span>Service fee</span><strong>{formatCurrency(price.serviceFee)}</strong></p><p className="price-total"><span>Total for your stay</span><strong>{formatCurrency(price.total)}</strong></p></div> : <p className="widget-selection-hint">Choose your check-in date and stay length to see the total.</p>}
          {!roomFitsGuests && <p className="room-capacity-note">This room allows up to {room.guests} {room.guests === 1 ? 'guest' : 'guests'}. Choose a larger room for this group.</p>}
          <button className="button button-dark widget-book" onClick={book} disabled={!canBook}>Make it yours <ArrowRight size={16} /></button>
          <small className="widget-caption"><ShieldCheck size={13} /> No payment until you confirm.</small>
        </aside>
      </div>
    </main>
  );
}
