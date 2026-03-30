import React, { useEffect, useState } from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import FadeInSection from './FadeInSection';

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <header style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingTop: '6rem',
            overflow: 'hidden'
        }}>
            {/* Animated background orb - breathing effect with parallax */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                width: '80vw',
                height: '80vw',
                maxWidth: '800px',
                maxHeight: '800px',
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(234, 179, 8, 0.03) 40%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(60px)',
                animation: 'breathe 8s ease-in-out infinite',
                transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px))`
            }} />

            {/* Secondary orb for depth */}
            <div style={{
                position: 'absolute',
                top: '60%',
                left: '25%',
                width: '40vw',
                height: '40vw',
                maxWidth: '400px',
                maxHeight: '400px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(80px)',
                animation: 'floatSlow 12s ease-in-out infinite',
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
            }} />

            {/* Film grain overlay */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                pointerEvents: 'none',
                zIndex: 0,
                animation: 'grain 8s steps(10) infinite'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <FadeInSection delay={0} direction="scale">
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.25rem',
                            background: 'rgba(234, 179, 8, 0.08)',
                            border: '1px solid rgba(234, 179, 8, 0.2)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--accent-gold)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            marginBottom: '2rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            backdropFilter: 'blur(8px)'
                        }}>
                            ✦ Framtidssäkra dina minnen
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.15}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            textShadow: '0 4px 30px rgba(0,0,0,0.8)'
                        }}>
                            Återupplev <span className="text-gradient">det förflutna</span> <br />
                            i <span className="text-gradient-gold">kristallklar kvalitet</span>
                        </h1>
                    </FadeInSection>

                    <FadeInSection delay={0.3}>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            marginBottom: '3rem',
                            maxWidth: '600px',
                            margin: '0 auto 3rem auto',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}>
                            Professionell digitalisering av VHS, VHS-C, Video8, Hi8, MiniDV, HDV och Super8 stumfilm.
                            Spara dina mest värdefulla ögonblick för generationer framöver.
                        </p>
                    </FadeInSection>

                    <FadeInSection delay={0.45}>
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
                    </FadeInSection>

                    <FadeInSection delay={0.6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 500
                        }}>
                            {[
                                { text: 'Spårbar Frakt via PostNord', icon: '📬' },
                                { text: 'Säker Betalning (Klarna)', icon: '🔒' },
                                { text: '100% Nöjdhetsgaranti', icon: '✨' }
                            ].map((badge, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}>
                                    <span style={{ fontSize: '1.1rem' }}>{badge.icon}</span>
                                    <span>{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '200px',
                background: 'linear-gradient(to top, var(--bg-base), transparent)',
                zIndex: 0
            }} />
        </header>
    );
};

export default Hero;
