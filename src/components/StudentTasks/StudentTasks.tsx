import './StudentTasks.css';
import { useEffect, useState } from 'react';
import { Task } from 'src/entities/task';
import { Group } from 'src/entities/group';
import axios from 'axios';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';
import TaskListed from '../TaskListed/TaskListed';
import { useCookies } from 'react-cookie';

type StudentTasksProps = {
  groupId: string,
  userId: string,
}


export default function StudentTasks(props: StudentTasksProps) {

  const [tasks, setTasks] = useState<any[]>([])

  const [groupId, setGroupId] = useState(props.groupId)

  const [groups, setGroups] = useState<Group[]>()

  const [displayGroups, setDisplayGroups] = useState(false)

  const [userGroup, setUserGroup] = useCookies(['group'])

  const [userGroupName, setUserGroupName] = useState('')

  const [userName] = useCookies(['name'])


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
      var myTasks: any[] = []
      res.data.map((vanya_task: any) => myTasks.push( 
        {
          id: vanya_task._id,
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

  const getGroup = () => {
    axios.get(BACKEND_BASE_URL + '/group/' + userGroup.group)
    .then(res => {setUserGroupName(res.data.groupname)})
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getTasks(props.groupId)
    getGroups()
    getGroup()
  }, [])

  return (
    <>
      <div className='lecturer-container'>
        <div className='lecturer-left'>
          <div className='lecturer-upper-blocks'>
            <div className='lecturer-upper-block'>Мои задания</div>
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
      <div className='lecturer-tasks-list'>
        {tasks?.map((task) => <TaskListed studentId={props.userId} task={task}></TaskListed>)}
    </div>
    </>
  );
}
