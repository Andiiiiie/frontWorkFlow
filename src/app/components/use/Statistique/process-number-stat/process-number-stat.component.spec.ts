import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNumberStatComponent } from './process-number-stat.component';

describe('ProcessNumberStatComponent', () => {
  let component: ProcessNumberStatComponent;
  let fixture: ComponentFixture<ProcessNumberStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessNumberStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessNumberStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
