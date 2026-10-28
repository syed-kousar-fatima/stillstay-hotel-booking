import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import BuildingMark from './components/BuildingMark';
import { ArrowUpRight } from 'lucide-react';
import StayImage from './components/StayImage';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function PageRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/booking/:hotelId" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<main className="not-found section-shell"><span className="eyebrow">404 · THIS WAY, PLEASE</span><h1>Somewhere else <em>is calling.</em></h1><a href="/" className="button button-dark">Go to Stillstay</a></main>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function SplashScreen({ onEnter }) {
  const [phase, setPhase] = useState('door');

  useEffect(() => {
    if (phase !== 'door') return undefined;
    const timer = window.setTimeout(() => setPhase('welcome'), 1550);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'brand') return undefined;
    const timer = window.setTimeout(onEnter, 1900);
    return () => window.clearTimeout(timer);
  }, [onEnter, phase]);

  const images = [
    'https://i.pinimg.com/736x/a9/e6/9a/a9e69aeff8b9a4a029f9ff590cd09507.jpg',
    'https://i.pinimg.com/1200x/ee/57/f7/ee57f73d98ce9dfa14943cbb9d4f3172.jpg',
    'https://i.pinimg.com/736x/8a/f7/61/8af76158f10b6366fed0809fa447b534.jpg',
    'https://i.pinimg.com/1200x/15/67/bd/1567bdb748e0efd1a46c63f7d0be60b0.jpg',
    'https://i.pinimg.com/736x/7c/b0/1b/7cb01bca76fa9d274dff823e924c02e8.jpg',
  ];

  return (
    <motion.div className="splash-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}>
      <div className="splash-collage" aria-hidden="true">
        {images.map((image, index) => <motion.div key={image} className={`splash-photo-wrap splash-photo-wrap-${index + 1}`} initial={{ opacity: 0, scale: .92, y: 14 }} animate={{ opacity: phase === 'door' ? 0.18 : 1, scale: 1, y: 0 }} transition={{ delay: .12 * index, duration: .6 }}><StayImage className={`splash-photo splash-photo-${index + 1}`} src={image} alt="" loading="eager" /></motion.div>)}
      </div>
      {phase === 'door' && (
        <div className="splash-doorway" aria-hidden="true">
          <motion.div className="splash-door splash-door-left" initial={{ rotateY: 0 }} animate={{ rotateY: -102 }} transition={{ delay: .28, duration: 1.1, ease: [0.7, 0, 0.2, 1] }} />
          <motion.div className="splash-door splash-door-right" initial={{ rotateY: 0 }} animate={{ rotateY: 102 }} transition={{ delay: .28, duration: 1.1, ease: [0.7, 0, 0.2, 1] }} />
        </div>
      )}
      {phase === 'welcome' && (
        <motion.div className="splash-welcome" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <span className="eyebrow">YOUR NEXT GOOD STORY STARTS HERE</span>
          <h1>A little more <em>somewhere.</em></h1>
          <button className="button button-light splash-enter" onClick={() => setPhase('brand')}>Step inside <ArrowUpRight size={16} /></button>
        </motion.div>
      )}
      {phase === 'brand' && (
        <motion.div className="splash-brand-reveal" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, ease: 'easeOut' }}>
          <span className="splash-mark"><BuildingMark /></span>
          <span className="splash-name">STILLSTAY</span>
          <span className="splash-tagline">STAY A LITTLE LONGER</span>
        </motion.div>
      )}
      <motion.span className="splash-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .25, duration: .8, ease: 'easeInOut' }} />
    </motion.div>
  );
}

function AppShell() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 1.1, smoothWheel: true });
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <PageRoutes />
      <Footer />
      <AnimatePresence>{showSplash && <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />}</AnimatePresence>
    </>
  );
}

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppShell /></BrowserRouter>;
}
