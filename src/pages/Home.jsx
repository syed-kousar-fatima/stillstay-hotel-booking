import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Compass, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import StayImage from '../components/StayImage';
import HotelCard from '../components/HotelCard';
import { Reveal } from '../components/Motion';
import DestinationsSection from '../sections/DestinationsSection';
import { popularHotels } from '../data/hotels';

const reasons = [
  { icon: <Compass size={19} />, title: 'Places with a point of view', text: 'Every stay is chosen for its character, its people, and the way it makes you feel.' },
  { icon: <Heart size={19} />, title: 'Considered, not crowded', text: 'A thoughtfully edited collection. No endless scrolling required.' },
  { icon: <Sparkles size={19} />, title: 'The little things, handled', text: 'From the first search to the final checkout, we make the details feel easy.' },
];

const storyMoments = [
  {
    overline: '01 — THE ART OF ARRIVING',
    title: <>Somewhere that<br /><em>slows you down.</em></>,
    copy: 'A sunlit room, a quiet courtyard, and nowhere else you need to be.',
    image: 'https://i.pinimg.com/736x/6e/ef/5e/6eef5e81bbaf716b3bb97890f6240530.jpg',
    alt: 'Warm, thoughtfully designed hotel interior',
  },
  {
    overline: '02 — A CHANGE OF SCENERY',
    title: <>A window onto<br /><em>another world.</em></>,
    copy: 'Wake up to the view you came for. Let the day find its own pace.',
    image: 'https://i.pinimg.com/1200x/dd/67/89/dd6789fd9ab79b1c41fec5df3b8640d1.jpg',
    alt: 'Quiet poolside hotel surrounded by greenery',
  },
  {
    overline: '03 — ROOM TO WANDER',
    title: <>Stay for the<br /><em>feeling of it.</em></>,
    copy: 'A good place becomes part of the trip. Sometimes, it is the whole reason.',
    image: 'https://i.pinimg.com/1200x/80/ce/ea/80ceeaba2b23d6ee4b329ccf1fedd6f2.jpg',
    alt: 'Inviting hotel suite with a balcony',
  },
];

function PinnedStoryMoment({ moment, index, progress }) {
  const opacityRange = index === 0
    ? [[0, 0.28, 0.34, 1], [1, 1, 0, 0]]
    : index === 1
      ? [[0, 0.28, 0.34, 0.62, 0.68], [0, 0, 1, 1, 0]]
      : [[0, 0.62, 0.68, 1], [0, 0, 1, 1]];
  const yRange = index === 0
    ? [[0, 0.28, 0.34, 1], [0, 0, -55, -55]]
    : index === 1
      ? [[0, 0.28, 0.34, 0.62, 0.68, 1], [55, 55, 0, 0, -55, -55]]
      : [[0, 0.62, 0.68, 1], [55, 55, 0, 0]];
  const opacity = useTransform(progress, opacityRange[0], opacityRange[1]);
  const y = useTransform(progress, yRange[0], yRange[1]);

  return (
    <motion.article className={`story-moment story-moment-${index + 1}`} style={{ opacity, y }}>
      <div className="story-moment-image">
        <StayImage src={moment.image} alt={moment.alt} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} />
        <span className="story-moment-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="story-moment-copy">
        <span className="eyebrow story-moment-kicker">{moment.overline}</span>
        <h2>{moment.title}</h2>
        <p>{moment.copy}</p>
        <span className="story-moment-index">STILLSTAY <span>{String(index + 1).padStart(2, '0')}</span></span>
      </div>
    </motion.article>
  );
}

function StorySequence() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className={reduceMotion ? 'story-moments story-moments-static' : 'story-moments'}
      aria-label="The Stillstay feeling"
    >
      <div className="story-moments-stage">
        {storyMoments.map((moment, index) => (
          reduceMotion
            ? <article className={`story-moment story-moment-${index + 1}`} key={moment.overline}>
              <div className="story-moment-image">
                <StayImage src={moment.image} alt={moment.alt} loading="eager" />
                <span className="story-moment-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="story-moment-copy">
                <span className="eyebrow story-moment-kicker">{moment.overline}</span>
                <h2>{moment.title}</h2>
                <p>{moment.copy}</p>
                <span className="story-moment-index">STILLSTAY <span>{String(index + 1).padStart(2, '0')}</span></span>
              </div>
            </article>
            : <PinnedStoryMoment key={moment.overline} moment={moment} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.hero-overline, .hero-title, .hero-description, .hero-search-wrap', {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.13, ease: 'power3.out', delay: 0.2,
      });
    }, heroRef);
    return () => context.revert();
  }, []);

  return (
    <main>
      <StorySequence />
      <section ref={heroRef} className="home-hero">
        <div className="hero-image" />
        <div className="hero-content">
          <span className="eyebrow hero-overline"><span className="eyebrow-line" /> A DIFFERENT WAY TO GET AWAY</span>
          <h1 className="hero-title">Go somewhere<br /><em>that stays</em> with you.</h1>
          <p className="hero-description">Thoughtful places. A slower pace. The kind of stay that becomes part of the story.</p>
          <div className="hero-search-wrap"><SearchForm /></div>
          <span className="hero-footnote"><span>CURATED STAYS · INDIA & BEYOND</span><a href="#discover">SCROLL TO WANDER <ArrowDown size={13} /></a></span>
        </div>
        <div className="hero-side-note">GOOD PLACES MAKE GOOD STORIES <span>— STILLSTAY JOURNAL</span></div>
      </section>

      <section className="stay-words section-shell" aria-label="The Stillstay way">
        {['Slow mornings.', 'Good company.', 'One more night.'].map((word, index) => <motion.span key={word} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .7 }} transition={{ delay: index * .15, duration: .5 }}>{word}</motion.span>)}
      </section>

      <section className="intro-strip section-shell">
        <span className="eyebrow">A NOTE FROM US</span>
        <p>Travel doesn’t have to mean going far.<br />Just <em>somewhere that feels different.</em></p>
        <Link className="text-link" to="/about">Get to know us <ArrowUpRight size={15} /></Link>
      </section>

      <div id="discover"><DestinationsSection /></div>

      <section className="stays-section section-shell">
        <div className="section-heading">
          <div><span className="eyebrow">A few of our favourites</span><h2>Stays worth <em>staying for.</em></h2></div>
          <Link className="text-link" to="/hotels">See every stay <ArrowUpRight size={15} /></Link>
        </div>
        <div className="hotel-grid">
          {popularHotels.slice(0, 4).map((hotel, index) => <HotelCard key={hotel.id} hotel={hotel} index={index} />)}
        </div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-image" role="img" aria-label="A quiet luxury stay beside the water" />
        <div className="manifesto-copy">
          <span className="eyebrow">THE STILLSTAY PROMISE</span>
          <h2>Less itinerary.<br /><em>More feeling.</em></h2>
          <p>We believe the best trips leave a little room for the unexpected. So we find places with soul, people with stories, and small details that make a stay feel like yours.</p>
          <Link className="text-link light-link" to="/about">A little more about us <ArrowUpRight size={15} /></Link>
          <span className="manifesto-index">01 — 03</span>
        </div>
      </section>

      <section className="why-section section-shell">
        <div className="why-intro"><span className="eyebrow">WHY STILLSTAY</span><h2>Travel, with<br /><em>good instincts.</em></h2><p>A more human way to find somewhere wonderful.</p></div>
        <div className="reason-list">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <article className="reason-card"><span className="reason-number">0{index + 1}</span><span className="reason-icon">{reason.icon}</span><div><h3>{reason.title}</h3><p>{reason.text}</p></div><ArrowUpRight size={16} className="reason-arrow" /></article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="steps-section section-shell">
        <div className="section-heading"><div><span className="eyebrow">The easy part</span><h2>From daydream<br />to <em>checked in.</em></h2></div><p>Four small steps between right now and somewhere else.</p></div>
        <div className="steps-grid">
          {[
            ['01', 'Pick your somewhere', 'Tell us where you’re dreaming of. We’ll find a stay with a little soul.'],
            ['02', 'Make it yours', 'Choose your dates, your room, and the people coming along.'],
            ['03', 'Leave the details to us', 'A few details from you and your stay is thoughtfully taken care of.'],
            ['04', 'Go be there', 'Your only job now: enjoy every last minute of it.'],
          ].map(([number, title, copy]) => <Reveal className="step-card" key={number}><span className="step-number">{number}</span><span className="step-rule" /><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>
      <section className="home-cta"><span className="eyebrow">YOUR NEXT GOOD STORY STARTS HERE</span><h2>Ready to find<br /><em>your somewhere?</em></h2><Link className="button button-light" to="/hotels">Explore all stays <ArrowUpRight size={16} /></Link></section>
    </main>
  );
}
