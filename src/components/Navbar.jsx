import React, { useState, useEffect } from 'react';
import { Film, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, profile } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            padding: scrolled ? '1rem 0' : '1.5rem 0',
            background: scrolled ? 'rgba(10, 10, 12, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
            transition: 'all var(--transition-normal)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                    <Film color="var(--accent-gold)" />
                    <span>Svensk <span className="text-gradient-gold">Digitalisering</span></span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
                        <a href="/#tjanster">Tjänster</a>
                        <a href="/#processen">Processen</a>
                        <a href="/#priser">Priser</a>
                    </div>

                    {user ? (
                        <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <User size={18} /> Min Sida
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                            Logga in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
