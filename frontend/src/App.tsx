import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apercu from './pages/Apercu';
import Courbes from './pages/Courbes';
import Navbar from './components/Navbar';
import Journal from './pages/Journal';
import Captures from './pages/Captures';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/apercu" element={<Apercu />} />
        <Route path="/courbes" element={<Courbes />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/captures" element={<Captures />} />
        <Route path="/" element={<Apercu />} />
      </Routes>
    </Router>
  );
};

export default App;
