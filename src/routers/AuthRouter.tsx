

import { useAppSelector } from '../Redux/Hooks/Typedhooks';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRouter = () => {
   

  console.log('Render desde authRouter');
 
  const {status} = useAppSelector(state => state.auth);

 
    if(status === 'authtenticated') return <Navigate to={'/'}/>

    return <Outlet/>
      
        
 }