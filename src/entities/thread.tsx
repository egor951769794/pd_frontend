import { Task } from "./task"
import { Message } from "./message"

export interface Thread {
    task: Task,
    student: string,
    messages: Message[],
    status: string
}
