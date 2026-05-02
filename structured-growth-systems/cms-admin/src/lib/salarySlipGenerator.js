import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateSalarySlipPDF = (employee, salary, settings) => {
  try {
    const doc = new jsPDF()
    const pageHeight = doc.internal.pageSize.height
    const companyName = settings?.companyName || 'TechnoSolution'
    const accentColor = [16, 185, 129] // Emerald-500
    
    const formatNumber = (val) => {
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0)
    }

    // --- HEADER SECTION ---
    doc.setFillColor(...accentColor)
    doc.rect(0, 0, 210, 30, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text(companyName.toUpperCase(), 15, 20)
    
    // Company Info (Right Aligned)
    doc.setFontSize(8)
    const headerRightX = 195
    let headerY = 12
    if (settings?.email) {
      doc.text(settings.email, headerRightX, headerY, { align: 'right' })
      headerY += 5
    }
    if (settings?.phone) {
      doc.text(settings.phone, headerRightX, headerY, { align: 'right' })
    }

    doc.setTextColor(50, 50, 50)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('SALARY SLIP', 105, 45, { align: 'center' })
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`For the month of ${salary.month} ${salary.year}`, 105, 52, { align: 'center' })

    // --- EMPLOYEE DETAILS ---
    doc.setFontSize(9)
    doc.text(`Employee Name : ${employee?.name || ''}`, 15, 65)
    doc.text(`Employee ID   : ${employee?.userId || ''}`, 15, 71)
    doc.text(`Designation   : ${employee?.designation || ''}`, 15, 77)

    const bankDetails = employee?.accountDetails || {}
    doc.text(`Bank Name     : ${bankDetails.bankName || 'N/A'}`, 120, 65)
    doc.text(`Account No    : ${bankDetails.accountNo || 'N/A'}`, 120, 71)
    doc.text(`PAN No        : ${bankDetails.panNo || 'N/A'}`, 120, 77)

    // --- SALARY TABLE ---
    const earnings = salary.earnings || {}
    const deductions = salary.deductions || {}
    
    const totalEarnings = (earnings.basic||0) + (earnings.hra||0) + (earnings.conveyance||0) + (earnings.allowance||0)
    const totalDeductions = (deductions.pf||0) + (deductions.esi||0) + (deductions.tax||0) + (deductions.deduction||0)

    const tableData = [
      ['Earnings', 'Amount (Rs)', 'Deductions', 'Amount (Rs)'],
      ['Basic', formatNumber(earnings.basic), 'PF', formatNumber(deductions.pf)],
      ['HRA', formatNumber(earnings.hra), 'ESI', formatNumber(deductions.esi)],
      ['Conveyance', formatNumber(earnings.conveyance), 'Tax / TDS', formatNumber(deductions.tax)],
      ['Other Allowance', formatNumber(earnings.allowance), 'Other Deductions', formatNumber(deductions.deduction)],
      ['Total Earnings', formatNumber(totalEarnings), 'Total Deductions', formatNumber(totalDeductions)]
    ]

    autoTable(doc, {
      startY: 90,
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: accentColor, textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' },
        2: { fontStyle: 'bold' },
        3: { halign: 'right' }
      },
      didParseCell: (data) => {
        if (data.row.index === 0) {
          data.cell.styles.fillColor = accentColor
          data.cell.styles.textColor = 255
          data.cell.styles.fontStyle = 'bold'
        } else if (data.row.index === tableData.length - 1) {
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.fillColor = [245, 245, 245]
        }
      }
    })

    const finalY = doc.lastAutoTable.finalY + 15
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`Net Salary Payable: Rs. ${formatNumber(salary.netSalary)}`, 15, finalY)

    // --- FOOTER ---
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('This is a computer-generated document and does not require a signature.', 105, pageHeight - 15, { align: 'center' })

    // SAVE
    const fileName = `Salary_Slip_${employee?.name.replace(/\s+/g, '_')}_${salary.month}_${salary.year}.pdf`
    doc.save(fileName)
  } catch (error) {
    console.error('Failure in generateSalarySlipPDF:', error);
    throw error;
  }
}
