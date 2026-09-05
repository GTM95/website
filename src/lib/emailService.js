import { supabase } from './supabase';

/**
 * Service för att hantera e-postutskick.
 * 
 * För att skicka riktiga e-postmeddelanden rekommenderas att du använder 
 * Supabase Edge Functions kombinerat med t.ex. Resend eller SendGrid.
 * Eftersom detta kräver server-uppsättning, simulerar denna funktion anropet här för nu.
 */
export const sendOrderNotification = async (orderId, customerEmail, customerName, newStatus) => {
    console.log(`[E-post Service] Förbereder utskick till ${customerEmail} (Order #${orderId.slice(0,8)})`);

    const templates = {
        'påbörjad': {
            subject: 'Vi har börjat arbeta med din order!',
            text: `Hej ${customerName},\n\nDin order #${orderId.slice(0,8)} är nu markerad som "Påbörjad". Vi har dina band i studion och arbetar för fullt med att säkerställa högsta kvalitet på din digitalisering.\n\nDu hör från oss så fort filerna är klara för leverans!\n\nVänliga hälsningar,\nSvensk Digitalisering`
        },
        'fakturerad': {
            subject: 'Din digitalisering är klar – Faktura väntar',
            text: `Hej ${customerName},\n\nUtmärkt nyhet! Vi är färdiga med order #${orderId.slice(0,8)}. Din faktura och en förhandsvisning finns nu tillgänglig på din kundpanel.\n\nSå snart vi mottagit betalningen låses din nedladdningslänk automatiskt upp.\n\nVänliga hälsningar,\nSvensk Digitalisering`
        },
        'färdig': {
            subject: 'Dina minnen är nu redo att upplevas igen!',
            text: `Hej ${customerName},\n\nTack för din betalning för order #${orderId.slice(0,8)}.\n\nDina filer är nu tillgängliga för nedladdning via din kundpanel. Filerna ligger kvar hos oss i 30 dagar, så tänk på att ladda ner och säkerhetskopiera dem snarast möjligt.\n\nVänliga hälsningar,\nSvensk Digitalisering`
        }
    };

    const emailContent = templates[newStatus];

    if (!emailContent) {
        console.log(`[E-post Service] Ingen e-postmall definierad för status: ${newStatus}`);
        return { success: false, error: 'Ingen mall' };
    }

    try {
        // HÄR ANROPAR DU EGENTLIGEN DIN SUPABASE EDGE FUNCTION NÄR DEN ÄR UPPSATT
        /*
        const { data, error } = await supabase.functions.invoke('send-email', {
            body: { 
                to: customerEmail, 
                subject: emailContent.subject, 
                bodyText: emailContent.text 
            }
        });
        if (error) throw error;
        */

        // För nu simulerar vi framgång
        console.log(`[E-post Service] LÅTSAS-UTSKICK: Skickade e-post med rubrik "${emailContent.subject}" till ${customerEmail}`);
        return { success: true };
    } catch (error) {
        console.error('[E-post Service] Fel vid e-postutskick:', error);
        return { success: false, error };
    }
};
