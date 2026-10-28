import { ArrowDownRight, ArrowUpRight, BadgeCheck, ConciergeBell, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Motion';

const services = [
  { number: '01', icon: <Compass size={20} />, title: 'The right place, found.', body: 'A collection that feels like someone who knows you did the looking. Independent stays, distinctive rooms, and a real sense of place.', points: ['Personal, considered curation', 'Thoughtful stays in 33 destinations', 'The details that make a place feel right'], style: 'service-sage' },
  { number: '02', icon: <ConciergeBell size={20} />, title: 'A stay, made easy.', body: 'From choosing your room to arriving at the right moment, we make the journey from here to there feel a little more effortless.', points: ['Straightforward booking', 'Flexible room choices', 'Your plans, all in one place'], style: 'service-umber' },
  { number: '03', icon: <HeartHandshake size={20} />, title: 'People who know the place.', body: 'We believe the best recommendations come from the people who live there. Every stay gives you a closer connection to your destination.', points: ['Local hosts with local knowledge', 'Experiences rooted in place', 'Support when you need it'], style: 'service-olive' },
];

export default function Services() {
  return (
    <main className="services-page">
      <section className="services-hero section-shell"><span className="eyebrow">A FEW THINGS WE DO WELL</span><h1>Consider this<br /><em>your invitation.</em></h1><p>Less time finding somewhere to stay. More time thinking about what it’ll feel like to be there.</p><a className="text-link" href="#services-list">See what we mean <ArrowDownRight size={15} /></a><span className="services-hero-stamp"><Sparkles size={17} /> THOUGHTFUL<br />BY NATURE</span></section>
      <section className="services-list section-shell" id="services-list">{services.map((service, index) => <Reveal key={service.number}><article className={`service-row ${service.style}`}><span className="service-row-number">{service.number}</span><div className="service-row-icon">{service.icon}</div><div className="service-row-copy"><span className="eyebrow">A LITTLE MORE CARE</span><h2>{service.title}</h2><p>{service.body}</p></div><ul>{service.points.map((point) => <li key={point}><BadgeCheck size={15} />{point}</li>)}</ul><ArrowUpRight className="service-row-arrow" size={18} /></article></Reveal>)}</section>
      <section className="services-outro"><span className="eyebrow">NOT A PACKAGE. A BETTER WAY TO GET THERE.</span><h2>Little things.<br /><em>Big difference.</em></h2><p>That’s the Stillstay way. Considered from the first click to the last slow morning.</p><Link className="button button-light" to="/hotels">Find a stay <ArrowUpRight size={16} /></Link></section>
    </main>
  );
}
