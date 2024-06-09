import { useEffect, useState } from 'react';
import './MakeTask.css';
import { Task } from 'src/entities/task';
import { postTask } from 'src/requests/postTask';
import axios from 'axios';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import { Group } from 'src/entities/group';
import { useNavigate } from 'react-router-dom';

type MakeTaskProps = {
  creator_id: string
}


export default function MakeTask(props: MakeTaskProps) {

  const navigate = useNavigate()

  const [task, setTask] = useState<Task>({
    asignedGroups: [],
    author: props.creator_id,
    title: '',
    description: ''
  })

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({...task, title : event.target.value})
  }

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({...task, description : event.target.value})
  }

  const handleGroupsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var options = event.target.options
    var groups = []
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        groups.push(options[i].value)
      }
    }
    setTask({...task, asignedGroups : groups})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    postTask(task)
    navigate("/main")
  }
  
  const handleReset = () => {
    setTask({
      asignedGroups: [],
      author: props.creator_id,
      title: '',
      description: ''
    })
  }

  const [groups, setGroups] = useState<Group[]>()

  const getGroups = () => {
    axios.get(BACKEND_BASE_URL + '/group')
    .then((res) => {console.log(res.data); setGroups(res.data)})
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getGroups()
  }, [])


  return (
    <>
      <div className='maketask-container'>
        <form className='maketask-form' onSubmit={handleSubmit}>
          <input name='title' onChange={handleTitleChange} value={task.title} type='text' placeholder='Название' />
          <textarea name='description' onChange={handleDescChange} value={task.description} placeholder='Описание' rows={6} className='maketask-desc'/>
          <label htmlFor='asignedGroups' className='maketask-groups-label'>Группы</label>
          <select name='asignedGroups' id='asignedGroups' multiple={true} className='maketask-groups' onChange={handleGroupsChange}>
            {groups?.map((group) => <option value={group._id}>{group.groupname}</option>)}
            
          </select>
          <button type='submit' className='maketask-submit'>Опубликовать</button>
          <div className='maketask-reset' onClick={handleReset}>Сброс</div>
        </form>
      </div>
    </>
  );
}
