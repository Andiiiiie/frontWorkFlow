import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProcessListComponent } from './task-process-list.component';

describe('TaskProcessListComponent', () => {
  let component: TaskProcessListComponent;
  let fixture: ComponentFixture<TaskProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskProcessListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
