import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Users, Package, Settings, Plus } from 'lucide-react';

const Admin = () => {
    const { logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // New order form state
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newOrderDesc, setNewOrderDesc] = useState('');
    const [addingOrder, setAddingOrder] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [profilesResponse, ordersResponse] = await Promise.all([
                supabase.from('profiles').select('*').order('created_at', { ascending: false }),
                supabase.from('orders').select('*, profiles(full_name, email)').order('created_at', { ascending: false })
            ]);

            if (profilesResponse.data) setProfiles(profilesResponse.data.filter(p => p.role !== 'admin'));
            if (ordersResponse.data) setOrders(ordersResponse.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (!error) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !newOrderDesc) return;

        setAddingOrder(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([{
                    user_id: selectedUserId,
                    description: newOrderDesc,
                    status: 'mottagen'
                }])
                .select('*, profiles(full_name, email)');

            if (!error && data) {
                setOrders([data[0], ...orders]);
                setShowOrderForm(false);
                setNewOrderDesc('');
                setSelectedUserId('');
            }
        } catch (error) {
            console.error('Error adding order:', error);
        } finally {
            setAddingOrder(false);
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

    if (loading) {
        return <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>Laddar admin-data...</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>Admin Dashboard</h1>
                <button onClick={logout} className="btn btn-secondary">Logga ut</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                {/* Customers Section */}
                <div className="glass-card" style={{ height: 'max-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                        <Users color="var(--accent-gold)" />
                        <h2 style={{ fontSize: '1.25rem' }}>Kundregister ({profiles.length})</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {profiles.length === 0 ? <p>Inga kunder registrerade än.</p> : profiles.map(profile => (
                            <div key={profile.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-muted)' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{profile.full_name || 'Inget namn'}</p>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <p>📧 {profile.email}</p>
                                    <p>📞 {profile.phone || 'Ej angivet'}</p>
                                    <p>🏠 {profile.address ? profile.address.substring(0, 30) + '...' : 'Ej angivet'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders Section */}
                <div className="glass-card" style={{ height: 'max-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Package color="var(--accent-gold)" />
                            <h2 style={{ fontSize: '1.25rem' }}>Alla Ordrar ({orders.length})</h2>
                        </div>
                        <button
                            onClick={() => setShowOrderForm(!showOrderForm)}
                            className="btn btn-primary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                            <Plus size={14} /> Ny Order
                        </button>
                    </div>

                    {showOrderForm && (
                        <form onSubmit={handleAddOrder} style={{ padding: '1rem', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>Skapa manuell order</h3>
                            <select
                                value={selectedUserId}
                                onChange={e => setSelectedUserId(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--border-muted)' }}
                            >
                                <option value="">Välj kund...</option>
                                {profiles.map(p => (
                                    <option key={p.id} value={p.id}>{p.full_name || p.email}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Orderbeskrivning (ex. 3 st VHS, 1 st Hi8)"
                                value={newOrderDesc}
                                onChange={e => setNewOrderDesc(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--border-muted)' }}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button type="submit" disabled={addingOrder} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                    {addingOrder ? 'Sparar...' : 'Spara order'}
                                </button>
                                <button type="button" onClick={() => setShowOrderForm(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                    Avbryt
                                </button>
                            </div>
                        </form>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {orders.length === 0 ? <p>Inga ordrar än.</p> : orders.map(order => (
                            <div key={order.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>
                                            ID: {order.id.split('-')[0]}
                                        </span>
                                        <strong style={{ fontSize: '0.9rem' }}>{order.profiles?.full_name || order.profiles?.email || 'Okänd kund'}</strong>
                                    </div>
                                    <select
                                        value={order.status}
                                        onChange={e => handleStatusChange(order.id, e.target.value)}
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            background: `${getStatusColor(order.status)}20`,
                                            color: getStatusColor(order.status),
                                            border: `1px solid ${getStatusColor(order.status)}50`,
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option style={{ background: '#0a0a0c' }} value="mottagen">Mottagen</option>
                                        <option style={{ background: '#0a0a0c' }} value="påbörjad">Påbörjad</option>
                                        <option style={{ background: '#0a0a0c' }} value="färdig">Färdig</option>
                                        <option style={{ background: '#0a0a0c' }} value="returnerad">Returnerad</option>
                                    </select>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{order.description}</p>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                    Skapad: {new Date(order.created_at).toLocaleString('sv-SE')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
