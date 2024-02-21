
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from './purple';
import {FC, ReactElement} from 'react';

type props = {

    children: ReactElement
}

export const AppTheme:FC<props> = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
      {children}
  </ThemeProvider>
  )
}
