const match_template = (user, address) => {
    return (
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Secret Santa Match</title>
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
          border: 1px solid #ccc;
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

        .user_image {
            border-radius: 50%
        }
    
        img {
          max-width: 100%;
          height: auto;
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
        <h1>🎅 Secret Santa Match!</h1>
        <img src="${user.photoURL}" class="user_image" alt="Christmas Image">
        <p>Congratulations! You have been matched with ${user.displayName}! Spread the joy of giving this holiday season.</p>
        <p>Recipient's Address: 
        <strong>${address.addressLine1}</strong>
        <strong>${address.addressLine2}</strong>
        <strong>${address.city}</strong>
        <strong>${address.state}</strong>
        <strong>${address.pincode}</strong>
        <strong>${address.country}</strong>
      </div>
    
      <div class="container footer">
        <p>Best wishes for a festive and joyful holiday season!</p>
        <p>Warm regards,<br>Your Secret Santa Organizer</p>
      </div>
    </body>
    
    </html>
    `);
}

module.exports = {match_template}