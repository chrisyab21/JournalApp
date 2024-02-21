
import { useAppSelector } from '../Redux/Hooks/Typedhooks';

import { Navigate, Outlet } from 'react-router-dom';

export const JournalRouter = () => {
   
  console.log('Render desde authRouter');
  const {status} = useAppSelector(state => state.auth);

  
    if(status === 'not-authtenticated') return <Navigate to={'/auth/login'}/>

    return <Outlet/>
      
        
 }