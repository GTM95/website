import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Package, Save } from 'lucide-react';

const Dashboard = () => {
    const { user, profile, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Profile form state
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [phone, setPhone] = useState(profile?.phone || '');
    const [address, setAddress] = useState(profile?.address || '');
    const [savingProfile, setSavingProfile] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (profile?.full_name) setFullName(profile.full_name);
        if (profile?.phone) setPhone(profile.phone);
        if (profile?.address) setAddress(profile.address);
    }, [profile]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoadingOrders(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setMessage('');

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    phone: phone,
                    address: address
                })
                .eq('id', user.id);

            if (error) throw error;
            setMessage('Profil uppdaterad!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Ett fel uppstod: ' + error.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const translateStatus = (status) => {
        switch (status) {
            case 'mottagen': return 'Mottagen';
            case 'påbörjad': return 'Påbörjad';
            case 'färdig': return 'Färdig';
            case 'returnerad': return 'Returnerad';
            default: return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'mottagen': return '#3b82f6'; // Blue
            case 'påbörjad': return '#eab308'; // Amber
            case 'färdig': return '#22c55e'; // Green
            case 'returnerad': return '#a0a0ab'; // Gray
            default: return '#ffffff';
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Min Sida</h1>
                <button onClick={logout} className="btn btn-secondary">Logga ut</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Profile Card */}
                <div className="glass-card" style={{ height: 'max-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                        <User color="var(--accent-gold)" />
                        <h2 style={{ fontSize: '1.25rem' }}>Mina Uppgifter</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>E-postadress (ej ändringsbar)</label>
                            <input type="text" value={user?.email || ''} disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-muted)', color: 'var(--text-secondary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Fullständigt Namn</label>
                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Telefonnummer</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Returadress</label>
                            <textarea value={address} onChange={e => setAddress(e.target.value)} rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white', resize: 'vertical' }} />
                        </div>

                        {message && <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>{message}</p>}

                        <button type="submit" className="btn btn-primary" disabled={savingProfile} style={{ marginTop: '0.5rem' }}>
                            <Save size={18} /> {savingProfile ? 'Sparar...' : 'Spara ändringar'}
                        </button>
                    </form>
                </div>

                {/* Orders Card */}
                <div className="glass-card" style={{ height: 'max-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Package color="var(--accent-gold)" />
                            <h2 style={{ fontSize: '1.25rem' }}>Mina Ordrar</h2>
                        </div>
                        <button
                            onClick={async () => {
                                const desc = window.prompt("Beskriv vad du vill skicka in (ex. 3 st VHS, 1 st Kassettband):");
                                if (desc) {
                                    try {
                                        const { data, error } = await supabase
                                            .from('orders')
                                            .insert([{ user_id: user.id, description: desc, status: 'mottagen' }])
                                            .select();
                                        if (!error && data) {
                                            setOrders([data[0], ...orders]);
                                            alert("Order skapad! Skicka nu in dina band till vår postadress.");
                                        } else {
                                            alert("Kunde inte skapa ordern. Försök igen.");
                                        }
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }
                            }}
                            className="btn btn-primary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                            + Skapa ny order
                        </button>
                    </div>

                    {loadingOrders ? (
                        <p>Laddar ordrar...</p>
                    ) : orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                            <p>Du har inga aktiva ordrar för tillfället.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {orders.map(order => (
                                <div key={order.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            Order-ID: {order.id.split('-')[0]}
                                        </span>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: 'var(--radius-full)',
                                            background: `${getStatusColor(order.status)}20`,
                                            color: getStatusColor(order.status),
                                            border: `1px solid ${getStatusColor(order.status)}50`
                                        }}>
                                            {translateStatus(order.status)}
                                        </span>
                                    </div>
                                    <p style={{ fontWeight: 500 }}>{order.description}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                        Mottagen: {new Date(order.created_at).toLocaleDateString('sv-SE')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
