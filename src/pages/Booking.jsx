import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle2, ChevronRight, Copy, LogIn, UserPlus } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const INITIAL_STATE = {
    items: { videoband: 0, smalfilm: 0, kassettband: 0 },
    customer: { first_name: '', last_name: '', email: '', phone: '', address: '', zip: '', city: '' }
};

const Booking = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [orderId, setOrderId] = useState(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const { user, profile } = useAuth();
    const navigate = useNavigate();

    const prices = { videoband: 199, smalfilm: 290, kassettband: 149 };

    const updateItem = (type, delta) => {
        setFormData(prev => ({
            ...prev,
            items: { ...prev.items, [type]: Math.max(0, prev.items[type] + delta) }
        }));
    };

    const updateCustomer = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            customer: { ...prev.customer, [name]: value }
        }));
    };

    const totalItems = Object.values(formData.items).reduce((a, b) => a + b, 0);
    const subtotal = (formData.items.videoband * prices.videoband) + 
                     (formData.items.smalfilm * prices.smalfilm) + 
                     (formData.items.kassettband * prices.kassettband);
    const total = Math.round(subtotal * (totalItems >= 10 ? 0.9 : 1));

    const handleNext = () => {
        if (step === 1 && totalItems === 0) {
            alert("Du måste välja minst en produkt.");
            return;
        }

        // Check login before proceeding to step 2
        if (step === 1 && !user) {
            setShowLoginPrompt(true);
            return;
        }

        // Pre-fill customer info from profile if available
        if (step === 1 && user) {
            setFormData(prev => ({
                ...prev,
                customer: {
                    ...prev.customer,
                    first_name: profile?.first_name || prev.customer.first_name,
                    last_name: profile?.last_name || prev.customer.last_name,
                    email: user.email || prev.customer.email,
                    phone: profile?.phone || prev.customer.phone,
                    address: profile?.address || prev.customer.address,
                    zip: profile?.zip || prev.customer.zip,
                    city: profile?.city || prev.customer.city
                }
            }));
        }

        setStep(step + 1);
    };

    // Build a human-readable description from selected items
    const buildDescription = () => {
        const parts = [];
        if (formData.items.videoband > 0) parts.push(`${formData.items.videoband}st VHS`);
        if (formData.items.smalfilm > 0) parts.push(`${formData.items.smalfilm}st Smalfilm`);
        if (formData.items.kassettband > 0) parts.push(`${formData.items.kassettband}st Kassettband`);
        return parts.join(', ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptedTerms) {
            setSubmitError('Du måste läsa och godkänna användarvillkoren för att kunna skicka beställningen.');
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const { data, error } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    status: 'mottagen',
                    description: buildDescription(),
                    total_amount: total,
                    items: formData.items,
                    customer: formData.customer
                })
                .select()
                .single();

            if (error) throw error;

            setOrderId(data.id.slice(0, 8).toUpperCase());
            setStep(3);
        } catch (err) {
            console.error('Order submission error:', err);
            setSubmitError('Det gick inte att skicka ordern just nu. Försök igen om en stund.');
        } finally {
            setSubmitting(false);
        }
    };

    const StepIndicator = ({ num, title, icon: Icon }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: step >= num ? 1 : 0.4 }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: step >= num ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${step >= num ? 'var(--accent-gold)' : 'var(--glass-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step >= num ? 'var(--accent-gold)' : 'var(--text-secondary)',
                marginBottom: '0.5rem'
            }}>
                <Icon size={20} />
            </div>
            <span style={{ fontSize: '0.85rem' }}>{title}</span>
        </div>
    );

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <FadeInSection>
                    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Boka Digitalisering</h1>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '1px', background: 'var(--glass-border)', zIndex: -1 }} />
                        <StepIndicator num={1} title="Välj media" icon={Package} />
                        <StepIndicator num={2} title="Leverans" icon={Truck} />
                        <StepIndicator num={3} title="Klart" icon={CheckCircle2} />
                    </div>

                    <div className="glass-card" style={{ padding: '2rem' }}>
                        {step === 1 && (
                            <div>
                                <h3>Vad vill du skicka in?</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Lägg till det ungefärliga antalet band du har. Vi räknar och justerar priset exakt när vi tar emot paketet.
                                </p>
                                <div style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                                    <a href="/#format-guide" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>?</div>
                                        Osäker på vilket format du har? Se vår formatguide.
                                    </a>
                                </div>
                                
                                {Object.entries(prices).map(([key, price]) => (
                                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                                        <div style={{ textTransform: 'capitalize' }}>
                                            <div style={{ fontWeight: 600 }}>{key}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{price} kr/st</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <button type="button" onClick={() => updateItem(key, -1)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>-</button>
                                            <span style={{ width: '30px', textAlign: 'center', fontWeight: 600 }}>{formData.items[key]}</span>
                                            <button type="button" onClick={() => updateItem(key, 1)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>+</button>
                                        </div>
                                    </div>
                                ))}

                                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)' }}>Uppskattat totalpris</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{total} kr</div>
                                    </div>
                                    <button onClick={handleNext} className="btn btn-primary">Nästa <ChevronRight size={20} /></button>
                                </div>

                                {/* Login prompt overlay */}
                                {showLoginPrompt && (
                                    <div style={{
                                        marginTop: '2rem',
                                        padding: '2rem',
                                        background: 'rgba(234, 179, 8, 0.05)',
                                        border: '1px solid rgba(234, 179, 8, 0.25)',
                                        borderRadius: 'var(--radius-md)',
                                        textAlign: 'center'
                                    }}>
                                        <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.15rem' }}>Skapa ett konto för att boka</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                                            För att kunna spåra din order, få statusuppdateringar och ladda ner dina filer behöver du ett kostnadsfritt konto.
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="btn btn-secondary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <LogIn size={18} /> Logga in
                                            </button>
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="btn btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <UserPlus size={18} /> Skapa konto
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit}>
                                <h3>Dina uppgifter</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">Förnamn</label>
                                            <input required type="text" name="first_name" value={formData.customer.first_name} onChange={updateCustomer} className="form-input" placeholder="Ditt förnamn" />
                                        </div>
                                        <div>
                                            <label className="form-label">Efternamn</label>
                                            <input required type="text" name="last_name" value={formData.customer.last_name} onChange={updateCustomer} className="form-input" placeholder="Ditt efternamn" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">E-post</label>
                                            <input required type="email" name="email" value={formData.customer.email} onChange={updateCustomer} className="form-input" placeholder="namn@exempel.se" />
                                        </div>
                                        <div>
                                            <label className="form-label">Telefon</label>
                                            <input required type="tel" name="phone" value={formData.customer.phone} onChange={updateCustomer} className="form-input" placeholder="07X-XXX XX XX" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label">Gatuadress</label>
                                        <input required type="text" name="address" value={formData.customer.address} onChange={updateCustomer} className="form-input" placeholder="Exempelgatan 1" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">Postnummer</label>
                                            <input required type="text" name="zip" value={formData.customer.zip} onChange={updateCustomer} className="form-input" placeholder="123 45" />
                                        </div>
                                        <div>
                                            <label className="form-label">Ort</label>
                                            <input required type="text" name="city" value={formData.customer.city} onChange={updateCustomer} className="form-input" placeholder="Stockholm" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                                    <h4 style={{ margin: '0 0 1rem 0' }}>Order Sammanfattning</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Totala objekt:</span>
                                        <span>{totalItems} st</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontWeight: 700 }}>
                                        <span>Uppskattat pris:</span>
                                        <span style={{ color: 'var(--accent-gold)' }}>{total} kr</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                                        Du betalar ingenting nu. Vi skickar en faktura (Klarna/Swish) när filerna är redo för leverans.
                                    </p>
                                </div>

                                {submitError && (
                                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1rem', borderRadius: '8px', color: '#ffb3b3', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                        {submitError}
                                    </div>
                                )}

                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <input 
                                        type="checkbox" 
                                        id="acceptTerms" 
                                        checked={acceptedTerms} 
                                        onChange={(e) => setAcceptedTerms(e.target.checked)} 
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="acceptTerms" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                        Jag har läst och godkänner <a href="/villkor" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>användarvillkoren</a>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">Tillbaka</button>
                                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting ? 'Skickar...' : 'Skicka Beställning'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <CheckCircle2 size={64} color="#4ade80" style={{ margin: '0 auto 1.5rem auto' }} />
                                <h2>Din order är mottagen!</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                    Vi har skickat en orderbekräftelse till {formData.customer.email}.
                                </p>
                                
                                <div style={{ background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
                                    <h4 style={{ marginTop: 0, color: 'var(--accent-gold)' }}>Nästa steg: Skicka dina band</h4>
                                    <ol style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                        <li>Packa dina {totalItems} band säkert i en kartong med stötdämpande material.</li>
                                        <li>Skriv ditt ordernummer tydligt på en papperslapp och lägg inuti kartongen:
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.4)', padding: '0.5rem 1rem', paddingRight: '0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '1.25rem', color: 'white', marginTop: '0.5rem', marginBottom: '0.5rem', width: 'fit-content' }}>
                                                {orderId} 
                                                <button onClick={() => navigator.clipboard.writeText(orderId)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', display: 'flex' }}><Copy size={18} /></button>
                                            </div>
                                        </li>
                                        <li>Boka frakt spårbart med valfri transportör och skicka paketet till oss. Kopiera uppgifterna nedan och klistra in hos transportören.</li>
                                    </ol>

                                    <div style={{ marginTop: '2rem' }}>
                                        <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>Mottagaradress:</h5>
                                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {[
                                                { label: 'Företag', value: 'Svensk Digitalisering AB' },
                                                { label: 'Gatuadress', value: 'Exempelgatan 1' },
                                                { label: 'Postnummer', value: '114 55' },
                                                { label: 'Ort', value: 'Stockholm' },
                                            ].map(info => (
                                                <div key={info.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{info.label}: <strong style={{color: 'white', marginLeft: '0.5rem'}}>{info.value}</strong></span>
                                                    <button 
                                                        title={`Kopiera ${info.label}`}
                                                        onClick={() => navigator.clipboard.writeText(info.value)} 
                                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', transition: 'all 0.2s' }}
                                                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.borderColor = 'var(--accent-gold)'; }}
                                                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                    >
                                                        <Copy size={14} /> Kopiera
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '2rem' }}>
                                        <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>Snabblänkar för att boka frakt:</h5>
                                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                            <a href="https://portal.postnord.com/skickadirekt/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: '1 1 auto', textAlign: 'center' }}>PostNord</a>
                                            <a href="https://www.dhl.com/se-sv/home/skicka.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: '1 1 auto', textAlign: 'center' }}>DHL</a>
                                            <a href="https://bokaland.dbschenker.com/private/book/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: '1 1 auto', textAlign: 'center' }}>DSV / Schenker</a>
                                            <a href="https://www.bring.se/skicka/paket" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flex: '1 1 auto', textAlign: 'center' }}>Bring</a>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="btn btn-primary"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Gå till Min Sida
                                </button>
                            </div>
                        )}
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default Booking;
