import { task } from "./task"
import { message } from "./message"

export interface thread {
    task: task,
    student: string,
    messages: message[],
    status: string
}