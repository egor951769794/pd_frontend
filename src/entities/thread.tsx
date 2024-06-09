import { Message } from "./message"

export interface Thread {
    task: string,
    student: string,
    messages: string[],
    isDone: boolean,
    name: string,
    description: string,
}
