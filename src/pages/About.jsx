import { ArrowRight, ArrowUpRight, Globe2, HandHeart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Motion';

export default function About() {
  return (
    <main className="story-page">
      <section className="story-hero section-shell">
        <span className="eyebrow">A LITTLE ABOUT US</span>
        <h1>We think a good stay<br />can change <em>everything.</em></h1>
        <p>Not the big, once-in-a-lifetime kind of change. The small kind. The morning light through a new window. A meal you keep thinking about. A place that makes you stay one more night.</p>
        <span className="story-hero-index">THE STILLSTAY STORY — EST. ALWAYS EXPLORING</span>
      </section>
      <div className="story-image image-about" role="img" aria-label="A thoughtfully designed hotel room opening onto a courtyard" />
      <section className="story-manifesto section-shell"><span className="eyebrow">WHY WE’RE HERE</span><h2>More than somewhere<br />to sleep. <em>Somewhere to feel.</em></h2><p>We started Stillstay with a simple thought: finding a place to stay should feel like the beginning of a trip, not a chore. So we seek out independent places with a point of view, generous hosts, and a real connection to where they are. Then we bring them a little closer to you.</p><Link className="text-link" to="/hotels">Find your somewhere <ArrowUpRight size={15} /></Link></section>
      <section className="values-section section-shell"><div className="section-heading"><div><span className="eyebrow">THINGS WE BELIEVE</span><h2>Good travel is<br /><em>good for everyone.</em></h2></div><p>Our compass is simple: travel should feel personal, thoughtful, and a little more connected.</p></div><div className="values-grid">{[
        [<HandHeart size={20} />, 'People before polish', 'The best part of a place is usually the people who make it. We look for warmth, not just thread counts.'],
        [<Globe2 size={20} />, 'A sense of somewhere', 'Every stay should belong to the place it’s in. Local food, lived-in stories, and time to look around.'],
        [<Leaf size={20} />, 'Thoughtful by nature', 'We celebrate places that care for their surroundings and leave something good behind.'],
      ].map(([icon, title, copy], index) => <Reveal className={`value-card value-card-${index + 1}`} key={title}><span className="value-icon">{icon}</span><span className="eyebrow">0{index + 1} — OUR COMPASS</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>
      <section className="about-quote"><span className="eyebrow">A NOTE TO YOUR FUTURE SELF</span><blockquote>“Remember how good it felt to be <em>there.</em>”</blockquote><span>THE VERY BEST KIND OF SOUVENIR</span></section>
      <section className="story-cta section-shell"><div><span className="eyebrow">ENOUGH ABOUT US</span><h2>Let’s find <em>your place.</em></h2></div><Link className="button button-dark" to="/hotels">Explore all stays <ArrowRight size={16} /></Link></section>
    </main>
  );
}
