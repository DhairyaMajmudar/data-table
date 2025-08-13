import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import Overlay from './components/Overlay.tsx';
import './css/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Overlay className="min-h-screen">
      <App />
    </Overlay>
  </StrictMode>,
);
