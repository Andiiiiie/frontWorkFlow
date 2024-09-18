import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeFormComponent } from './process-type-form.component';

describe('ProcessTypeFormComponent', () => {
  let component: ProcessTypeFormComponent;
  let fixture: ComponentFixture<ProcessTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
