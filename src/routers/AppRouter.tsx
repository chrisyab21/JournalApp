

import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/Hooks/Typedhooks';
import { onAuthStateChanged } from 'firebase/auth';
import { FireBaseAuth } from '../firebase/config';
import { login, logout } from '../Redux/store/auth/authSlice';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { Outlet } from 'react-router-dom';
import { startLoadingNotes } from '../Redux/store/journal/thunks';

export const AppRouter = () => {
   
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.auth);

  console.log('Render desde AppRouter');

  useEffect(() => {
    
    onAuthStateChanged(FireBaseAuth, async(user) => {

          if(!user) return dispatch(logout(''));

          const LoginData = {
            ok: true,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            errorMessage: null
          }

          dispatch(login(LoginData));
          dispatch(startLoadingNotes());
    })

  }, []);

  
    if(status === 'checking') return <CheckingAuth/>

    return <Outlet/>
      
        
 }


