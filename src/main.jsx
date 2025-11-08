import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home/Home.jsx'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Verify from './components/pages/Verify/Verify'
import VerifyEmail from './components/pages/Verify/VerifyEmail'
import ForgetPassword from './components/pages/ForgetPassword/ForgetPassword'
import SetNewPassword from './components/pages/SetNewPassword/SetNewPassword'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store'
import { persistStore } from 'redux-persist'
import { PrivateRoute, PublicRoute } from './components/shared/ProtectedRoute'

const persist = persistStore(store);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    // use private routes
      { index: true, path: '/', element: <PrivateRoute><Home /></PrivateRoute> },

      // use public routes
      { path: '/user/register', element: <PublicRoute><Register /></PublicRoute> },
      { path: '/user/login', element: <PublicRoute><Login /></PublicRoute> },
      { path: '/user/verify', element: <PublicRoute><Verify /></PublicRoute> },
      { path: '/user/email/verify/:token', element: <PublicRoute><VerifyEmail /></PublicRoute> },
      { path: '/user/password-forget', element: <PublicRoute><ForgetPassword /></PublicRoute> },
      { path: '/user/password-reset/:email', element: <PublicRoute><SetNewPassword /></PublicRoute> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
