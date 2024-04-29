import { useState, useEffect } from 'react';

import './Header.css';
import HeaderIcon from '../HeaderIcon/HeaderIcon';

import user from 'src/assets/icons/user1.svg'
import logo from 'src/assets/icons/logo.svg'

type HeaderProps = {
  authorized: boolean
}


export default function Header(props: HeaderProps) {



  return (
    <div className='header-container'>
        <HeaderIcon src={logo}></HeaderIcon>
        {props.authorized? <div className='header-authorized'>
          <div className='header-option'>Главный экран</div>
          <div className='header-option'>Рейтинг</div>
          <div className='header-option'>Настройки</div>
        </div>
        : <></>}

        <div className='header-right'>
          <HeaderIcon src={user}></HeaderIcon>
        </div>
      </div>
  );
}
