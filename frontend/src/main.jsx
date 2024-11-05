import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { DarkModeProvider } from './Context/DarkModeContext.jsx'
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </DarkModeProvider>
  </StrictMode>,
)
