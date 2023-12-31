const express = require('express');
const admin = require('firebase-admin');
const shuffle = require('shuffle-array');
var cors = require('cors')

const app = express();

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('./firebase-admin-sdk.json');
const { sendEmail } = require('./util/mail');
const { match_template } = require('./templates/match');
const { miss_template } = require('./templates/miss');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://secret-santa-backend-261019.firebaseio.com',
});

const db = admin.firestore();

app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello there from secret santa');
});

// Endpoint to match users
app.get('/match-users', async (req, res) => {
  try {
    // Retrieve all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    shuffle(users);

    // Match users
    const totalUsers = users.length;
    for (let i = 0; i < totalUsers; i++) {
      const user1 = users[i];
      const user2 = users[(i + 1) % totalUsers]; // Circular index to handle odd numbers

      // Assign matched IDs
      await db.collection('users').doc(user1.id).update({ matchedEmail: user2.user.email, isMatchConfirmed: false });
    }

    res.json({ message: 'Users matched successfully!' });
  } catch (error) {
    console.error('Error matching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/confirm-match', async (req, res) => {
    try {
      const usersSnapshot = await db.collection('users').get();
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      for (let i = 0; i < users.length; i++) {
        await db.collection('users').doc(users[i].id).update({ isMatchConfirmed: true });
        let match_user_ref = await db.collection('users').doc(users[i].matchedEmail).get();
        let match_user = match_user_ref.data();
        sendEmail({
          subject: "Secret Santa Match",
          html: match_template(match_user.user, match_user.address),
          to: users[i].user.email,
          from: process.env.EMAIL
        });
      }
      res.json({ message: 'Users match confimed and email sent successfully!' });
    }
    catch(err) {
      console.error('Error matching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/miss-friend', async (req, res) => {
  try {
    const {sender, reciever} = req.body;
    sendEmail({
      subject: "Secret Santa: Friend Misses You",
      html: miss_template(sender, reciever),
      to: reciever.email,
      from: process.env.EMAIL
    });
    res.json({ message: 'Email sent successfully!' });
  }
  catch(err) {
    console.error('Error matching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
