import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/hotels';

export default function DestinationsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % destinations.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const place = destinations[active];
  return (
    <section className="destination-section section-shell">
      <div className="section-heading destination-heading">
        <div><span className="eyebrow">A good place to begin</span><h2>Somewhere <em>new.</em></h2></div>
        <p>From a cabin above the clouds to a little place by the sea, find the kind of stay you’ll remember long after the journey home.</p>
      </div>
      <div className="destination-feature" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,14,12,.73), rgba(10,14,12,.02) 85%), url("${place.photo}")` }}>
        <div className="destination-feature-copy">
          <span className="eyebrow">THE STILLSTAY EDIT · {String(active + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}</span>
          <h3>{place.place}<span>.</span></h3>
          <p>{place.kind} · {place.country}</p>
          <Link className="text-link light-link" to={`/hotels?location=${encodeURIComponent(place.place)}`}>Explore {place.place}<ArrowUpRight size={16} /></Link>
        </div>
        <div className="destination-progress" aria-label="Select destination">
          {destinations.slice(0, 10).map((destination, index) => (
            <button key={destination.place} aria-label={`Show ${destination.place}`} className={index === Math.round(active * 9 / (destinations.length - 1)) ? 'progress-dot active' : 'progress-dot'} onClick={() => setActive(Math.round(index * (destinations.length - 1) / 9))} />
          ))}
          <span>+ {destinations.length - 10} places</span>
        </div>
      </div>
      <div className="destination-mini-grid">
        {[1, 2, 3].map((offset) => {
          const item = destinations[(active + offset) % destinations.length];
          return (
            <Link to={`/hotels?location=${encodeURIComponent(item.place)}`} className="destination-mini" key={`${active}-${item.place}`}>
              <span>{item.city}, {item.country}</span><ArrowDownRight size={16} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
