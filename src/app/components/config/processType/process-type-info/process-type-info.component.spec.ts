import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeInfoComponent } from './process-type-info.component';

describe('ProcessTypeInfoComponent', () => {
  let component: ProcessTypeInfoComponent;
  let fixture: ComponentFixture<ProcessTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
