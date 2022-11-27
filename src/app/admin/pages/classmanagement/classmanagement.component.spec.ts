import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassmanagementComponent } from './classmanagement.component';

describe('ClassmanagementComponent', () => {
  let component: ClassmanagementComponent;
  let fixture: ComponentFixture<ClassmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
