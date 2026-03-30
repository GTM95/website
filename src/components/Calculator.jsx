import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from './FadeInSection';
import { Calculator as CalcIcon, Plus, Minus } from 'lucide-react';

const Calculator = () => {
    const [quantities, setQuantities] = useState({
        videoband: 0,
        smalfilm: 0,
        kassettband: 0
    });

    const prices = {
        videoband: 199,
        smalfilm: 290, // Set an average starting price or minimum for length
        kassettband: 149
    };

    const updateQuantity = (type, delta) => {
        setQuantities(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta)
        }));
    };

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
    // Apply 10% discount if 10 or more items
    const discount = totalItems >= 10 ? 0.9 : 1;
    
    const subtotal = (quantities.videoband * prices.videoband) +
                     (quantities.smalfilm * prices.smalfilm) + // Treating smalfilm as avg 10m * 29kr just for calc example
                     (quantities.kassettband * prices.kassettband);
    
    const total = Math.round(subtotal * discount);

    const ControlRow = ({ title, type, desc }) => (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{title}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{desc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={() => updateQuantity(type, -1)}
                    style={{
                        width: '36px', height: '36px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'white', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                ><Minus size={16} /></button>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, width: '40px', textAlign: 'center' }}>
                    {quantities[type]}
                </span>
                <button
                    onClick={() => updateQuantity(type, 1)}
                    style={{
                        width: '36px', height: '36px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(234, 179, 8, 0.1)',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        color: 'var(--accent-gold)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                ><Plus size={16} /></button>
            </div>
        </div>
    );

    return (
        <section style={{ padding: 'var(--space-md) 0 var(--space-xl) 0', position: 'relative' }}>
            <div className="container">
                <FadeInSection delay={0.2} direction="up">
                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '0' }}>
                        <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <CalcIcon color="var(--accent-gold)" />
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Priskalkylator</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                Få en snabb uppskattning av vad det kostar att digitalisera din samling.
                            </p>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <ControlRow title="Videoband" type="videoband" desc="VHS, Video8, HDV etc (199 kr/st)" />
                            <ControlRow title="Smalfilm" type="smalfilm" desc="Räkneexempel snitt 10 meter (29 kr/m)" />
                            <ControlRow title="Kassettband" type="kassettband" desc="Ljudkassetter (149 kr/st)" />

                            <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                                {totalItems >= 10 && (
                                    <div style={{ color: '#4ade80', fontSize: '0.9rem', marginBottom: '0.5rem', textAlign: 'right' }}>
                                        Mängdrabatt 10% aktiverad!
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Uppskattat totalpris:</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                        {totalItems >= 10 && (
                                            <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                                                {subtotal}
                                            </span>
                                        )}
                                        <span style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, color: 'var(--accent-gold)' }}>
                                            {total}
                                        </span>
                                        <span style={{ color: 'var(--text-secondary)' }}>kr</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <Link to="/boka" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', display: 'block', textDecoration: 'none' }}>
                                    Beställ nu med denna uppskattning
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default Calculator;
