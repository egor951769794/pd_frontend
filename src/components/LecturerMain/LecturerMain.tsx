import './LecturerMain.css';

import axios from 'axios';
import { Task } from 'src/entities/task';
import { postTask } from 'src/requests/postTask';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { Group } from 'src/entities/group';

import { BACKEND_BASE_URL } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';

const getMeUrl = '/user/me'

type LecturerMainProps = {

}

export default function LecturerMain(props: LecturerMainProps) {

  const [userToken] = useCookies(['token'])

  const [userName] = useCookies(['name'])

  const [groups, setGroups] = useState<Group[]>()

  const [displayGroups, setDisplayGroups] = useState(false)

  const navigate = useNavigate()

  const [userId, setUserId] = useState('')

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

  const getGroups = () => {
    axios.get(BACKEND_BASE_URL + '/group')
    .then((res) => {console.log(res.data); setGroups(res.data)})
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getMe(userToken.token)
    getGroups()
  }, [])


  return (
    <>
    <div className='lecturer-container'>
      <div className='lecturer-left'>
        <div className='lecturer-upper-blocks'>
          <div className='lecturer-upper-block' onClick={() => navigate("/make_task", {state: {creator_id: userId}})}>Новое задание</div>
          <div className='lecturer-upper-block' onClick={() => {setDisplayGroups(!displayGroups);}}>Выданные задания
            <div className={'lecturer-grouplist'.concat(displayGroups? '' : ' disabled')}>
              {groups?.map((group) => <div key={group._id} onClick={() => {navigate("/given_tasks", {state: {userId: userId, groupId: group._id}})}} className='lecturer-grouplist-group'>{group.groupname}</div>)}
            </div>
          </div>
        </div>
      </div>
      <div className='lecturer-right'>
        <div className='lecturer-upper-blocks'>
          <div className='lecturer-right-name lecturer-upper-block'>{userName.name}</div>
        </div>
      </div>
    </div>
    </>
  );
}
