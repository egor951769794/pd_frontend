import { useState, useEffect } from 'react';

import Header from 'src/components/Header/Header';
import LecturerMain from 'src/components/LecturerMain/LecturerMain';
import StudentMain from 'src/components/StudentMain/StudentMain';

export default function MainScreen() {



  return (
    <>
      <Header></Header>
      <LecturerMain></LecturerMain>
    </>
  )
}
