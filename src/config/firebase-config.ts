import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyBL1nuxya9--1X1K_opPuCM7a264pTQq7Y',
  authDomain: 'chat-app-3ad40.firebaseapp.com',
  projectId: 'chat-app-3ad40',
  storageBucket: 'chat-app-3ad40.appspot.com',
  messagingSenderId: '108148032849',
  appId: '1:108148032849:web:2c0672d00315e39f97bf70'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
