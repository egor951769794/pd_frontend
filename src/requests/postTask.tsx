import axios from "axios"
import { Task } from "src/entities/task"
import { BACKEND_BASE_URL } from "src/constants/constants"

const req_url = '/task'

export const postTask = (task: Task) => {
    axios.post(BACKEND_BASE_URL + req_url, task)
    .then((respone) => {console.log(respone.data)})
    .catch((error) => console.log('error in post_task', error))
}
