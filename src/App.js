import { BrowserRouter as Router, Route, Link, Routes, NavLink} from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import General from './components/General';
import Technology from './components/Technology';
import Sport from './components/Sport';
import Entertainment from './components/Entertainment';
import Search from './components/Serach';
import Login from './components/Login';
import Publish from './components/Publish';
import Read from './components/Read';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

function App() {

  return (

    
    <Router>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<General />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/search/:target" element={<Search />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<Publish />} />
      </Routes>
  
    </Router>

  );
}

export default App;



