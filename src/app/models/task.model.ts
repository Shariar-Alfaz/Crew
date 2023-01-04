export interface ClassTaskDto {
  name: string;
  description: string;
  classId: number;
  totalMarks: number;
}

export interface TaskMonitor{
  id:number;
  studentClassDetailsId:number;
  totalKeypress:number;
  taskMonitorScreenShotsCollection:TaskMonitorScreenShots[];

}

export interface TaskMonitorScreenShots{
  id:number;
  screenShot:string;
  taskMonitorId:number;
  dateTime:Date;
}
