import React from 'react';
import { Film, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="kontakt" style={{
            background: 'rgba(10, 10, 12, 0.95)',
            borderTop: '1px solid var(--glass-border)',
            paddingTop: 'var(--space-xl)',
            paddingBottom: '2rem'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Brand & Intro */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            <Film color="var(--accent-gold)" />
                            <span>Svensk <span className="text-gradient-gold">Digitalisering</span></span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Specialister på överföring av gamla videoband och smalfilm till moderna digitala format.
                            Vi hanterar dina minnen med största omsorg och respekt.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Snabblänkar</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#tjanster" style={{ color: 'var(--text-secondary)' }}>Våra Tjänster</a></li>
                            <li><a href="#processen" style={{ color: 'var(--text-secondary)' }}>Hur det fungerar</a></li>
                            <li><a href="#priser" style={{ color: 'var(--text-secondary)' }}>Prislista</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Vanliga frågor (FAQ)</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Allmänna villkor</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Kontakta Oss</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <MapPin size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>
                                    Svensk Digitalisering AB<br />
                                    Minnesvägen 42<br />
                                    123 45 Exempelstad
                                </span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <Phone size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                <a href="tel:0812345678">08 - 123 456 78</a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <Mail size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                <a href="mailto:hej@svenskdigitalisering.se">hej@svenskdigitalisering.se</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Svensk Digitalisering AB. Alla rättigheter förbehållna.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#">Integritetspolicy</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
