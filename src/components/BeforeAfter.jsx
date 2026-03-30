import React, { useState, useRef, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfter = () => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Support both touch and mouse events
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPos(percent);
    };

    // The image used is a placeholder demonstrating restoration.
    // In production, this would be a real scan example.
    const imageSrc = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop";

    return (
        <section style={{ padding: 'var(--space-xl) 0', position: 'relative' }}>
            <div className="container">
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Se skillnaden <span className="text-gradient">med egna ögon</span>
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Vår utrustning läser av mer detaljer från dina gamla band och filmer än vad en
                            vanlig konsument-spelare klarade av och restaurerar färger och kontrast.
                        </p>
                    </div>
                </FadeInSection>

                <FadeInSection delay={0.2}>
                    <div
                        ref={containerRef}
                        onMouseMove={handleMove}
                        onTouchMove={handleMove}
                        style={{
                            position: 'relative',
                            maxWidth: '900px',
                            margin: '0 auto',
                            aspectRatio: '16/9',
                            overflow: 'hidden',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'ew-resize',
                            border: '1px solid var(--glass-border)',
                            boxShadow: 'var(--shadow-glass)'
                        }}
                    >
                        {/* "After" Image (Clean, sharp) - Base layer */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url(${imageSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'saturate(1.2) contrast(1.1)'
                        }} />

                        {/* "Before" Image (Blurry, low contrast, sepia) - Clipped by slider */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url(${imageSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'sepia(0.6) blur(2px) contrast(0.7) brightness(0.9)',
                            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                        }}>
                            {/* Noise overlay for "Before" */}
                            <div style={{
                                width: '100%', height: '100%',
                                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`
                            }} />

                            {/* Label */}
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1rem',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                            }}>
                                Före (Original)
                            </div>
                        </div>

                        {/* After Label */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(234, 179, 8, 0.8)',
                            color: '#000',
                            backdropFilter: 'blur(4px)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}>
                            Efter (Restaurerad)
                        </div>

                        {/* Slider Handle */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${sliderPos}%`,
                            width: '4px',
                            background: 'white',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--accent-gold)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                transform: 'translateX(0)'
                            }}>
                                <ArrowLeftRight size={20} />
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default BeforeAfter;
