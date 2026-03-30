import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Package, Download, Loader2, ArrowRight, User, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import { generateInvoicePdf } from '../lib/generateInvoicePdf';

const Dashboard = () => {
    const { user, profile, updateProfile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const [isSaving, setIsSaving] = useState(false);
    const [simulatingPaymentFor, setSimulatingPaymentFor] = useState(null);
    const [saveMessage, setSaveMessage] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        zip: '',
        city: ''
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // In a real app we'd fetch from Supabase. For now, since DB is restoring, we mock or fetch gracefully.
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                
                if (error) {
                    console.error('Error fetching orders (db might be down):', error);
                    // Mock data fallback if DB fails
                    setOrders([{
                        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
                        status: 'påbörjad',
                        items: { videoband: 5, smalfilm: 1 },
                        created_at: new Date().toISOString(),
                        total_amount: 1150
                    }]);
                } else {
                    setOrders(data || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    // Update local form state when profile data is available
    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                phone: profile.phone || '',
                address: profile.address || '',
                zip: profile.zip || '',
                city: profile.city || ''
            });
        }
    }, [profile]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveMessage(null);

        const { error } = await updateProfile(formData);
        
        if (error) {
            setSaveMessage({ type: 'error', text: 'Kunde inte spara profilen. Försök igen.' });
        } else {
            setSaveMessage({ type: 'success', text: 'Profilen har uppdaterats!' });
            setTimeout(() => setSaveMessage(null), 3000);
        }
        setIsSaving(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getStatusInfo = (status) => {
        switch(status) {
            case 'mottagen': return { text: 'Mottagen', color: 'gray', progress: 25 };
            case 'påbörjad': return { text: 'Digitalisering pågår', color: '#eab308', progress: 60 };
            case 'fakturerad': return { text: 'Väntar på betalning', color: '#f472b6', progress: 90 };
            case 'färdig': return { text: 'Klar för nedladdning', color: '#4ade80', progress: 100 };
            case 'returnerad': return { text: 'Band återskickade', color: 'white', progress: 100 };
            default: return { text: 'Väntar på band', color: 'gray', progress: 10 };
        }
    };

    const handleSimulatePayment = async (orderId) => {
        setSimulatingPaymentFor(orderId);
        // Simulate a 2.5 second delay for Swish
        setTimeout(async () => {
            const { error } = await supabase.from('orders').update({ status: 'färdig' }).eq('id', orderId);
            if (!error) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'färdig' } : o));
            }
            setSimulatingPaymentFor(null);
        }, 2500);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <FadeInSection>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <h1>Min Sida</h1>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                Välkommen tillbaka, {profile?.first_name || user?.email}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
                        <button 
                            onClick={() => setActiveTab('orders')}
                            style={{
                                background: 'none', border: 'none', 
                                color: activeTab === 'orders' ? 'var(--accent-gold)' : 'var(--text-secondary)', 
                                fontWeight: activeTab === 'orders' ? 600 : 400,
                                fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 0',
                                borderBottom: activeTab === 'orders' ? '2px solid var(--accent-gold)' : '2px solid transparent',
                                marginBottom: '-0.6rem'
                            }}
                        >
                            <Package size={18} /> Mina Beställningar
                        </button>
                        <button 
                            onClick={() => setActiveTab('profile')}
                            style={{
                                background: 'none', border: 'none', 
                                color: activeTab === 'profile' ? 'var(--accent-gold)' : 'var(--text-secondary)', 
                                fontWeight: activeTab === 'profile' ? 600 : 400,
                                fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 0',
                                borderBottom: activeTab === 'profile' ? '2px solid var(--accent-gold)' : '2px solid transparent',
                                marginBottom: '-0.6rem'
                            }}
                        >
                            <User size={18} /> Min Profil
                        </button>
                    </div>
                    
                    {activeTab === 'orders' ? (
                        <>
                            {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <Loader2 size={32} color="var(--accent-gold)" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <Package size={48} color="var(--glass-border)" style={{ margin: '0 auto 1.5rem auto' }} />
                            <h3 style={{ marginBottom: '1rem' }}>Inga beställningar ännu</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Du har inte skickat in några band för digitalisering än.
                            </p>
                            <a href="/boka" className="btn btn-primary">
                                Gör din första beställning <ArrowRight size={18} />
                            </a>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {orders.map(order => {
                                const status = getStatusInfo(order.status || 'pending');
                                const totalItems = Object.values(order.items || {}).reduce((a, b) => a + b, 0);

                                return (
                                    <div key={order.id} className="glass-card" style={{ padding: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Ordernummer</div>
                                                <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 600 }}>{order.id}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Datum</div>
                                                <div>{new Date(order.created_at).toLocaleDateString('sv-SE')}</div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                <span style={{ color: status.color, fontWeight: 600 }}>{status.text}</span>
                                                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                                                    {order.total_amount ? `${order.total_amount} kr` : 'Ej fastställt'}
                                                </span>
                                            </div>
                                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                                <div style={{ 
                                                    height: '100%', 
                                                    width: `${status.progress}%`, 
                                                    background: status.color,
                                                    transition: 'width 1s ease-in-out',
                                                    boxShadow: `0 0 10px ${status.color}`
                                                }} />
                                            </div>

                                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', padding: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <h5 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '0.9rem' }}>Inskickat material ({totalItems} st)</h5>
                                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                    {order.items?.videoband > 0 && <span>• {order.items.videoband} st videoband</span>}
                                                    {order.items?.smalfilm > 0 && <span>• {order.items.smalfilm} st smalfilm</span>}
                                                    {order.items?.kassettband > 0 && <span>• {order.items.kassettband} st kassettband</span>}
                                                    {(!order.items || totalItems === 0) && <span>Inga objekt specificerade</span>}
                                                </div>
                                                {order.description && (
                                                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                        "{order.description}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {order.status === 'fakturerad' && (
                                            <div style={{ background: 'rgba(244, 114, 182, 0.1)', border: '1px solid rgba(244, 114, 182, 0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                                    <div>
                                                        <h4 style={{ color: '#f472b6', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <AlertCircle size={18} /> Din beställning är klar!
                                                        </h4>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                                                            Vi har nu digitaliserat ditt material. Nedladdningslänken till dina filer låses upp så fort vi mottagit din betalning.
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>Faktura #{order.id?.slice(0, 8).toUpperCase()}</span>
                                                        <span style={{ fontWeight: 600 }}>Att betala: {order.total_amount ? `${order.total_amount} kr` : 'Ej fastställt'}</span>
                                                    </div>
                                                    
                                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                        <button 
                                                            onClick={() => handleSimulatePayment(order.id)}
                                                            disabled={simulatingPaymentFor === order.id}
                                                            className="btn"
                                                            style={{ 
                                                                flex: '1 1 auto',
                                                                background: simulatingPaymentFor === order.id ? '#1e40af' : '#2563eb', 
                                                                color: 'white', 
                                                                border: 'none', 
                                                                padding: '0.85rem', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                alignItems: 'center', 
                                                                gap: '0.5rem',
                                                                borderRadius: 'var(--radius-md)',
                                                                cursor: simulatingPaymentFor === order.id ? 'not-allowed' : 'pointer',
                                                                fontWeight: 600,
                                                                transition: 'all 0.2s'
                                                            }}
                                                        >
                                                            {simulatingPaymentFor === order.id ? (
                                                                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processar betalning...</>
                                                            ) : (
                                                                <>Betala med Swish (Simulering)</>
                                                            )}
                                                        </button>
                                                        <button 
                                                            onClick={() => generateInvoicePdf(order, profile)}
                                                            className="btn"
                                                            style={{ 
                                                                background: 'transparent', 
                                                                color: '#f472b6', 
                                                                border: '1px solid rgba(244, 114, 182, 0.4)', 
                                                                padding: '0.85rem 1.25rem', 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: '0.5rem',
                                                                borderRadius: 'var(--radius-md)',
                                                                fontWeight: 500,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <FileText size={16} /> Ladda ner faktura (PDF)
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {(order.status === 'färdig' || order.status === 'returnerad' || (order.status !== 'fakturerad' && order.download_link)) && (
                                            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div>
                                                    <h4 style={{ color: '#4ade80', margin: '0 0 0.5rem 0' }}>Dina filer är klara!</h4>
                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                                                        Filerna finns tillgängliga i 30 dagar från leveransdatum. Har du frågor? Kontakta oss.
                                                    </p>
                                                </div>
                                                {order.download_link ? (
                                                    <a href={order.download_link} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#4ade80', color: '#000', padding: '0.75rem 1.5rem', fontWeight: 600 }}>
                                                        <Download size={18} style={{ marginRight: '0.5rem' }} /> Ladda ner filer
                                                    </a>
                                                ) : (
                                                    <div style={{ color: '#4ade80', fontSize: '0.9rem', padding: '0.5rem 1rem', border: '1px solid rgba(74,222,128,0.5)', borderRadius: 'var(--radius-full)' }}>
                                                        Länk förbereds...
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                        </>
                    ) : (
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={24} color="var(--accent-gold)" /> Profilinställningar
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Här kan du uppdatera dina leverans- och kontaktuppgifter. Adressen du fyller i här används automatiskt när du gör en ny bokning.
                            </p>

                            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: '200px' }}>
                                        <label htmlFor="first_name" className="form-label">Förnamn</label>
                                        <input 
                                            type="text" 
                                            id="first_name" 
                                            name="first_name" 
                                            value={formData.first_name} 
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: '200px' }}>
                                        <label htmlFor="last_name" className="form-label">Efternamn</label>
                                        <input 
                                            type="text" 
                                            id="last_name" 
                                            name="last_name" 
                                            value={formData.last_name} 
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: '200px' }}>
                                        <label htmlFor="email" className="form-label">E-postadress (Kräver verifiering för att ändras)</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            value={user?.email || ''} 
                                            disabled
                                            className="form-input"
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: '200px' }}>
                                        <label htmlFor="phone" className="form-label">Telefonnummer</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="form-label">Gatuadress</label>
                                    <input 
                                        type="text" 
                                        id="address" 
                                        name="address" 
                                        value={formData.address} 
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 calc(30% - 0.5rem)', minWidth: '120px' }}>
                                        <label htmlFor="zip" className="form-label">Postnummer</label>
                                        <input 
                                            type="text" 
                                            id="zip" 
                                            name="zip" 
                                            value={formData.zip} 
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 calc(70% - 0.5rem)', minWidth: '200px' }}>
                                        <label htmlFor="city" className="form-label">Ort</label>
                                        <input 
                                            type="text" 
                                            id="city" 
                                            name="city" 
                                            value={formData.city} 
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                {saveMessage && (
                                    <div style={{ 
                                        padding: '1rem', 
                                        borderRadius: 'var(--radius-md)', 
                                        background: saveMessage.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                                        border: `1px solid ${saveMessage.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`,
                                        color: saveMessage.type === 'error' ? '#ef4444' : '#4ade80',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}>
                                        {saveMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                                        {saveMessage.text}
                                    </div>
                                )}

                                <div style={{ marginTop: '1rem' }}>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isSaving && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                                        {isSaving ? 'Sparar...' : 'Spara ändringar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </FadeInSection>
            </div>
        </div>
    );
};

export default Dashboard;
