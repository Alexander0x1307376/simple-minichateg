import React from 'react';
import 'bulmaswatch/materia/bulmaswatch.scss';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from './components/pages/join/Join';
import Chat from './components/pages/chat/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
