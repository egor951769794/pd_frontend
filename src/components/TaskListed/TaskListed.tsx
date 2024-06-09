import './TaskListed.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import { useCookies } from 'react-cookie';

type TaskListedProps = {
  task: any
  studentId?: string,
}


export default function TaskListed({task, studentId}: TaskListedProps) {

  const [answer, setAnswer] = useState<any>(undefined)

  const [userRole, _] = useCookies(['role'])

  const checkForAnswer = () => {
    axios.get(BACKEND_BASE_URL + '/thread/task/' + task.id + '/student/' + studentId)
    .then(res => {setAnswer(res.data)})
    .catch(err => console.log(err))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!userRole.role) checkForAnswer()
  }, [])

  return (
    <>
      <div className='task-listed-container' 
        onClick={() => {navigate("/task", {state: {task: task, studentId: studentId, answer: answer? answer.at(0): undefined}})}}
        >
        {task.title}
        {studentId? 
          <div className='task-listed-statuses'>
            <div className='task-listed-answered' onClick={()=>alert(answer)}>{answer?.length ? 'В работе' : 'Вы не ответили'}</div>
          </div>
          : <></>
        }
      </div>
    </>
  );
}
