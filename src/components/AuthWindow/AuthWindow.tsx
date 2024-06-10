import { useEffect, useState } from 'react';
import './AuthWindow.css';

import axios from 'axios';

import { BACKEND_BASE_URL } from 'src/constants/constants';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Group } from 'src/entities/group';
import { group } from 'console';


// type AuthWindowProps = {
  
// }


export default function AuthWindow() {

  const [windowState, setWindowState] = useState(0);

  const [userToken, setUserToken, removeUserToken] = useCookies(['token', ''])

  const [userRole, setUserRole] = useCookies(['role', ''])

  const [userGroup, setUserGroup] = useCookies(['group', ''])
  
  const [userName, setUserName] = useCookies(['name', ''])


  const navigate = useNavigate()

  const [registrationData, setRegistrationData] = useState(
    {
      group: '',
      username: '',
      password: '',
      role: '',
    }
  )

  const [authData, setAuthData] = useState(
    {
      username: '',
      password: '',
    }
  )

  const [groups, setGroups] = useState<Group[]>()

  useEffect(() => {
    if (userToken.token) navigate("/main")
    getGroups()
  }, [])


  const handleReg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({...registrationData, [event.target.name] : event.target.value})
  }

  const handleRegRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({...registrationData, role: event.target.checked? 'lecturer' : 'student'})
  }

  const handleAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({...authData, [event.target.name] : event.target.value})
  }

  const getGroups = () => {
    axios.get(BACKEND_BASE_URL + '/group')
    .then((res) => {setGroups(res.data)})
    .catch((err) => console.log(err))
  }

  const handleGroupSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegistrationData({...registrationData, group: event.target.value})
  }

  const handleRegSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (registrationData.role === 'lecturer') {
      const {group, ...rest} = registrationData
      axios.post(BACKEND_BASE_URL.concat("/auth"), rest)
      .then()
      .catch((error) => console.log(error))
    } else {
      axios.post(BACKEND_BASE_URL.concat("/auth"), registrationData)
      .then()
      .catch((error) => console.log(error))
    }
  }
  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post(BACKEND_BASE_URL.concat("/auth/signin"), authData)
    .then((respone) => {
      setUserToken('token', respone.data.accessToken); 
      setUserRole('role', respone.data.user.role)
      setUserGroup('group', respone.data.user.group ?? '')
      setUserName('name', respone.data.user.username)
      navigate("/main")
    })
    .catch((error) => console.log(error))
  }


  return (
    <div className='auth-container'>
      {windowState ?
      <form className='auth-form' onSubmit={(event) => handleRegSubmit(event)}>
        <input name='username' type='text' placeholder='Логин' value={registrationData.username} onChange={(event) => handleReg(event)}/>
        <input name='password' type='password' placeholder='Пароль' value={registrationData.password} onChange={(event) => handleReg(event)}/>
        {registrationData.role === 'lecturer'? <></> : <select name='group' id='group' multiple={false} className='auth-form-group' onChange={handleGroupSelection}>
          <option>Группа студента</option>
          {groups?.map((group) => <option value={group._id}>{group.groupname}</option>)}
          </select>}
        <div className='auth-form-role'>
          <label htmlFor='role' className='auth-form-role-label'>Преподаватель</label>
        <input id='role' name='role' type='checkbox' onChange={handleRegRole} className='auth-form-role-check'></input>
        </div>
        <button type='submit' className='auth-button'>Зарегистрироваться</button>
      </form>
      : 
      <form className='auth-form' onSubmit={(event) => handleAuthSubmit(event)}>
        <input name='username' type='text' placeholder='Логин' value={authData.username} onChange={(event) => handleAuth(event)}/>
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
