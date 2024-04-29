import { useState, useEffect } from 'react';

import './AuthPage.css';

import Header from 'src/components/Header/Header';
import AuthWindow from 'src/components/AuthWindow/AuthWindow';

export default function AuthPage() {



  return (
    <>
      <Header authorized={true}></Header>
      <AuthWindow></AuthWindow>
    </>
  )
}
