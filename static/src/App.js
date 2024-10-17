
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ConfirmEmail from './components/ConfirmEmail';

import Search from './components/Search/Search';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}   />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/confirmEmail" element={<ConfirmEmail/>} />
        </Routes>
      </Router>
      
    </div>

  );
}

export default App;
