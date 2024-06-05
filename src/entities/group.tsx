import { User } from "./user"
import { Task } from "./task"

export interface Group {
    _id: string,
    groupname: string,
    students: User[],
    tasksAssigned: Task[]
}
