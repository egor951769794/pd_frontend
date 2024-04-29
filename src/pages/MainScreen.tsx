import { useState, useEffect } from 'react';

import './MainScreen.css';

import Header from 'src/components/Header/Header';

export default function MainScreen() {



  return (
    <>
      <Header authorized={true}></Header>
    </>
  )
}
