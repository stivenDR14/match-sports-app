import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, setDoc, doc, arrayUnion } from 'firebase/firestore/lite';
import { appFirebase } from '../endpoints/firebase-config';
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from "firebase/auth";
import { DocumentModel } from '../models/document-model';
const app = appFirebase;
const db = getFirestore(app);

export class Database{
  uid: string;
  constructor(_uid: string){
    this.uid=_uid
  }

  
  // Get a list of cities from your database
  public async getSports() {
    const sportsCol = collection(db, 'sports', this.uid);
    const sportByUid = await getDocs(sportsCol);
    console.log(sportByUid)
    //return sportByUid;
  }

  public async setSport(data: DocumentModel){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate="";
    if(month < 10){
      currentDate=`${year}0${month}${day}`
    }else{
      currentDate=`${year}${month}${day}`
    }
    try {
      await setDoc(doc(db, "sports", this.uid), {
        [currentDate]: arrayUnion(data),
      });
      return true;
    } catch (error:any) {
      console.log("error 1", error.message)
      const errorAux= error.message
      return errorAux;
    }
    
  }

}

