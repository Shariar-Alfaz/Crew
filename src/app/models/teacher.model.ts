export interface Teacher{
  birthDate:Date;
  email:string;
  id:number;
  name:string;
  useId:string;
  image:string;
}
export interface TeacherDto{
  birthDate:Date;
  email:string;
  id:number;
  name:string;
  useId:string;
  password:string;
  date:string|null;
}
