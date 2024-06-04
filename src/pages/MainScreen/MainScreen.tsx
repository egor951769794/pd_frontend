import { useState, useEffect } from 'react';

import './MainScreen.css';

import Header from 'src/components/Header/Header';
import LecturerMain from 'src/components/LecturerMain/LecturerMain';
import StudentMain from 'src/components/StudentMain/StudentMain';

export default function MainScreen() {



  return (
    <>
      <Header authorized={true}></Header>
      <LecturerMain></LecturerMain>
    </>
  )
}
