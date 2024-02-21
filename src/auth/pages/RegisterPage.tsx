

import { Link as RouterLink } from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { FormEvent, useState } from "react";
import { useAppDispatch} from "../../Redux/Hooks/Typedhooks";
import { startCreatingUserWithEmailPasWord } from "../../Redux/store/auth/thunks";
import { useCheckRegister } from "../hooks/useCheckRegister";



export const RegisterPage = () => {
  
  const {isCheckingAuth, isNameValid, isEmailValid, isPasswordValid, formState, onInputChange, errorMessage } = useCheckRegister();

  const dispatch = useAppDispatch();

  const [formSubmitted, setformSubmitted] = useState(false);

  
  const onSubmit = (event:FormEvent) => {

    event.preventDefault();

    setformSubmitted(true);

    if(isNameValid.valid && isEmailValid.valid && isPasswordValid.valid){


      dispatch(startCreatingUserWithEmailPasWord(formState))

    }


  }


  return (

      <AuthLayout title="Crear Cuenta">
          <form
           className="animate__animated animate__fadeIn animate__faster" 
           onSubmit={(event) => onSubmit(event)}>
            <Grid container >
              <Grid item xs={12} md={5.85} lg={5.85} sx={{ mt:2, mr: { lg:1.25, md:1.25 }}}>
                <TextField 
                  label="Nombre Completo" 
                  type="text"
                  placeholder="Caro Lina"
                  fullWidth
                  name="nombre"
                  value={formState.nombre}
                  onChange={(event) => onInputChange(event)}
                  helperText={
                    (formSubmitted && isNameValid.empty) 
                      ? isNameValid.error 
                      : (!isNameValid.valid && !isNameValid.empty) 
                        ? isNameValid.error 
                        : ''
                  }
                  error={(!isNameValid.valid && !isNameValid.empty) || (formSubmitted && isNameValid.empty)}
                  ></TextField>

              </Grid>

              <Grid item xs={12} md={5.85} lg={5.85} sx={{ mt:2}}>
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
              
              <Grid item sx={{ mt:2}} xs={12} md={12} lg={12} >
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
                  error={(!isPasswordValid.valid && !isPasswordValid.empty) || (formSubmitted && isEmailValid.empty)}
                  ></TextField>

              </Grid>

              <Grid container spacing={2} sx={ { mb:2, mt:1 } }>
                
                <Grid 
                 item xs={12}
                 sx={{display: !!errorMessage ? '' : 'none'}}
                 >
                    <Alert severity="error">{errorMessage}</Alert>

                </Grid>

                <Grid item xs={12}>
                  <Button 
                    variant='contained' 
                    fullWidth
                    type="submit"
                    disabled={isCheckingAuth}
                    > 
                      Crear Cuenta</Button>
                </Grid>

              </Grid>
                  <Grid container direction={'row'} justifyContent={'end'}>
                      <Typography sx={{ mr:1 }}>Ya tienes una cuenta?</Typography>
                      <Link component={ RouterLink } color={'inherit'} to={'/auth/register'}>
                        Crear una cuenta
                      </Link>
                  </Grid>
                
              </Grid>

          </form>
      </AuthLayout>    
     )

  }
