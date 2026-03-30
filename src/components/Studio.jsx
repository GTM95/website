import React from 'react';
import FadeInSection from './FadeInSection';
import { Camera, Heart, Clock } from 'lucide-react';

const Studio = () => {
    return (
        <section id="studion" style={{ padding: 'var(--space-xl) 0', background: 'rgba(15, 15, 20, 0.4)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <FadeInSection direction="left">
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                borderRadius: 'var(--radius-md)',
                                backgroundImage: 'url("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                boxShadow: 'var(--shadow-glass)',
                                filter: 'sepia(0.2) contrast(1.1)'
                            }} />
                            <div className="glass-card" style={{
                                position: 'absolute',
                                bottom: '-2rem',
                                right: '-2rem',
                                padding: '1.5rem',
                                maxWidth: '250px',
                                background: 'rgba(10, 10, 12, 0.8)'
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>15+ år</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Erfarenhet av professionell medierestaurering</div>
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.2} direction="right">
                        <div>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                background: 'rgba(234, 179, 8, 0.1)',
                                borderRadius: 'var(--radius-full)',
                                color: 'var(--accent-gold)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                marginBottom: '1.5rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase'
                            }}>
                                Innanför väggarna
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', marginBottom: '1.5rem' }}>
                                Vår Studio i <span className="text-gradient">Stockholm</span>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
                                Bakom varje digitaliserat band ligger timmar av hantverk. I vår studio använder vi 
                                marknadsledande uppspelningsutrustning (TBC-korrigerade S-VHS-spelare) kopplat 
                                till professionella A/D-omvandlare. 
                                <br/><br/>
                                Vi är inte en automatiserad fabrik – vi är passionerade arkivarier som hanterar 
                                varje familjeband och smalfilm som om det vore vårt eget.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    { icon: Camera, title: 'Proffsutrustning', desc: 'Broadcast-klassade spelare och skannrar' },
                                    { icon: Heart, title: 'Handpåläggning', desc: 'Manuell färg- & ljudkorrigering av varje fil' },
                                    { icon: Clock, title: 'Klimatkontrollerat', desc: 'Ett tryggt valv för dina original under processen' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: 'var(--radius-full)',
                                            background: 'rgba(255,255,255,0.05)', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}>
                                            <item.icon color="var(--accent-gold)" size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default Studio;
