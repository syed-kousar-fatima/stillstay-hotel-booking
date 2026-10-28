import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BuildingMark from './BuildingMark';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Stays', to: '/hotels' },
  { label: 'Our story', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Stillstay home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><BuildingMark /></span>
          <span className="brand-copy"><strong>stillstay</strong><small>STAY A LITTLE LONGER</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="bookings-link" to="/my-bookings">My bookings <ArrowUpRight size={14} /></Link>
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={15} /></Link>
            ))}
            <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My bookings<ArrowUpRight size={15} /></Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
