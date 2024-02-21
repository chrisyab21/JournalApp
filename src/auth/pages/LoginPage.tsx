

import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { FormEvent,useState } from "react";
import { useAppDispatch} from "../../Redux/Hooks/Typedhooks";
import {  startGoogleSingIn, startLoginWithEmailPassWord } from "../../Redux/store/auth/thunks";
import { useCheckLogin } from "../hooks/useCheckLogin";



export const LoginPage = () => {

  const {isCheckingAuth, isEmailValid, isPasswordValid, formState, onInputChange, errorMessage } = useCheckLogin();

    const dispatch = useAppDispatch();

    const [formSubmitted, setformSubmitted] = useState(false);


    const onSubmit = (event:FormEvent) => {

      event.preventDefault();
      setformSubmitted(true);
 

      if(isEmailValid.valid && isPasswordValid.valid){

        console.log(formState);
        dispatch(startLoginWithEmailPassWord(formState));
  
      }

    }

    const onGoogleSingIn = () => {

      dispatch(startGoogleSingIn());

    }
    

  return (

        <AuthLayout title="Logins">
        <form
          className="animate__animated animate__fadeIn animate__faster" 
          onSubmit={(event) => onSubmit(event)}>
            <Grid container >
              <Grid item xs={12} lg={12} sx={{ mt:2}}>
                <TextField 
                  label="Correo" 
                  type="email"
                  placeholder="burremp@gmail.com"
                  fullWidth
                  name="email"
                  value={formState.email}
                  onChange={(event) => onInputChange(event)}
                  helperText={
                    (formSubmitted && isEmailValid.empty) 
                      ? isEmailValid.error 
                      : (!isEmailValid.valid && !isEmailValid.empty) 
                        ? isEmailValid.error 
                        : ''
                  }
                  error={(!isEmailValid.valid && !isEmailValid.empty) || (formSubmitted && isEmailValid.empty)}
                  ></TextField>

              </Grid>
              
              <Grid item sx={{ mt:2}} xs={12} lg={12}  >
                <TextField 
                  label="Contraseña" 
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  value={formState.password}
                  onChange={(event) => onInputChange(event)}
                  helperText={
                    (formSubmitted && isPasswordValid.empty) 
                      ? isPasswordValid.error 
                      : (!isPasswordValid.valid && !isPasswordValid.empty) 
                        ? isPasswordValid.error 
                        : ''
                  }
                  error={(!isPasswordValid.valid && !isPasswordValid.empty) || (formSubmitted && isPasswordValid.empty)}
                  ></TextField>

              </Grid>

              <Grid 
                item 
                display={!!errorMessage ? '' : 'none'}
                sx={{ mt:2}} 
                xs={12} 
                lg={12}  
                >
                  <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid container spacing={2} sx={ { mb:2, mt:1 } }>
                
                <Grid item xs={12} sm={6}>
                  <Button 
                    type='submit' 
                    variant='contained' 
                    fullWidth
                    disabled={isCheckingAuth}
                    >Login</Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button 
                    variant='contained' 
                    fullWidth
                    disabled={isCheckingAuth}
                    onClick={() => onGoogleSingIn()}
                    >
                    <Google></Google>
                    <Typography sx={ { ml:1}}>Google</Typography>
                  </Button>
                </Grid>

              </Grid>

                  <Grid container direction={'row'} justifyContent={'end'}>
                      <Link component={ RouterLink } color={'inherit'} to={'/auth/register'}>
                        Crear una cuenta
                      </Link>
                  </Grid>
                
              </Grid>

          </form>

        </AuthLayout>      
   )
}
