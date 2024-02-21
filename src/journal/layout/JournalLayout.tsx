

import { Box, Toolbar } from '@mui/material'
import { ReactElement, FC } from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

type props = {

    children: ReactElement
}

const drawerWidth = 240;

export const JournalLayout:FC<props> = ({children}) => {

  return (
    <Box
     className="animate__animated animate__fadeIn animate__faster" 
     component='div' 
     sx={{display: 'flex'}}>

        <NavBar drawerWidth={drawerWidth}/>
        <SideBar drawerWidth={drawerWidth}/>
        <Box 
            component='main'
            sx={{ flexGrow: 1, p:3}}        
            >
                
            <Toolbar/>

            {children}   

        </Box>
    </Box>
  )
}
