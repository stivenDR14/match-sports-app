import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from "firebase/auth";
import { appFirebase } from "../endpoints/firebase-config";

const auth = getAuth();
const app = appFirebase;

export class Authentication{
  email: string;
  password: string;
  constructor(_email: string, _password: string){
    this.email=_email
    this.password=_password
  }

  public async register():Promise<any>{
    try{
      const user= await createUserWithEmailAndPassword(auth, this.email, this.password)
      return user;
    }catch (error:any) {
      console.log("error 1", error.message)
      const errorAux= error.message
      if(error.message==="Firebase: Error (auth/email-already-in-use)."){
        const user= await this.login()
        return user
      }else{
        return errorAux;
      }
      

    }
    
}

public async login():Promise<any>{
  try {
    const userCredential=await signInWithEmailAndPassword(auth, this.email, this.password)
    const user = userCredential.user;
    return user;
  } catch (error:any) {
    console.log("error 1", error.message)
    const errorAux= error.message
    return errorAux;
  }
   
}

}





