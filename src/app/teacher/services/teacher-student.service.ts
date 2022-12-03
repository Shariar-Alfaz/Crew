import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentListService } from 'src/app/admin/service/student.service';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStudentService {
  private ROOT_URL: string = 'Teacher/api/';
  constructor(private http: HttpClient) {}
  getStudents(id:any): Observable<IHttpResult> {
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Students/${id}`);
  }
  saveStudents(students: any[], classId: any): Observable<IHttpResult> {
    let headers = new HttpHeaders().set('classId', classId);
    return this.http.post<IHttpResult>(
      `${this.ROOT_URL}Save/Students/ToClass`,
      students,
      { headers: headers }
    );
  }
  getStudentsOfClass(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Students/Class/${id}`);
  }
  removeStudentFromClass(sId:any,classId:any):Observable<IHttpResult>{
    return this.http.delete<IHttpResult>(`${this.ROOT_URL}Delete/Student/Class/${sId}/${classId}`);
  }
}
