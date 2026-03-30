import React from 'react';
import FadeInSection from '../components/FadeInSection';

const Terms = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <FadeInSection>
                    <div className="glass-card" style={{ padding: '3rem 2rem' }}>
                        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Användarvillkor för Digitaliseringstjänst</h1>
                        
                        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <p style={{ marginBottom: '2rem' }}>
                                Genom att lägga en beställning hos Digitaliseringstjänst godkänner du som kund följande villkor i sin helhet:
                            </p>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>1. Din Beställning och Avtal</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Ett bindande avtal mellan dig och Digitaliseringstjänst uppstår när vi har mottagit din beställning och ditt material. Vi förbehåller oss rätten att neka en beställning eller att avstå från ett uppdrag även efter att materialet har ankommit, om vi bedömer att vi inte kan utföra arbetet.
                            </p>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>2. Upphovsrätt och Innehåll</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Kundens ansvar:</strong> Du som kund ansvarar fullt ut för att du innehar upphovsrätten eller lagstadgade rättigheter att kopiera det material som skickas in för digitalisering. Digitaliseringstjänst tar inget ansvar för eventuella upphovsrättsintrång relaterade till ditt material.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Olagligt eller stötande material:</strong> Vi förbehåller oss rätten att omedelbart och utan kostnad till dig avstå från att genomföra uppdrag som innehåller olämpligt, stötande, extremt eller olagligt material. Sådant material kommer att återsändas till dig obearbetat. Vid misstanke om allvarliga brott kan en polisanmälan komma att göras.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>3. Materialets Skick och Vår Hantering</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Grundläggande vård:</strong> I vår standardtjänst ingår alltid en lätt rengöring och enklare reparationer av materialet för att uppnå ett så bra resultat som möjligt.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Smutsigt eller skadat material:</strong> Vid inlämning av yttre skadat, extremt smutsigt eller mögligt material kan extra kostnader tillkomma för sanering och avancerad reparation. Vi påbörjar aldrig ett sådant extraarbete utan att först kontakta dig för ett godkännande av kostnaden. 
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Nekande på grund av skick:</strong> Om vi vid en första inspektion bedömer att materialet är i för dåligt skick för att kunna digitaliseras överhuvudtaget, förbehåller vi oss rätten att avstå från beställningen. Ingen digitaliseringsavgift debiteras i dessa fall.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Friskrivning från ansvar för skador:</strong> Äldre analoga medier kan vara sköra och svåra att bedöma i förväg. Även om vi hanterar ditt material med största professionella varsamhet, kan vi inte garantera att till exempel gamla band eller filmer inte går sönder under uppspelning. Digitaliseringstjänst tar därför inget ansvar för skador, slitage eller förstörelse som kan uppkomma på originalmaterialet i samband med själva maskinella processen.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>4. Kvalitet och Resultat</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Ingen garanti för perfektion:</strong> Vårt mål är alltid att uppnå bästa möjliga bild- och ljudkvalitet, men slutresultatet avgörs alltid av originalets kvalitet och ursprungliga skick. 
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Möjlighet till reducerat pris:</strong> Om digitaliseringen genomförs, men resultatet blir kraftigt påverkat på grund av materialets brister (t.ex. grava störningar i bild, ljud eller svåra färgavvikelser), kommer vi att kontakta dig. Du erbjuds då möjligheten att antingen behålla den digitala kopian till ett reducerat pris eller helt avstå från att köpa kopian av den specifika kassetten/rullen.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>5. Frakt och Leverans</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Spårbarhet:</strong> För din och materialets trygghet skickar vi alltid försändelser spårbart.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Leveransansvar:</strong> Digitaliseringstjänst tar inte ansvar för postens eller fraktbolagets hantering. Vi ansvarar inte för förseningar, förluster eller transportskador som uppstår efter att vi överlämnat paketet till fraktombudet. Risken för materialet övergår till fraktbolaget, och du uppmanas att förpacka inskickat material väl.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>6. Betalningsvillkor</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Priser och fakturering:</strong> Alla priser på vår webbplats är angivna i SEK och inkluderar 25 % moms. Betalning sker vanligtvis i samband med att uppdraget är slutfört, via faktura, Swish eller kort.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Förseningsavgifter:</strong> Vid utebliven betalning förbehåller vi oss rätten att ta ut en påminnelseavgift enligt gällande lagstiftning samt dröjsmålsränta. Materialet och de digitaliserade filerna erhålles normalt först när betalningen är erlagd eller godkänd.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>7. Ångerrätt</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Undantag av ångerrätten för specialtillverkade varor:</strong> Enligt Distansavtalslagen har du som konsument vanligtvis 14 dagars ångerrätt. Eftersom digitalisering är en <strong>specialanpassad tjänst</strong> där materialet skapas unikt utifrån din förlaga (dina personliga filmer/bilder), gäller <em>inte</em> ångerrätten efter att själva digitaliseringsarbetet har påbörjats.
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Ånger före start:</strong> Om du ångrar dig efter att du lagt beställningen, men <em>innan</em> vi har påbörjat arbetet, har du dock full rätt att avbryta din order kostnadsfritt. Du står då endast för eventuella returfraktkostnader.
                                </li>
                            </ul>

                            <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>8. Hantering av Personuppgifter (GDPR)</h3>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Sekretess och integritet:</strong> Vi behandlar dina namnuppgifter, kontaktuppgifter och det digitala innehållet med sträng sekretess. Dina personuppgifter används enbart för att kunna hantera din beställning, fakturering och leverans. 
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: 'white' }}>Hantering av ditt digitaliserade material:</strong> Genomförda digitaliseringsfiler (filmer/ljud etc.) sparas på våra säkra servrar som en säkerhetskopia i högst <strong>30 dagar</strong> efter godkänd leverans, för att du ska ha chans att meddela eventuella problem med filerna. Därefter raderas materialet oåterkalleligen hos oss. Vi tittar inte på ditt material utöver det som krävs för att övervaka och kvalitetssäkra överföringen.
                                </li>
                            </ul>

                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default Terms;
