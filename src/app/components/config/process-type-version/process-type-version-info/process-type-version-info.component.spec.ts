import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeVersionInfoComponent } from './process-type-version-info.component';

describe('ProcessTypeVersionInfoComponent', () => {
  let component: ProcessTypeVersionInfoComponent;
  let fixture: ComponentFixture<ProcessTypeVersionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeVersionInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeVersionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
