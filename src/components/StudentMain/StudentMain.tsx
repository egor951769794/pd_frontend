import './StudentMain.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import axios from 'axios';


const getMeUrl = '/user/me'

type StudentMainProps = {

}


export default function StudentMain(props: StudentMainProps) {

  const [userToken, setUserToken, removeUserToken] = useCookies(['token'])

  const navigate = useNavigate()

  const [userId, setUserId] = useState('')

  const [userGroup, setUserGroup] = useCookies(['group'])

  const [userGroupName, setUserGroupName] = useState('')

  const [userName] = useCookies(['name'])

  const getMe = (token: string) => {
    axios.get(BACKEND_BASE_URL + getMeUrl, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        withCredentials: true
    })
    .then((respone) => {setUserId(respone.data._id); console.log(respone.data)})
    .catch((error) => console.log('error in get_me', error))
  }

  const getGroup = () => {
    axios.get(BACKEND_BASE_URL + '/group/' + userGroup.group)
    .then(res => {setUserGroupName(res.data.groupname)})
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getMe(userToken.token)
    getGroup()
  }, [])

  return (
    <>
    <div className='lecturer-container'>
      <div className='lecturer-left'>
        <div className='lecturer-upper-blocks'>
          <div className='lecturer-upper-block' onClick={() => navigate("/my_tasks", {state: {userId: userId, groupId: userGroup.group}})}>Мои задания</div>
          {/* <div className='lecturer-upper-block'>Мои ответы</div> */}
        </div>
      </div>
      <div className='lecturer-right'>
        <div className='lecturer-upper-blocks'>
          <div className='lecturer-right-name lecturer-upper-block'>{userName.name}</div>
          <div className='lecturer-right-group lecturer-upper-block'>{userGroupName}</div>
        </div>
      </div>
      </div>
    </>
  );
}
