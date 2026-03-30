import React, { useState, useEffect } from 'react';
import { Film, User, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/#tjanster', label: 'Tjänster' },
        { href: '/#priser', label: 'Priser' },
        { href: '/#processen', label: 'Så fungerar det' }
    ];

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            padding: scrolled ? '0.75rem 0' : '1.25rem 0',
            background: scrolled
                ? 'linear-gradient(180deg, rgba(5, 5, 7, 0.85) 0%, rgba(5, 5, 7, 0.75) 100%)'
                : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
            borderBottom: scrolled
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid transparent',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" onClick={closeMobileMenu} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    transition: 'transform 0.3s ease',
                    zIndex: 101
                }}>
                    <Film color="var(--accent-gold)" />
                    <span>Svensk <span className="text-gradient-gold">Digitalisering</span></span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    
                    {/* Desktop Navigation Links */}
                    <div className="nav-links" style={{
                        display: 'flex',
                        gap: '1.5rem',
                        fontWeight: 500
                    }}>
                        {navLinks.map((link, i) => (
                            link.isRoute ? (
                                <Link key={i} to={link.href} style={{ position: 'relative', padding: '0.25rem 0', transition: 'color 0.3s ease' }}>
                                    {link.label}
                                </Link>
                            ) : (
                                <a key={i} href={link.href} style={{ position: 'relative', padding: '0.25rem 0', transition: 'color 0.3s ease' }}>
                                    {link.label}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Desktop CTA / Auth Buttons */}
                    <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {user ? (
                            <>
                                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <User size={18} /> {profile?.role === 'admin' ? 'Admin' : 'Min Sida'}
                                </Link>
                                <Link to="/boka" className="btn btn-primary" style={{
                                    padding: '0.5rem 1.25rem', fontSize: '0.9rem', opacity: scrolled ? 1 : 0.9, transform: scrolled ? 'scale(1)' : 'scale(0.95)', boxShadow: scrolled ? '0 4px 14px 0 var(--accent-gold-glow)' : 'none'
                                }}>
                                    Boka Nu
                                </Link>
                                <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'; e.currentTarget.style.color = '#f87171'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                >
                                    <LogOut size={16} /> Logga ut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
                                    Logga in
                                </Link>
                                <Link to="/boka" className="btn btn-primary" style={{
                                    padding: '0.5rem 1.25rem', fontSize: '0.9rem', opacity: scrolled ? 1 : 0.9, transform: scrolled ? 'scale(1)' : 'scale(0.95)', boxShadow: scrolled ? '0 4px 14px 0 var(--accent-gold-glow)' : 'none'
                                }}>
                                    Boka Nu
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ zIndex: 101 }}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100vh',
                    background: 'var(--bg-base)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    gap: '2rem'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', fontSize: '1.25rem' }}>
                        {navLinks.map((link, i) => (
                            link.isRoute ? (
                                <Link key={i} to={link.href} onClick={closeMobileMenu} style={{ fontWeight: 500 }}>
                                    {link.label}
                                </Link>
                            ) : (
                                <a key={i} href={link.href} onClick={closeMobileMenu} style={{ fontWeight: 500 }}>
                                    {link.label}
                                </a>
                            )
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', width: '100%', maxWidth: '300px' }}>
                        {user ? (
                            <>
                                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} onClick={closeMobileMenu} className="btn btn-secondary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <User size={18} /> {profile?.role === 'admin' ? 'Admin' : 'Min Sida'}
                                </Link>
                                <Link to="/boka" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Boka Nu
                                </Link>
                                <button onClick={() => { closeMobileMenu(); handleLogout(); }} style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                                    <LogOut size={18} /> Logga ut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/boka" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                    Boka Nu
                                </Link>
                                <Link to="/login" onClick={closeMobileMenu} style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: '1rem' }}>
                                    Logga in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
