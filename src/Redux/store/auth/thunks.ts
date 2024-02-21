import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";

type LoginData = {   
    email:string,
    password:string
}

type CreateData = { 
    nombre: string  
    email:string,
    password:string
}

export const checkingAuthenticaction = createAsyncThunk('auth/checking',
    async(data:LoginData, thunkApi ) =>{

        try {
            thunkApi.dispatch(checkingCredentials()) 
            await new Promise((resolve, reject) => setTimeout(resolve,2000))       
            thunkApi.dispatch(logout(0));
        } catch (error) {

            return thunkApi.rejectWithValue(data);
        }

});

export const startGoogleSingIn = createAsyncThunk('auth/Google',
    async(_, thunkApi ) =>{

        try {
            thunkApi.dispatch(checkingCredentials()) 
            //new Promise((resolve, reject) => setTimeout(reject,100))

            const {ok, displayName, email, uid, photoURL, errorMessage} = await singInWithGoogle();

            if(!ok) {           
               thunkApi.dispatch(logout(errorMessage));              
            }

            thunkApi.dispatch(login({ok, displayName, email, uid, photoURL, errorMessage}));

            return thunkApi.fulfillWithValue(0);
            
            
        } catch (error) {

           
            return thunkApi.rejectWithValue(error);
        }

});



export const startCreatingUserWithEmailPasWord = createAsyncThunk('create/EmailPassword',
    async(datos:CreateData, thunkApi) => {

        try {
            
            thunkApi.dispatch(checkingCredentials());

            const {ok, errorMessage, photoURL, displayName, email, uid} = await registerUserWithEmailPassword(datos);

            if(!ok){

                thunkApi.dispatch(logout(errorMessage));
                return;        
            }

            thunkApi.dispatch(login({ok, errorMessage, photoURL, displayName, email, uid}));


        } catch (error) {
            
        }
   
    
});



export const startLoginWithEmailPassWord = createAsyncThunk('login/EmailPassword',
    async(datos:LoginData, thunkApi) => {

        try {
            
            thunkApi.dispatch(checkingCredentials());

            const {ok, displayName, email, errorMessage, photoURL, uid } = await loginWithEmailPassword(datos);

            if(!ok){

                thunkApi.dispatch(logout(errorMessage));
                return;        
            }

            thunkApi.dispatch(login({ok, errorMessage, photoURL, displayName, email, uid}));


        } catch (error) {

            
        }
      
});


export const startLogout = createAsyncThunk('thunk/logout',
    async(_, thunkApi) => {

        try {
            await logoutFireBase();

            thunkApi.dispatch(logout(''));
            thunkApi.dispatch(clearNotesLogout());

        } catch (error) {
            


        }
        



});



