import React, { useRef, useState } from 'react';
import { Video, Film as FilmIcon, Disc } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ServiceCard = ({ icon: Icon, title, description, formats, delay = 0 }) => {
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
        <FadeInSection delay={delay} direction="up">
            <div
                ref={cardRef}
                className="glass-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}
            >
                {/* Spotlight glow effect that follows the mouse */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'var(--radius-md)',
                    background: spotlight.active
                        ? `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(234, 179, 8, 0.06), transparent 60%)`
                        : 'none',
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                    zIndex: 0
                }} />

                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(234, 179, 8, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(234, 179, 8, 0.2)',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Icon size={28} color="var(--accent-gold)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{title}</h3>
                <p style={{ flex: 1, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>{description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                    {formats.map((format, i) => (
                        <span key={i} style={{
                            fontSize: '0.8rem',
                            padding: '0.3rem 0.75rem',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.3s ease'
                        }}>
                            {format}
                        </span>
                    ))}
                </div>
            </div>
        </FadeInSection>
    );
};

const Services = () => {
    const services = [
        {
            icon: Video,
            title: 'Videoband',
            description: 'Har du gamla videoband på vinden? Vi räddar dina band innan de avmagnetiseras och digitaliserar dem med högsta kvalitet.',
            formats: ['VHS', 'VHS-C', 'Video8', 'Hi8', 'MiniDV', 'HDV']
        },
        {
            icon: FilmIcon,
            title: 'Smalfilm (utan ljud)',
            description: 'Omsorgsfull bild-för-bild-skanning av din smalfilm. Vi plockar fram detaljer och färger som legat dolda i decennier.',
            formats: ['Super8']
        },
        {
            icon: Disc,
            title: 'Kassettband',
            description: 'Dammiga kassettband med musik, inspelade röster eller gamla radioprogram? Vi överför dem till moderna ljudfiler.',
            formats: ['Ljudkassett', 'Kassettband']
        }
    ];

    return (
        <section id="tjanster" style={{ padding: 'var(--space-xl) 0', position: 'relative' }}>
            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Vad vi kan <span className="text-gradient">digitalisera</span>
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Vi har utrustningen och expertisen för att ta hand om nästan alla
                            populära format för hemma-video från de senaste 50 åren.
                        </p>
                    </div>
                </FadeInSection>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} delay={index * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
