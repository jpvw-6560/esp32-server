import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apercu from './pages/Apercu';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/apercu" element={<Apercu />} />
        <Route path="/" element={<Apercu />} />
      </Routes>
    </Router>
  );
};

export default App;
