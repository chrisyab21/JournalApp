

import { RouteObject, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

 export const AuthRoutes:RouteObject[] = [

    {
        path: 'login',
        element: <LoginPage/>
    },
    {
        path: 'register',
        element: <RegisterPage/> 
    },
    {
        path: '*',
        element: <Navigate to={'login'}/>
    },


 ]


