import '@/shared/styles/normalize.css';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import A1PosterPage from './pages/a1-poster-page/index.tsx';
import A4PrintPage from './pages/a4-print-page/index.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Create a wrapper component to properly use the useLoading hook
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/a1-poster-page" element={<A1PosterPage />} />
          <Route path="/a4-print-page" element={<A4PrintPage />} />
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
