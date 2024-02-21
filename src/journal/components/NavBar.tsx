import { LoginOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import {FC} from 'react'
import { useAppDispatch } from "../../Redux/Hooks/Typedhooks"
import { startLogout } from "../../Redux/store/auth/thunks"

type props = {

    drawerWidth: number
}


export const NavBar:FC<props> = ({drawerWidth = 240}) => {


    const dispatch = useAppDispatch();
    
    
    const onLogout = () => {

            dispatch(startLogout());           
           

    }


  return (
    <AppBar 
        position="fixed"
        sx={{ 
            width: { sm: `calc(100% - ${drawerWidth}px)`},
            ml: { sm: `${drawerWidth}px`}

        }}
        >

        <Toolbar>
            <IconButton 
                color='inherit'
                edge='start'
                sx={{ mr: 2, display: { sm: 'none'}}}
            >
                <MenuOutlined/> 
            </IconButton>
        <Grid container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            
        >
            <Typography variant="h6" noWrap>
                JournalApp
            </Typography>

            <IconButton 
                color='success'
                onClick={ () => onLogout()}
                >
                <LoginOutlined color='error'/>
            </IconButton>



        </Grid>

        </Toolbar>

    </AppBar>
  )
}
