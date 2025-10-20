import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('PWA: Service Worker зарегистрирован', registration);
      })
      .catch(error => {
        console.log('PWA: Ошибка регистрации Service Worker', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);