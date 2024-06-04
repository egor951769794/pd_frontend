import './Header.css';
import HeaderIcon from '../HeaderIcon/HeaderIcon';

import user from 'src/assets/icons/user1.svg'
import logo from 'src/assets/icons/logo.svg'
import { useCookies } from 'react-cookie';
import { useState } from 'react';

import { useOutsideClick } from 'src/hooks/UseClickOutside';
import UserModal from '../UserModal/UserModal';

type HeaderProps = {
  authorized: boolean
}


export default function Header(props: HeaderProps) {

  const [userToken, setUserToken, removeUserToken] = useCookies(['token'])

  const [renderModalQuit, setRenderModalQuit] = useState(false)

  const ref = useOutsideClick(() => setRenderModalQuit(false))

  return (
    <div className='header-container' ref={ref}>
        <HeaderIcon handler={() => {alert(userToken.token)}} src={logo}></HeaderIcon>
        {props.authorized? <div className='header-authorized'>
          <div className='header-option'>Главный экран</div>
          <div className='header-option'>Рейтинг</div>
          <div className='header-option'>Настройки</div>
        </div>
        : <></>}

        {userToken.token?
          <div className='header-right'>
          <HeaderIcon handler={() => {setRenderModalQuit(true)}} src={user}></HeaderIcon>
          <UserModal display={renderModalQuit}></UserModal>
          </div> : 
          <div className='header-right'>
          <HeaderIcon handler={() => setRenderModalQuit(true)} src={user}></HeaderIcon>
          </div>}
      </div>
  );
}
