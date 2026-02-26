import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { KeyRound, ShieldCheck } from 'lucide-react';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);

    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Supabase will automatically parse the hash fragment and create a session
        // Verification that we actually have a session to allow updating
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Ogiltig eller utgången återställningslänk. Vänligen begär en ny.');
            }
            setCheckingSession(false);
        };
        checkSession();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Lösenordet måste vara minst 6 tecken långt.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await updatePassword(password);
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Ett fel uppstod vid uppdatering.');
        } finally {
            setLoading(false);
        }
    };

    if (checkingSession) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Verifierar länk...</p>
            </div>
        );
    }

    if (success) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '2rem' }}>
                <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                            <ShieldCheck size={24} />
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lösenord uppdaterat!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        Ditt lösenord har ändrats. Du skickas nu till din panel...
                    </p>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ width: '100%' }}>
                        Gå till min sida nu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '2rem' }}>
            <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <KeyRound size={28} color="var(--accent-gold)" /> Välj nytt lösenord
                </h2>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', padding: '0.75rem', borderRadius: '8px', color: '#ffb3b3', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Nytt lösenord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={!!error && error.includes('Ogiltig')}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bekräfta nytt lösenord</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            disabled={!!error && error.includes('Ogiltig')}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-muted)', color: 'white' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || (!!error && error.includes('Ogiltig'))}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? 'Sparar...' : 'Uppdatera lösenord'}
                    </button>
                    {!!error && error.includes('Ogiltig') && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/login')}
                            style={{ background: 'rgba(255,255,255,0.05)', marginTop: '0.5rem' }}
                        >
                            Tillbaka till inloggning
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
