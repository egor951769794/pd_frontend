import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import MainScreen from './pages/MainScreen/MainScreen';
import AuthPage from './pages/AuthPage/AuthPage';
import MakeTaskPage from './pages/MakeTask/MakeTaskPage';
import LecturerTasksPage from './pages/LecturerTasksPage/LecturerTasksPage';
import StudentTasksPage from './pages/StudentTasksPage/StudentTasksPage';
import TaskInfo from './components/TaskInfo/TaskInfo';
import ThreadInfo from './components/ThreadInfo/ThreadInfo';
import { HashRouter } from 'react-router-dom';

export default function App() {

  useEffect(() => {
    document.title = '/'
  }, [])
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}></Route>
        <Route path="/main" element={<MainScreen></MainScreen>}></Route>
        <Route path="/make_task" element={<MakeTaskPage></MakeTaskPage>}></Route>
        <Route path="/given_tasks" element={<LecturerTasksPage></LecturerTasksPage>}></Route>
        <Route path="/my_tasks" element={<StudentTasksPage></StudentTasksPage>}></Route>
        <Route path="/task" element={<TaskInfo></TaskInfo>}></Route>
        <Route path="/thread" element={<ThreadInfo></ThreadInfo>}></Route>
      </Routes>
    </HashRouter>
  );
}
