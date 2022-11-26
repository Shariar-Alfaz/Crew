import { TestBed } from '@angular/core/testing';

import { TeacherListService } from './teacher-list.service';

describe('TeacherListService', () => {
  let service: TeacherListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
