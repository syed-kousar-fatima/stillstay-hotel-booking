import { ArrowUpRight, Instagram, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BuildingMark from './BuildingMark';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" to="/"><span className="brand-mark"><BuildingMark /></span><span className="brand-copy"><strong>stillstay</strong><small>STAY A LITTLE LONGER</small></span></Link>
          <p>For the places that make<br />you feel a little more here.</p>
        </div>
        <div className="footer-note"><span className="eyebrow">A better kind of somewhere</span><p>Thoughtful stays, wherever<br />the road takes you.</p></div>
        <div className="footer-links">
          <div><span className="eyebrow">Explore</span><Link to="/hotels">Find a stay</Link><Link to="/services">Our services</Link><Link to="/about">Our story</Link></div>
          <div><span className="eyebrow">Say hello</span><Link to="/contact">Get in touch <ArrowUpRight size={13} /></Link><a href="mailto:hello@stillstay.com">hello@stillstay.com <MoveUpRight size={13} /></a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Instagram size={13} /></a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Stillstay. Made for going places.</span><span>GOOD STAYS. GOOD STORIES.</span></div>
    </footer>
  );
}
