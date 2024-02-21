import { Navigate, RouteObject } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoute";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AppRouter } from "./AppRouter";
import { AuthRouter } from "./AuthRouter";
import { JournalRouter } from "./JournalRouter";


 export const Rutas:RouteObject[] = [
  
    {
        path: '/',
        element: <AppRouter/>,
        children: [
            {
                path: '/auth/*',
                element: <AuthRouter/>,
                children: AuthRoutes
            },
            {
                path: '/',
                element: <JournalRouter/>,
                children: JournalRoutes
            },
            {
                path: '/*',
                element: <Navigate to={'/'}/>,
            }
        ]
     },

 ]


