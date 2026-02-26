import React from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import FadeInSection from './FadeInSection';

const Hero = () => {
    return (
        <header style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingTop: '6rem',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                height: '80vw',
                maxWidth: '800px',
                maxHeight: '800px',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(60px)'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <FadeInSection>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'rgba(234, 179, 8, 0.1)',
                            border: '1px solid rgba(234, 179, 8, 0.2)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--accent-gold)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            marginBottom: '2rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}>
                            Framtidssäkra dina minnen
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                        }}>
                            Återupplev <span className="text-gradient">det förflutna</span> <br />
                            i <span className="text-gradient-gold">kristallklar kvalitet</span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            marginBottom: '3rem',
                            maxWidth: '600px',
                            margin: '0 auto 3rem auto',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}>
                            Professionell digitalisering av VHS, Video8, Hi8, MiniDV, HDV och Super8 stumfilm.
                            Spara dina mest värdefulla ögonblick för generationer framöver.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '3rem'
                        }}>
                            <a href="#tjanster" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Utforska tjänster <ArrowRight size={20} />
                            </a>
                            <a href="#processen" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Hur det fungerar <Play size={20} />
                            </a>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={18} color="var(--accent-gold)" />
                                <span>100% Nöjdhetsgaranti</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 size={18} color="var(--accent-gold)" />
                                <span>Säker & Diskret Hantering</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={18} color="var(--accent-gold)" />
                                <span>10 000+ unika band räddade</span>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>

            {/* Decorative floating elements */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '150px',
                background: 'linear-gradient(to top, var(--bg-base), transparent)',
                zIndex: 0
            }} />
        </header>
    );
};

export default Hero;
