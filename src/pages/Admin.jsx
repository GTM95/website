import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, MoreVertical, Link as LinkIcon, Save, Users, CheckCircle, XCircle, Mail, ArrowLeft, Calendar, CreditCard, Tag, FileText, ExternalLink, Download } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import { generateInvoicePdf } from '../lib/generateInvoicePdf';

const statusColors = {
    mottagen: { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)' },
    påbörjad: { color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
    fakturerad: { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.1)' },
    färdig: { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' },
};

const Admin = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null);
    const [linkInput, setLinkInput] = useState('');

    // Customer detail panel state
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [loadingCustomerOrders, setLoadingCustomerOrders] = useState(false);

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setCustomers(data);
        } else {
            console.error('Error fetching customers:', error);
            setCustomers([
                { id: '1', first_name: 'Sven', last_name: 'Svensson', email: 'sven@example.com', role: 'customer', marketing_consent: true, created_at: new Date().toISOString() }
            ]);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setOrders(data);
        } else {
            console.error(error);
            setOrders([
                { id: '11111111-e5f6-7890-1234-567890abcdef', status: 'mottagen', customer: { first_name: 'Karin', last_name: 'Andersson' }, total_amount: 1150, items: { videoband: 5 } },
                { id: '22222222-e5f6-7890-1234-567890abcdef', status: 'påbörjad', customer: { first_name: 'Mikael', last_name: 'Lindström' }, total_amount: 597, items: { videoband: 3 } },
                { id: '44444444-e5f6-7890-1234-567890abcdef', status: 'fakturerad', customer: { first_name: 'Lars', last_name: 'Persson' }, total_amount: 1195, items: { smalfilm: 4 }, download_link: 'we.tl/abc890' },
                { id: '33333333-e5f6-7890-1234-567890abcdef', status: 'färdig', customer: { first_name: 'Eva-Lena', last_name: 'Johansson' }, total_amount: 199, items: { videoband: 1 }, download_link: 'we.tl/xyz123' }
            ]);
        }
        setLoading(false);
    };

    const openCustomerDetails = async (customer) => {
        setSelectedCustomer(customer);
        setLoadingCustomerOrders(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', customer.id)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setCustomerOrders(data);
        } else {
            setCustomerOrders([]);
        }
        setLoadingCustomerOrders(false);
    };

    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
        if (!error) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        }
    };

    const saveLink = async (id) => {
        const { error } = await supabase.from('orders').update({ download_link: linkInput, status: 'fakturerad' }).eq('id', id);
        if (!error) {
            setOrders(orders.map(o => o.id === id ? { ...o, download_link: linkInput, status: 'fakturerad' } : o));
            setEditingOrder(null);
            setLinkInput('');
        }
    };

    const columns = [
        { id: 'mottagen', title: 'Inbox (Mottagna)' },
        { id: 'påbörjad', title: 'I VCR/Skan (Pågår)' },
        { id: 'fakturerad', title: 'Fakturerad (Väntar)' },
        { id: 'färdig', title: 'Färdig & Betald' }
    ];

    const renderOrderCard = (order) => {
        const customerName = order.customer?.first_name 
            ? `${order.customer.first_name} ${order.customer.last_name || ''}`.trim()
            : (order.customer?.name || 'Okänd kund');

        return (
            <div key={order.id} className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem', cursor: 'grab', background: 'rgba(20, 20, 25, 0.9)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>#{order.id?.slice(0, 8)}</strong>
                    <MoreVertical size={16} color="var(--text-secondary)" />
                </div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{customerName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {Object.values(order.items || {}).reduce((a, b) => a + b, 0)} band • {order.total_amount} kr
                </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {order.status === 'mottagen' && (
                    <button onClick={() => updateStatus(order.id, 'påbörjad')} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid #eab308', color: '#eab308', borderRadius: '4px', cursor: 'pointer' }}>Påbörja</button>
                )}
                {order.status === 'påbörjad' && (
                    <button onClick={() => { setEditingOrder(order.id); setLinkInput(order.download_link || ''); }} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid #f472b6', color: '#f472b6', borderRadius: '4px', cursor: 'pointer' }}>Bifoga Länk & Fakturera</button>
                )}
                {order.status === 'fakturerad' && (
                    <button onClick={() => updateStatus(order.id, 'färdig')} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: '#4ade80', border: 'none', color: '#000', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Markera som Betald</button>
                )}
                {(order.status !== 'mottagen') && (
                    <button onClick={() => updateStatus(order.id, 'mottagen')} style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}>Flytta till Inkorg</button>
                )}
            </div>

            {editingOrder === order.id && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Fäst WeTransfer Länk:</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="text" value={linkInput} onChange={e => setLinkInput(e.target.value)} placeholder="we.tl/..." className="form-input" style={{ padding: '0.5rem', fontSize: '0.85rem' }} />
                        <button onClick={() => saveLink(order.id)} style={{ background: '#4ade80', border: 'none', color: '#000', borderRadius: '4px', padding: '0 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Save size={16} />
                        </button>
                    </div>
                </div>
            )}

            {order.download_link && order.status === 'färdig' && (
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <LinkIcon size={12} /> Länk skickad ifylld
                </div>
            )}
        </div>
    );
};

    // Customer Detail Slide-Over Panel
    const CustomerDetailPanel = ({ customer, onClose }) => (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                    zIndex: 1000, backdropFilter: 'blur(4px)'
                }}
            />
            {/* Slide-over panel */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: '520px',
                background: '#0f0f14',
                borderLeft: '1px solid var(--glass-border)',
                zIndex: 1001, overflowY: 'auto',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    position: 'sticky', top: 0, zIndex: 10
                }}>
                    <button
                        onClick={onClose}
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{customer.first_name} {customer.last_name}</h2>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Kundprofil</p>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    {/* Profile info */}
                    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Kontaktuppgifter</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Mail size={14} color="var(--accent-gold)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>E-post</div>
                                    <a href={`mailto:${customer.email}`} style={{ color: 'var(--accent-light)', textDecoration: 'none', fontSize: '0.9rem' }}>{customer.email}</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Calendar size={14} color="var(--accent-gold)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Registrerad</div>
                                    <div style={{ fontSize: '0.9rem' }}>{new Date(customer.created_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Tag size={14} color="var(--accent-gold)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nyhetsbrev</div>
                                    <div>
                                        {customer.marketing_consent ? (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#4ade80', fontSize: '0.85rem' }}>
                                                <CheckCircle size={14} /> Ja, vill ha utskick
                                            </span>
                                        ) : (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                <XCircle size={14} /> Nej, inga utskick
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order history */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                            Orderhistorik {!loadingCustomerOrders && `(${customerOrders.length})`}
                        </h3>

                        {loadingCustomerOrders ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Laddar ordrar...</div>
                        ) : customerOrders.length === 0 ? (
                            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                <Package size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>Inga ordrar hittades.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {customerOrders.map(order => {
                                    const sc = statusColors[order.status] || { color: 'white', bg: 'rgba(255,255,255,0.05)' };
                                    const totalBand = Object.values(order.items || {}).reduce((a, b) => a + b, 0);
                                    return (
                                        <div key={order.id} className="glass-card" style={{ background: 'rgba(20,20,25,0.85)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                    #{order.id?.slice(0, 8)} · {new Date(order.created_at).toLocaleDateString('sv-SE')}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 600, color: sc.color, background: sc.bg }}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                    {totalBand} band
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1rem' }}>
                                                    <CreditCard size={14} color="var(--accent-gold)" />
                                                    {order.total_amount} kr
                                                </div>
                                            </div>
                                            {order.download_link && (
                                                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                                                    <a href={`https://${order.download_link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                                                        <LinkIcon size={12} /> {order.download_link}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                <FadeInSection>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Hantera ordrar och kundregister</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '8px' }}>
                            <button
                                onClick={() => setActiveTab('orders')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.5rem 1rem', borderRadius: '6px',
                                    border: 'none', cursor: 'pointer', fontWeight: 600,
                                    background: activeTab === 'orders' ? 'rgba(234, 179, 8, 0.2)' : 'transparent',
                                    color: activeTab === 'orders' ? 'var(--accent-gold)' : 'var(--text-secondary)'
                                }}
                            >
                                <Package size={18} /> Ordrar
                            </button>
                            <button
                                onClick={() => setActiveTab('customers')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.5rem 1rem', borderRadius: '6px',
                                    border: 'none', cursor: 'pointer', fontWeight: 600,
                                    background: activeTab === 'customers' ? 'rgba(234, 179, 8, 0.2)' : 'transparent',
                                    color: activeTab === 'customers' ? 'var(--accent-gold)' : 'var(--text-secondary)'
                                }}
                            >
                                <Users size={18} /> Kunder
                            </button>
                            <button
                                onClick={() => setActiveTab('fakturor')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.5rem 1rem', borderRadius: '6px',
                                    border: 'none', cursor: 'pointer', fontWeight: 600,
                                    background: activeTab === 'fakturor' ? 'rgba(244, 114, 182, 0.2)' : 'transparent',
                                    color: activeTab === 'fakturor' ? '#f472b6' : 'var(--text-secondary)',
                                    position: 'relative'
                                }}
                            >
                                <FileText size={18} /> Fakturor
                                {orders.filter(o => o.status === 'fakturerad').length > 0 && (
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#f472b6', color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {orders.filter(o => o.status === 'fakturerad').length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {activeTab === 'orders' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                            {columns.map(col => (
                                <div key={col.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', minHeight: '600px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{col.title}</h3>
                                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}>
                                            {orders.filter(o => o.status === col.id).length}
                                        </span>
                                    </div>

                                    {orders.filter(o => o.status === col.id).map(order => 
                                        renderOrderCard(order)
                                    )}

                                    {orders.filter(o => o.status === col.id).length === 0 && (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '2rem 0' }}>
                                            Dra ordrar hit
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : activeTab === 'fakturor' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {orders.filter(o => o.status === 'fakturerad').length === 0 ? (
                                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                                    <FileText size={48} color="var(--glass-border)" style={{ margin: '0 auto 1rem auto' }} />
                                    <p style={{ color: 'var(--text-secondary)' }}>Inga obetalda fakturor just nu.</p>
                                </div>
                            ) : orders.filter(o => o.status === 'fakturerad').map(order => {
                                const customer = customers.find(c => c.id === order.user_id);
                                const customerName = customer 
                                    ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() 
                                    : order.customer?.first_name 
                                        ? `${order.customer.first_name} ${order.customer.last_name || ''}`.trim()
                                        : 'Okänd kund';
                                const itemsList = Object.entries(order.items || {}).filter(([,v]) => v > 0);
                                
                                return (
                                    <div key={order.id} className="glass-card" style={{ padding: '2rem', borderLeft: '3px solid #f472b6' }}>
                                        {/* Invoice Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div>
                                                <div style={{ color: '#f472b6', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Obetald Faktura</div>
                                                <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 600 }}>#{order.id?.slice(0, 8).toUpperCase()}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Fakturadatum</div>
                                                <div style={{ fontWeight: 500 }}>{new Date(order.created_at).toLocaleDateString('sv-SE')}</div>
                                            </div>
                                        </div>

                                        {/* Customer Info */}
                                        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>KUND</div>
                                                <div style={{ fontWeight: 600 }}>{customerName}</div>
                                                {customer?.email && <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{customer.email}</div>}
                                            </div>
                                            {customer?.address && (
                                                <div>
                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>ADRESS</div>
                                                    <div style={{ fontSize: '0.9rem' }}>{customer.address}</div>
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{customer.zip} {customer.city}</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Order Items */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tjänster</div>
                                            {itemsList.length > 0 ? itemsList.map(([type, qty]) => (
                                                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                                    <span style={{ textTransform: 'capitalize' }}>{type} × {qty} st</span>
                                                    <span style={{ color: 'var(--text-secondary)' }}>–</span>
                                                </div>
                                            )) : (
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Inga specificerade föremål</div>
                                            )}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', fontSize: '1.1rem', fontWeight: 700 }}>
                                                <span>Totalt att betala</span>
                                                <span style={{ color: '#f472b6' }}>{order.total_amount ? `${order.total_amount} kr` : 'Ej fastställt'}</span>
                                            </div>
                                        </div>

                                        {/* Download Link & Actions */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                {order.download_link && (
                                                    <a href={order.download_link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-light)', fontSize: '0.85rem' }}>
                                                        <ExternalLink size={14} /> {order.download_link}
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => generateInvoicePdf(order, customer)}
                                                    className="btn"
                                                    style={{ background: 'transparent', color: '#f472b6', border: '1px solid rgba(244, 114, 182, 0.4)', padding: '0.5rem 1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                                                >
                                                    <Download size={14} /> Ladda ner PDF
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => updateStatus(order.id, 'färdig')}
                                                className="btn"
                                                style={{ background: '#4ade80', color: '#000', border: 'none', padding: '0.6rem 1.25rem', fontWeight: 600 }}
                                            >
                                                <CheckCircle size={16} style={{ marginRight: '0.5rem' }} /> Markera som Betald
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>SKAPAD</th>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>NAMN</th>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>E-POST</th>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>NYHETSBREV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(c => (
                                        <tr
                                            key={c.id}
                                            onClick={() => openCustomerDetails(c)}
                                            style={{
                                                borderBottom: '1px solid var(--glass-border)',
                                                cursor: 'pointer',
                                                transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                {new Date(c.created_at).toLocaleDateString('sv-SE')}
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                                                {c.first_name} {c.last_name}
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span style={{ color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                                    <Mail size={14} /> {c.email}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                {c.marketing_consent ? (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#4ade80', fontSize: '0.85rem', background: 'rgba(74, 222, 128, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                        <CheckCircle size={14} /> Ja
                                                    </span>
                                                ) : (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                        <XCircle size={14} /> Nej
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {customers.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                                Inga kunder hittades i registret.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </FadeInSection>
            </div>

            {/* Customer detail panel */}
            {selectedCustomer && (
                <CustomerDetailPanel
                    customer={selectedCustomer}
                    onClose={() => { setSelectedCustomer(null); setCustomerOrders([]); }}
                />
            )}
        </div>
    );
};

export default Admin;
