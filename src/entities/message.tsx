import { file } from "./file"

export interface message {
    author: string,
    header: string,
    desc: string,
    files: file[],
    date: string
}