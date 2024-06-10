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

  const [answer, setAnswer] = useState<any>('')

  const [userRole, _] = useCookies(['role'])

  const checkForAnswer = () => {
    axios.get(BACKEND_BASE_URL + '/thread/task/' + task.id + '/student/' + studentId)
    .then(res => {setAnswer(res.data)})
    .catch(err => console.log(err))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!userRole.role)
    checkForAnswer()
  }, [])

  return (
    <>
      <div className='task-listed-container' 
        onClick={() => {navigate("/task", {state: {task: task, studentId: studentId, answer: answer? answer.at(0): undefined}})}}
        >
        {task.title}
        {studentId? 
          <div className='task-listed-statuses' onClick={() => {console.log(answer)}}>
            {/* {!answer || answer?.at(0).isDone?
            <div className='task-listed-answered'>{answer?.length ? 'В работе' : 'Вы не ответили'}</div>
            :
            <div className='task-listed-answered'>Принято</div>
            } */}
            {
              answer.length? 
                answer.at(0).isDone? <div className='task-listed-answered' onClick={() => console.log(answer)}>Принято</div> : <div className='task-listed-answered'>В работе</div>
              :
                <div className='task-listed-answered'>Вы не ответили</div>
            }
          </div>
          : <></>
        }
      </div>
    </>
  );
}
