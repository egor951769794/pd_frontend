import './LecturerTasks.css';
import { useEffect, useState } from 'react';
import { Task } from 'src/entities/task';
import { Group } from 'src/entities/group';
import axios from 'axios';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';
import TaskListed from '../TaskListed/TaskListed';

type LecturerTasksProps = {
  groupId: string,
  userId: string,
}


export default function LecturerTasks(props: LecturerTasksProps) {

  const [tasks, setTasks] = useState<Task[]>()

  const [groupId, setGroupId] = useState(props.groupId)

  const [groups, setGroups] = useState<Group[]>()

  const [displayGroups, setDisplayGroups] = useState(false)

  const navigate = useNavigate()

  const getTasks = (id: string) => {
    axios.get(BACKEND_BASE_URL + '/task/group/' + id,
      // {
      //   headers: {
      //     id: groupId
      //   }
      // }
    )
    .then((res) => {
      console.log(res.data); 
      var myTasks: Task[] = []
      res.data.map((vanya_task: any) => myTasks.push( 
        {
          asignedGroups: vanya_task.asignees, // зачем разные имена полям вечно давать
          author: vanya_task.author, 
          title: vanya_task.title,
          description: vanya_task.description
        }
      ))
      setTasks(myTasks)})
    .catch((err) => console.log(err))
  }

  const getGroups = () => {
    axios.get(BACKEND_BASE_URL + '/group')
    .then((res) => {console.log(res.data); setGroups(res.data)})
    .catch((err) => console.log(err))
  }
  
  useEffect(() => {
    getTasks(props.groupId)
    getGroups()
  }, [])

  return (
    <>
    <div className='lecturer-left'>
      <div className='lecturer-upper-blocks'>
        <div className='lecturer-upper-block' onClick={() => navigate("/make_task", {state: {creator_id: props.userId}})}>Новое задание</div>
        <div className='lecturer-upper-block' onClick={() => {setDisplayGroups(!displayGroups);}}>Выданные задания
          <div className={'lecturer-grouplist'.concat(displayGroups? '' : ' disabled')}>
            {groups?.map((group) => <div onClick={() => {getTasks(group._id);}} className='lecturer-grouplist-group'>{group.groupname}</div>)}
          </div>
        </div>
      </div>
      <div className='lecturer-tasks-list'>
        {tasks?.map((task) => <TaskListed task={task}></TaskListed>)}
      </div>
    </div>
    </>
  );
}
