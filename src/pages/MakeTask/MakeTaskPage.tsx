import Header from 'src/components/Header/Header';
import MakeTask from 'src/components/MakeTask/MakeTask';
import { useLocation } from 'react-router-dom';



export default function MakeTaskPage() {

  const loc = useLocation()

  return (
    <>
      <Header></Header>
      <MakeTask creator_id={loc.state.creator_id}></MakeTask>
    </>
  )
}
