import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Invoice {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: string;
  dueDate: string;
  paidDate: string | null;
  items?: InvoiceItem[];
}

export const generateInvoicePDF = (invoice: Invoice) => {
  const doc = new jsPDF();

  doc.setFillColor(0, 61, 122);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('BAUSTOV', 15, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Строительные материалы премиум класса', 15, 27);
  doc.text('ИНН: 7707123456 | КПП: 770701001', 15, 33);

  doc.setFillColor(255, 126, 31);
  doc.rect(150, 10, 50, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('СЧЁТ', 160, 20);
  doc.setFontSize(12);
  doc.text(`#${invoice.id}`, 158, 27);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Плательщик:', 15, 55);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.customer, 15, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('Дата выставления:', 15, 72);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(invoice.date).toLocaleDateString('ru-RU'), 60, 72);

  doc.setFont('helvetica', 'bold');
  doc.text('Срок оплаты:', 15, 79);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(invoice.dueDate).toLocaleDateString('ru-RU'), 60, 79);

  const statusText = invoice.status === 'paid' ? 'Оплачен' : 
                     invoice.status === 'pending' ? 'Ожидание оплаты' : 
                     invoice.status === 'overdue' ? 'Просрочен' : 'Отменён';
  
  const statusColor = invoice.status === 'paid' ? [34, 197, 94] : 
                      invoice.status === 'pending' ? [234, 179, 8] : 
                      invoice.status === 'overdue' ? [239, 68, 68] : [156, 163, 175];

  doc.setFillColor(...statusColor);
  doc.roundedRect(150, 55, 45, 10, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 172.5, 61, { align: 'center' });

  doc.setTextColor(0, 0, 0);

  const tableData = invoice.items?.map(item => [
    item.name,
    `${item.quantity} м²`,
    `₽${item.price.toLocaleString()}`,
    `₽${(item.quantity * item.price).toLocaleString()}`
  ]) || [];

  autoTable(doc, {
    startY: 95,
    head: [['Наименование', 'Количество', 'Цена', 'Сумма']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 61, 122],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 11
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' }
    },
    foot: [['', '', 'ИТОГО:', `₽${invoice.amount.toLocaleString()}`]],
    footStyles: {
      fillColor: [243, 244, 246],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 12
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 20;

  doc.setDrawColor(0, 61, 122);
  doc.setLineWidth(0.5);
  doc.line(15, finalY, 195, finalY);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Реквизиты компании:', 15, finalY + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('ООО "БАУСТОВ"', 15, finalY + 14);
  doc.text('ИНН: 7707123456 | КПП: 770701001 | ОГРН: 1234567890123', 15, finalY + 19);
  doc.text('Банк: ПАО "СБЕРБАНК" | БИК: 044525225', 15, finalY + 24);
  doc.text('Р/С: 40702810938000012345 | К/С: 30101810400000000225', 15, finalY + 29);
  doc.text('Адрес: 119017, г. Москва, ул. Строителей, д. 15, офис 200', 15, finalY + 34);
  doc.text('Телефон: +7 (495) 123-45-67 | Email: info@baustov.ru', 15, finalY + 39);

  doc.setFillColor(0, 61, 122);
  doc.rect(0, 287, 210, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('BAUSTOV — Надёжность в каждом материале', 105, 293, { align: 'center' });

  const fileName = `Счёт_${invoice.id}_${invoice.customer.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}.pdf`;
  doc.save(fileName);
};

export const generatePaymentReceiptPDF = (payment: any) => {
  const doc = new jsPDF();

  doc.setFillColor(0, 61, 122);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('КВИТАНЦИЯ ОБ ОПЛАТЕ', 105, 22, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Платёж №${payment.id}`, 15, 50);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const fields = [
    { label: 'Дата и время:', value: payment.date },
    { label: 'Плательщик:', value: payment.customer },
    { label: 'Счёт:', value: payment.invoice },
    { label: 'Способ оплаты:', value: payment.method },
    { label: 'Статус:', value: payment.status === 'completed' ? 'Проведён' : 'В обработке' }
  ];

  let yPos = 65;
  fields.forEach(field => {
    doc.setFont('helvetica', 'bold');
    doc.text(field.label, 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(field.value, 70, yPos);
    yPos += 10;
  });

  doc.setFillColor(34, 197, 94);
  doc.roundedRect(15, 120, 180, 30, 5, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('СУММА ПЛАТЕЖА:', 105, 133, { align: 'center' });
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`₽${payment.amount.toLocaleString()}`, 105, 145, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Данная квитанция подтверждает успешное проведение платежа.', 105, 165, { align: 'center' });
  doc.text('Сохраните её для бухгалтерского учёта.', 105, 172, { align: 'center' });

  doc.save(`Квитанция_${payment.id}.pdf`);
};
