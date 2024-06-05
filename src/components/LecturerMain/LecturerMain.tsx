import './LecturerMain.css';

import axios from 'axios';
import { Task } from 'src/entities/task';
import { postTask } from 'src/requests/postTask';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

import { BACKEND_BASE_URL } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';

const getMeUrl = '/user/me'

type LecturerMainProps = {

}

export default function LecturerMain(props: LecturerMainProps) {

  const [userToken, setUserToken, removeUserToken] = useCookies(['token'])

  const navigate = useNavigate()

  let userId = ''

  const getMe = (token: string) => {
    axios.get(BACKEND_BASE_URL + getMeUrl, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        withCredentials: true
    })
    .then((respone) => {userId = respone.data._id; console.log(respone.data)})
    .catch((error) => console.log('error in get_me', error))
  }

  useEffect(() => {
    getMe(userToken.token)
  }, [])

  const task : Task = {
    asignedGroups: ['МО-211'],
    author: userId,
    title: 'заголовок',
    description: 'описание',
  }

  return (
    <>
    <div className='lecturer-left'>
      <div className='lecturer-upper-blocks'>
        <div className='lecturer-upper-block' onClick={() => navigate("/make_task", {state: {creator_id: userId}})}>Новое задание</div>
        <div className='lecturer-upper-block'>Новое задание</div>
        <div className='lecturer-upper-block'>Новое задание</div>
        <div className='lecturer-upper-block'>Новое задание</div>
      </div>
      <div onClick={() => {postTask({asignedGroups: ['МО-211'], author: userId, title: 'заго11ловок1', description: 'desc'});}}>запостить</div>
    </div>
    </>
  );
}
