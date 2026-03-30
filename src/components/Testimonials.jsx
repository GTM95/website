import React from 'react';
import { Star, Quote } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ReviewCard = ({ name, date, text }) => (
    <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <Quote size={32} color="var(--accent-gold)" style={{ opacity: 0.2, marginBottom: '-10px' }} />
        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
            "{text}"
        </p>
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{date}</div>
        </div>
    </div>
);

const Testimonials = () => {
    const reviews = [
        {
            name: 'Karin Andersson',
            date: 'Oktober 2025',
            text: 'Jag var så nervös över att skicka iväg mina gamla bröllopsband från 90-talet, men resultatet blev över förväntan. Otroligt skönt att kunna se dem på TV:n igen!'
        },
        {
            name: 'Mikael Lindström',
            date: 'September 2025',
            text: 'Supersnabb service och fantastisk kvalitet! De lyckades till och med rädda ett avklippt kassettband med ljudinspelningar från min farfar. Rekommenderas varmt.'
        },
        {
            name: 'Eva-Lena Johansson',
            date: 'Augusti 2025',
            text: 'Hittade en låda med gamla Super 8-filmer på vinden. Fick tillbaka dem prydligt uppmärkta på ett USB-minne. Grät floder när jag såg mina föräldrar som unga.'
        }
    ];

    return (
        <section id="omdomen" style={{ padding: 'var(--space-xl) 0', position: 'relative' }}>
            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '-10%',
                width: '40vw',
                height: '40vw',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1
            }} />

            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Vad våra <span className="text-gradient">kunder säger</span>
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Socialt bevis är viktigt för oss. Här är några av de över 500+ nöjda kunder 
                            som har låtit oss rädda deras värdefulla minnen.
                        </p>
                    </div>
                </FadeInSection>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {reviews.map((review, i) => (
                        <FadeInSection key={i} delay={i * 0.15}>
                            <ReviewCard {...review} />
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
