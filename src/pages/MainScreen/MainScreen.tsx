import { useState, useEffect } from 'react';

import Header from 'src/components/Header/Header';
import LecturerMain from 'src/components/LecturerMain/LecturerMain';
import StudentMain from 'src/components/StudentMain/StudentMain';
import { useCookies } from 'react-cookie';

export default function MainScreen() {

  const [userRole, ] = useCookies(['role'])

  return (
    <>
      <Header></Header>
      {userRole.role === 'lecturer' ? <LecturerMain></LecturerMain> : <></>}
      {userRole.role === '' ? <StudentMain></StudentMain> : <></>}

    </>
  )
}
