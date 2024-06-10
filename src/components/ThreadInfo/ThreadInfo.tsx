import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ThreadInfo.css';
import { Task } from 'src/entities/task';
import Header from '../Header/Header';
import { BACKEND_BASE_URL } from 'src/constants/constants';
import axios from 'axios';
import { Thread } from 'src/entities/thread';
import { useCookies } from 'react-cookie';
import TaskInfo from '../TaskInfo/TaskInfo';

type ThreadInfoProps = {
  // task: Task
}


export default function ThreadInfo(props: ThreadInfoProps) {

  const loc = useLocation()

  const task = loc.state.task
  const studentId: string | undefined = loc.state.studentId
  const answer = loc.state.answer

  return (
    <>
      {/* <Header/> */}
      <TaskInfo task={task} studentId={studentId} answer={answer}></TaskInfo>
    </>
  );
}
