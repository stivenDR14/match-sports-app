import { getFirestore, setDoc, doc, arrayUnion, updateDoc, getDoc } from 'firebase/firestore/lite';
import { appFirebase } from '../endpoints/firebase-config';
import { DocumentModel, HistoryModel } from '../models/document-model';
const app = appFirebase;
const db = getFirestore(app);

export class Database{
  uid: string;
  constructor(_uid: string){
    this.uid=_uid
  }

  
  // Get a list of cities from your database
  public async getLeagues() {
    
    try {
      const leaguesCol = doc(db, 'sports', this.uid);
      const leaguesByUid = await getDoc(leaguesCol);
      if (leaguesByUid.exists()) {
        return leaguesByUid.data();
      } else {
        return {}
      }
      
    } catch (error:any) {
      console.log("error 1 ", error)
      const errorAux= error.message
      throw(errorAux); 
    }
    
  }

  public async setSport(data: DocumentModel){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate="";
    if(month < 10){
      if(day < 10){
        currentDate=`${year}0${month}0${day}`
      }else{
        currentDate=`${year}0${month}${day}`
      }
      
    }else{
      currentDate=`${year}${month}${day}`
    }
    try {
      console.log("subiendo..", data)
      await updateDoc(doc(db, "sports", this.uid), {
        [currentDate]: arrayUnion(JSON.parse(JSON.stringify(data))),
      });
      return true;
    } catch (error:any) {
      console.log("error 1", error)
      if(error.code==="not-found"){
        await setDoc(doc(db, "sports", this.uid), {
          [currentDate]: arrayUnion(JSON.parse(JSON.stringify(data))),
        });
      }
      
      const errorAux= error.message
      throw(errorAux); 
    }
    
  }

}

