import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { appFirebase } from './firebase-config';
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from "firebase/auth";
const app = appFirebase;
const db = getFirestore(app);




// Get a list of cities from your database
async function getCities(db: Firestore) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }