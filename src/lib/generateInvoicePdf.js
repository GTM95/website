import { jsPDF } from 'jspdf';

const PRICES = { videoband: 199, smalfilm: 290, kassettband: 149 };
const LABELS = { videoband: 'Videoband (VHS/VHS-C)', smalfilm: 'Smalfilm (Super 8/8mm)', kassettband: 'Kassettband (Audio)' };

const COMPANY = {
    name: 'Svensk Digitalisering AB',
    address: 'Exempelgatan 1',
    zip: '114 55',
    city: 'Stockholm',
    phone: '08 - 123 456 78',
    email: 'hej@svenskdigitalisering.se',
    orgNr: '559XXX-XXXX',
    bankgiro: '1234-5678',
    swish: '123 456 78 90',
};

/**
 * Generates and downloads a professional PDF invoice.
 * @param {object} order - The order object from Supabase
 * @param {object} [customerProfile] - Optional profile data (used in admin view)
 */
export function generateInvoicePdf(order, customerProfile) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // --- Colors ---
    const gold = [200, 155, 20];
    const dark = [30, 30, 35];
    const medium = [100, 100, 110];
    const light = [180, 180, 190];

    // --- Header background ---
    doc.setFillColor(...dark);
    doc.rect(0, 0, pageWidth, 52, 'F');

    // --- Company name ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(COMPANY.name, margin, y + 12);

    // --- "FAKTURA" label ---
    doc.setFontSize(11);
    doc.setTextColor(...gold);
    doc.text('FAKTURA', pageWidth - margin, y + 8, { align: 'right' });

    // --- Invoice number ---
    const invoiceNumber = order.id?.slice(0, 8).toUpperCase() || 'N/A';
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`#${invoiceNumber}`, pageWidth - margin, y + 16, { align: 'right' });

    // --- Company details under name ---
    doc.setFontSize(8.5);
    doc.setTextColor(...light);
    doc.text(`${COMPANY.address}, ${COMPANY.zip} ${COMPANY.city}`, margin, y + 20);
    doc.text(`Tel: ${COMPANY.phone}  |  ${COMPANY.email}`, margin, y + 25);
    doc.text(`Org.nr: ${COMPANY.orgNr}`, margin, y + 30);

    y = 62;

    // --- Dates row ---
    const invoiceDate = new Date(order.created_at).toLocaleDateString('sv-SE');
    const dueDate = new Date(new Date(order.created_at).getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE');

    doc.setFontSize(8);
    doc.setTextColor(...medium);
    doc.text('FAKTURADATUM', margin, y);
    doc.text('FÖRFALLODATUM', margin + 45, y);
    doc.text('BETALNINGSVILLKOR', margin + 95, y);

    doc.setFontSize(10);
    doc.setTextColor(...dark);
    y += 5;
    doc.text(invoiceDate, margin, y);
    doc.text(dueDate, margin + 45, y);
    doc.text('14 dagar netto', margin + 95, y);

    y += 14;

    // --- Divider ---
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // --- Customer info ---
    const customer = customerProfile || order.customer || {};
    const customerName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Ej angivet';

    doc.setFontSize(8);
    doc.setTextColor(...medium);
    doc.text('FAKTURERAS TILL', margin, y);
    y += 5;

    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'bold');
    doc.text(customerName, margin, y);
    doc.setFont('helvetica', 'normal');
    y += 5;

    if (customer.address) {
        doc.text(customer.address, margin, y);
        y += 5;
    }
    if (customer.zip || customer.city) {
        doc.text(`${customer.zip || ''} ${customer.city || ''}`.trim(), margin, y);
        y += 5;
    }
    if (customer.email) {
        doc.setTextColor(...medium);
        doc.text(customer.email, margin, y);
        y += 5;
    }
    if (customer.phone) {
        doc.text(customer.phone, margin, y);
        y += 5;
    }

    y += 10;

    // --- Items table header ---
    const colX = {
        desc: margin,
        qty: margin + contentWidth * 0.55,
        price: margin + contentWidth * 0.70,
        total: pageWidth - margin
    };

    doc.setFillColor(245, 245, 248);
    doc.rect(margin, y - 4, contentWidth, 10, 'F');

    doc.setFontSize(8);
    doc.setTextColor(...medium);
    doc.setFont('helvetica', 'bold');
    doc.text('BESKRIVNING', colX.desc + 2, y + 2);
    doc.text('ANTAL', colX.qty, y + 2, { align: 'right' });
    doc.text('Á-PRIS', colX.price, y + 2, { align: 'right' });
    doc.text('BELOPP', colX.total, y + 2, { align: 'right' });

    y += 12;
    doc.setFont('helvetica', 'normal');

    // --- Items ---
    const items = order.items || {};
    const totalItems = Object.values(items).reduce((a, b) => a + b, 0);
    const hasDiscount = totalItems >= 10;
    let subtotal = 0;

    Object.entries(items).forEach(([type, qty]) => {
        if (qty <= 0) return;
        const unitPrice = PRICES[type] || 0;
        const lineTotal = qty * unitPrice;
        subtotal += lineTotal;

        doc.setFontSize(10);
        doc.setTextColor(...dark);
        doc.text(LABELS[type] || type, colX.desc + 2, y);
        doc.text(`${qty} st`, colX.qty, y, { align: 'right' });
        doc.text(`${unitPrice} kr`, colX.price, y, { align: 'right' });
        doc.text(`${lineTotal} kr`, colX.total, y, { align: 'right' });

        // Thin line
        y += 3;
        doc.setDrawColor(235, 235, 240);
        doc.setLineWidth(0.2);
        doc.line(margin, y, pageWidth - margin, y);
        y += 7;
    });

    y += 5;

    // --- Totals section ---
    const totalsX = margin + contentWidth * 0.55;
    const totalsValueX = pageWidth - margin;

    // Subtotal
    doc.setFontSize(9);
    doc.setTextColor(...medium);
    doc.text('Delsumma', totalsX, y);
    doc.setTextColor(...dark);
    doc.text(`${subtotal} kr`, totalsValueX, y, { align: 'right' });
    y += 6;

    // Discount
    if (hasDiscount) {
        const discountAmount = Math.round(subtotal * 0.1);
        doc.setTextColor(180, 60, 60);
        doc.text('Mängdrabatt (10%)', totalsX, y);
        doc.text(`-${discountAmount} kr`, totalsValueX, y, { align: 'right' });
        y += 6;
    }

    // Tax info
    const totalExVat = order.total_amount ? Math.round(order.total_amount / 1.25) : Math.round((hasDiscount ? subtotal * 0.9 : subtotal) / 1.25);
    const vatAmount = (order.total_amount || Math.round(hasDiscount ? subtotal * 0.9 : subtotal)) - totalExVat;

    doc.setTextColor(...medium);
    doc.text('Netto (exkl. moms)', totalsX, y);
    doc.setTextColor(...dark);
    doc.text(`${totalExVat} kr`, totalsValueX, y, { align: 'right' });
    y += 6;

    doc.setTextColor(...medium);
    doc.text('Moms (25%)', totalsX, y);
    doc.setTextColor(...dark);
    doc.text(`${vatAmount} kr`, totalsValueX, y, { align: 'right' });
    y += 4;

    // Total line
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(totalsX, y, pageWidth - margin, y);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...dark);
    doc.text('ATT BETALA', totalsX, y);
    const totalAmount = order.total_amount || Math.round(hasDiscount ? subtotal * 0.9 : subtotal);
    doc.setTextColor(...gold);
    doc.text(`${totalAmount} kr`, totalsValueX, y, { align: 'right' });

    y += 18;

    // --- Payment info box ---
    doc.setFillColor(248, 248, 252);
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setTextColor(...medium);
    doc.setFont('helvetica', 'bold');
    doc.text('BETALNINGSINFORMATION', margin + 6, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...dark);

    const payY = y + 14;
    doc.text(`Bankgiro: ${COMPANY.bankgiro}`, margin + 6, payY);
    doc.text(`Swish: ${COMPANY.swish}`, margin + 6, payY + 6);
    doc.text(`Ange fakturanummer #${invoiceNumber} vid betalning`, margin + 6, payY + 12);
    doc.setTextColor(...medium);
    doc.setFontSize(8);
    doc.text(`Vid försenad betalning debiteras påminnelseavgift (60 kr) + dröjsmålsränta enl. räntelagen.`, margin + 6, payY + 20);

    // --- Footer ---
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setFontSize(7.5);
    doc.setTextColor(...light);
    doc.text(
        `${COMPANY.name}  ·  ${COMPANY.address}, ${COMPANY.zip} ${COMPANY.city}  ·  Org.nr: ${COMPANY.orgNr}`,
        pageWidth / 2,
        footerY,
        { align: 'center' }
    );

    // --- Download ---
    doc.save(`Faktura_${invoiceNumber}.pdf`);
}
