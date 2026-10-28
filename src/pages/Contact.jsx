import { useState } from 'react';
import { ArrowRight, Check, Clock3, Mail, MapPin, Send } from 'lucide-react';
import { Reveal } from '../components/Motion';

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', topic: 'A question about a stay', message: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (!values.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.message.trim().length < 10) {
      setError('Add your name, a valid email, and a little more detail so we can help.');
      return;
    }
    try {
      const savedMessages = JSON.parse(window.localStorage.getItem('stillstay_contact_messages') || '[]');
      window.localStorage.setItem('stillstay_contact_messages', JSON.stringify([
        { ...values, name: values.name.trim(), email: values.email.trim(), message: values.message.trim(), createdAt: new Date().toISOString() },
        ...savedMessages,
      ]));
      setError('');
      setSent(true);
    } catch (saveError) {
      console.error('Unable to save contact message on this device.', saveError);
      setError('We couldn’t save your note on this device. Please check your browser storage and try again.');
    }
  };
  return (
    <main className="contact-page section-shell">
      <section className="contact-heading"><span className="eyebrow">WE’RE GOOD LISTENERS</span><h1>Let’s talk<br /><em>about somewhere.</em></h1><p>Big plans, small questions, or just a hello. We’d love to hear from you.</p></section>
      <div className="contact-layout">
        <Reveal className="contact-form-panel">{sent ? <div className="contact-success"><span><Check size={20} /></span><span className="eyebrow">NOTE SAVED ON THIS DEVICE</span><h2>Thanks for <em>reaching out.</em></h2><p>This frontend demo saves your note in this browser; it doesn’t send email to a team.</p><button className="text-link" onClick={() => { setSent(false); setValues({ name: '', email: '', topic: 'A question about a stay', message: '' }); }}>Send another note <ArrowRight size={15} /></button></div> : <form onSubmit={submit} noValidate><span className="eyebrow">DROP US A NOTE</span><h2>What’s on <em>your mind?</em></h2><label className="input-label">Your name<input value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} placeholder="What should we call you?" /></label><label className="input-label">Email address<input type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} placeholder="you@example.com" /></label><label className="input-label">A little about it<select value={values.topic} onChange={(event) => setValues({ ...values, topic: event.target.value })}><option>A question about a stay</option><option>Help with a booking</option><option>Partner with Stillstay</option><option>Just saying hello</option></select></label><label className="input-label">Your note<textarea rows="4" value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} placeholder="Tell us a little more…" /></label>{error && <span className="input-error" role="alert">{error}</span>}<button className="button button-dark" type="submit">Save your note <Send size={15} /></button></form>}</Reveal>
        <aside className="contact-aside"><div className="contact-aside-image" /><div className="contact-details"><span className="eyebrow">HERE WHEN YOU NEED US</span><a href="mailto:hello@stillstay.com"><Mail size={16} /><span><small>WRITE US A NOTE</small>hello@stillstay.com</span></a><div><Clock3 size={16} /><span><small>OUR LITTLE TEAM IS AROUND</small>Monday — Friday, 9am — 6pm IST</span></div><div><MapPin size={16} /><span><small>WHERE WE’RE BASED</small>Somewhere in India, always exploring</span></div></div></aside>
      </div>
      <div className="contact-footnote"><span>WE READ EVERY NOTE, PROMISE.</span><span>NO BOTS. JUST PEOPLE.</span></div>
    </main>
  );
}
