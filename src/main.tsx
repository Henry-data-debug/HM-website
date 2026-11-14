import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './lib/auth';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const app = (
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );

  if (rootElement.hasChildNodes() && !rootElement.querySelector('#fallback-title')) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
}
