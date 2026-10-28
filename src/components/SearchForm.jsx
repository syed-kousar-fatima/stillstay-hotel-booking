import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { destinations } from '../data/hotels';
import { getDefaultDates } from '../utils/booking';

export default function SearchForm({ compact = false }) {
  const defaults = getDefaultDates();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (!location) return setError('Choose a destination to start exploring.');
    if (!checkIn || !checkOut || checkOut <= checkIn) return setError('Your check-out date should be after check-in.');
    const query = new URLSearchParams({ location, checkIn, checkOut, guests: String(guests) });
    navigate(`/hotels?${query.toString()}`);
    setError('');
  };

  return (
    <form className={`search-panel ${compact ? 'search-panel-compact' : ''}`} onSubmit={submit}>
      <label className="search-field location-field">
        <span className="search-icon"><MapPin size={17} /></span>
        <span className="field-copy"><span>Where to?</span>
          <select aria-label="Choose a destination" value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">All the places</option>
            {destinations.map((destination) => <option key={destination.place} value={destination.place}>{destination.place}, {destination.country}</option>)}
          </select>
        </span>
      </label>
      <label className="search-field">
        <span className="search-icon"><CalendarDays size={17} /></span>
        <span className="field-copy"><span>Check in</span><input aria-label="Check in" type="date" min={getDefaultDates().checkIn} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} required /></span>
      </label>
      <label className="search-field">
        <span className="search-icon"><CalendarDays size={17} /></span>
        <span className="field-copy"><span>Check out</span><input aria-label="Check out" type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} required /></span>
      </label>
      <label className="search-field guest-field">
        <span className="search-icon"><Users size={17} /></span>
        <span className="field-copy"><span>Who’s coming?</span>
          <select aria-label="Number of guests" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </span>
      </label>
      <button className="search-submit" type="submit" aria-label="Search stays"><span>{compact ? 'Find a stay' : 'Find your stay'}</span><ArrowRight size={17} /></button>
      {error && <span className="search-error" role="alert">{error}</span>}
    </form>
  );
}
