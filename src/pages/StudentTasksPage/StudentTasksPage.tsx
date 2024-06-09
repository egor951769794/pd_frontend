import Header from 'src/components/Header/Header';
import { useLocation } from 'react-router-dom';
import StudentTasks from 'src/components/StudentTasks/StudentTasks';



export default function StudentTasksPage() {

  const loc = useLocation()

  return (
    <>
      <Header></Header>
      <StudentTasks userId={loc.state.userId} groupId={loc.state.groupId}></StudentTasks>
    </>
  )
}
