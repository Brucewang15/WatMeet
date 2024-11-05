
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import { useDispatch } from 'react-redux';
import Search from './components/Search/Search';
import MainPage from './components/MainPage/MainPage';

import MainClubPage from './components/club_pages/MainClubPage';
import IndividualClubPage from './components/MainPage/ClubsDisplay/IndividualClubPage';
import { useEffect } from 'react';
import { loadUser } from '../src/redux/actions/authActions'
import ForgotPassword from './components/account/ForgotPassword';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/confirmEmail" element={<ConfirmEmail/>} /> */}
          <Route path="/organizations" element={<MainClubPage />} />
          <Route path="/organizations/:orgId/" element={<IndividualClubPage />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
