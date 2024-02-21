

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FireBaseAuth, googleProvider)

        const credentials =  GoogleAuthProvider.credentialFromResult(result);

        const user = result.user;

        const {displayName, email, photoURL, uid} = user ;

        return  {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch(error:any) { 
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorCode)

        return {

            ok: false,
            errorMessage,
          
        }
    }

}


type LoginData = {

    email: string,
    password: string

}

type CreateData = {
    nombre: string
    email: string,
    password: string

}


export const registerUserWithEmailPassword = async(datos:CreateData) => {

    try {
        
        const response = await createUserWithEmailAndPassword(FireBaseAuth, datos.email, datos.password);

        await updateProfile(response.user, {

            displayName: datos.nombre

        });

        const {uid, photoURL, displayName, email } = response.user;

        console.log(response.user.displayName);

        return {
            ok: true,
            displayName: displayName,
            email,
            uid: uid,
            photoURL: photoURL
        }


    }catch(error:any) {

        return {
                ok: false,
                errorMessage: error.message,
               }

    }


}



export const loginWithEmailPassword = async(datos:LoginData) => {

    
    try {
        
        const response =  await signInWithEmailAndPassword(FireBaseAuth, datos.email, datos.password);
    
        
        const {uid, photoURL, displayName, email } = response.user;

        console.log(response.user.displayName);

            return {
                ok: true,
                displayName: displayName,
                email,
                uid: uid,
                photoURL: photoURL
            }


            
        } catch(error:any) {

            return {      
                    ok: false,
                    errorMessage: error.message,
                   }
        }


}



export const logoutFireBase = async() => {


    return await FireBaseAuth.signOut();

}