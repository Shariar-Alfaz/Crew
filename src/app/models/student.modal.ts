export interface Student{
    birthDate:Date;
    email:string;
    id:number;
    name:string;
    userId:string;
    phone:string;
    image:string;
  }

  export interface StudentDto{
    birthDate:Date;
    email:string;
    id:number;
    name:string;
    userId:string;
    phone:string
    password:string;
    date:string|null;
  }
  