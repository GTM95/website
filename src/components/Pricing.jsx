import React from 'react';
import { Check } from 'lucide-react';
import FadeInSection from './FadeInSection';

const PricingCard = ({ title, price, features, formatCategory }) => (
    <div className="glass-card" style={{
        position: 'relative',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {formatCategory}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{price}</span>
                <span style={{ color: 'var(--text-secondary)' }}>kr/st</span>
            </div>
        </div>

        <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, padding: 0 }}>
            {features.map((feature, i) => (
                <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    color: 'var(--text-secondary)'
                }}>
                    <Check size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Pricing = () => {
    const plans = [
        {
            title: 'Videoband',
            formatCategory: 'VHS, Video8, Hi8, MiniDV, HDV',
            price: '199',
            features: [
                'Högkvalitativ digitalisering (MP4/AVI)',
                'Rengöring av kassetthölje',
                'Justering av tracking för bästa bild',
                'Volymutjämning',
                'Klippning av dödutrymme i början/slut'
            ]
        },
        {
            title: 'Smalfilm',
            formatCategory: 'Super8 (Stumfilm)',
            price: '29',
            features: [
                'Pris per meter',
                'Bild-för-bild scanning',
                'Flimmerfri uppspelning',
                'Lätt färg- & ljuskorrigering',
                'Damm-borttagning (digital)'
            ]
        },
        {
            title: 'Kassettband',
            formatCategory: 'Ljudband (Musikkassett)',
            price: '149',
            features: [
                'Förlustfri överföring (WAV/MP3)',
                'Brusreducering',
                'Volymnormalisering',
                'Bevarande av hela inspelningen',
                'Uppdelning av sidor (A/B)'
            ]
        }
    ];

    return (
        <section id="priser" style={{ padding: 'var(--space-xl) 0', position: 'relative' }}>
            <FadeInSection>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Enkla & <span className="text-gradient">Tydliga Priser</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Inga dolda avgifter. Mängdrabatt erbjuds vid inlämning av fler än 10 band.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        alignItems: 'center'
                    }}>
                        {plans.map((plan, index) => (
                            <PricingCard key={index} {...plan} />
                        ))}
                    </div>

                    <div className="glass" style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <h3 style={{ fontSize: '1.25rem' }}>Leveransmedia</h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                            Vi levererar de digitala filerna via säker nedladdningslänk <strong>gratis</strong> (giltig i 30 dagar).
                            Önskas filerna på ett fysiskt USB-minne tillkommer 149kr per USB-minne.
                        </p>
                    </div>
                </div>
            </FadeInSection>
        </section>
    );
};

export default Pricing;
