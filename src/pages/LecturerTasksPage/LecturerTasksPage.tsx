import Header from 'src/components/Header/Header';
import { useLocation } from 'react-router-dom';
import LecturerTasks from 'src/components/LecturerTasks/LecturerTasks';



export default function LecturerTasksPage() {

  const loc = useLocation()

  return (
    <>
      <Header></Header>
      <LecturerTasks userId={loc.state.userId} groupId={loc.state.groupId}></LecturerTasks>
    </>
  )
}
