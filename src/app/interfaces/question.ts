import { Reply } from "./reply"

export interface Question{
    id:number,
    content:string,
    username:string,
    programId:number,
    reply:Reply,
    avatar:any,
    show:boolean

}