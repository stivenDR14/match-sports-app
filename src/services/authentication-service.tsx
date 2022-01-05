import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from "firebase/auth";
import { appFirebase } from "./firebase-config";

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
      return errorAux;

    }
    
}

public login():any{
    signInWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return null;
    });
}

}





