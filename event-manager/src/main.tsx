import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'; // Ensure App is exported as a React component from './App'
import { ProducerProvider } from './contexts/ProducerContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProducerProvider>
      <UserProvider>
          <App />
      </UserProvider>
    </ProducerProvider>
  </StrictMode>,
)
