import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './TaskInfo.css';
import { Task } from 'src/entities/task';
import Header from '../Header/Header';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import axios from 'axios';

type TaskInfoProps = {
  // task: Task
}


export default function TaskInfo() {

  const loc = useLocation()

  const task: Task = loc.state.task

  const [groups, setGroups] = useState<string[]>([]) 


  const getGroups = () => {
    task.asignedGroups.map((groupId) => 
      axios.get(BACKEND_BASE_URL + '/group/' + groupId)
    .then((res) => setGroups([...groups, res.data.groupname]))
    .catch(err => console.log(err))
    )
  }

  useEffect(() => {
    setGroups([])
    getGroups()
  }, [])


  return (
    <>
    <Header></Header>
    
      <div className='task-info-container'>
        <div className='task-info-title task-info-cell' onClick={() => console.log(task.asignedGroups)}>{task.title}</div>
        <div className='task-info-title-header'>Группы</div>
        {groups.map((group) => <div className='task-info-group'>{group}</div>)}
        <div className='task-info-title-header'>Описание работы</div>
        <textarea className='maketask-desc task-info-cell' placeholder={task.description} rows={6} disabled={true}></textarea> {/* впадлу новый стиль потом сделаю*/}
      </div>
    </>
  );
}
