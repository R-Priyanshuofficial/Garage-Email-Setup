export function generateBillEmail(customerName, billNumber, totalAmount) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px 20px;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        .info-box {
          background: white;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        .info-box strong {
          color: #667eea;
        }
        .footer {
          background: #333;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 10px 10px;
        }
        .thank-you {
          font-size: 20px;
          font-weight: bold;
          color: #667eea;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🔧 Service Completed!</h1>
      </div>
      
      <div class="content">
        <p>Dear <strong>${customerName}</strong>,</p>
        
        <p>We're pleased to inform you that your vehicle service has been completed successfully!</p>
        
        <div class="info-box">
          ${billNumber ? `<p><strong>Bill Number:</strong> ${billNumber}</p>` : ''}
          ${totalAmount ? `<p><strong>Total Amount:</strong> ₹${totalAmount}</p>` : ''}
        </div>
        
        <p>📎 <strong>Your detailed bill is attached as a PDF.</strong></p>
        
        <div class="thank-you">
          ✨ Thank You for Choosing Our Garage!
        </div>
        
        <p>We appreciate your business and trust in our services. If you have any questions about your bill or the services provided, please don't hesitate to contact us.</p>
      </div>
      
      <div class="footer">
        <p><strong>Garage Systems</strong></p>
        <p>Your trusted automotive service partner</p>
      </div>
    </body>
    </html>
  `;
}
