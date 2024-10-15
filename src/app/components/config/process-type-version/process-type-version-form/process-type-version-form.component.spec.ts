import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeVersionFormComponent } from './process-type-version-form.component';

describe('ProcessTypeVersionFormComponent', () => {
  let component: ProcessTypeVersionFormComponent;
  let fixture: ComponentFixture<ProcessTypeVersionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeVersionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeVersionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
