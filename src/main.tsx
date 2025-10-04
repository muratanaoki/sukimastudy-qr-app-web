import '@/shared/styles/normalize.css';
import '@/shared/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LearningEnglishPage from './pages/pronouns-test-page/LearningEnglishPage.tsx';
import { POS_GROUPS } from './pages/pronouns-test-page/utils/constants/pos-groups.ts';
import { Header } from './shared/components/headers/header.tsx';
import { PartOfSpeechEnum } from './pages/pronouns-test-page/utils/enum.ts';

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
          <Route
            path={`/${PartOfSpeechEnum.Pronouns}`}
            element={<LearningEnglishPage posGroup={POS_GROUPS[0]} />}
          />
          <Route
            path={`/${PartOfSpeechEnum.Prepositions}`}
            element={<LearningEnglishPage posGroup={POS_GROUPS[1]} />}
          />
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
