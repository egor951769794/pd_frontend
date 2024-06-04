import { file } from "./file"

export interface task {
    groups: number[],
    author: string,
    header: string,
    desc: string,
    files?: file[]
}