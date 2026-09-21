import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Areas from './components/Areas/Areas';
import OpenSource from './components/OpenSource/OpenSource';
import Projects from './components/Projects/Projects';
import Design from './components/Design/Design';
import Online from './components/Online/Online';
import Footer from './components/Footer/Footer';
import TinyQ from './components/TinyQ/TinyQ';

const Home = () => (
  <main>
    <Hero />
    <Areas />
    <OpenSource />
    <Projects />
    <Design />
    <Online />
  </main>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tinyq" element={<TinyQ />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
