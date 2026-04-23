import { 
  collection, 
  onSnapshot, 
  query, 
  doc, 
  setDoc, 
  updateDoc,
  FirestoreError 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { KPIData, Outlet } from '../types';

/**
 * Enhanced error handler for Firestore.
 */
export const handleFirestoreError = (error: FirestoreError, operation: string, path: string | null = null) => {
  const user = auth.currentUser;
  const errorInfo = {
    error: error.message,
    operationType: operation,
    path: path,
    authInfo: {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'N/A',
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || false,
      providerInfo: user?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || '',
        email: p.email || ''
      })) || []
    }
  };
  
  console.error("Firestore Error:", JSON.stringify(errorInfo, null, 2));
  // Return info rather than throwing to avoid crashing the UI thread in real-time listeners
  return errorInfo;
};

/**
 * Real-time listener for KPIs.
 */
export const subscribeToKPIs = (callback: (kpis: Record<string, KPIData>) => void) => {
  const q = query(collection(db, 'kpis'));
  return onSnapshot(q, (snapshot) => {
    const kpis: Record<string, KPIData> = {};
    snapshot.forEach((doc) => {
      kpis[doc.id] = doc.data() as KPIData;
    });
    callback(kpis);
  }, (error) => handleFirestoreError(error, 'list', 'kpis'));
};

/**
 * Real-time listener for Outlets.
 */
export const subscribeToOutlets = (callback: (outlets: Outlet[]) => void) => {
  const q = query(collection(db, 'outlets'));
  return onSnapshot(q, (snapshot) => {
    const outlets: Outlet[] = [];
    snapshot.forEach((doc) => {
      outlets.push({ id: doc.id, ...doc.data() } as Outlet);
    });
    callback(outlets);
  }, (error) => handleFirestoreError(error, 'list', 'outlets'));
};

/**
 * Initialize mock data into Firebase (Seed).
 */
export const seedDatabase = async (initialKPIs: Record<string, KPIData>, initialOutlets: Outlet[]) => {
  try {
    for (const [id, data] of Object.entries(initialKPIs)) {
      await setDoc(doc(db, 'kpis', id), data);
    }
    for (const outlet of initialOutlets) {
      const { id, ...rest } = outlet;
      await setDoc(doc(db, 'outlets', id), rest);
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    if (error instanceof FirestoreError) {
      handleFirestoreError(error, 'write', 'seed');
    }
  }
};
