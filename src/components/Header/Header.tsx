import './Header.css';
import HeaderIcon from '../HeaderIcon/HeaderIcon';

import user from 'src/assets/icons/user1.svg'
import logo from 'src/assets/icons/logo.svg'
import { useCookies } from 'react-cookie';
import { useState } from 'react';

import { useOutsideClick } from 'src/hooks/UseClickOutside';
import UserModal from '../UserModal/UserModal';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {

}


export default function Header(props: HeaderProps) {

  const [userToken,] = useCookies(['token'])

  const [renderModalQuit, setRenderModalQuit] = useState(false)

  const navigate = useNavigate()

  const ref = useOutsideClick(() => setRenderModalQuit(false))

  return (
    <div className='header-container' ref={ref}>
        <HeaderIcon handler={() => {userToken.token? navigate("/main") : navigate("/")}} src={logo}></HeaderIcon>
        {userToken.token? <div className='header-authorized'>
          <div className='header-option' 
            onClick={userToken.token? () => navigate("/main") : () => navigate("/")}>
              Главный экран
            </div>
          <div className='header-option' onClick={() => alert('¯\\_(ツ)_/¯')}>Рейтинг</div>
          <div className='header-option' onClick={() => alert('¯\\_(ツ)_/¯')}>Настройки</div>
        </div>
        : <></>}

        {userToken.token?
          <div className='header-right'>
          <HeaderIcon handler={() => {if (!renderModalQuit) setRenderModalQuit(true)
             else setRenderModalQuit(false)}} src={user}></HeaderIcon>
          <UserModal display={renderModalQuit}></UserModal>
          </div> : 
          <div className='header-right'>
          <HeaderIcon handler={() => {navigate("/")}} src={user}></HeaderIcon>
          </div>}
      </div>
  );
}
