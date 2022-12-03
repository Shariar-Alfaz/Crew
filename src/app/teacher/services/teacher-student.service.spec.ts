import { TestBed } from '@angular/core/testing';

import { TeacherStudentService } from './teacher-student.service';

describe('TeacherStudentService', () => {
  let service: TeacherStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
