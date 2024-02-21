
import {Grid, Typography} from "@mui/material";
import { ReactElement } from "react";
import { FC } from "react";

type props = {

    children: ReactElement
    title: string
}


export const AuthLayout:FC<props> = ({children, title = ''}) => {
  return (
    <Grid     
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight:'100vh', backgroundColor:'primary.main', padding:4 }}
    >

      <Grid 
        item
        className="box-shadow"
        sx={{
            width: {xs:300, sm: 450, md: 450, lg:450},
            minHeight:'30vh',
            backgroundColor: 'white', 
            padding:3, 
            borderRadius:2
        }}
        >

          <Typography variant="h5" sx={{ mb:1 }}>{title}</Typography>

            {children}

       </Grid>

    </Grid>
  )
}
