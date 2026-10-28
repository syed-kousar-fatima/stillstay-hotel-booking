import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowDownWideNarrow, ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import SearchForm from '../components/SearchForm';
import { hotels } from '../data/hotels';

export default function Hotels() {
  const [params] = useSearchParams();
  const locationQuery = params.get('location') || '';
  const checkIn = params.get('checkIn') || '';
  const checkOut = params.get('checkOut') || '';
  const guests = params.get('guests') || '';
  const [maximumPrice, setMaximumPrice] = useState(25000);
  const [minimumRating, setMinimumRating] = useState(0);
  const [sort, setSort] = useState('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const matches = useMemo(() => {
    const filtered = hotels.filter((hotel) => {
      const locationMatches = !locationQuery || `${hotel.location} ${hotel.city} ${hotel.country}`.toLowerCase().includes(locationQuery.toLowerCase());
      const amenityMatches = amenities.every((amenity) => hotel.amenities.some((item) => item.toLowerCase().includes(amenity.toLowerCase())));
      return locationMatches && hotel.price <= maximumPrice && hotel.rating >= minimumRating && amenityMatches;
    });
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [amenities, locationQuery, maximumPrice, minimumRating, sort]);

  const toggleAmenity = (amenity) => setAmenities((current) => current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity]);
  const filters = (
    <>
      <div className="filter-heading"><span className="eyebrow">Narrow it down</span><button className="filter-clear" onClick={() => { setMaximumPrice(25000); setMinimumRating(0); setAmenities([]); }}>Clear all</button></div>
      <div className="filter-group"><h3>Nightly budget <span>up to ₹{maximumPrice.toLocaleString('en-IN')}</span></h3><input className="range-input" aria-label="Maximum price per night" type="range" min="4000" max="25000" step="500" value={maximumPrice} onChange={(event) => setMaximumPrice(Number(event.target.value))} /><div className="range-labels"><span>₹4,000</span><span>₹25,000+</span></div></div>
      <div className="filter-group"><h3>Guest rating</h3>{[4.8, 4.6, 4.4].map((rating) => <button key={rating} className={minimumRating === rating ? 'rating-choice selected' : 'rating-choice'} onClick={() => setMinimumRating(minimumRating === rating ? 0 : rating)}>{rating}+ <span>★</span></button>)}</div>
      <div className="filter-group"><h3>A little extra</h3>{['Pool', 'Spa', 'Breakfast', 'Wi-Fi'].map((amenity) => <label className="filter-checkbox" key={amenity}><input type="checkbox" checked={amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />{amenity}</label>)}</div>
      <div className="filter-aside-note"><span>THE STILLSTAY EDIT</span><p>Good stays are the ones that feel like they were found just for you.</p><ArrowUpRight size={15} /></div>
    </>
  );

  return (
    <main className="listing-page">
      <section className="listing-top section-shell">
        <span className="eyebrow">A WORLD OF GOOD PLACES</span>
        <div className="listing-title-row"><h1>{locationQuery ? <>Somewhere in <em>{locationQuery}</em>.</> : <>Find your <em>somewhere.</em></>}</h1><p>Thoughtful stays, chosen for the way they make you feel.</p></div>
        <SearchForm compact />
      </section>
      <div className="listing-layout section-shell">
        <aside className="filter-sidebar">{filters}</aside>
        {mobileFiltersOpen && <div className="mobile-filter-backdrop" onClick={() => setMobileFiltersOpen(false)}><div className="mobile-filter-sheet" onClick={(event) => event.stopPropagation()}><button className="sheet-close" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><X /></button>{filters}<button className="button button-dark sheet-apply" onClick={() => setMobileFiltersOpen(false)}>Show {matches.length} stays</button></div></div>}
        <section className="listing-results">
          <div className="results-toolbar"><div><span className="eyebrow">THE COLLECTION</span><p><strong>{matches.length}</strong> thoughtful stays{locationQuery ? ` in ${locationQuery}` : ' across India & beyond'}</p></div><div className="sort-tools"><button className="filter-mobile-button" onClick={() => setMobileFiltersOpen(true)}><SlidersHorizontal size={15} /> Filter</button><label><ArrowDownWideNarrow size={15} /><select aria-label="Sort hotels" value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Guest rating</option></select></label></div></div>
          {matches.length ? <div className="hotel-grid listing-grid">{matches.map((hotel, index) => <HotelCard key={hotel.id} hotel={hotel} index={index} checkIn={checkIn} checkOut={checkOut} guests={guests} />)}</div> : <div className="empty-state"><span className="eyebrow">A LITTLE QUIETER HERE</span><h2>No stays found <em>just yet.</em></h2><p>Try a different destination or give your filters a little more room.</p><Link className="text-link" to="/hotels">Explore all stays <ArrowUpRight size={15} /></Link></div>}
        </section>
      </div>
    </main>
  );
}
