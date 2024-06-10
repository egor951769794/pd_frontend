import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './TaskInfo.css';
import { Task } from 'src/entities/task';
import Header from '../Header/Header';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import axios from 'axios';
import { Thread } from 'src/entities/thread';
import { useCookies } from 'react-cookie';

type TaskInfoProps = {
  task?: object,
  studentId?: string,
  answer?: object
}


export default function TaskInfo(props: TaskInfoProps) {

  const loc = useLocation()

  const task = loc.state.task || props.task
  const studentId: string | undefined = loc.state.studentId || props.studentId
  const answer = loc.state.answer || props.answer

  const [groups, setGroups] = useState<string[]>([]) 

  const [userToken] = useCookies(['token'])

  const [userRole] = useCookies(['role'])

  const [answering, setAnswering] = useState(false)

  const [answerMsg, setAnswerMsg] = useState('')

  const [messages, setMessages] = useState<any[]>([])
  
  const [currentMessage, setCurrentMessage] = useState<string>('')
  
  const [threads, setThreads] = useState<any[]>([])


  const navigate = useNavigate()


  const getGroups = () => {
    task.asignedGroups.map((groupId: string) => 
      axios.get(BACKEND_BASE_URL + '/group/' + groupId)
    .then((res) => setGroups([...groups, res.data.groupname]))
    .catch(err => console.log(err))
    )
  }

  const createThreadObj = (task: string, student: string): Thread => {
    return {
      task: task,
      student: student,
      messages: [],
      isDone: false, 
      name: '',
      description: ''
    }
  }

  const makeThread = (task: string, student: string, msg: string) => {
    axios.post(BACKEND_BASE_URL + '/thread', createThreadObj(task, student))
    .then((res) => {
      return axios.post(BACKEND_BASE_URL + '/thread/' + res.data._id + '/message', {text: msg},
        {
          headers: {
              'Authorization': 'Bearer ' + userToken.token,
          },
          withCredentials: true
      }
      )
    })
    .then(res => {console.log(res.data); navigate("/", {state: {task: task, studentId: studentId, answer: answer? answer.at(0): undefined}})})
    .catch(err => console.log(err))
  } 

  const handleMsg = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerMsg(event.target.value)
  }

  const handleCurMsg = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(event.target.value)
  }



  const getMessages = () => {
    if (answer)
      axios.get(BACKEND_BASE_URL + '/thread/' + answer._id + '/message')
      .then(res => {
          setMessages([]);
          const msg = [...res.data].reverse()
          console.log(res.data); 
          const promises = res.data.map((msg: any) => axios.get(BACKEND_BASE_URL + '/user/' + msg.author))
          axios.all(promises)
          .then(resArray => {
              console.log(resArray)
              resArray.map((el: any) => setMessages(messages => [...messages, {...msg.pop(), authorName: el.data.username, authorRole: el.data.role}]))
            }
          )
          .catch(err => console.log(err))
        })
      .catch(err => console.log(err))
  }

  const addMessage = (msg: string) => {
    if (!currentMessage.length) return;
    axios.post(BACKEND_BASE_URL + '/thread/' + answer._id + '/message', {text: msg},
      {
        headers: {
            'Authorization': 'Bearer ' + userToken.token,
        },
        withCredentials: true
      }
    )
    .then((res) => {console.log(res); setCurrentMessage(''); getMessages()})
    .catch(err => console.log(err))
  }

  const getThreads = () => {
    axios.get(BACKEND_BASE_URL + '/thread/task/' + task.id)
    .then(res => {console.log(res.data);setThreads(res.data)})
    .catch(err => console.log(err))
  }

  const acceptThread = () => {
    axios.post(BACKEND_BASE_URL + '/thread/' + answer._id + '/accept')
    .then(res => {console.log(res);navigate("/")})
    .catch(err => console.log(err))
  }


  useEffect(() => {
    console.log('loaded')
    getGroups()
    getMessages()
    if (!studentId) getThreads()
  }, [])


  return (
    <>
      <Header/>
      <div className='task-info-container'>
        <div className='task-info-title task-info-cell'>{task.title}</div>
        <div className='task-info-title-header'>Группы</div>
        {groups.map((group) => <div className='task-info-group'>{group}</div>)}
        <div className='task-info-title-header'>Описание работы</div>
        <textarea className='maketask-desc task-info-cell' value={task.description} rows={6} disabled={true}></textarea> {/* впадлу новый стиль потом сделаю*/}
        <textarea 
          className={'maketask-desc task-info-cell'.concat(answering? '' : ' disabled')} 
          value={answerMsg} rows={6} 
          placeholder='Ваш ответ' 
          onChange={handleMsg}>
        </textarea>
        {studentId && !answer? 
          <div className='task-info-cell task-info-button' 
            onClick={() => {answering? 
                makeThread(task.id, studentId, answerMsg)
              : 
                setAnswering(true)}}>
            Сдать
            </div> 
          : 
            <></>}
      </div>
      {messages.length? 
      <>
        <div className='thread-title' onClick={() => alert(answer.isDone)}>Сообщения</div>
        <div className='thread-container'>
          {messages.map((msg: any) => 
            <div className='thread-message'>
              <div className='thread-message-info'>
                <div className='thread-message-author'>{(msg.authorRole === "lecturer"? 'Пр. ': 'Ст. ').concat(msg.authorName)}</div>
                <div className='thread-message-time'>{msg.dateCreated.replace("T", " ").replace("Z", " ")}</div>
              </div>
              <textarea className='thread-message-text task-info-cell' value={msg.text} disabled={true}></textarea>
            </div>)}
            {!answer.isDone? <textarea className='maketask-desc task-info-cell please-expand' placeholder='Ответ...' rows={3} value={currentMessage} onChange={handleCurMsg}></textarea> : <></>}
            <div className='task-info-buttons'>
              {!answer.isDone? <div className='task-info-cell task-info-button' onClick={() => addMessage(currentMessage)}>Ответить</div> : <></>}
              {userRole.role === "lecturer" && !answer.isDone? <div className='task-info-cell task-info-button' onClick={() => acceptThread()}>Принять</div> : <></>}
              {answer.isDone? <div className='task-info-cell task-info-button accepted'>Принято</div> : <></>}
            </div>
        </div>
      </>
      : 
      <></>
      }
      {threads.length? 
      <>
        <div className='thread-title'>Сданные работы</div>
        <div className='task-info-container no-margin-top'>
          {threads.map((thread: any) =>  
            <div className='task-info-cell pointer'
              onClick={() => {navigate("/thread", {state: {task: task, studentId: thread.user._id, answer: thread.thread}})}}>
              <div className='thread-message-author'>{thread.user.username}</div>
              <div className='thread-message-status'>{thread.thread.isDone? 'Принято' : 'В работе'}</div>
            </div>)}
        </div>
      </>
      : 
      <></>
      }
    </>
  );
}
