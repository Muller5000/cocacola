import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Use the custom database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

/**
 * Validates connection to Firestore.
 */
async function testConnection() {
  try {
    // Attempt to fetch a non-existent doc to test connectivity
    await getDocFromServer(doc(db, 'system', 'connection_test'));
    console.log("Firebase connection verified.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error("Firebase is offline. Check configuration.");
    }
  }
}

testConnection();
