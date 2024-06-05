import { File } from "./file"

export interface Task {
    asignedGroups: string[],
    author: string,
    title: string,
    description: string,
    files?: File[]
}
