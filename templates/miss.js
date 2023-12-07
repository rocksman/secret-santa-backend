const miss_template = (sender, reciever) => {
    return (
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catch Up Invitation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          text-align: center;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #d9534f;
          margin-bottom: 20px;
        }
    
        p {
          color: #555;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
    
        strong {
          color: #333;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #d9534f;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
    
        .footer {
          margin-top: 20px;
          color: #888;
          font-size: 14px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>👋 Catch Up Invitation!</h1>
        <p>Hey <strong>${reciever.displayName}</strong>,</p>
        <p>Your friend <strong>${sender.displayName}</strong> misses you and would love to catch up! It's been too long, and they are eager to share some laughter and good times.</p>
        <p>How about catching up soon?.</p>
      </div>
    
      <div class="container footer">
        <p>Looking forward to seeing you soon!</p>
        <p>Best regards,<br>${sender.displayName}</p>
      </div>
    </body>
    
    </html>
    `);
}

module.exports = {miss_template}