

import {FC} from 'react'
import { Box, Divider, Drawer, List, Toolbar, Typography} from '@mui/material'
import { useAppSelector } from '../../Redux/Hooks/Typedhooks'
import { SideBarItem } from './SideBarItem'

type props = {

    drawerWidth: number
}

export const SideBar:FC<props> = ({drawerWidth = 240}) => {

    const {displayName} = useAppSelector(state => state.auth);
    const {notes} = useAppSelector(state => state.journal);

  return (
    
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        >
            <Drawer
              variant='permanent'
              open={true}
              sx={{ 
                display: { xs: 'block'},
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
                 }}               
            >
            
                <Toolbar >
                    <Typography variant='h6'>
                        {displayName}
                    </Typography>
                </Toolbar>

                <Divider/>

                <List>
                    {
                        notes.map((nota) => (
                            <SideBarItem nota={nota} key={nota.id}/>
                        ))
                    }

                </List>


            </Drawer>


        </Box>

  )
}
