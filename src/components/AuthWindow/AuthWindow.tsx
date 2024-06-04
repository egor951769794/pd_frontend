import { useState } from 'react';
import './AuthWindow.css';

import axios from 'axios';

import { BACKEND_BASE_URL } from 'src/constants/constants';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


// type AuthWindowProps = {
  
// }


export default function AuthWindow() {

  const [windowState, setWindowState] = useState(0);

  const [userToken, setUserToken, removeUserToken] = useCookies(['token', ''])

  const navigate = useNavigate()

  const [registrationData, setRegistrationData] = useState(
    {
      username: '',
      password: '',
    }
  )

  const [authData, setAuthData] = useState(
    {
      username: '',
      password: '',
    }
  )


  const handleReg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({...registrationData, [event.target.name] : event.target.value})
  }

  const handleAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({...authData, [event.target.name] : event.target.value})
  }

  const handleRegSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post(BACKEND_BASE_URL.concat("/auth"), registrationData)
    .then((respone) => console.log(respone))
    .catch((error) => console.log(error))
  }

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post(BACKEND_BASE_URL.concat("/auth/signin"), authData)
    .then((respone) => {setUserToken('token', respone.data.accessToken); navigate("/main")})
    .catch((error) => console.log(error))
  }

  return (
    <div className='auth-container'>
      {windowState ?
      <form className='auth-form' onSubmit={(event) => handleRegSubmit(event)}>
      <input name='username' type='text' placeholder='Адрес эл.почты' value={registrationData.username} onChange={(event) => handleReg(event)}/>
      <input name='password' type='password' placeholder='Пароль' value={registrationData.password} onChange={(event) => handleReg(event)}/>
      <button type='submit' className='auth-button'>Зарегистрироваться</button>
      </form>
      : 
      <form className='auth-form' onSubmit={(event) => handleAuthSubmit(event)}>
        <input name='username' type='text' placeholder='Адрес эл.почты' value={authData.username} onChange={(event) => handleAuth(event)}/>
        <input name='password' type='password' placeholder='Пароль' value={authData.password} onChange={(event) => handleAuth(event)}/>
        <button type='submit' className='auth-button'>Войти</button>
      </form>}
      <div className='auth-switch'>
        <div className={'auth-switch-option'.concat(windowState? '' : ' selected')} onClick={() => setWindowState(0)}>Вход</div>
        <div className={'auth-switch-option'.concat(windowState? ' selected' : '')} onClick={() => setWindowState(1)}>Регистрация</div>
      </div>
    </div>
  );
}
