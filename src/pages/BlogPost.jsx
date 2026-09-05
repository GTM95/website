import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import { blogPosts } from './Blog';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Artikeln hittades inte</h2>
                <Link to="/kunskapsbank" className="btn btn-primary" style={{ marginTop: '1rem' }}>Tillbaka till Kunskapsbanken</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <FadeInSection>
                    <Link to="/kunskapsbank" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                        <ArrowLeft size={16} /> Tillbaka till översikten
                    </Link>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(234, 179, 8, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '100px', color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            {post.category}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, margin: '0 0 1rem 0' }}>{post.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {post.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {post.readTime} läsning</span>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '3rem' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#e2e8f0' }}>
                        <p style={{ fontSize: '1.25rem', color: 'white', marginBottom: '2rem', fontStyle: 'italic' }}>
                            {post.excerpt}
                        </p>
                        
                        {/* Detta är mock-innehåll för demonstration */}
                        <h2>Bakgrunden till problemet</h2>
                        <p>
                            Många tror att VHS-band holder för evigt om de bara ligger säkert nerpackade i en låda på vinden. Tyvärr är sanningen en helt annan. Den magnetiska beläggningen på banden bryts ner av fukt, temperaturväxlingar och magnetism från omgivningen.
                        </p>
                        
                        <div className="glass-card" style={{ margin: '2rem 0', background: 'rgba(234, 179, 8, 0.05)', borderLeft: '4px solid var(--accent-gold)' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-gold)' }}>Expertens tips:</h4>
                            <p style={{ margin: 0, fontSize: '1rem' }}>
                                Spola aldrig tillbaka band i kameran precis innan bevaring. Det sträcker bandet onödigt mycket.
                            </p>
                        </div>

                        <h2>Vad sker under ytan?</h2>
                        <p>
                            Det som brukar kallas för "Sticky Shed Syndrome" är när bindemedlet som håller fast de magnetiska partiklarna på plastbandet börjar dra åt sig fukt. När detta händer kan bandet fastna i bandspelaren, eller i allvarligare fall, slitas sönder helt.
                        </p>
                        <h3>Rekommenderade åtgärder:</h3>
                        <ul>
                            <li>Förvara banden i jämn temperatur (gärna svalt).</li>
                            <li>Undvik källare och vindar pga fukt.</li>
                            <li><strong>Digitalisera dem omedelbart.</strong> Den enda riktiga lösningen är att föra över informationen till ett digitalt format.</li>
                        </ul>
                        
                        <p style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                            Behöver du hjälp med att rädda dina minnen innan det är för sent? <br/>
                            <Link to="/boka" style={{ color: 'var(--accent-gold)', fontWeight: 600, textDecoration: 'none' }}>Gör en bokning idag &rarr;</Link>
                        </p>
                    </div>

                    <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <Share2 size={18} /> Dela artikeln
                        </button>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default BlogPost;
