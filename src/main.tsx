import '@/shared/styles/normalize.css';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LearningEnglishPage from './pages/pronouns-test-page/LearningEnglishPage.tsx';
import { Header } from './shared/components/headers/Header.tsx';
import { POS_GROUPS } from './pages/pronouns-test-page/utils/constants/const.ts';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/pronouns" replace />} />
          <Route path="/pronouns" element={<LearningEnglishPage posGroup={POS_GROUPS[0]} />} />
          <Route path="*" element={<Navigate to="/pronouns" replace />} />
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
