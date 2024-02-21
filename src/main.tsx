import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './styles.css'
import { Rutas } from './routers/Rutas'
import { AppTheme } from './theme/AppTheme'
import { Provider } from 'react-redux'
import { store } from './Redux/store/store'

const router = createBrowserRouter(Rutas)



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <Provider store={store}>
      <AppTheme>
        <RouterProvider router={router}/> 
      </AppTheme> 
    </Provider>

)
