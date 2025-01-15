import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NeuralEvolution } from './pages/NeuralEvolution';
import { About } from './pages/About';
import { Learn } from './pages/Learn';
import { Workspace } from './pages/Workspace';
import { Tokenomics } from './pages/Tokenomics';
import { Roadmap } from './pages/Roadmap';
import { Chat } from './pages/Chat';
import { Team } from './pages/Team';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NeuralEvolution />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about" element={<About />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/tokenomics" element={<Tokenomics />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
}