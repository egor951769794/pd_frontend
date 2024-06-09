import { useState } from 'react';
import './UserModal.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

type UserModalProps = {
  display: boolean
}


export default function UserModal(props: UserModalProps) {

  const [userToken, setUserToken] = useCookies(["token"])

  const [userRole, setUserRole] = useCookies(['role', ''])

  const [userGroup, setUserGroup] = useCookies(['group', ''])

  const [userName, setUserName] = useCookies(['name', ''])

  const [_display, setDisplay] = useState(props.display)

  const navigate = useNavigate()

  if (props.display) return (
    <>
      <div onClick={() => {
          setUserToken("token", '');
          setUserRole("role", '')
          setUserGroup('group', '')
          setUserName('name', '')
          navigate('/'); 
          setDisplay(false)
        }} className={'user-modal-container'}>Выйти</div>
    </>
  ) 
  else return <></>
}
