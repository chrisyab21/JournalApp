
import { store } from "../Redux/store/store";

export const AuthValidator = () => {

   const state =  store.getState();

   const statuState = state.auth.status;

   console.log(statuState);

    if(statuState === 'authtenticated'){

        return true;
    }else{
      
        return false;
    }

}


export const CheckingStatus = AuthValidator();