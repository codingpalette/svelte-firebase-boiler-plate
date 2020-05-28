const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url, //'https://svelte-firebase-boiler-plate.firebaseio.com',
});

// admin.initializeApp();
const db = admin.firestore();
const realdb = admin.database();

// console.log(functions.config().admin.email);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, emailVerified, photoURL, disabled } = user;
  const claims = { level: 2 };
  if (functions.config().admin.email === user.email && user.emailVerified) claims.level = 0;
  await admin.auth().setCustomUserClaims(uid, claims);
  const d = {
    uid,
    email,
    displayName,
    emailVerified,
    photoURL,
    disabled,
    createdAt: new Date().getMilliseconds(),
    cart: [],
    history: [],
    level: claims.level,
  };

  const r = await db.collection('users').doc(uid).set(d);
  realdb.ref('users').child(uid).set(d);
  return r;
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete();
  realdb.ref('users').child(user.uid).remove();
});
