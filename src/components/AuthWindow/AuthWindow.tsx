import { useState } from 'react';
import './AuthWindow.css';


type AuthWindowProps = {
  
}


export default function AuthWindow(props: AuthWindowProps) {

  const [windowState, setWindowState] = useState(0);

  return (
    <div className='auth-container'>
      {windowState ?
      <form className='auth-form'>
      <input name='email' type='text' placeholder='Адрес эл.почты' />
      <input name='password' type='password' placeholder='Пароль' />
      <button type='submit'>Зарегистрироваться</button>
      </form>
      : 
      <form className='auth-form'>
        <input name='email' type='text' placeholder='Адрес эл.почты' />
        <input name='password' type='password' placeholder='Пароль' />
        <button type='submit'>Войти</button>
      </form>}
      <div className='auth-switch'>
        <div className={'auth-switch-option'.concat(windowState? '' : ' selected')} onClick={() => setWindowState(0)}>Вход</div>
        <div className={'auth-switch-option'.concat(windowState? ' selected' : '')} onClick={() => setWindowState(1)}>Регистрация</div>
      </div>
    </div>
  );
}
