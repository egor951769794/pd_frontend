import { File } from "./file"

export interface Message {
    author: string,
    header: string,
    desc: string,
    files: File[],
    date: string
}
