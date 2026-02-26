import React from 'react';
import { Video, Film as FilmIcon, Disc, HardDrive } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ServiceCard = ({ icon: Icon, title, description, formats }) => (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(234, 179, 8, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            border: '1px solid rgba(234, 179, 8, 0.2)'
        }}>
            <Icon size={28} color="var(--accent-gold)" />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ flex: 1, marginBottom: '1.5rem' }}>{description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {formats.map((format, i) => (
                <span key={i} style={{
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-secondary)'
                }}>
                    {format}
                </span>
            ))}
        </div>
    </div>
);

const Services = () => {
    const services = [
        {
            icon: Video,
            title: 'Videoband',
            description: 'Har du gamla videoband på vinden? Vi räddar dina band innan de avmagnetiseras och digitaliserar dem med högsta kvalitet.',
            formats: ['VHS', 'Video8', 'Hi8', 'MiniDV', 'HDV']
        },
        {
            icon: FilmIcon,
            title: 'Smalfilm (Stumfilm)',
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
            <FadeInSection>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Vad vi kan <span className="text-gradient">digitalisera</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Vi har utrustningen och expertisen för att ta hand om nästan alla
                            populära format för hemma-video från de senaste 50 åren.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </FadeInSection>
        </section>
    );
};

export default Services;
