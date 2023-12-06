const express = require('express');
const admin = require('firebase-admin');
const shuffle = require('shuffle-array');

const app = express();

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('./firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://secret-santa-backend-261019.firebaseio.com',
});

const db = admin.firestore();

// Endpoint to match users
app.get('/match-users', async (req, res) => {
  try {
    // Retrieve all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(users);
    // Shuffle the users array
    shuffle(users);

    // Match users
    const totalUsers = users.length;
    for (let i = 0; i < totalUsers; i++) {
      const user1 = users[i];
      const user2 = users[(i + 1) % totalUsers]; // Circular index to handle odd numbers

      // Assign matched IDs
      await db.collection('users').doc(user1.id).update({ matchedId: user2.id });
    }

    res.json({ message: 'Users matched successfully!' });
  } catch (error) {
    console.error('Error matching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
