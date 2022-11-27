import { Teacher } from "./teacher.model";

export interface Class{
  id:number;
  teacherId:number;
  name:string;
  makeArchive:boolean;
}
