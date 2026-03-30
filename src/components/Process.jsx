import React from 'react';
import { Package, Truck, Zap, Tv } from 'lucide-react';
import FadeInSection from './FadeInSection';

const StepCard = ({ number, title, description, icon: Icon, delay = 0 }) => (
    <FadeInSection delay={delay} direction="left">
        <div style={{
            position: 'relative',
            paddingLeft: '3rem',
            marginBottom: '3rem'
        }}>
            {/* Step number bubble */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05))',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
                fontWeight: 'bold',
                zIndex: 2,
                boxShadow: '0 0 20px rgba(234, 179, 8, 0.1)',
                fontFamily: 'var(--font-heading)'
            }}>
                {number}
            </div>

            <div className="glass-card" style={{
                padding: '2rem',
                position: 'relative'
            }}>
                {/* Background icon watermark */}
                <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '20px',
                    opacity: 0.06,
                    transition: 'opacity 0.4s ease'
                }}>
                    <Icon size={100} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', position: 'relative', zIndex: 1 }}>{description}</p>
            </div>
        </div>
    </FadeInSection>
);

const Process = () => {
    const steps = [
        {
            number: 1,
            title: 'Packa dina minnen',
            description: 'Samla ihop dina gamla videoband och smalfilmer. Packa dem väl i en stadig kartong med lite stötdämpande material.',
            icon: Package
        },
        {
            number: 2,
            title: 'Skicka eller lämna in',
            description: 'Få en fraktsedel av oss och skicka paketet spårbart och försäkrat, eller lämna in personligen till vår studio.',
            icon: Truck
        },
        {
            number: 3,
            title: 'Digitalisering',
            description: 'Vi rengör banden vid behov och digitaliserar dem med professionell utrustning i högsta möjliga kvalitet.',
            icon: Zap
        },
        {
            number: 4,
            title: 'Njut i soffan',
            description: 'Få tillbaka originalbanden tillsammans med en USB-sticka eller nedladdningslänk, redo att spelas upp på din moderna TV.',
            icon: Tv
        }
    ];

    return (
        <section id="processen" style={{
            padding: 'var(--space-xl) 0',
            background: 'linear-gradient(180deg, rgba(25, 25, 30, 0.3) 0%, rgba(10, 10, 14, 0.2) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative vertical gold line */}
            <div style={{
                position: 'absolute',
                left: 'calc(var(--space-sm) + 19px)',
                top: '20%',
                bottom: '20%',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0.1), transparent)',
                zIndex: 1
            }} />

            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Så <span className="text-gradient">fungerar</span> det
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            En trygg och enkel process från din vind till din TV-skärm.
                        </p>
                    </div>
                </FadeInSection>

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    {steps.map((step, i) => (
                        <StepCard key={i} {...step} delay={i * 0.12} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
