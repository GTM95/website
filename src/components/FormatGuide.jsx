import React from 'react';
import { CheckCircle2, XCircle, FileVideo, Video, Film, Camera, MonitorPlay, Speaker } from 'lucide-react';
import FadeInSection from './FadeInSection';

const FormatGuide = () => {
    const supportedFormats = [
        {
            name: 'VHS',
            dimensions: '188 x 104 mm',
            icon: Video,
            description: 'Det vanligaste formatet för hyrfilmer och heminspelningar under 80- och 90-talet.',
            features: ['Innehåller 1/2-tums magnetband', 'Spelar ofta upp till 180 eller 240 minuter']
        },
        {
            name: 'VHS-C',
            dimensions: '92 x 58 mm',
            icon: Camera,
            description: 'Kompakt version av VHS för videokameror. Lästes ofta via en adapter i en vanlig VHS-spelare.',
            features: ['Samma 1/2-tums bandbredd som VHS', 'Speltid vanligtvis 30-45 minuter']
        },
        {
            name: 'MiniDV / HDV',
            dimensions: '66 x 48 mm',
            icon: MonitorPlay,
            description: 'Tidigt digitalt bandformat för högkvalitativa videokameror (sent 90-tal till 00-tal).',
            features: ['Väldigt små, kompakta kassetter', 'Digital inspelning, ger väldigt skarp bild']
        },
        {
            name: 'Hi8 / Video8',
            dimensions: '95 x 62 mm',
            icon: FileVideo,
            description: 'Ett kompakt videokassettformat från Sony som blev mycket populärt för familjekameror.',
            features: ['Mycket lik vanliga kassettband i storlek', 'Använder 8mm brett magnetband']
        },
        {
            name: 'Kassettband (Audio)',
            dimensions: '100 x 64 mm',
            icon: Speaker,
            description: 'De klassiska ljudkassetterna för musik och röstinspelningar från bandspelare.',
            features: ['Endast för ljud (ej video)', 'Två sidor (A och B) som vändes för uppspelning']
        },
        {
            name: 'Smalfilm (Super 8 / 8mm)',
            dimensions: 'Rullstorlek varierar',
            icon: Film,
            description: 'Äkta filmrullar utan magnetband. Måste skannas bild-för-bild med speciell utrustning.',
            features: ['Transparent plastfilm med perforeringshål', 'Kommer ofta i små gula eller svarta runda plastaskar']
        }
    ];

    const unsupportedFormats = [
        'Betamax (BETA)',
        'Diabilder & Negativ',
        'Rullband (Audio)',
        'Microkassetter (Diktafon)',
        'U-matic & Professionella broadcast-format'
    ];

    return (
        <section id="format-guide" style={{ padding: '6rem 0', background: 'var(--bg-default)' }}>
            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="badge" style={{ marginBottom: '1rem' }}>Formatguide</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Vilka band <span className="text-gradient">löser vi?</span></h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
                            Är du osäker på vad som gömmer sig i kartongerna på vinden? Jämför dina kassetter med guiden nedan.
                        </p>
                    </div>
                </FadeInSection>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {supportedFormats.map((format, index) => {
                        const Icon = format.icon;
                        return (
                            <FadeInSection key={format.name} delay={index * 0.1}>
                                <div className="glass-card" style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05, transform: 'rotate(-15deg)' }}>
                                        <Icon size={120} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{format.name}</h3>
                                        <CheckCircle2 color="#4ade80" size={24} />
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                                        Storlek: {format.dimensions}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1, position: 'relative', zIndex: 1 }}>
                                        {format.description}
                                    </p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', position: 'relative', zIndex: 1 }}>
                                        {format.features.map((feature, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)', marginTop: '8px' }} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>

                <FadeInSection delay={0.4}>
                    <div style={{ 
                        background: 'rgba(239, 68, 68, 0.05)', 
                        border: '1px solid rgba(239, 68, 68, 0.2)', 
                        borderRadius: 'var(--radius-lg)', 
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <XCircle color="#ef4444" size={24} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Format vi för närvarande inte kan hjälpa till med</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
                            Vi har valt att specialisera oss på att rädda magnetiska hemmavideoformat. Om du har mycket material i dessa nedanstående format rekommenderar vi att du kontaktar en studio med anpassad broadcast-utrustning.
                        </p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                            {unsupportedFormats.map(format => (
                                <span key={format} style={{ 
                                    background: 'rgba(0,0,0,0.3)', 
                                    border: '1px solid rgba(255,255,255,0.05)', 
                                    padding: '0.5rem 1rem', 
                                    borderRadius: '100px',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <XCircle size={14} color="#ef4444" opacity={0.7} /> {format}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default FormatGuide;
