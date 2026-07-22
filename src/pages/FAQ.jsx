import SEO from '../components/SEO.jsx';
import { Link } from "react-router-dom";
import { faqs } from "../data/faqData.js";

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(function (f) {
    return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
  }),
};

export default function FAQ() {
  return (
    <>
      <SEO
        title='Silent H FAQ | Mexican Restaurant & Bar, NYC'
        description='Common questions about Silent H, modern Mexican restaurant and Aitch agave lounge in NYC: hours, reservations, happy hour, menu and parking.'
        url='https://www.silenthnyc.com/faq'
        jsonLd={faqSchema}
      />
      <main className='text-sh-cream px-6 md:px-12 lg:px-20 pt-40 md:pt-52 pb-24 md:pb-32'>
        <div className='mx-auto max-w-3xl'>
          <p className='uppercase tracking-[0.25em] text-xs md:text-sm text-sh-gold mb-4'>Silent H, NYC</p>
          <h1 className='font-display font-bold uppercase leading-[1.05] text-[40px] md:text-[64px] mb-12'>Frequently Asked Questions</h1>
          <div className='space-y-8'>
            {faqs.map(function (f, i) {
              return (
                <div key={i} className='border-t border-white/15 pt-6'>
                  <h2 className='font-display text-xl md:text-2xl mb-3 text-sh-cream'>{f.q}</h2>
                  <p className='text-sh-cream/80 leading-relaxed'>{f.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      
        <div className="mx-auto max-w-3xl mt-16 pt-8 border-t border-white/15">
          <p className="uppercase tracking-[0.25em] text-xs text-sh-gold mb-4">Explore Silent H</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-display uppercase text-sm">
            <Link to="/menu" className="hover:text-sh-gold">Menu</Link>
            <Link to="/happy-hour" className="hover:text-sh-gold">Happy Hour</Link>
            <Link to="/aitch" className="hover:text-sh-gold">Aitch Cocktail Bar</Link>
            <Link to="/events" className="hover:text-sh-gold">Private Events</Link>
            <Link to="/story" className="hover:text-sh-gold">Our Story</Link>
          </div>
        </div>
      </main>
    </>
  );
}
