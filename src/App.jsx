import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AnalyzePage } from './components/AnalyzePage';
import { Header } from './components/Header';
import { DarkModeProvider } from './components/DarkModeProvider';
import './styles/index.css';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
