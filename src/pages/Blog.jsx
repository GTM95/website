import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

// Hårdkodade artiklar inledningsvis. Kan flyttas till Supabase senare.
export const blogPosts = [
    {
        id: 'varfor-digitalisera',
        title: 'Varför du måste digitalisera dina VHS-band nu',
        excerpt: 'Dina VHS-band har en begränsad livslängd. Läs om varför den magnetiska beläggningen förstörs och vad du kan göra åt det.',
        date: '2024-03-20',
        readTime: '4 min',
        category: 'Information',
        image: '/vhs_decay.png'
    },
    {
        id: 'forvara-band-hemma',
        title: 'Så förvarar du gamla band hemma på bästa sätt',
        excerpt: 'Möss, fukt och temperaturväxlingar är bandens värsta fiender. Här är guiden för hur du förvarar dina minnen säkert i väntan på digitalisering.',
        date: '2024-03-15',
        readTime: '6 min',
        category: 'Guide',
        image: '/tape_storage.png'
    },
    {
        id: 'skillnaden-vhs-hi8',
        title: 'Vad är skillnaden mellan VHS, Hi8 och MiniDV?',
        excerpt: 'En snabb genomgång av de vanligaste formaten vi digitaliserar. Lär dig känna igen vilket band du hittat på vinden.',
        date: '2024-03-10',
        readTime: '5 min',
        category: 'Teknik',
        image: '/formats_compare.png'
    }
];

const Blog = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234, 179, 8, 0.1)', padding: '0.5rem 1rem', borderRadius: '100px', color: 'var(--accent-gold)' }}>
                                <BookOpen size={18} />
                                <span style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Kunskapsbank</span>
                            </div>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Artiklar & Guider</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Allt du behöver veta om gamla analoga format, digitalisering och hur du bäst bevarar din familjs historia.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {blogPosts.map((post) => (
                            <Link to={`/kunskapsbank/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="glass-card" style={{ height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}>
                                    <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{
                                            position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', zIndex: 2
                                        }}>
                                            {post.category}
                                        </div>
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        />
                                    </div>
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {post.date}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> {post.readTime} läsning</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                                            {post.excerpt}
                                        </p>
                                        <div style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                                            Läs mer <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default Blog;
