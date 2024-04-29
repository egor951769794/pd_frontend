import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import MainScreen from './pages/MainScreen/MainScreen';
import AuthPage from './pages/AuthPage/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}></Route>
        <Route path="/main" element={<MainScreen></MainScreen>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
