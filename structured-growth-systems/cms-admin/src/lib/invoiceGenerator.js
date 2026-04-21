import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

/**
 * Generates a professional PDF invoice
 * @param {Object} client - Client data object
 * @param {Object} payment - Specific payment object
 * @param {Object} settings - Company settings object
 */
export const generateInvoicePDF = (client, payment, settings) => {
  try {
    if (!client || !payment) {
      throw new Error('Missing client or payment data');
    }

    const doc = new jsPDF()
    const pageHeight = doc.internal.pageSize.height
    const companyName = settings?.companyName || 'TechnoSolution'
    const accentColor = [245, 158, 11] // Amber-500
    
    // Helpers
    const formatNumber = (val) => {
      // Return comma-separated number string
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0)
    }

    const drawRupee = (x, y, size) => {
      doc.setLineWidth(0.2)
      doc.setDrawColor(60, 60, 60)
      const w = size * 0.6
      // Top bar
      doc.line(x, y, x + w, y)
      // Middle bar
      doc.line(x, y + size * 0.25, x + w * 0.8, y + size * 0.25)
      // Slash part
      doc.line(x + w * 0.1, y, x + w * 0.6, y + size * 0.8)
    }

    // --- HEADER SECTION ---
    doc.setFillColor(...accentColor)
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(companyName.toUpperCase(), 15, 25)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('OFFICIAL PAYMENT RECEIPT', 15, 32)
    
    // Company Info (Right Aligned)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    const headerRightX = 195
    let headerY = 15
    
    if (settings?.email) {
      doc.text(settings.email, headerRightX, headerY, { align: 'right' })
      headerY += 5
    }
    if (settings?.phone) {
      doc.text(settings.phone, headerRightX, headerY, { align: 'right' })
      headerY += 5
    }
    if (settings?.website) {
      doc.text(settings.website, headerRightX, headerY, { align: 'right' })
    }

    // --- INVOICE INFO ---
    doc.setTextColor(50, 50, 50)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE TO:', 15, 55)
    
    doc.setFont('helvetica', 'normal')
    doc.text(client?.name || 'Valued Client', 15, 62)
    if (client?.email) doc.text(client.email, 15, 67)
    if (client?.phone) doc.text(client.phone, 15, 72)
    
    // Invoice Meta (Right Aligned)
    const invId = payment?._id ? payment._id.slice(-6).toUpperCase() : 'N/A'
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE #:', 130, 55)
    doc.setFont('helvetica', 'normal')
    doc.text(`INV-${invId}`, 160, 55)
    
    doc.setFont('helvetica', 'bold')
    doc.text('DATE:', 130, 62)
    doc.setFont('helvetica', 'normal')
    doc.text(payment?.date ? new Date(payment.date).toLocaleDateString() : 'N/A', 160, 62)
    
    doc.setFont('helvetica', 'bold')
    doc.text('STATUS:', 130, 69)
    doc.setTextColor(...accentColor)
    doc.text('PAID', 160, 69)
    doc.setTextColor(50, 50, 50)

    // --- SERVICES / ITEMS TABLE ---
    const tableData = [
      [
        'Service Description',
        'Qty',
        'Transaction ID',
        'Amount'
      ],
      [
        { 
          content: `Service Payment: ${client?.services?.join(', ') || 'General Digital Services'}`,
          styles: { fontStyle: 'bold' }
        },
        '1',
        payment?.reference || 'N/A',
        formatNumber(payment?.amount)
      ]
    ]

    autoTable(doc, {
      startY: 85,
      head: [tableData[0]],
      body: [
        [
          tableData[1][0],
          tableData[1][1],
          tableData[1][2],
          formatNumber(payment?.amount) // Use number only, symbol drawn later
        ]
      ],
      theme: 'striped',
      headStyles: { fillColor: accentColor, textColor: 0 },
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: {
        3: { halign: 'right', fontStyle: 'bold' }
      },
      // didDrawCell: (data) => {
      //   if (data.column.index === 3 && data.cell.section === 'body') {
      //     const textWidth = doc.getTextWidth(data.cell.text[0])
      //     const symbolX = data.cell.x + data.cell.width - textWidth - 6
      //     drawRupee(symbolX, data.cell.y + 6, 4)
      //   }
      // }
    })

    // --- FINANCIAL SUMMARY ---
    let finalY = (doc.lastAutoTable?.finalY || 100) + 10
    const totalPaid = client?.payments?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0
    const balance = (client?.totalValue || 0) - totalPaid
    
    const summaryData = [
      ['Total Contract Value:', formatNumber(client?.totalValue)],
      ['Previous Payments:', formatNumber(totalPaid - (payment?.amount || 0))],
      ['CURRENT PAYMENT:', formatNumber(payment?.amount)],
      ['TOTAL DUE BALANCE:', formatNumber(balance)]
    ]

    autoTable(doc, {
      startY: finalY,
      margin: { left: 120 },
      body: summaryData,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'normal' },
        1: { halign: 'right', fontStyle: 'bold' }
      },
      // didDrawCell: (data) => {
      //   if (data.column.index === 1) {
      //     const textWidth = doc.getTextWidth(data.cell.text[0])
      //     const symbolX = data.cell.x + data.cell.width - textWidth - 6
      //     drawRupee(symbolX, data.cell.y + 2.5, 4)
      //   }
      // },
      didParseCell: (data) => {
        if (data.row.index === 2) { // Current Payment
          data.cell.styles.fillColor = [245, 245, 245]
          data.cell.styles.fontStyle = 'bold'
        }
        if (data.row.index === 3) { // Total Due
          data.cell.styles.textColor = [220, 38, 38]
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.fontSize = 11
        }
      }
    })

    // --- BANK DETAILS ---
    if (settings?.bankDetails?.bankName) {
      const bankY = finalY
      doc.setTextColor(50, 50, 50)
      doc.setFont('helvetica', 'bold')
      doc.text('PAYMENT RECIPIENT DETAILS', 15, bankY)
      
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text(`Bank: ${settings.bankDetails.bankName}`, 15, bankY + 8)
      doc.text(`A/C Holder: ${settings.bankDetails.accountName}`, 15, bankY + 13)
      doc.text(`A/C Number: ${settings.bankDetails.accountNumber}`, 15, bankY + 18)
      doc.text(`IFSC: ${settings.bankDetails.ifscCode}`, 15, bankY + 23)
    }

    // --- SIGNATURE SECTION ---
    if (settings?.digitalSignature) {
      const sigY = pageHeight - 50
      doc.setTextColor(50, 50, 50)
      doc.setFont('helvetica', 'bold')
      doc.text('Authorized Signatory', 195, sigY, { align: 'right' })
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9)
      doc.text(settings.digitalSignature, 195, sigY + 5, { align: 'right' })
      
      // Add a small line for signature
      doc.setDrawColor(200, 200, 200)
      doc.line(150, sigY - 2, 195, sigY - 2)
    }

    // --- FOOTER ---
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(`${companyName} | ${settings?.address || ''}`, 105, pageHeight - 15, { align: 'center' })
    doc.text('This is a computer-generated document and may not require a physical signature.', 105, pageHeight - 10, { align: 'center' })

    // SAVE
    const fileName = `Invoice_${(client?.name || 'Client').replace(/\s+/g, '_')}_${invId}.pdf`
    doc.save(fileName)
  } catch (error) {
    console.error('Failure in generateInvoicePDF:', error);
    throw error; // Re-throw to be caught by the UI
  }
}
