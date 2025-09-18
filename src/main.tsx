import '@/shared/styles/normalize.css';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LearningEnglishPage from './pages/pronouns-test-page/LearningEnglishPage.tsx';
import { DATA } from './pages/pronouns-test-page/utils/const';
import Header from '@/shared/components/headers/header';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/pronouns-test-page" replace />} />
          <Route path="/pronouns-test-page" element={<LearningEnglishPage data={DATA} />} />
          <Route path="*" element={<Navigate to="/pronouns-test-page" replace />} />
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
