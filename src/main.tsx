import '@/shared/styles/normalize.css';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PronounsTestPage from './pages/pronouns-test-page/index.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/pronouns-test-page" element={<PronounsTestPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
