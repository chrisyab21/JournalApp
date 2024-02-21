import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type authState = {
  status: string
  uid: any,
  email: string | null | undefined,
  displayName: any,
  photoURL: any,
  errorMessage: any
}

const initialState: authState = {
  status: 'checking', //'checking'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
  
}


export type LoginState = {
  ok: boolean
  uid: any,
  email: string | null | undefined,
  displayName: any,
  photoURL: any,
  errorMessage: any
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => {

      const {payload} = action;

      state.status ='authtenticated', //'checking'
      state.uid = payload.uid,
      state.email = payload.email,
      state.displayName = payload.displayName,
      state.photoURL = payload.photoURL,
      state.errorMessage = null
      
    },
    logout: (state, action: PayloadAction<any>) => {
      state.status ='not-authtenticated', //'checking'
      state.uid = null,
      state.email = null,
      state.displayName = null,
      state.photoURL = null,
      state.errorMessage = action.payload
    },
    checkingCredentials: (state) => {

      state.status = 'checking';
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions