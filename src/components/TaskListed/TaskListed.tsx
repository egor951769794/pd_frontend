import './TaskListed.css';
import { Task } from 'src/entities/task';
import { useNavigate } from 'react-router-dom';

type TaskListedProps = {
  task: Task
}


export default function TaskListed({task}: TaskListedProps) {

  const navigate = useNavigate()

  return (
    <>
      <div className='task-listed-container' onClick={() => navigate("/task", {state: {task: task}})}>{task.title}</div>
    </>
  );
}
