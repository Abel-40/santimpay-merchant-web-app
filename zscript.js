function downloadInvoiceImage() {
  const invoice = document.getElementById('invoice');
  html2canvas(invoice).then(canvas => {
    const link = document.createElement('a');
    link.download = 'invoice.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
