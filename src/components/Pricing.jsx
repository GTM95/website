import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import FadeInSection from './FadeInSection';

const PricingCard = ({ title, price, features, formatCategory, delay = 0, highlighted = false }) => {
    const cardRef = useRef(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setSpotlight({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true
        });
    };

    const handleMouseLeave = () => {
        setSpotlight(prev => ({ ...prev, active: false }));
    };

    return (
        <FadeInSection delay={delay} direction="scale">
            <div
                ref={cardRef}
                className="glass-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: highlighted ? '1px solid rgba(234, 179, 8, 0.2)' : '1px solid var(--glass-border)'
                }}
            >
                {/* Spotlight glow */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'var(--radius-md)',
                    background: spotlight.active
                        ? `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(234, 179, 8, 0.05), transparent 60%)`
                        : 'none',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                {highlighted && (
                    <div style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '20%',
                        right: '20%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                        borderRadius: '2px'
                    }} />
                )}

                <div style={{ marginBottom: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {formatCategory}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25rem' }}>
                        <span style={{
                            fontSize: '3rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-heading)',
                            background: highlighted
                                ? 'linear-gradient(135deg, var(--accent-gold) 0%, #facc15 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #a0a0ab 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>{price}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>kr/st</span>
                    </div>
                </div>

                <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, padding: 0, position: 'relative', zIndex: 1 }}>
                    {features.map((feature, i) => (
                        <li key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            marginBottom: '1rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(234, 179, 8, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px'
                            }}>
                                <Check size={14} color="var(--accent-gold)" />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </FadeInSection>
    );
};

const Pricing = () => {
    const plans = [
        {
            title: 'Videoband',
            formatCategory: 'VHS, VHS-C, Video8, Hi8, MiniDV, HDV',
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
            formatCategory: 'Super8 (utan ljud)',
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
            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Enkla & <span className="text-gradient">Tydliga Priser</span>
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Inga dolda avgifter. Mängdrabatt erbjuds vid inlämning av fler än 10 band.
                        </p>
                    </div>
                </FadeInSection>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    alignItems: 'start'
                }}>
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} delay={index * 0.12} />
                    ))}
                </div>

                <FadeInSection delay={0.4}>
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
                </FadeInSection>
            </div>
        </section>
    );
};

export default Pricing;
