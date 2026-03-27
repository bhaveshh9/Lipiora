import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, serverTimestamp,
  query, orderBy, limit, getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Warn if any Firebase config values are missing
let isConfigurable = true;
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️ Firebase config missing: ${key}`);
    isConfigurable = false;
  }
});

let app;
let db = null;

if (isConfigurable) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.error("Firebase Initialization Error:", err);
  }
} else {
  console.warn("⚠️ Firebase is not initialized because environment variables are missing. Firebase features will be safely ignored.");
}

export { db };

export async function saveDocument(data, role) {
  if (!db) return console.warn("Firebase DB is null. Ignoring saveDocument.");
  try {
    return await addDoc(collection(db, "documents"), {
      ...data,
      savedByRole: role,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Firestore saveDocument failed:", err.message);
    throw err; // ✅ re-throw so the caller knows it failed
  }
}

export async function getRecentDocuments(max = 20) {
  if (!db) return [];
  try {
    const q = query(collection(db, "documents"), orderBy("timestamp", "desc"), limit(max));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Firestore getRecentDocuments failed:", err);
    return [];
  }
}

export async function saveCorrection(correction) {
  if (!db) return console.warn("Firebase DB is null. Ignoring saveCorrection.");
  try {
    return await addDoc(collection(db, "corrections"), {
      ...correction,
      savedByRole: "historian",
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Firestore saveCorrection failed:", err.message);
    throw err; // ✅ re-throw so the caller knows it failed
  }
}