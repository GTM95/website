import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeInSection from './FadeInSection';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{
            borderBottom: '1px solid var(--glass-border)',
            marginBottom: '1rem'
        }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem 0',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                }}
            >
                {question}
                <ChevronDown 
                    size={20} 
                    color="var(--accent-gold)"
                    style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }} 
                />
            </button>
            <div style={{
                maxHeight: isOpen ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.4s ease',
                opacity: isOpen ? 1 : 0
            }}>
                <p style={{ 
                    paddingBottom: '1.5rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                }}>
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: 'Hur skickar jag in mina band säkert?',
            answer: 'Vi rekommenderar att du skickar banden spårbart och försäkrat med PostNord (t.ex. Skicka Lätt eller Rekommenderat). Packa banden tätt i en kartong med bubbelplast eller tidningspapper så de inte skramlar runt.'
        },
        {
            question: 'Vad händer om mitt band är trasigt eller avklippt?',
            answer: 'Ingen panik! Våra tekniker är experter på att laga både videoband och kassettband. Vi skarvar trasiga band och byter ut kassetthus om det behövs innan digitalisering, ofta utan extra kostnad.'
        },
        {
            question: 'Spara ni en kopia av mina filmer?',
            answer: 'Ja, som en extra säkerhet för dig behåller vi en krypterad säkerhetskopia av dina digitaliserade filer på våra säkra servrar i 30 dagar efter leverans. Därefter raderas de permanent.'
        },
        {
            question: 'Hur lång tid tar hela processen?',
            answer: 'Normal leveranstid är 1-2 veckor från det att vi mottagit dina band. Vid större beställningar eller under högsäsong (t.ex. veckorna innan jul) kan det dröja upp till 3-4 veckor.'
        },
        {
            question: 'Får jag tillbaka originalbanden?',
            answer: 'Självklart! Du får alltid tillbaka dina originalband i samma skick som du skickade in dem, tillsammans med ditt valda leveransmedia (USB-minne) eller direkt via länk.'
        },
        {
            question: 'Vilket filformat får jag och varför är filerna stora?',
            answer: 'Vid digitalisering gör vi konvertering till MP4-fil som går att spela upp på dator och många TV-apparater. Konverteringen görs i ett extra steg i processen för att få bättre kvalitet på slutresultatet. Komprimeringen begränsas också för att bevara innehållet så nära originalet som möjligt. En kraftig komprimering ger mindre filer men sämre kvalitet. Vårt mål är alltid ett så bra resultat att det är sista gången filmerna digitaliseras och man istället kan utgå från filerna vid framtida användning av filmerna. Därför är våra filer större än vad andra enklare tjänster levererar.'
        }
    ];

    return (
        <section id="faq" style={{ padding: 'var(--space-xl) 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <FadeInSection>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Vanliga <span className="text-gradient">frågor</span>
                        </h2>
                        <div className="section-divider" />
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Har du funderingar? Här hittar du svar på de vanligaste frågorna om vår digitaliseringsprocess.
                        </p>
                    </div>
                </FadeInSection>

                <FadeInSection delay={0.2} direction="up">
                    <div className="glass-card">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default FAQ;
