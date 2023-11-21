import { initializeApp } from 'firebase/app';
import { getFirestore, DocumentData } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDxWEW3wxPNEUjkAkdvUeQLqc57AqQ8KTc",
  authDomain: "overhear2-backup.firebaseapp.com",
  databaseURL: "https://overhear2-backup-default-rtdb.firebaseio.com",
  projectId: "overhear2-backup",
  storageBucket: "overhear2-backup.appspot.com",
  messagingSenderId: "213322686439",
  appId: "1:213322686439:web:d85e39a290871b3055a742",
  measurementId: "G-HJFNC1HD2B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;