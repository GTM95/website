import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isResetting, setIsResetting] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { loginEmail, registerEmail, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isResetting) {
                const { error } = await resetPassword(email);
                if (error) throw error;
                setResetSent(true);
            } else if (isLogin) {
                const { error } = await loginEmail(email, password);
                if (error) throw error;
                navigate('/dashboard');
            } else {
                const { error } = await registerEmail(email, password, fullName);
                if (error) throw error;
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Ett fel uppstod');
        } finally {
            setLoading(false);
        }
    };

    if (resetSent) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '2rem' }}>
                <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                            <Mail size={24} />
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>E-post skickad!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        Vi har skickat en länk för att återställa ditt lösenord till <strong>{email}</strong>. Kontrollera din inkorg.
                    </p>
                    <button onClick={() => { setResetSent(false); setIsResetting(false); }} className="btn btn-primary" style={{ width: '100%' }}>
                        Tillbaka till inloggning
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '2rem' }}>
            <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    {isResetting ? <><KeyRound size={28} color="var(--accent-gold)" /> Återställ lösenord</> : (isLogin ? 'Logga in' : 'Skapa konto')}
                </h2>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', padding: '0.75rem', borderRadius: '8px', color: '#ffb3b3', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!isLogin && !isResetting && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Fullständigt Namn</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                required={!isLogin && !isResetting}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }}
                            />
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>E-postadress</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }}
                        />
                    </div>

                    {!isResetting && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Lösenord</label>
                                {isLogin && (
                                    <button
                                        type="button"
                                        onClick={() => { setIsResetting(true); setError(null); }}
                                        style={{ background: 'none', border: 'none', color: 'var(--accent-light)', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}
                                    >
                                        Glömt lösenordet?
                                    </button>
                                )}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={!isResetting}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Laddar...' : (isResetting ? 'Skicka återställningslänk' : (isLogin ? 'Logga in' : 'Skapa konto'))}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isResetting ? (
                        <button
                            type="button"
                            onClick={() => { setIsResetting(false); setError(null); }}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontWeight: 600, padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <ArrowLeft size={16} /> Tillbaka till inloggning
                        </button>
                    ) : (
                        <>
                            {isLogin ? "Har du inget konto? " : "Har du redan ett konto? "}
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(null); }}
                                style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
                            >
                                {isLogin ? 'Registrera dig' : 'Logga in'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
